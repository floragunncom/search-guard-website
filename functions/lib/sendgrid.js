/**
 * SendGrid Integration Helper Functions
 *
 * Handles sending emails and managing contacts in SendGrid lists.
 */

import { createLogger, sanitizeForLogging } from './logger.js';

const SENDGRID_API_BASE = 'https://api.sendgrid.com/v3';

/**
 * Send an email via SendGrid using Dynamic Templates
 * @param {Object} params - Email parameters
 * @param {string} params.to - Recipient email
 * @param {string} params.toName - Recipient name
 * @param {string} params.templateId - SendGrid Dynamic Template ID
 * @param {Object} params.templateData - Dynamic template data/variables
 * @param {string[]} params.bccEmails - Array of BCC email addresses
 * @param {string} apiKey - SendGrid API key
 * @param {Object} logger - Logger instance (optional)
 */
export async function sendEmail({ to, toName, templateId, templateData = {}, bccEmails = [] }, apiKey, logger = null) {
  // Create a default logger if none provided
  if (!logger) {
    logger = createLogger('sendgrid', {}, null);
  }

  logger.debug('Preparing to send email via SendGrid', {
    to,
    templateId,
    hasBcc: bccEmails && bccEmails.length > 0,
    bccCount: bccEmails?.length || 0,
    bccEmailsRaw: bccEmails,
  });

  const personalizations = [
    {
      to: [{ email: to, name: toName }],
      dynamic_template_data: {
        name: toName,
        ...templateData,
      },
    }
  ];

  // Add BCCs if provided
  if (bccEmails && bccEmails.length > 0) {
    // Trim whitespace from email addresses
    const cleanedBccEmails = bccEmails.map(email => email.trim()).filter(email => email.length > 0);
    personalizations[0].bcc = cleanedBccEmails.map(email => ({ email }));
    logger.debug('Added BCC recipients', {
      bccCount: cleanedBccEmails.length,
      bccEmails: cleanedBccEmails,
      bccObjects: personalizations[0].bcc,
    });
  } else {
    logger.warn('No BCC emails to add', {
      bccEmailsProvided: bccEmails,
      isArray: Array.isArray(bccEmails),
      length: bccEmails?.length,
    });
  }

  const payload = {
    personalizations,
    from: {
      email: 'noreply@coretex-axiom.com',
      name: 'Coretex Axiom'
    },
    template_id: templateId,
  };

  logger.debug('Sending request to SendGrid Mail API', {
    url: `${SENDGRID_API_BASE}/mail/send`,
    templateId,
    recipientEmail: to,
    payloadPersonalizations: payload.personalizations,
  });

  const response = await fetch(`${SENDGRID_API_BASE}/mail/send`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    logger.error('SendGrid email API error', {
      status: response.status,
      error,
      recipientEmail: to,
    });
    throw new Error(`SendGrid email error: ${response.status} - ${error}`);
  }

  logger.info('Email sent successfully via SendGrid', {
    to,
    templateId,
  });

  return { success: true };
}

/**
 * Add a contact to a SendGrid list
 * @param {Object} contact - Contact information
 * @param {string} contact.email - Contact email
 * @param {string} contact.firstName - Contact first name
 * @param {string} contact.lastName - Contact last name
 * @param {Object} contact.customFields - Additional custom fields
 * @param {string} listId - SendGrid list ID
 * @param {string} apiKey - SendGrid API key
 * @param {Object} logger - Logger instance (optional)
 */
export async function addContactToList({ email, firstName, lastName, customFields = {} }, listId, apiKey, logger = null) {
  // Create a default logger if none provided
  if (!logger) {
    logger = createLogger('sendgrid', {}, null);
  }

  logger.debug('Adding contact to SendGrid list', {
    email,
    listId,
    hasCustomFields: Object.keys(customFields).length > 0,
  });

  // Prepare contact data
  const contactData = {
    email,
    first_name: firstName,
    last_name: lastName,
    ...customFields
  };

  logger.debug('Contact data prepared', sanitizeForLogging(contactData));

  const payload = {
    list_ids: [listId],
    contacts: [contactData]
  };

  logger.debug('Sending request to SendGrid Marketing Contacts API', {
    url: `${SENDGRID_API_BASE}/marketing/contacts`,
    listId,
  });

  const response = await fetch(`${SENDGRID_API_BASE}/marketing/contacts`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    logger.error('SendGrid list addition API error', {
      status: response.status,
      error,
      email,
      listId,
    });
    throw new Error(`SendGrid list error: ${response.status} - ${error}`);
  }

  const result = await response.json();
  logger.info('Contact added to SendGrid list successfully', {
    email,
    listId,
    jobId: result.job_id,
  });

  return { success: true, jobId: result.job_id };
}

/**
 * Get SendGrid template ID based on form type and language
 * @param {string} formType - Type of form ('contact' or 'demo')
 * @param {string} language - Language code ('en' or 'de')
 * @param {Object} env - Environment variables containing template IDs
 * @param {Object} logger - Logger instance (optional)
 * @returns {string} SendGrid template ID
 */
export function getTemplateId(formType, language, env, logger = null) {
  // Create a default logger if none provided
  if (!logger) {
    logger = createLogger('sendgrid', {}, null);
  }

  // Template ID mapping from environment variables
  // Format: SENDGRID_TEMPLATE_<FORMTYPE>_<LANG>
  const templateKey = `SENDGRID_TEMPLATE_${formType.toUpperCase()}_${language.toUpperCase()}`;

  const templateId = env[templateKey];

  if (!templateId) {
    logger.warn(`Template ID not found for ${templateKey}, falling back to English`, {
      formType,
      language,
      templateKey,
    });
    // Fallback to English template if specific language not found
    const fallbackKey = `SENDGRID_TEMPLATE_${formType.toUpperCase()}_EN`;
    const fallbackTemplateId = env[fallbackKey];
    logger.debug('Using fallback template', {
      fallbackKey,
      fallbackTemplateId,
    });
    return fallbackTemplateId;
  }

  logger.debug('Template ID found', {
    templateKey,
    templateId,
  });

  return templateId;
}

/**
 * Detect language from form data or default to English
 * @param {Object} formData - Form submission data
 * @param {Object} request - Request object (to check URL path)
 * @returns {string} Language code ('en' or 'de')
 */
export function detectLanguage(formData, request = null) {
  // 1. Check if language is explicitly provided in form data
  if (formData.language && ['en', 'de'].includes(formData.language)) {
    return formData.language;
  }

  // 2. Try to detect from request URL path (e.g., /en/contact or /de/contact)
  if (request) {
    const referer = request.headers.get('referer') || '';
    if (referer.includes('/de/')) {
      return 'de';
    }
    if (referer.includes('/en/')) {
      return 'en';
    }
  }

  // 3. Default to English
  return 'en';
}
