/**
 * Cloudflare Pages Function - Contact Form Submission
 *
 * Endpoint: /api/contact
 * Method: POST
 *
 * Replaces the old AWS Lambda "sg-contact-form" endpoint
 * (56dmarth25.execute-api.eu-central-1.amazonaws.com).
 *
 * Accepts the snake_case fields sent by the website contact forms:
 *   Required: first_name, last_name, email, company, message
 *   Required: cf-turnstile-response (Cloudflare Turnstile token, injected
 *             into the form by the Turnstile widget)
 *   Optional: job_position, phone, country, newsletter
 *
 * Handles a submission by (in parallel):
 * 1. Sending a Matrix room notification
 * 2. Sending the country-routed welcome email via SendGrid (with partner BCCs)
 * 3. Adding the contact to a SendGrid marketing list
 * 4. Creating/deduplicating contact + account in Zoho CRM
 */

import { sendContactWelcomeEmail, addContactToList } from '../lib/sendgrid.js';
import {
  createContact,
  updateContact,
  createAccount,
  updateAccount,
  linkContactToAccount,
  addNoteToContact,
  refreshAccessToken,
  searchContactByEmail,
  searchAccountByName,
  resolveZohoHosts,
} from '../lib/zoho.js';
import { sendMatrixNotification } from '../lib/matrix.js';
import { validateTurnstile } from '../lib/turnstile.js';
import { createLogger, sanitizeForLogging } from '../lib/logger.js';

