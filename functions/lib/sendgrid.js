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

// Internal address whose deliverability we guarantee: any message reaching it
// bypasses all SendGrid suppression lists and never carries an unsubscribe
// mechanism (see applyGuaranteedDelivery). This is our own internal notification
// address, so guaranteed internal delivery is the intended, compliant behaviour.
const SALES_INTERNAL_EMAIL = 'sales@floragunn.com';

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
 * Remove any custom List-Unsubscribe / List-Unsubscribe-Post entries from a
 * SendGrid `headers` object (case-insensitive), in place.
 */
function stripUnsubscribeHeaders(headers) {
  if (!headers || typeof headers !== 'object') return;
  for (const key of Object.keys(headers)) {
    const k = key.toLowerCase();
    if (k === 'list-unsubscribe' || k === 'list-unsubscribe-post') {
      delete headers[key];
    }
  }
}

/**
 * Guarantee delivery to sales@floragunn.com.
 *
 * If sales@ is a recipient (to/cc/bcc) of the given payload, force the message
 * to ignore every SendGrid suppression list and to never carry an unsubscribe
 * mechanism. These are all REQUEST-level settings in the v3 Mail Send API — they
 * cannot be scoped to a single recipient — which is why the contact email sends
 * sales@ its own dedicated request (see buildContactWelcomePayloads) so external
 * recipients are never affected. This function is a no-op for any payload that
 * does not include sales@. Mutates and returns the payload.
 */
function applyGuaranteedDelivery(payload) {
  const personalizations = payload.personalizations || [];
  const reachesSales = personalizations.some((p) =>
    ['to', 'cc', 'bcc'].some((field) =>
      (p[field] || []).some(
        (r) => (r.email || '').toLowerCase() === SALES_INTERNAL_EMAIL
      )
    )
  );
  if (!reachesSales) return payload;

  // 1. Ignore ALL suppression lists (unsubscribes, bounces, spam reports,
  //    blocks, invalid). Must be used alone — not combined with granular
  //    bypass_* filters.
  payload.mail_settings = {
    ...payload.mail_settings,
    bypass_list_management: { enable: true },
  };
  // 2. Never auto-inject an unsubscribe footer or List-Unsubscribe header.
  payload.tracking_settings = {
    ...payload.tracking_settings,
    subscription_tracking: { enable: false },
  };
  // 3. Never attach an ASM unsubscribe group.
  delete payload.asm;
  // 5. Drop any custom List-Unsubscribe headers (message- and per-personalization).
  stripUnsubscribeHeaders(payload.headers);
  personalizations.forEach((p) => stripUnsubscribeHeaders(p.headers));
  // 4. No "[unsubscribe]" substitution tag is ever added in code; if one lives
  //    inside a SendGrid dynamic template it must be removed in the SendGrid UI.

  return payload;
}

/**
 * POST a prepared payload to the SendGrid v3 Mail Send API. Throws on a non-2xx
 * response. `description` is used only for logging/error context.
 */
async function postMailSend(payload, apiKey, logger, description = 'mail/send') {
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
    logger.error('SendGrid mail/send API error', {
      status: response.status,
      error,
      description,
    });
    throw new Error(`SendGrid ${description}: ${response.status} - ${error}`);
  }

  logger.debug('SendGrid mail/send accepted', { description });
  return { success: true };
}

/**
 * Build the SendGrid v3 mail/send request payload(s) for a contact-form
 * submission. Pure and synchronous, so the payloads can be inspected/unit-tested
 * without sending anything.
 *
 * Returns one or two requests:
 *  1. Primary copy — TO the form-filler, partner addresses BCC'd. Identical to
 *     the previous single send except sales@ is removed from the BCC list.
 *  2. Guaranteed sales@ copy — a dedicated request addressed TO sales@, run
 *     through applyGuaranteedDelivery (bypass suppression, no unsubscribe).
 *     Only produced when sales@ is in the country's routing BCC list.
 *
 * Splitting sales@ into its own request is required because bypass_list_management
 * and subscription_tracking are request-level: they cannot be applied to just the
 * BCC without also changing the form-filler's copy.
 *
 * @param {Object} formValues - Raw contact form values (snake_case field names)
 * @returns {Array<{ description: string, payload: Object }>}
 */
