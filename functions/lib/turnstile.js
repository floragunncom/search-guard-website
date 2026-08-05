/**
 * Cloudflare Turnstile Validation Helper
 *
 * Verifies the `cf-turnstile-response` token submitted by the website forms
 * against the Turnstile /siteverify API. Used by the contact and newsletter
 * endpoints for spam protection.
 */

import { createLogger } from './logger.js';

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/**
 * Validate a Turnstile token.
 *
 * Never throws; always resolves to a result object so callers can map the
 * failure reason to their (deliberately cryptic) error responses:
 *   - 'config':        TURNSTILE_SECRET_KEY is not set (server misconfiguration)
 *   - 'missing-token': the submission contained no token
 *   - 'invalid-token': the /siteverify API rejected the token
 *   - 'verify-error':  the /siteverify request itself failed
 *
 * @param {Object} params
 * @param {string} params.token - The `cf-turnstile-response` token from the form
 * @param {string} params.secretKey - Turnstile secret key (env.TURNSTILE_SECRET_KEY)
 * @param {string} params.remoteIp - Visitor IP (CF-Connecting-IP header, optional)
 * @param {Object} params.logger - Logger instance (optional)
 * @returns {Promise<{ok: boolean, reason?: string, errorCodes?: string[]}>}
 */
export async function validateTurnstile({ token, secretKey, remoteIp, logger = null }) {
  if (!logger) {
    logger = createLogger('turnstile', {}, null);
  }

  if (!secretKey) {
    logger.error('TURNSTILE_SECRET_KEY is not configured, rejecting submission');
    return { ok: false, reason: 'config' };
  }

  if (!token) {
    logger.warn('Submission rejected: missing Turnstile token');
    return { ok: false, reason: 'missing-token' };
  }

  try {
    const verifyResponse = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
        remoteip: remoteIp || undefined,
      }),
    });

    const verifyResult = await verifyResponse.json();

    if (!verifyResult.success) {
      logger.warn('Submission rejected: Turnstile validation failed', {
        errorCodes: verifyResult['error-codes'],
      });
      return {
        ok: false,
        reason: 'invalid-token',
        errorCodes: verifyResult['error-codes'],
      };
    }

    logger.debug('Turnstile validation passed', {
      hostname: verifyResult.hostname,
      challengeTs: verifyResult.challenge_ts,
    });
    return { ok: true };
  } catch (err) {
    logger.error('Turnstile verification request failed, rejecting', {
      error: err.message,
    });
    return { ok: false, reason: 'verify-error' };
  }
}
