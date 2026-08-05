/**
 * Matrix Integration Helper Functions
 *
 * Handles sending form notifications and integration-failure alerts to
 * Matrix rooms.
 */

import { createLogger } from './logger.js';

/**
 * Low-level: send a formatted message to a Matrix room.
 * Throws on any API/network failure so callers can detect delivery problems.
 *
 * @param {{plain: string, html: string}} message - Message bodies
 * @param {string} matrixRoomId - Matrix room ID (e.g., !roomid:server.com)
 * @param {string} matrixServerUrl - Matrix homeserver URL
 * @param {string} matrixToken - Matrix access token
 * @param {Object} logger - Logger instance
 * @returns {Promise<string>} The Matrix event id
 */
async function sendMessageToRoom(message, matrixRoomId, matrixServerUrl, matrixToken, logger) {
  // Ensure server URL has protocol
  let serverUrl = matrixServerUrl;
  if (!serverUrl.startsWith('http://') && !serverUrl.startsWith('https://')) {
    serverUrl = `https://${serverUrl}`;
    logger.debug('Added https:// protocol to Matrix server URL', { serverUrl });
  }

  // Encode room ID for URL (replace # with %23, etc.)
  const encodedRoomId = encodeURIComponent(matrixRoomId);

  // Generate a unique transaction ID
  const txnId = Date.now() + '_' + Math.random().toString(36).substring(7);

  const url = `${serverUrl}/_matrix/client/r0/rooms/${encodedRoomId}/send/m.room.message/${txnId}`;

  logger.debug('Sending request to Matrix API', {
    url: url.replace(matrixToken, '***'),
    roomId: matrixRoomId,
    txnId,
  });

  const payload = {
    msgtype: 'm.text',
    body: message.plain,
    format: 'org.matrix.custom.html',
    formatted_body: message.html,
  };

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${matrixToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    logger.error('Matrix message send failed', {
      status: response.status,
      error,
      roomId: matrixRoomId,
    });
    throw new Error(`Matrix API error: ${response.status} - ${error}`);
  }

  const result = await response.json();
  return result.event_id;
}

/**
 * Send a notification to a Matrix room.
 *
 * Throws on delivery failure (so Promise.allSettled callers see it as
 * rejected). Missing configuration is treated as a deliberate deployment
 * choice and skipped gracefully instead of throwing.
 *
 * @param {Object} formData - Form submission data
 * @param {string} formType - Type of form ('contact' or 'newsletter')
 * @param {string} matrixRoomId - Matrix room ID (e.g., !roomid:server.com)
 * @param {string} matrixServerUrl - Matrix homeserver URL
 * @param {string} matrixToken - Matrix access token
 * @param {Object} logger - Logger instance (optional)
 */
export async function sendMatrixNotification(formData, formType, matrixRoomId, matrixServerUrl, matrixToken, logger = null) {
  // Create a default logger if none provided
  if (!logger) {
    logger = createLogger('matrix', {}, null);
  }

  logger.debug('Sending Matrix notification', {
    formType,
    hasRoomId: !!matrixRoomId,
    hasServerUrl: !!matrixServerUrl,
    hasToken: !!matrixToken,
  });

  // Validate required parameters
  if (!matrixRoomId || !matrixServerUrl || !matrixToken) {
    logger.warn('Matrix notification skipped: missing required configuration', {
      hasRoomId: !!matrixRoomId,
      hasServerUrl: !!matrixServerUrl,
      hasToken: !!matrixToken,
    });
    return { success: false, skipped: true, reason: 'Missing configuration' };
  }

  // Format message based on form type
  const message = formatMessage(formData, formType);

  logger.debug('Matrix message formatted', {
    messageLength: message.plain.length,
    hasHtml: !!message.html,
  });

  const eventId = await sendMessageToRoom(message, matrixRoomId, matrixServerUrl, matrixToken, logger);

  logger.info('Matrix notification sent successfully', {
    eventId,
    roomId: matrixRoomId,
  });

  return { success: true, eventId };
}

