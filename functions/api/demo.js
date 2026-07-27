/**
 * Cloudflare Pages Function - Demo Request Form Submission
 *
 * Endpoint: /api/demo
 * Method: POST
 *
 * Handles demo request submissions by:
 * 1. Sending thank you email via SendGrid (with BCCs)
 * 2. Adding contact to SendGrid email list
 * 3. Creating contact and account in Zoho CRM with tags
 */

import { sendEmail, addContactToList, getTemplateId, detectLanguage } from '../lib/sendgrid.js';
import { createContact, createAccount, linkContactToAccount, refreshAccessToken } from '../lib/zoho.js';
import { sendMatrixNotification } from '../lib/matrix.js';
import { createLogger, sanitizeForLogging } from '../lib/logger.js';

export async function onRequestPost(context) {
  const { request, env } = context;

  // Initialize logger
  const logger = createLogger('demo-api', env, request);
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

  logger.info('Demo form request received', {
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
      firstName,
      lastName,
      email,
      company,
      jobTitle,
      industry,
      companySize,
      message,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !company || !industry) {
      logger.warn('Validation failed: missing required fields', {
        firstName: !!firstName,
        lastName: !!lastName,
        email: !!email,
        company: !!company,
        industry: !!industry,
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

    const fullName = `${firstName} ${lastName}`;

    // Detect language from form data or request
    const language = detectLanguage(body, request);
    logger.debug('Language detected', { language });

    // Get appropriate SendGrid template ID
    const templateId = getTemplateId('demo', language, env, logger);
    logger.debug('SendGrid template selected', { templateId, language });

    logger.info('Starting parallel execution of integrations', {
      email,
      company,
      language,
      bccEmailsRaw: env.SENDGRID_BCC_EMAILS,
      bccEmailsArray: env.SENDGRID_BCC_EMAILS?.split(',') || [],
    });

    // Parallel execution of all integrations
    const results = await Promise.allSettled([
      // 1. Send notification to Matrix room
      sendMatrixNotification(
        {
          firstName,
          lastName,
          email,
          company,
          jobTitle,
          industry,
          companySize,
          message,
        },
        'demo',
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
            company,
            jobTitle: jobTitle || '',
            industry,
            companySize: companySize || '',
            message: message || '',
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
            company,
            job_title: jobTitle || '',
            industry,
            company_size: companySize || '',
            message: message ? message.substring(0, 200) : '',
          },
        },
        env.SENDGRID_DEMO_LIST_ID,
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

        // Create account first
        const accountResult = await createAccount(
          {
            accountName: company,
            industry,
            employees: companySize,
          },
          'Website Demo Request',
          accessToken,
          logger
        );

        // Create contact
        const contactResult = await createContact(
          {
            firstName,
            lastName,
            email,
            company,
            jobTitle,
          },
          'Website Demo Request',
          accessToken,
          logger
        );

        // Link contact to account (if both were created successfully)
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

    // Build response
    const response = {
      success: true,
      message: 'Thank you for your demo request! Our team will contact you within 24 hours.',
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
      });
    }

    logger.info('Demo form request completed successfully', {
      email,
      company,
      integrationStatus: response.details,
    });

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    logger.error('Demo form processing error', {
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
