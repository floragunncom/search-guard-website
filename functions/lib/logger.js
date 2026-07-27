/**
 * Logger Utility for Cloudflare Functions
 *
 * Provides environment-aware logging with different log levels:
 * - Preview/Development: DEBUG level (very detailed logging)
 * - Production: INFO level (general information and errors only)
 */

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

/**
 * Determine the current environment and log level
 * @param {Object} env - Environment variables
 * @param {Object} request - Request object (optional, used for URL-based detection)
 * @returns {Object} Environment info and log level
 */
function getEnvironment(env, request = null) {
  // Check explicit ENVIRONMENT variable
  const envVar = env?.ENVIRONMENT?.toLowerCase();

  // Check if we're in production based on ENVIRONMENT variable
  if (envVar === 'production') {
    return {
      environment: 'production',
      logLevel: LOG_LEVELS.INFO,
      isProduction: true,
    };
  }

  // Check hostname if request is available
  if (request) {
    const url = new URL(request.url);
    const hostname = url.hostname;

    // Production domains (customize based on your actual domain)
    if (hostname === 'coretex-axiom.com' || hostname === 'www.coretex-axiom.com') {
      return {
        environment: 'production',
        logLevel: LOG_LEVELS.INFO,
        isProduction: true,
      };
    }

    // Preview/staging domains (Cloudflare Pages preview URLs)
    if (hostname.includes('.pages.dev')) {
      return {
        environment: 'preview',
        logLevel: LOG_LEVELS.DEBUG,
        isProduction: false,
      };
    }
  }

  // Default to preview/development with DEBUG logging for safety
  return {
    environment: envVar || 'development',
    logLevel: LOG_LEVELS.DEBUG,
    isProduction: false,
  };
}

/**
 * Create a logger instance for a specific context
 * @param {string} context - Context name (e.g., 'demo-api', 'contact-api', 'zoho', 'sendgrid')
 * @param {Object} env - Environment variables
 * @param {Object} request - Request object (optional)
 * @returns {Object} Logger instance with debug, info, warn, error methods
 */
export function createLogger(context, env, request = null) {
  const envInfo = getEnvironment(env, request);
  const currentLogLevel = envInfo.logLevel;

  // Helper to format log messages with timestamp and context
  const formatMessage = (level, message, data = null) => {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${envInfo.environment.toUpperCase()}] [${context}] [${level}]`;

    if (data) {
      return `${prefix} ${message} ${JSON.stringify(data)}`;
    }
    return `${prefix} ${message}`;
  };

  return {
    /**
     * Debug level logging - only in preview/development
     * Use for detailed information like request bodies, API responses, etc.
     */
    debug: (message, data = null) => {
      if (currentLogLevel <= LOG_LEVELS.DEBUG) {
        console.log(formatMessage('DEBUG', message, data));
      }
    },

    /**
     * Info level logging - general operational information
     * Use for successful operations, milestones, etc.
     */
    info: (message, data = null) => {
      if (currentLogLevel <= LOG_LEVELS.INFO) {
        console.info(formatMessage('INFO', message, data));
      }
    },

    /**
     * Warning level logging - something unexpected but not critical
     * Use for recoverable errors, fallbacks, etc.
     */
    warn: (message, data = null) => {
      if (currentLogLevel <= LOG_LEVELS.WARN) {
        console.warn(formatMessage('WARN', message, data));
      }
    },

    /**
     * Error level logging - something went wrong
     * Always logged regardless of environment
     */
    error: (message, data = null) => {
      if (currentLogLevel <= LOG_LEVELS.ERROR) {
        console.error(formatMessage('ERROR', message, data));
      }
    },

    /**
     * Log environment info on initialization
     */
    logEnvironmentInfo: () => {
      console.info(formatMessage('INFO', `Logger initialized`, {
        environment: envInfo.environment,
        logLevel: Object.keys(LOG_LEVELS).find(key => LOG_LEVELS[key] === currentLogLevel),
        isProduction: envInfo.isProduction,
      }));
    },

    /**
     * Get current environment info
     */
    getEnvironmentInfo: () => envInfo,
  };
}

/**
 * Sanitize sensitive data from objects before logging
 * Redacts common sensitive field names
 * @param {Object} obj - Object to sanitize
 * @returns {Object} Sanitized object
 */
export function sanitizeForLogging(obj) {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  const sensitiveFields = [
    'password',
    'api_key',
    'apiKey',
    'token',
    'access_token',
    'accessToken',
    'refresh_token',
    'refreshToken',
    'secret',
    'client_secret',
    'clientSecret',
    'authorization',
  ];

  const sanitized = Array.isArray(obj) ? [...obj] : { ...obj };

  for (const key in sanitized) {
    const lowerKey = key.toLowerCase();

    // Check if field name contains sensitive keywords
    if (sensitiveFields.some(field => lowerKey.includes(field))) {
      sanitized[key] = '***REDACTED***';
    } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      // Recursively sanitize nested objects
      sanitized[key] = sanitizeForLogging(sanitized[key]);
    }
  }

  return sanitized;
}
