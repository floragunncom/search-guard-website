/**
 * Matrix Integration Helper Functions
 *
 * Handles sending form notifications to Matrix rooms.
 */

import { createLogger } from './logger.js';

/**
 * Send a notification to a Matrix room
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
    return { success: false, reason: 'Missing configuration' };
  }

  // Ensure server URL has protocol
  let serverUrl = matrixServerUrl;
  if (!serverUrl.startsWith('http://') && !serverUrl.startsWith('https://')) {
    serverUrl = `https://${serverUrl}`;
    logger.debug('Added https:// protocol to Matrix server URL', { serverUrl });
  }

  // Format message based on form type
  const message = formatMessage(formData, formType);

  logger.debug('Matrix message formatted', {
    messageLength: message.plain.length,
    hasHtml: !!message.html,
  });

  // Encode room ID for URL (replace # with %23, etc.)
  const encodedRoomId = encodeURIComponent(matrixRoomId);

  // Generate a unique transaction ID
  const txnId = Date.now() + '_' + Math.random().toString(36).substring(7);

  // Construct Matrix API URL
  const url = `${serverUrl}/_matrix/client/r0/rooms/${encodedRoomId}/send/m.room.message/${txnId}`;

  logger.debug('Sending request to Matrix API', {
    url: url.replace(matrixToken, '***'),
    roomId: matrixRoomId,
    txnId,
  });

  // Prepare message payload
  const payload = {
    msgtype: 'm.text',
    body: message.plain,
    format: 'org.matrix.custom.html',
    formatted_body: message.html,
  };

  try {
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
      logger.error('Matrix notification failed', {
        status: response.status,
        error,
        roomId: matrixRoomId,
      });
      return {
        success: false,
        error: `Matrix API error: ${response.status}`,
      };
    }

    const result = await response.json();
    logger.info('Matrix notification sent successfully', {
      eventId: result.event_id,
      roomId: matrixRoomId,
    });

    return {
      success: true,
      eventId: result.event_id,
    };
  } catch (error) {
    logger.error('Matrix notification exception', {
      error: error.message,
      stack: error.stack,
    });
    return {
      success: false,
      error: error.message,
    };
  }
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
