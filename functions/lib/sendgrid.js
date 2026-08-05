/**
 * SendGrid Integration Helper Functions
 *
 * Handles sending emails and managing contacts in SendGrid lists.
 */

import { createLogger, sanitizeForLogging } from './logger.js';

const SENDGRID_API_BASE = 'https://api.sendgrid.com/v3';

// Search Guard sender identity (ported from the old AWS Lambda contact form).
const SG_FROM = {
  email: 'sales@floragunn.com',
  name: 'The Search Guard Team',
};

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
 * Map a country name (as sent by the website's Country dropdown) to an ISO
 * 3166-1 alpha-2 code, for the purpose of contact-form template/BCC routing.
 *
 * Only the routing-relevant countries need to be mapped; everything else
 * returns '' and falls through to the default settings. This reproduces the
 * effective behaviour of the old AWS Lambda (which used the `country-list`
 * package) for every value the dropdown can actually produce.
 *
 * @param {string} name - Country name (e.g. "Germany")
 * @returns {string} ISO alpha-2 code (e.g. "DE") or '' if not routing-relevant
 */
export function countryNameToCode(name) {
  const map = {
    Germany: 'DE',
    Austria: 'AT',
    Switzerland: 'CH',
    France: 'FR',
    'United States': 'US',
    Canada: 'CA',
    'United Kingdom': 'GB',
    Russia: 'RU',
    Mexico: 'MX',
    Chile: 'CL',
    Brazil: 'BR',
    Argentina: 'AR',
    Uruguay: 'UY',
    Peru: 'PE',
    Bolivia: 'BO',
    Colombia: 'CO',
    'Costa Rica': 'CR',
    Cuba: 'CU',
    'Dominican Republic': 'DO',
    'Puerto Rico': 'PR',
    Venezuela: 'VE',
    Panama: 'PA',
    Ecuador: 'EC',
    Honduras: 'HN',
    Paraguay: 'PY',
  };
  return map[name] || '';
}

/**
 * Country-based template + partner BCC routing for the contact form.
 * Ported verbatim from the old AWS Lambda (`sendgrid.js` countrySettings).
 *
 * @param {string} code - ISO alpha-2 country code
 * @returns {{ templateId: string, bcc: string[] }}
 */
function contactCountrySettings(code) {
  switch (code) {
    case 'DE':
      return {
        templateId: 'd-facb4519690b4f55bdea7f1302e91f99',
        bcc: ['exceleratesystems@pipedrivemail.com', 'sales@floragunn.com'],
      };
    case 'AT':
    case 'CH':
      return {
        templateId: 'd-b7e911a63a054dd4b3b3f91969216e4c',
        bcc: ['sales@floragunn.com', 'exceleratesystems@pipedrivemail.com'],
      };
    case 'FR':
    case 'FX':
    case 'GF':
    case 'PF':
    case 'TF':
      return {
        templateId: 'd-e377e3d2cad54632997a4b0566bdf041',
        bcc: [
          'sales@floragunn.com',
          'exceleratesystems@pipedrivemail.com',
          'iquackenbos@search-guard.com',
        ],
      };
    case 'US':
    case 'UM':
    case 'CA':
      return {
        templateId: 'd-bfdb550d0e4b4d1595a46e350053b5a4',
        bcc: ['sales@floragunn.com', 'exceleratesystems@pipedrivemail.com'],
      };
    case 'MX':
    case 'CL':
    case 'BR':
    case 'AR':
    case 'UY':
    case 'PE':
    case 'BO':
    case 'CO':
    case 'CR':
    case 'CU':
    case 'DM':
    case 'DO':
    case 'PR':
    case 'VE':
    case 'PA':
    case 'EC':
    case 'SV':
    case 'HT':
    case 'HN':
    case 'PY':
      return {
        templateId: 'd-88b2734fe7924fe0b99b9f47f9ade2c6',
        bcc: ['sales@floragunn.com', 'exceleratesystems@pipedrivemail.com'],
      };
    case 'GB':
    case 'UK':
      return {
        templateId: 'd-f57641b0a0524245a25fd182ed2e368e',
        bcc: ['sales@floragunn.com', 'exceleratesystems@pipedrivemail.com'],
      };
    case 'RU':
      return {
        templateId: 'd-849d4d538e554485acc2242e8e2a2ccb',
        bcc: ['sales@floragunn.com', 'exceleratesystems@pipedrivemail.com'],
      };
    default:
      return {
        templateId: 'd-74bd1335050f4478a7ca38f8429a0948',
        bcc: ['sales@floragunn.com', 'exceleratesystems@pipedrivemail.com'],
      };
  }
}

/**
 * Send the contact-form "welcome" email with country-based template and
 * partner BCC routing. Ported from the old AWS Lambda `sendWelcomeMail`.
 *
 * @param {Object} formValues - Raw contact form values (snake_case field names)
 * @param {string} apiKey - SendGrid API key
 * @param {Object} logger - Logger instance (optional)
 */
export async function sendContactWelcomeEmail(formValues, apiKey, logger = null) {
  if (!logger) {
    logger = createLogger('sendgrid', {}, null);
  }

  const countryCode = countryNameToCode(formValues.country);
  const settings = contactCountrySettings(countryCode);

  logger.debug('Contact welcome email routing resolved', {
    country: formValues.country,
    countryCode,
    templateId: settings.templateId,
    bccCount: settings.bcc.length,
  });

  // NOTE: In the SendGrid v3 Mail Send REST API, `dynamic_template_data` must
  // live *inside* each personalization object. The old AWS Lambda used the
  // @sendgrid/mail helper, which hoisted a top-level `dynamic_template_data`
  // into the personalization automatically. Calling the raw REST API here we
  // must place it in the personalization ourselves, otherwise SendGrid ignores
  // it and every template substitution renders blank.
  const payload = {
    personalizations: [
      {
        to: [
          {
            email: formValues.email,
            name: `${formValues.first_name} ${formValues.last_name}`,
          },
        ],
        bcc: settings.bcc.map((email) => ({ email })),
        dynamic_template_data: {
          firstname: formValues.first_name || '',
          lastname: formValues.last_name || '',
          jobposition: formValues.job_position || '',
          email: formValues.email || '',
          phone: formValues.phone || '',
          company: formValues.company || '',
          address: formValues.address || '',
          city: formValues.city || '',
          zipcode: formValues.zip || '',
          country: formValues.country || '',
          elasticsearchversion: formValues.version || '',
          actualstage: formValues.stage || '',
          message: formValues.message || '',
        },
      },
    ],
    from: SG_FROM,
    template_id: settings.templateId,
    categories: ['contactform'],
  };

  const response = await fetch(`${SENDGRID_API_BASE}/mail/send`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    logger.error('SendGrid contact email API error', {
      status: response.status,
      error,
      recipientEmail: formValues.email,
    });
    throw new Error(`SendGrid email error: ${response.status} - ${error}`);
  }

  logger.info('Contact welcome email sent successfully via SendGrid', {
    to: formValues.email,
    templateId: settings.templateId,
  });

  return { success: true };
}

/**
 * Subscribe an email address to one or more SendGrid marketing lists.
 * Ported from the old AWS Lambda newsletter `addNewsletterSubscriber`.
 *
 * @param {Object} params
 * @param {string} params.email - Subscriber email
 * @param {string|string[]} params.listIds - One or more SendGrid list IDs
 * @param {string} apiKey - SendGrid API key
 * @param {Object} logger - Logger instance (optional)
 */
export async function subscribeToLists({ email, listIds }, apiKey, logger = null) {
  if (!logger) {
    logger = createLogger('sendgrid', {}, null);
  }

  // Normalise to an array (old behaviour: accept single id or array)
  const list_ids = Array.isArray(listIds) ? listIds : [listIds];

  logger.debug('Subscribing contact to SendGrid list(s)', {
    email,
    listIds: list_ids,
  });

  const payload = {
    list_ids,
    contacts: [{ email }],
  };

  const response = await fetch(`${SENDGRID_API_BASE}/marketing/contacts`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    logger.error('SendGrid newsletter subscribe API error', {
      status: response.status,
      error,
      email,
    });
    throw new Error(`SendGrid list error: ${response.status} - ${error}`);
  }

  const result = await response.json();
  logger.info('Contact subscribed to SendGrid list(s) successfully', {
    email,
    listIds: list_ids,
    jobId: result.job_id,
  });

  return { success: true, jobId: result.job_id };
}
