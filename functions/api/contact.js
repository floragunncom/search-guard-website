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
  createAccount,
  linkContactToAccount,
  refreshAccessToken,
  searchContactByEmail,
  searchAccountByName,
  resolveZohoHosts,
} from '../lib/zoho.js';
import { sendMatrixNotification } from '../lib/matrix.js';
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
    // Spam filtering (ported from the old AWS Lambda processor.js).
    // Cloudflare exposes the visitor country via the CF-IPCountry header
    // (the old Lambda used the CloudFront-Viewer-Country header).
    // A deliberately cryptic error is returned so bots get no useful signal.
    // ---------------------------------------------------------------------
    const visitorCountry = request.headers.get('CF-IPCountry') || '';
    try {
      if (
        // handle all mails from Russia as spam
        visitorCountry === 'RU' ||
        // handle mails as spam where first or last name contains ':' or 'http'
        (first_name || '').indexOf(':') !== -1 ||
        (first_name || '').indexOf('http') !== -1 ||
        (last_name || '').indexOf(':') !== -1 ||
        (last_name || '').indexOf('http') !== -1 ||
        // handle mails as spam where message contains www.gclnk.com
        (message || '').indexOf('www.gclnk.com') !== -1 ||
        // handle gmail.com senders as spam
        (email || '').indexOf('gmail.com') !== -1
      ) {
        logger.warn('Submission rejected as spam', {
          visitorCountry,
          email,
        });
        return new Response(JSON.stringify('INVALID FORMAT 0x7c'), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    } catch (spamErr) {
      logger.warn('Spam check threw, rejecting', { error: spamErr.message });
      return new Response(JSON.stringify('INVALID FORMAT 0x7d'), {
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

        // Refresh Zoho access token
        const { accessToken } = await refreshAccessToken(
          env.ZOHO_REFRESH_TOKEN,
          env.ZOHO_CLIENT_ID,
          env.ZOHO_CLIENT_SECRET,
          logger,
          accountsBase
        );

        // Search for existing contact by email
        const existingContact = await searchContactByEmail(email, accessToken, logger, apiBase);
        let contactResult;

        if (existingContact) {
          logger.info('Using existing contact', {
            contactId: existingContact.id,
            email,
          });
          contactResult = {
            success: true,
            contactId: existingContact.id,
            message: 'Contact already exists',
            isExisting: true,
          };
        } else {
          // Create new contact
          contactResult = await createContact(
            {
              firstName: first_name,
              lastName: last_name,
              email,
              company,
              phone: body.phone,
              jobTitle: body.job_position,
            },
            'Website Contact Form',
            accessToken,
            logger,
            apiBase
          );
        }

        // Search for existing account by company name
        const existingAccount = await searchAccountByName(company, accessToken, logger, apiBase);
        let accountResult;

        if (existingAccount) {
          logger.info('Using existing account', {
            accountId: existingAccount.id,
            accountName: company,
          });
          accountResult = {
            success: true,
            accountId: existingAccount.id,
            message: 'Account already exists',
            isExisting: true,
          };
        } else {
          // Create new account
          accountResult = await createAccount(
            {
              accountName: company,
            },
            'Website Contact Form',
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
