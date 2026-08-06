/**
 * Cloudflare Pages Function - Uptime Kuma Webhook
 *
 * Endpoint: /api/uptime
 * Method: POST
 * Content-Type: application/json
 *
 * Receives webhook notifications from an Uptime Kuma instance and forwards the
 * raw JSON payload to both Matrix and email. No CRM/Zoho involvement.
 *
 * Authentication:
 *   The request must carry a static password in the "X-Webhook-Token" HTTP
 *   header, matching the UPTIME_WEBHOOK_TOKEN environment variable. Configure
 *   this in Uptime Kuma under the webhook notification's "Additional Headers"
 *   as: { "X-Webhook-Token": "<the secret>" }.
 *
 * Behaviour (in parallel, once authenticated):
 * 1. Post the raw payload to the Matrix room (defaults to MATRIX_ROOM_ID).
 * 2. Email the raw payload to the uptime alert address.
 */

import { sendRawEmail } from '../lib/sendgrid.js';
import { sendMatrixNotification } from '../lib/matrix.js';
import { createLogger } from '../lib/logger.js';

// HTTP header carrying the shared secret.
const AUTH_HEADER = 'X-Webhook-Token';

// Default recipient for uptime alert emails (overridable via env).
const DEFAULT_ALERT_EMAIL = 'uptime@floragunn.com';

/**
 * Length-aware, constant-time string comparison to avoid leaking the secret
 * through response timing. (Node's crypto.timingSafeEqual isn't available in
 * the Workers runtime, so we compare byte-by-byte here.)
 */
function timingSafeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const enc = new TextEncoder();
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  if (ab.length !== bb.length) return false;
  let result = 0;
  for (let i = 0; i < ab.length; i += 1) {
    result |= ab[i] ^ bb[i];
  }
  return result === 0;
}

export async function onRequestPost(context) {
  const { request, env } = context;

  const logger = createLogger('uptime-api', env, request);
  logger.logEnvironmentInfo();

  const jsonHeaders = { 'Content-Type': 'application/json' };

  logger.info('Uptime webhook request received', {
    method: request.method,
    url: request.url,
    userAgent: request.headers.get('user-agent'),
  });

  // -----------------------------------------------------------------------
  // Authentication: static password in a request header.
  // If the token is not configured server-side, refuse every request rather
  // than leaving the endpoint effectively open.
  // -----------------------------------------------------------------------
  const expectedToken = env.UPTIME_WEBHOOK_TOKEN;
  if (!expectedToken) {
    logger.error('UPTIME_WEBHOOK_TOKEN is not configured; rejecting request');
    return new Response(
      JSON.stringify({ error: 'Webhook not configured' }),
      { status: 503, headers: jsonHeaders }
    );
  }

  const providedToken = request.headers.get(AUTH_HEADER) || '';
  if (!timingSafeEqual(providedToken, expectedToken)) {
    logger.warn('Uptime webhook rejected: invalid or missing token');
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: jsonHeaders }
    );
  }

  logger.debug('Uptime webhook authenticated');

  try {
    // Read the raw body so we can forward it verbatim. Try to parse it as JSON
    // for nicer Matrix formatting and a more descriptive email subject, but
    // fall back to the raw string if it isn't valid JSON.
    const rawBody = await request.text();

    let parsed = null;
    try {
      parsed = JSON.parse(rawBody);
    } catch (parseErr) {
      logger.warn('Uptime webhook body is not valid JSON; forwarding raw text', {
        error: parseErr.message,
      });
    }

    // Derive a short subject from common Uptime Kuma fields when available.
    const monitorName = parsed?.monitor?.name;
    const status = parsed?.heartbeat?.status;
    const shortMsg = typeof parsed?.msg === 'string' ? parsed.msg : null;
    const subjectDetail =
      shortMsg || monitorName || (status !== undefined ? `status ${status}` : '') || 'notification';
    const subject = `[Uptime Kuma] ${subjectDetail}`;

    const alertEmail = env.UPTIME_ALERT_EMAIL || DEFAULT_ALERT_EMAIL;

    // Matrix expects an object; pass the parsed payload (unknown formType falls
    // through to the raw JSON dump formatter) or wrap the raw text.
    const matrixData = parsed !== null ? parsed : { message: rawBody };

    // Uptime alerts go to their own Matrix room; fall back to the shared room
    // (MATRIX_ROOM_ID) if a dedicated one isn't configured.
    const matrixRoomId = env.UPTIME_MATRIX_ROOM_ID || env.MATRIX_ROOM_ID;

    logger.info('Forwarding uptime webhook payload', {
      hasJson: parsed !== null,
      subject,
      alertEmail,
      matrixRoomId,
    });

    const results = await Promise.allSettled([
      // 1. Matrix room (dedicated UPTIME_MATRIX_ROOM_ID, else shared MATRIX_ROOM_ID)
      sendMatrixNotification(
        matrixData,
        'uptime',
        matrixRoomId,
        env.MATRIX_SERVER_URL,
        env.MATRIX_TOKEN,
        logger
      ),

      // 2. Raw email to the uptime alert address
      sendRawEmail(
        {
          to: alertEmail,
          subject,
          text: rawBody,
        },
        env.SENDGRID_SENDMAIL_KEY,
        logger
      ),
    ]);

    const [matrixResult, emailResult] = results;

    if (matrixResult.status === 'rejected') {
      logger.error('Matrix notification failed', {
        error: matrixResult.reason?.message || matrixResult.reason,
      });
    }
    if (emailResult.status === 'rejected') {
      logger.error('Uptime email failed', {
        error: emailResult.reason?.message || emailResult.reason,
      });
    }

    const response = {
      success: true,
      details: {
        matrix: matrixResult.status === 'fulfilled' ? 'sent' : 'failed',
        email: emailResult.status === 'fulfilled' ? 'sent' : 'failed',
      },
    };

    logger.info('Uptime webhook completed', response.details);

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: jsonHeaders,
    });
  } catch (error) {
    logger.error('Uptime webhook processing error', {
      error: error.message,
      stack: error.stack,
      name: error.name,
    });

    return new Response(
      JSON.stringify({
        error: 'An error occurred processing the webhook',
        message: error.message,
      }),
      { status: 500, headers: jsonHeaders }
    );
  }
}
