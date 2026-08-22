/**
 * Zoho CRM Integration Helper Functions
 *
 * Handles creating contacts and accounts in Zoho CRM with appropriate labels/tags.
 */

import { createLogger } from './logger.js';

// Default to the US data center. Override per-environment with ZOHO_DC
// (see resolveZohoHosts) — Zoho accounts are region-pinned and OAuth clients
// only validate against the data center they were registered in.
const ZOHO_API_BASE = 'https://www.zohoapis.com/crm/v3';
const ZOHO_ACCOUNTS_BASE = 'https://accounts.zoho.com/oauth/v2/token';

/**
 * Resolve the Zoho API + OAuth hosts for a given data center.
 * @param {string} dc - Data center code: US | EU | IN | AU | JP (default US)
 * @returns {{ apiBase: string, accountsBase: string }}
 */
export function resolveZohoHosts(dc) {
  // TLD suffix per Zoho data center.
  const suffixes = {
    US: 'com',
    EU: 'eu',
    IN: 'in',
    AU: 'com.au',
    JP: 'jp',
  };
  const suffix = suffixes[(dc || 'US').toUpperCase()] || 'com';
  return {
    apiBase: `https://www.zohoapis.${suffix}/crm/v3`,
    accountsBase: `https://accounts.zoho.${suffix}/oauth/v2/token`,
  };
}

/**
 * Sanitize a value for use inside a Zoho CRM search `criteria` expression.
 *
 * Zoho criteria have the grammar `(field:operator:value)` and treat the
 * characters `(` `)` `,` `:` as structural, with no documented way to escape
 * them inside a value. A raw value containing any of them (e.g. a company name
 * like "Acme (EMEA)" or "Foo, Inc.") produces an INVALID_QUERY (400) and fails
 * the whole lookup. We neutralize those characters (and collapse whitespace) so
 * the search is well-formed. Worst case the sanitized value no longer matches an
 * existing record and a new one is created — acceptable for a contact form, and
 * far better than failing the CRM write. The record is still created with the
 * original, unsanitized value.
 *
 * @param {string} value
 * @returns {string}
 */