/**
 * Send an integration-failure alert to a Matrix room.
 *
 * Used by the form endpoints after Promise.allSettled: when one or more
 * integration steps failed, this posts an alert next to the submission
 * notification so failures are noticed even though function logs are not
 * persistent. Matrix runs on separate infrastructure, so it is likely still
 * reachable when SendGrid or Zoho are not.
 *
 * Throws on delivery failure; missing configuration is skipped gracefully.
 *
 * @param {Object} formData - Minimal submission context (email, company?)
 * @param {string} formType - Type of form ('contact' or 'newsletter')
 * @param {Array<{step: string, error: string}>} failures - Failed steps
 * @param {string} matrixRoomId - Matrix room ID
 * @param {string} matrixServerUrl - Matrix homeserver URL
 * @param {string} matrixToken - Matrix access token
 * @param {Object} logger - Logger instance (optional)
 */
export async function sendMatrixFailureAlert(formData, formType, failures, matrixRoomId, matrixServerUrl, matrixToken, logger = null) {
  if (!logger) {
    logger = createLogger('matrix', {}, null);
  }

  if (!matrixRoomId || !matrixServerUrl || !matrixToken) {
    logger.warn('Matrix failure alert skipped: missing required configuration');
    return { success: false, skipped: true, reason: 'Missing configuration' };
  }

  const message = formatFailureAlert(formData, formType, failures);

  const eventId = await sendMessageToRoom(message, matrixRoomId, matrixServerUrl, matrixToken, logger);

  logger.info('Matrix failure alert sent successfully', {
    eventId,
    roomId: matrixRoomId,
    failedSteps: failures.map((f) => f.step),
  });

  return { success: true, eventId };
}

/**
 * Format form data into a Matrix message
 * @param {Object} formData - Form submission data
 * @param {string} formType - Type of form ('contact' or 'newsletter')
 * @returns {Object} Formatted message with plain and HTML versions
 */
function formatMessage(formData, formType) {
  if (formType === 'newsletter') {
    return formatNewsletterMessage(formData);
  } else if (formType === 'contact') {
    return formatContactMessage(formData);
  }

  // Fallback
  return {
    plain: JSON.stringify(formData, null, 2),
    html: `<pre>${JSON.stringify(formData, null, 2)}</pre>`,
  };
}

/**
 * Format newsletter subscription data.
 * Ported from the old AWS Lambda newsletter `matrix.js`.
 */
function formatNewsletterMessage(data) {
  const { email, country } = data;

  const plain = `New Search Guard newsletter subscriber ${email}`;

  const html = `<h3>New Search Guard newsletter subscriber:</h3>
<ul>
<li><strong>email:</strong> ${escapeHtml(email)}</li>
<li><strong>country:</strong> ${escapeHtml(country || '')}</li>
</ul>`;

  return { plain, html };
}

/**
 * Format contact form data.
 * Uses the snake_case field names sent by the website contact forms.
 */
function formatContactMessage(data) {
  const {
    first_name,
    last_name,
    email,
    company,
    country,
    message,
  } = data;

  const plain = `New Search Guard contact form filled out by ${email}`;

  const html = `<h3>New Search Guard contact form filled out</h3>
<ul>
<li><strong>firstname:</strong> ${escapeHtml(first_name)}</li>
<li><strong>lastname:</strong> ${escapeHtml(last_name)}</li>
<li><strong>email:</strong> ${escapeHtml(email)}</li>
<li><strong>company:</strong> ${escapeHtml(company)}</li>
<li><strong>country:</strong> ${escapeHtml(country || '')}</li>
<li><strong>message:</strong> ${escapeHtml(message)}</li>
</ul>`;

  return { plain, html };
}

/**
 * Format an integration-failure alert.
 */
function formatFailureAlert(formData, formType, failures) {
  const failedSteps = failures.map((f) => f.step).join(', ');

  const plain =
    `⚠️ Search Guard ${formType} form: integration failure for ${formData.email} — ` +
    `failed steps: ${failedSteps}`;

  const company = formData.company ? ` (${escapeHtml(formData.company)})` : '';

  const html = `<h3>⚠️ ${escapeHtml(formType)} form: integration failure</h3>
<p>The submission by <strong>${escapeHtml(formData.email)}</strong>${company} was accepted, but the following steps failed:</p>
<ul>
${failures
  .map((f) => `<li><strong>${escapeHtml(f.step)}:</strong> ${escapeHtml(f.error)}</li>`)
  .join('\n')}
</ul>
<p>The data for the failed steps may need manual processing — see the submission notification above.</p>`;

  return { plain, html };
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\n/g, '<br>');
}
