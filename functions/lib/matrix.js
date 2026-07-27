/**
 * Matrix Integration Helper Functions
 *
 * Handles sending form notifications to Matrix rooms.
 */

import { createLogger } from './logger.js';

/**
 * Send a notification to a Matrix room
 * @param {Object} formData - Form submission data
 * @param {string} formType - Type of form ('contact' or 'demo')
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
 * @param {string} formType - Type of form ('contact' or 'demo')
 * @returns {Object} Formatted message with plain and HTML versions
 */
function formatMessage(formData, formType) {
  if (formType === 'demo') {
    return formatDemoMessage(formData);
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
 * Format demo form data
 */
function formatDemoMessage(data) {
  const {
    firstName,
    lastName,
    email,
    company,
    jobTitle,
    industry,
    companySize,
    message,
  } = data;

  const plain = `🎯 New Coretex Axiom Demo Request

👤 Contact Information:
Name: ${firstName} ${lastName}
Email: ${email}
${jobTitle ? `Job Title: ${jobTitle}` : ''}

🏢 Company Information:
Company: ${company}
Industry: ${industry}
${companySize ? `Company Size: ${companySize}` : ''}

💬 Message:
${message || 'No message provided'}`;

  const html = `<h3>🎯 New Coretex Axiom Demo Request</h3>
<h4>👤 Contact Information:</h4>
<ul>
<li><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</li>
<li><strong>Email:</strong> ${escapeHtml(email)}</li>
${jobTitle ? `<li><strong>Job Title:</strong> ${escapeHtml(jobTitle)}</li>` : ''}
</ul>
<h4>🏢 Company Information:</h4>
<ul>
<li><strong>Company:</strong> ${escapeHtml(company)}</li>
<li><strong>Industry:</strong> ${escapeHtml(industry)}</li>
${companySize ? `<li><strong>Company Size:</strong> ${escapeHtml(companySize)}</li>` : ''}
</ul>
<h4>💬 Message:</h4>
<p>${escapeHtml(message || 'No message provided')}</p>`;

  return { plain, html };
}

/**
 * Format contact form data
 */
function formatContactMessage(data) {
  const {
    firstName,
    lastName,
    email,
    company,
    topic,
    message,
  } = data;

  const plain = `📧 New Coretex Axiom Contact Form Submission

👤 Contact Information:
Name: ${firstName} ${lastName}
Email: ${email}
Company: ${company}
Topic: ${topic}

💬 Message:
${message}`;

  const html = `<h3>📧 New Coretex Axiom Contact Form Submission</h3>
<h4>👤 Contact Information:</h4>
<ul>
<li><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</li>
<li><strong>Email:</strong> ${escapeHtml(email)}</li>
<li><strong>Company:</strong> ${escapeHtml(company)}</li>
<li><strong>Topic:</strong> ${escapeHtml(topic)}</li>
</ul>
<h4>💬 Message:</h4>
<p>${escapeHtml(message)}</p>`;

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