function sanitizeCriteriaValue(value) {
  return String(value == null ? '' : value)
    .replace(/[(),:]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * True when a Zoho field value is considered empty (null/undefined/blank).
 * Used by the backfill-only update helpers so we never overwrite existing data.
 * @param {*} value
 * @returns {boolean}
 */
function isBlank(value) {
  return value == null || String(value).trim() === '';
}

/**
 * Search for a contact by email
 * @param {string} email - Email address to search for
 * @param {string} accessToken - Zoho CRM access token
 * @param {Object} logger - Logger instance (optional)
 * @returns {Object|null} Contact record if found, null otherwise
 */
export async function searchContactByEmail(email, accessToken, logger = null, apiBase = ZOHO_API_BASE) {
  // Create a default logger if none provided
  if (!logger) {
    logger = createLogger('zoho', {}, null);
  }

  logger.debug('Searching for contact by email', { email });

  // Use Zoho search API with email criteria
  const searchCriteria = `(Email:equals:${sanitizeCriteriaValue(email)})`;
  const url = `${apiBase}/Contacts/search?criteria=${encodeURIComponent(searchCriteria)}`;

  logger.debug('Sending search request to Zoho CRM', { url: url.replace(accessToken, '***') });

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  // 204 No Content means no records found (this is a successful response with no body)
  if (response.status === 204) {
    logger.debug('No contact found with email', { email });
    return null;
  }

  if (!response.ok) {
    const error = await response.text();
    logger.error('Zoho contact search error', {
      status: response.status,
      error,
      email,
    });
    throw new Error(`Zoho contact search error: ${response.status} - ${error}`);
  }

  const result = await response.json();

  if (result.data && result.data.length > 0) {
    logger.info('Contact found', {
      email,
      contactId: result.data[0].id,
    });
    return {
      id: result.data[0].id,
      ...result.data[0],
    };
  }

  logger.debug('No contact found with email', { email });
  return null;
}

/**
 * Search for an account by account name
 * @param {string} accountName - Account name to search for
 * @param {string} accessToken - Zoho CRM access token
 * @param {Object} logger - Logger instance (optional)
 * @returns {Object|null} Account record if found, null otherwise
 */
export async function searchAccountByName(accountName, accessToken, logger = null, apiBase = ZOHO_API_BASE) {
  // Create a default logger if none provided
  if (!logger) {
    logger = createLogger('zoho', {}, null);
  }

  logger.debug('Searching for account by name', { accountName });

  // Use Zoho search API with account name criteria
  const searchCriteria = `(Account_Name:equals:${sanitizeCriteriaValue(accountName)})`;
  const url = `${apiBase}/Accounts/search?criteria=${encodeURIComponent(searchCriteria)}`;

  logger.debug('Sending search request to Zoho CRM', { url: url.replace(accessToken, '***') });

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  // 204 No Content means no records found (this is a successful response with no body)
  if (response.status === 204) {
    logger.debug('No account found with name', { accountName });
    return null;
  }

  if (!response.ok) {
    const error = await response.text();
    logger.error('Zoho account search error', {
      status: response.status,
      error,
      accountName,
    });
    throw new Error(`Zoho account search error: ${response.status} - ${error}`);
  }

  const result = await response.json();

  if (result.data && result.data.length > 0) {
    logger.info('Account found', {
      accountName,
      accountId: result.data[0].id,
    });
    return {
      id: result.data[0].id,
      ...result.data[0],
    };
  }

  logger.debug('No account found with name', { accountName });
  return null;
}

/**
 * Create a contact in Zoho CRM. Field mapping:
 * First_Name, Last_Name, Email, Title (job title), Phone,
 * Mailing_Country (country), Newsletter (opt-in).
 * The company relationship is established via linkContactToAccount, and the
 * submission message is stored as a Note (see addNoteToContact) rather than a
 * field, so it is preserved for existing contacts too.
 * @param {Object} contactData - Contact information
 * @param {string} contactData.firstName - First name
 * @param {string} contactData.lastName - Last name
 * @param {string} contactData.email - Email address
 * @param {string} contactData.phone - Phone number -> Phone (optional)
 * @param {string} contactData.jobTitle - Job title -> Title (optional)
 * @param {string} contactData.country - Country -> Mailing_Country (optional)
 * @param {boolean} contactData.newsletter - Newsletter opt-in flag
 * @param {string} accessToken - Zoho CRM access token
 * @param {Object} logger - Logger instance (optional)
 * @param {string} apiBase - Zoho CRM API base URL (optional)
 */
export async function createContact(contactData, accessToken, logger = null, apiBase = ZOHO_API_BASE) {
  // Create a default logger if none provided
  if (!logger) {
    logger = createLogger('zoho', {}, null);
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    jobTitle,
    country,
    newsletter,
  } = contactData;

  logger.debug('Creating Zoho contact', {
    email,
    hasAccessToken: !!accessToken,
    accessTokenLength: accessToken?.length || 0,
    accessTokenPrefix: accessToken ? accessToken.substring(0, 10) + '...' : 'MISSING',
  });

  const payload = {
    data: [
      {
        First_Name: firstName,
        Last_Name: lastName,
        Email: email,
        ...(phone && { Phone: phone }),
        ...(jobTitle && { Title: jobTitle }),
        ...(country && { Mailing_Country: country }),
        Newsletter: !!newsletter,
      }
    ],
    trigger: [],
  };

  logger.debug('Sending request to Zoho CRM Contacts API', {
    url: `${apiBase}/Contacts`,
    method: 'POST',
  });

  const response = await fetch(`${apiBase}/Contacts`, {
    method: 'POST',
    headers: {
      'Authorization': `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    logger.error('Zoho Contact creation API error', {
      status: response.status,
      error,
    });
    throw new Error(`Zoho Contact creation error: ${response.status} - ${error}`);
  }

  const result = await response.json();
  logger.debug('Zoho Contact API response received', { result });

  if (result.data && result.data[0].code === 'SUCCESS') {
    logger.info('Zoho contact created successfully', {
      contactId: result.data[0].details.id,
      email,
    });
    return {
      success: true,
      contactId: result.data[0].details.id,
      message: result.data[0].message,
    };
  } else if (result.data && result.data[0].code === 'DUPLICATE_DATA') {
    // Contact already exists, return existing ID
    logger.info('Zoho contact already exists', {
      contactId: result.data[0].details.id,
      email,
    });
    return {
      success: true,
      contactId: result.data[0].details.id,
      message: 'Contact already exists',
      isDuplicate: true,
    };
  } else {
    logger.error('Zoho Contact creation failed with unexpected response', { result });
    throw new Error(`Zoho Contact creation failed: ${JSON.stringify(result)}`);
  }
}

/**
 * Backfill selected profile fields on an existing Zoho contact.
 *
 * Used when a submission is deduplicated onto a contact that already exists
 * (createContact is skipped in that case, so its field mapping never runs).
 * This is **backfill-only**: a field is written only when the incoming value is
 * non-empty AND the existing record has no value there. Existing values are
 * never overwritten, and curated data (First/Last name, Newsletter opt-in) is
 * never touched — a web form must not clobber names, revoke a newsletter
 * opt-in, or change data a person already has on file.
 *
 * @param {string} contactId - Zoho contact id
 * @param {Object} incoming - Incoming form values
 * @param {string} incoming.phone - Phone number -> Phone (optional)
 * @param {string} incoming.jobTitle - Job title -> Title (optional)
 * @param {string} incoming.country - Country -> Mailing_Country (optional)
 * @param {Object} existing - The existing Zoho contact record (from search)
 * @param {string} accessToken - Zoho CRM access token
 * @param {Object} logger - Logger instance (optional)
 * @param {string} apiBase - Zoho CRM API base URL (optional)
 */
export async function updateContact(contactId, incoming = {}, existing = {}, accessToken, logger = null, apiBase = ZOHO_API_BASE) {
  if (!logger) {
    logger = createLogger('zoho', {}, null);
  }

  const { phone, jobTitle, country } = incoming;

  // Backfill-only: write a field solely when we have an incoming value AND the
  // existing record's field is currently empty.
  const fields = {
    ...(phone && isBlank(existing.Phone) && { Phone: phone }),
    ...(jobTitle && isBlank(existing.Title) && { Title: jobTitle }),
    ...(country && isBlank(existing.Mailing_Country) && { Mailing_Country: country }),
  };

  if (Object.keys(fields).length === 0) {
    logger.debug('No empty contact fields to backfill; skipping', { contactId });
    return { success: true, skipped: true };
  }

  logger.debug('Backfilling empty Zoho contact fields', {
    contactId,
    fields: Object.keys(fields),
  });

  const payload = {
    data: [{ id: contactId, ...fields }],
    trigger: [],
  };

  const response = await fetch(`${apiBase}/Contacts`, {
    method: 'PUT',
    headers: {
      'Authorization': `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    logger.error('Zoho Contact update API error', {
      status: response.status,
      error,
      contactId,
    });
    throw new Error(`Zoho Contact update error: ${response.status} - ${error}`);
  }

  const result = await response.json();
  const success = result.data && result.data[0].code === 'SUCCESS';
  if (success) {
    logger.info('Zoho contact fields backfilled successfully', {
      contactId,
      fields: Object.keys(fields),
    });
  } else {
    logger.warn('Zoho contact update had unexpected result', { result, contactId });
  }
  return { success };
}

/**
 * Backfill Billing_Country on an existing Zoho account.
 *
 * Backfill-only, symmetric to updateContact: the account's Billing_Country is
 * set only when the submission carries a country AND the account doesn't already
 * have one. An account is company-level data shared across contacts, so a single
 * submitter must never overwrite a curated billing country.
 *
 * @param {string} accountId - Zoho account id
 * @param {Object} incoming - Incoming form values
 * @param {string} incoming.country - Country -> Billing_Country (optional)
 * @param {Object} existing - The existing Zoho account record (from search)
 * @param {string} accessToken - Zoho CRM access token
 * @param {Object} logger - Logger instance (optional)
 * @param {string} apiBase - Zoho CRM API base URL (optional)
 */
export async function updateAccount(accountId, incoming = {}, existing = {}, accessToken, logger = null, apiBase = ZOHO_API_BASE) {
  if (!logger) {
    logger = createLogger('zoho', {}, null);
  }

  const { country } = incoming;

  const fields = {
    ...(country && isBlank(existing.Billing_Country) && { Billing_Country: country }),
  };

  if (Object.keys(fields).length === 0) {
    logger.debug('No empty account fields to backfill; skipping', { accountId });
    return { success: true, skipped: true };
  }

  logger.debug('Backfilling empty Zoho account fields', {
    accountId,
    fields: Object.keys(fields),
  });

  const payload = {
    data: [{ id: accountId, ...fields }],
    trigger: [],
  };

  const response = await fetch(`${apiBase}/Accounts`, {
    method: 'PUT',
    headers: {
      'Authorization': `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    logger.error('Zoho Account update API error', {
      status: response.status,
      error,
      accountId,
    });
    throw new Error(`Zoho Account update error: ${response.status} - ${error}`);
  }

  const result = await response.json();
  const success = result.data && result.data[0].code === 'SUCCESS';
  if (success) {
    logger.info('Zoho account fields backfilled successfully', {
      accountId,
      fields: Object.keys(fields),
    });
  } else {
    logger.warn('Zoho account update had unexpected result', { result, accountId });
  }
  return { success };
}

/**
 * Create an account in Zoho CRM. Field mapping mirrors the old AWS Lambda:
 * Account_Name (company) and Billing_Country (country). Other legacy fields
 * (website/address/version/stage) are not collected by the current forms.
 * @param {Object} accountData - Account information
 * @param {string} accountData.accountName - Account/Company name
 * @param {string} accountData.country - Country -> Billing_Country (optional)
 * @param {string} accessToken - Zoho CRM access token
 * @param {Object} logger - Logger instance (optional)
 * @param {string} apiBase - Zoho CRM API base URL (optional)
 */
export async function createAccount(accountData, accessToken, logger = null, apiBase = ZOHO_API_BASE) {
  // Create a default logger if none provided
  if (!logger) {
    logger = createLogger('zoho', {}, null);
  }

  const {
    accountName,
    country,
  } = accountData;

  logger.debug('Creating Zoho account', {
    accountName,
    country,
  });

  const payload = {
    data: [
      {
        Account_Name: accountName,
        ...(country && { Billing_Country: country }),
      }
    ],
    trigger: [],
  };

  logger.debug('Sending request to Zoho CRM Accounts API', {
    url: `${apiBase}/Accounts`,
    method: 'POST',
  });

  const response = await fetch(`${apiBase}/Accounts`, {
    method: 'POST',
    headers: {
      'Authorization': `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    logger.error('Zoho Account creation API error', {
      status: response.status,
      error,
    });
    throw new Error(`Zoho Account creation error: ${response.status} - ${error}`);
  }

  const result = await response.json();
  logger.debug('Zoho Account API response received', { result });

  if (result.data && result.data[0].code === 'SUCCESS') {
    logger.info('Zoho account created successfully', {
      accountId: result.data[0].details.id,
      accountName,
    });
    return {
      success: true,
      accountId: result.data[0].details.id,
      message: result.data[0].message,
    };
  } else if (result.data && result.data[0].code === 'DUPLICATE_DATA') {
    logger.info('Zoho account already exists', {
      accountId: result.data[0].details.id,
      accountName,
    });
    return {
      success: true,
      accountId: result.data[0].details.id,
      message: 'Account already exists',
      isDuplicate: true,
    };
  } else {
    logger.error('Zoho Account creation failed with unexpected response', { result });
    throw new Error(`Zoho Account creation failed: ${JSON.stringify(result)}`);
  }
}

/**
 * Attach a Note (the submission message) to a contact. Works for both newly
 * created and pre-existing contacts, so every submission's message is preserved
 * even when the contact is deduplicated by email.
 * @param {string} contactId - Zoho contact id
 * @param {Object} note - Note content
 * @param {string} note.title - Note title
 * @param {string} note.content - Note body
 * @param {string} accessToken - Zoho CRM access token
 * @param {Object} logger - Logger instance (optional)
 * @param {string} apiBase - Zoho CRM API base URL (optional)
 */
export async function addNoteToContact(contactId, { title, content }, accessToken, logger = null, apiBase = ZOHO_API_BASE) {
  // Create a default logger if none provided
  if (!logger) {
    logger = createLogger('zoho', {}, null);
  }

  logger.debug('Attaching note to Zoho contact', { contactId });

  const payload = {
    data: [
      {
        Note_Title: title,
        Note_Content: content,
      },
    ],
  };

  const response = await fetch(`${apiBase}/Contacts/${contactId}/Notes`, {
    method: 'POST',
    headers: {
      'Authorization': `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    logger.error('Zoho Note creation API error', {
      status: response.status,
      error,
      contactId,
    });
    throw new Error(`Zoho Note creation error: ${response.status} - ${error}`);
  }

  const result = await response.json();
  const success = result.data && result.data[0].code === 'SUCCESS';
  if (success) {
    logger.info('Note attached to Zoho contact successfully', {
      contactId,
      noteId: result.data[0].details?.id,
    });
  } else {
    logger.warn('Zoho note creation had unexpected result', { result, contactId });
  }
  return { success };
}

/**
 * Link a contact to an account in Zoho CRM
 * @param {string} contactId - Zoho contact ID
 * @param {string} accountId - Zoho account ID
 * @param {string} accessToken - Zoho CRM access token
 * @param {Object} logger - Logger instance (optional)
 */
export async function linkContactToAccount(contactId, accountId, accessToken, logger = null, apiBase = ZOHO_API_BASE) {
  // Create a default logger if none provided
  if (!logger) {
    logger = createLogger('zoho', {}, null);
  }

  logger.debug('Linking Zoho contact to account', {
    contactId,
    accountId,
  });

  const payload = {
    data: [
      {
        id: contactId,
        Account_Name: {
          id: accountId
        }
      }
    ]
  };

  const response = await fetch(`${apiBase}/Contacts`, {
    method: 'PUT',
    headers: {
      'Authorization': `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    logger.error('Zoho Contact-Account linking API error', {
      status: response.status,
      error,
      contactId,
      accountId,
    });
    throw new Error(`Zoho Contact-Account linking error: ${response.status} - ${error}`);
  }

  const result = await response.json();
  const success = result.data && result.data[0].code === 'SUCCESS';

  if (success) {
    logger.info('Zoho contact linked to account successfully', {
      contactId,
      accountId,
    });
  } else {
    logger.warn('Zoho contact-account linking had unexpected result', {
      result,
      contactId,
      accountId,
    });
  }

  return { success };
}

/**
 * Refresh Zoho OAuth access token using refresh token
 * @param {string} refreshToken - Zoho refresh token
 * @param {string} clientId - Zoho OAuth client ID
 * @param {string} clientSecret - Zoho OAuth client secret
 * @param {Object} logger - Logger instance (optional)
 */
export async function refreshAccessToken(refreshToken, clientId, clientSecret, logger = null, accountsBase = ZOHO_ACCOUNTS_BASE) {
  // Create a default logger if none provided
  if (!logger) {
    logger = createLogger('zoho', {}, null);
  }

  logger.debug('Refreshing Zoho access token');

  const params = new URLSearchParams({
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'refresh_token',
  });

  const response = await fetch(`${accountsBase}?${params}`, {
    method: 'POST',
  });

  logger.debug('Zoho token refresh response received', {
    status: response.status,
    ok: response.ok,
  });

  if (!response.ok) {
    const error = await response.text();
    logger.error('Zoho token refresh error', {
      status: response.status,
      error,
    });
    throw new Error(`Zoho token refresh error: ${response.status} - ${error}`);
  }

  const result = await response.json();
  logger.debug('Zoho token refresh response body', {
    hasAccessToken: !!result.access_token,
    accessTokenLength: result.access_token?.length || 0,
    expiresIn: result.expires_in,
    fullResponse: result,
  });

  // Zoho returns 200 OK even for errors, so we need to check the response body
  if (result.error) {
    logger.error('Zoho token refresh failed with error in response', {
      error: result.error,
      errorDescription: result.error_description,
      fullResponse: result,
    });

    const errorMessages = {
      'invalid_client': 'Invalid Zoho Client ID or Client Secret. Please check ZOHO_CLIENT_ID and ZOHO_CLIENT_SECRET environment variables.',
      'invalid_code': 'Invalid or expired refresh token. Please regenerate ZOHO_REFRESH_TOKEN.',
      'invalid_grant': 'Invalid refresh token. Please regenerate ZOHO_REFRESH_TOKEN.',
    };

    const message = errorMessages[result.error] || `Zoho OAuth error: ${result.error}`;
    throw new Error(message);
  }

  if (!result.access_token) {
    logger.error('Zoho token refresh succeeded but no access token in response', { result });
    throw new Error('Zoho token refresh failed: No access token in response');
  }

  logger.info('Zoho access token refreshed successfully', {
    expiresIn: result.expires_in,
    tokenLength: result.access_token.length,
  });

  return {
    accessToken: result.access_token,
    expiresIn: result.expires_in,
  };
}