export function buildContactWelcomePayloads(formValues) {
  const countryCode = countryNameToCode(formValues.country);
  const settings = contactCountrySettings(countryCode);

  // NOTE: In the SendGrid v3 Mail Send REST API, `dynamic_template_data` must
  // live *inside* each personalization object (the old @sendgrid/mail helper
  // hoisted a top-level one automatically; the raw REST API does not).
  const dynamicTemplateData = {
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
  };

  const common = {
    from: SG_FROM,
    template_id: settings.templateId,
    categories: ['contactform'],
  };

  // Split sales@ out of the routing BCC list: it gets its own guaranteed request,
  // the remaining partner addresses stay BCC'd on the form-filler's copy.
  const salesBcc = settings.bcc.filter(
    (e) => e.toLowerCase() === SALES_INTERNAL_EMAIL
  );
  const partnerBcc = settings.bcc.filter(
    (e) => e.toLowerCase() !== SALES_INTERNAL_EMAIL
  );

  const payloads = [];

  // 1. Primary copy: form-filler + partner BCCs (behaviour unchanged).
  const primaryPersonalization = {
    to: [
      {
        email: formValues.email,
        name: `${formValues.first_name} ${formValues.last_name}`,
      },
    ],
    dynamic_template_data: dynamicTemplateData,
  };
  if (partnerBcc.length) {
    primaryPersonalization.bcc = partnerBcc.map((email) => ({ email }));
  }
  // No-op unless the form-filler themselves entered sales@ as their address.
  payloads.push({
    description: 'contact welcome (form-filler + partners)',
    payload: applyGuaranteedDelivery({
      personalizations: [primaryPersonalization],
      ...common,
    }),
  });

  // 2. Dedicated guaranteed copy addressed TO sales@.
  if (salesBcc.length) {
    payloads.push({
      description: 'contact welcome (guaranteed sales@ copy)',
      payload: applyGuaranteedDelivery({
        personalizations: [
          {
            to: salesBcc.map((email) => ({ email })),
            dynamic_template_data: dynamicTemplateData,
          },
        ],
        ...common,
      }),
    });
  }

  return payloads;
}

/**
 * Send the contact-form "welcome" email with country-based template and partner
 * routing. Sends the form-filler copy (partners BCC'd) and, as a separate
 * request, a guaranteed copy to sales@ (see buildContactWelcomePayloads).
 *
 * @param {Object} formValues - Raw contact form values (snake_case field names)
 * @param {string} apiKey - SendGrid API key
 * @param {Object} logger - Logger instance (optional)
 */
export async function sendContactWelcomeEmail(formValues, apiKey, logger = null) {
  if (!logger) {
    logger = createLogger('sendgrid', {}, null);
  }

  const payloads = buildContactWelcomePayloads(formValues);

  logger.debug('Contact welcome email routing resolved', {
    country: formValues.country,
    requests: payloads.length,
    templateId: payloads[0]?.payload.template_id,
  });

  const results = await Promise.allSettled(
    payloads.map(({ payload, description }) =>
      postMailSend(payload, apiKey, logger, description)
    )
  );

  const failures = results
    .map((r, i) => ({ r, description: payloads[i].description }))
    .filter(({ r }) => r.status === 'rejected');

  if (failures.length) {
    const detail = failures
      .map(({ r, description }) => `${description}: ${r.reason?.message || r.reason}`)
      .join('; ');
    logger.error('SendGrid contact email failed', {
      failed: failures.length,
      total: payloads.length,
      detail,
    });
    throw new Error(`SendGrid contact email error: ${detail}`);
  }

  logger.info('Contact welcome email sent successfully via SendGrid', {
    to: formValues.email,
    requests: payloads.length,
  });

  return { success: true };
}

/**
 * Send a plain-text email with an arbitrary subject and body (no template).
 *
 * Used by the uptime webhook to forward raw monitoring payloads. Uses the
 * Mail Send scope key (SENDGRID_SENDMAIL_KEY), same as the contact email.
 *
 * @param {Object} params
 * @param {string} params.to - Recipient email address
 * @param {string} params.subject - Email subject line
 * @param {string} params.text - Plain-text email body
 * @param {string|Object} [params.from] - Sender override; an email string or a
 *   { email, name } object. Defaults to the shared SG_FROM (sales@floragunn.com).
 * @param {string} apiKey - SendGrid API key (Mail Send scope)
 * @param {Object} logger - Logger instance (optional)
 */
export async function sendRawEmail({ to, subject, text, from }, apiKey, logger = null) {
  if (!logger) {
    logger = createLogger('sendgrid', {}, null);
  }

  // Normalise the sender: accept a plain email string, a { email, name } object,
  // or nothing (fall back to the shared sender identity).
  let fromField = SG_FROM;
  if (typeof from === 'string' && from) {
    fromField = { email: from };
  } else if (from && typeof from === 'object' && from.email) {
    fromField = from;
  }

  // applyGuaranteedDelivery is a no-op unless `to` is sales@ (current callers
  // send to uptime@); it future-proofs the guarantee for any recipient.
  const payload = applyGuaranteedDelivery({
    personalizations: [{ to: [{ email: to }] }],
    from: fromField,
    subject,
    content: [{ type: 'text/plain', value: text }],
  });

  await postMailSend(payload, apiKey, logger, `raw email to ${to}`);

  logger.info('Raw email sent successfully via SendGrid', { to, subject });

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
