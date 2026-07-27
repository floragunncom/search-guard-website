/**
 * Cloudflare Pages Function - Contact Form Submission
 *
 * Endpoint: /api/contact
 * Method: POST
 *
 * Handles contact form submissions by:
 * 1. Sending thank you email via SendGrid (with BCCs)
 * 2. Adding contact to SendGrid email list
 * 3. Creating contact and account in Zoho CRM with tags
 */

import { sendEmail, addContactToList, getTemplateId, detectLanguage } from '../lib/sendgrid.js';
import { createContact, createAccount, linkContactToAccount, refreshAccessToken, searchContactByEmail, searchAccountByName } from '../lib/zoho.js';
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
    const { firstName, lastName, email, company, topic, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !company || !topic || !message) {
      logger.warn('Validation failed: missing required fields', {
        firstName: !!firstName,
        lastName: !!lastName,
        email: !!email,
        company: !!company,
        topic: !!topic,
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

    // Construct full name
    const fullName = `${firstName} ${lastName}`;

    // Detect language from form data or request
    const language = detectLanguage(body, request);
    logger.debug('Language detected', { language });

    // Get appropriate SendGrid template ID
    const templateId = getTemplateId('contact', language, env, logger);
    logger.debug('SendGrid template selected', { templateId, language });

    logger.info('Starting parallel execution of integrations', {
      email,
      topic,
      language,
      bccEmailsRaw: env.SENDGRID_BCC_EMAILS,
      bccEmailsArray: env.SENDGRID_BCC_EMAILS?.split(',') || [],
    });

    // Parallel execution of all integrations for better performance
    const results = await Promise.allSettled([
      // 1. Send notification to Matrix room
      sendMatrixNotification(
        {
          firstName,
          lastName,
          email,
          company,
          topic,
          message,
        },
        'contact',
        env.MATRIX_ROOM_ID,
        env.MATRIX_SERVER_URL,
        env.MATRIX_TOKEN,
        logger
      ),

      // 2. Send thank you email via SendGrid with Dynamic Template
      sendEmail(
        {
          to: email,
          toName: fullName,
          templateId,
          templateData: {
            firstName,
            lastName,
            topic,
            message,
            language,
          },
          bccEmails: env.SENDGRID_BCC_EMAILS?.split(',') || [],
        },
        env.SENDGRID_API_KEY,
        logger
      ),

      // 3. Add to SendGrid email list
      addContactToList(
        {
          email,
          firstName,
          lastName,
          customFields: {
            topic,
            message: message.substring(0, 200), // Limit message length
          },
        },
        env.SENDGRID_CONTACT_LIST_ID,
        env.SENDGRID_API_KEY,
        logger
      ),

      // 4. Create contact and account in Zoho CRM
      (async () => {
        // Refresh Zoho access token
        const { accessToken } = await refreshAccessToken(
          env.ZOHO_REFRESH_TOKEN,
          env.ZOHO_CLIENT_ID,
          env.ZOHO_CLIENT_SECRET,
          logger
        );

        // Search for existing contact by email
        let existingContact = await searchContactByEmail(email, accessToken, logger);
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
              firstName,
              lastName,
              email,
              company,
              jobTitle: topic,
            },
            'Website Contact Form',
            accessToken,
            logger
          );
        }

        // Search for existing account by company name
        let existingAccount = await searchAccountByName(company, accessToken, logger);
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
              industry: topic, // Use topic as a placeholder for industry
            },
            'Website Contact Form',
            accessToken,
            logger
          );
        }

        // Link contact to account (if both exist)
        if (contactResult.contactId && accountResult.accountId) {
          await linkContactToAccount(
            contactResult.contactId,
            accountResult.accountId,
            accessToken,
            logger
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
      topic,
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
