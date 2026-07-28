/**
 * Cloudflare Pages Function - Newsletter Subscription
 *
 * Endpoint: /api/newsletter
 * Method: POST
 *
 * Replaces the old AWS Lambda "sg-newsletter-signup" endpoint
 * (45xbqthu4l.execute-api.eu-central-1.amazonaws.com).
 *
 * Accepts the fields sent by the website newsletter form (Email.js):
 *   Required: email
 *   Required: ids   - SendGrid marketing list id(s); single value or array
 *
 * Handles a subscription by (in parallel):
 * 1. Adding the email to the given SendGrid marketing list(s)
 * 2. Sending a Matrix room notification
 */

import { subscribeToLists } from '../lib/sendgrid.js';
import { sendMatrixNotification } from '../lib/matrix.js';
import { createLogger, sanitizeForLogging } from '../lib/logger.js';

export async function onRequestPost(context) {
  const { request, env } = context;

  // Initialize logger
  const logger = createLogger('newsletter-api', env, request);
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

  logger.info('Newsletter request received', {
    method: request.method,
    url: request.url,
    userAgent: request.headers.get('user-agent'),
    referer: request.headers.get('referer'),
  });

  try {
    // Parse request body
    const body = await request.json();
    logger.debug('Request body parsed', sanitizeForLogging(body));

    const { email, ids } = body;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      logger.warn('Validation failed: missing or invalid email', { email });
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate list id(s)
    const listIds = Array.isArray(ids) ? ids.filter(Boolean) : ids ? [ids] : [];
    if (listIds.length === 0) {
      logger.warn('Validation failed: missing list id(s)', { ids });
      return new Response(
        JSON.stringify({ error: 'Missing subscription list id' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Cloudflare exposes the visitor country via the CF-IPCountry header
    // (the old Lambda used the CloudFront-Viewer-Country header for the notice).
    const visitorCountry = request.headers.get('CF-IPCountry') || '';

    logger.info('Starting parallel execution of integrations', {
      email,
      listIds,
      visitorCountry,
    });

    const results = await Promise.allSettled([
      // 1. Add to SendGrid marketing list(s) (Marketing scope)
      subscribeToLists({ email, listIds }, env.SENDGRID_MARKETING_KEY, logger),

      // 2. Send notification to Matrix room
      sendMatrixNotification(
        {
          email,
          country: visitorCountry,
        },
        'newsletter',
        env.MATRIX_ROOM_ID,
        env.MATRIX_SERVER_URL,
        env.MATRIX_TOKEN,
        logger
      ),
    ]);

    const [listResult, matrixResult] = results;

    logger.debug('Integration results', {
      list: listResult.status,
      matrix: matrixResult.status,
    });

    const response = {
      success: true,
      message: 'Thank you for signing up to our newsletter!',
      details: {
        list: listResult.status === 'fulfilled' ? 'added' : 'failed',
        matrix: matrixResult.status === 'fulfilled' ? 'sent' : 'failed',
      },
    };

    if (listResult.status === 'rejected') {
      logger.error('SendGrid list subscription failed', {
        error: listResult.reason?.message || listResult.reason,
      });
    } else {
      logger.info('Contact subscribed to SendGrid list successfully');
    }

    if (matrixResult.status === 'rejected') {
      logger.error('Matrix notification failed', {
        error: matrixResult.reason?.message || matrixResult.reason,
      });
    } else {
      logger.info('Matrix notification sent successfully', {
        eventId: matrixResult.value?.eventId,
      });
    }

    logger.info('Newsletter request completed successfully', {
      email,
      integrationStatus: response.details,
    });

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    logger.error('Newsletter processing error', {
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