export async function onRequestPost(context) {
  const { request, env } = context;

  // Initialize logger
  const logger = createLogger('contact-api', env, request);
  logger.logEnvironmentInfo();

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    logger.debug('Handling CORS preflight request');
    return new Response(null, { headers: corsHeaders });
  }

  logger.info('Contact form request received', {
    method: request.method,
    url: request.url,
    userAgent: request.headers.get('user-agent'),
    referer: request.headers.get('referer'),
  });

  try {
    // Parse request body
    const body = await request.json();
    logger.debug('Request body parsed', sanitizeForLogging(body));

    const {
      first_name,
      last_name,
      email,
      company,
      message,
    } = body;

    // ---------------------------------------------------------------------
    // Spam protection: Cloudflare Turnstile server-side token validation
    // (replaces the old heuristic spam check ported from the AWS Lambda).
    // The Turnstile widget on the contact forms injects a hidden
    // `cf-turnstile-response` input into the form, and the token must be
    // verified with the /siteverify API before the submission is processed.
    // Deliberately cryptic errors are returned so bots get no useful signal.
    // ---------------------------------------------------------------------
    const visitorCountry = request.headers.get('CF-IPCountry') || '';

    const turnstileResult = await validateTurnstile({
      token: body['cf-turnstile-response'],
      secretKey: env.TURNSTILE_SECRET_KEY,
      remoteIp: request.headers.get('CF-Connecting-IP'),
      logger,
    });

    if (!turnstileResult.ok) {
      // 0x7d = server-side problem (missing config / verify API unreachable),
      // 0x7c = the submission itself failed the challenge.
      const crypticCode =
        turnstileResult.reason === 'config' || turnstileResult.reason === 'verify-error'
          ? '0x7d'
          : '0x7c';
      logger.warn('Submission rejected by Turnstile', {
        reason: turnstileResult.reason,
        visitorCountry,
        email,
      });
      return new Response(JSON.stringify(`INVALID FORMAT ${crypticCode}`), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate required fields
    if (!first_name || !last_name || !email || !company || !message) {
      logger.warn('Validation failed: missing required fields', {
        first_name: !!first_name,
        last_name: !!last_name,
        email: !!email,
        company: !!company,
        message: !!message,
      });
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    logger.debug('Required fields validation passed');

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      logger.warn('Validation failed: invalid email format', { email });
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    logger.debug('Email format validation passed');

    logger.info('Starting parallel execution of integrations', {
      email,
      company,
      country: body.country,
      visitorCountry,
    });

    // Parallel execution of all integrations for better performance
    const results = await Promise.allSettled([
      // 1. Send notification to Matrix room
      sendMatrixNotification(
        {
          first_name,
          last_name,
          email,
          company,
          country: body.country,
          message,
        },
        'contact',
        env.MATRIX_ROOM_ID,
        env.MATRIX_SERVER_URL,
        env.MATRIX_TOKEN,
        logger
      ),

      // 2. Send the country-routed welcome email via SendGrid (Mail Send scope)
      sendContactWelcomeEmail(body, env.SENDGRID_SENDMAIL_KEY, logger),

      // 3. Add to SendGrid marketing list (Marketing scope)
      addContactToList(
        {
          email,
          firstName: first_name,
          lastName: last_name,
          customFields: {
            company,
          },
        },
        env.SENDGRID_CONTACT_LIST_ID,
        env.SENDGRID_MARKETING_KEY,
        logger
      ),

      // 4. Create contact and account in Zoho CRM
      (async () => {
        // Resolve the Zoho data center hosts (ZOHO_DC: US | EU | IN | AU | JP)
        const { apiBase, accountsBase } = resolveZohoHosts(env.ZOHO_DC);

        // Normalize the newsletter opt-in checkbox: the plain forms submit "on"
        // when checked, ContactFormSuperSlim submits a boolean.
        const newsletterOptIn =
          body.newsletter === 'on' || body.newsletter === 'true' || body.newsletter === true;

        // Refresh Zoho access token
        const { accessToken } = await refreshAccessToken(
          env.ZOHO_REFRESH_TOKEN,
          env.ZOHO_CLIENT_ID,
          env.ZOHO_CLIENT_SECRET,
          logger,
          accountsBase
        );

        // Search for existing contact by email. The search returns the full
        // record, which we keep so the backfill below can tell which fields are
        // still empty.
        let contactRecord = await searchContactByEmail(email, accessToken, logger, apiBase);
        let contactResult;

        if (contactRecord) {
          logger.info('Using existing contact', {
            contactId: contactRecord.id,
            email,
          });
          contactResult = {
            success: true,
            contactId: contactRecord.id,
            message: 'Contact already exists',
            isExisting: true,
          };
        } else {
          // Create new contact. On a brand-new record every field is empty, so
          // createContact writes the full mapping (names, phone, title, mailing
          // country, newsletter).
          contactResult = await createContact(
            {
              firstName: first_name,
              lastName: last_name,
              email,
              phone: body.phone,
              jobTitle: body.job_position,
              country: body.country,
              newsletter: newsletterOptIn,
            },
            accessToken,
            logger,
            apiBase
          );

          // Rare: the email search missed but Zoho rejected the create as a
          // duplicate. Re-fetch the record so the backfill can see which fields
          // are already populated.
          if (contactResult.isDuplicate) {
            contactRecord = await searchContactByEmail(email, accessToken, logger, apiBase);
          }
        }

        // Backfill-only update for an existing contact: fill Phone / Title /
        // Mailing_Country ONLY where the record currently has no value. Never
        // overwrite existing values, names, or the newsletter opt-in.
        if (contactRecord && contactResult.contactId) {
          await updateContact(
            contactResult.contactId,
            {
              phone: body.phone,
              jobTitle: body.job_position,
              country: body.country,
            },
            contactRecord,
            accessToken,
            logger,
            apiBase
          );
        }

        // Search for existing account by company name (full record retained so
        // we can tell whether Billing_Country is already set).
        let accountRecord = await searchAccountByName(company, accessToken, logger, apiBase);
        let accountResult;

        if (accountRecord) {
          logger.info('Using existing account', {
            accountId: accountRecord.id,
            accountName: company,
          });
          accountResult = {
            success: true,
            accountId: accountRecord.id,
            message: 'Account already exists',
            isExisting: true,
          };
        } else {
          // Create new account (Billing_Country written on the fresh record).
          accountResult = await createAccount(
            {
              accountName: company,
              country: body.country,
            },
            accessToken,
            logger,
            apiBase
          );

          // Rare duplicate: re-fetch so the backfill can see the current value.
          if (accountResult.isDuplicate) {
            accountRecord = await searchAccountByName(company, accessToken, logger, apiBase);
          }
        }

        // Backfill-only update for an existing account: set Billing_Country ONLY
        // if the account doesn't already have one.
        if (accountRecord && accountResult.accountId) {
          await updateAccount(
            accountResult.accountId,
            { country: body.country },
            accountRecord,
            accessToken,
            logger,
            apiBase
          );
        }

        // Link contact to account (if both exist)
        if (contactResult.contactId && accountResult.accountId) {
          await linkContactToAccount(
            contactResult.contactId,
            accountResult.accountId,
            accessToken,
            logger,
            apiBase
          );
        }

        // Store the submission message as a Note on the contact (new or existing),
        // so each inquiry is preserved even when the contact is deduplicated.
        if (contactResult.contactId) {
          await addNoteToContact(
            contactResult.contactId,
            {
              title: `Website contact form – ${company}`,
              content:
                `${message}\n\n` +
                `— Submitted via website contact form —\n` +
                `Company: ${company}\n` +
                `Country: ${body.country || ''}\n` +
                `Phone: ${body.phone || ''}\n` +
                `Job title: ${body.job_position || ''}\n` +
                `Newsletter opt-in: ${newsletterOptIn ? 'yes' : 'no'}`,
            },
            accessToken,
            logger,
            apiBase
          );
        }

        return {
          contact: contactResult,
          account: accountResult,
        };
      })(),
    ]);

    // Check results
    const [matrixResult, emailResult, listResult, zohoResult] = results;

    logger.debug('Integration results', {
      matrix: matrixResult.status,
      email: emailResult.status,
      list: listResult.status,
      crm: zohoResult.status,
    });

    // Build response with detailed status
    const response = {
      success: true,
      message: 'Thank you for your message. We\'ll be in touch soon!',
      details: {
        matrix: matrixResult.status === 'fulfilled' ? 'sent' : 'failed',
        email: emailResult.status === 'fulfilled' ? 'sent' : 'failed',
        list: listResult.status === 'fulfilled' ? 'added' : 'failed',
        crm: zohoResult.status === 'fulfilled' ? 'created' : 'failed',
      },
    };

    // Log any failures (but don't fail the whole request)
    if (matrixResult.status === 'rejected') {
      logger.error('Matrix notification failed', {
        error: matrixResult.reason?.message || matrixResult.reason,
      });
    } else {
      logger.info('Matrix notification sent successfully', {
        eventId: matrixResult.value?.eventId,
      });
    }

    if (emailResult.status === 'rejected') {
      logger.error('SendGrid email failed', {
        error: emailResult.reason?.message || emailResult.reason,
      });
    } else {
      logger.info('SendGrid email sent successfully');
    }

    if (listResult.status === 'rejected') {
      logger.error('SendGrid list addition failed', {
        error: listResult.reason?.message || listResult.reason,
      });
    } else {
      logger.info('Contact added to SendGrid list successfully');
    }

    if (zohoResult.status === 'rejected') {
      logger.error('Zoho CRM creation failed', {
        error: zohoResult.reason?.message || zohoResult.reason,
      });
    } else {
      logger.info('Zoho CRM contact and account created successfully', {
        contact: zohoResult.value?.contact?.contactId,
        account: zohoResult.value?.account?.accountId,
        contactIsExisting: zohoResult.value?.contact?.isExisting,
        accountIsExisting: zohoResult.value?.account?.isExisting,
      });
    }

    logger.info('Contact form request completed successfully', {
      email,
      company,
      integrationStatus: response.details,
    });

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    logger.error('Contact form processing error', {
      error: error.message,
      stack: error.stack,
      name: error.name,
    });

    return new Response(
      JSON.stringify({
        error: 'An error occurred processing your request',
        message: error.message,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
}
