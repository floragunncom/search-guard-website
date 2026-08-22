// Single source of truth for the form-processing API endpoints.
//
// These now point at the Cloudflare Pages Functions bundled with the site
// (see functions/api/contact.js and functions/api/newsletter.js), which
// replace the old AWS Lambda / API Gateway endpoints:
//   - contact:    56dmarth25.execute-api.eu-central-1.amazonaws.com
//   - newsletter: 45xbqthu4l.execute-api.eu-central-1.amazonaws.com
//
// Same-origin relative paths, so no CORS is needed in production. Override at
// build time via NEXT_PUBLIC_* env vars if the backend changes.
//
// - CONTACT_API_URL:    used by the contact forms (name/email/company/message + newsletter opt-in)
// - NEWSLETTER_API_URL: used by the standalone newsletter subscribe form (PreFooter)

export const CONTACT_API_URL =
  process.env.NEXT_PUBLIC_CONTACT_API_URL || '/api/contact';

export const NEWSLETTER_API_URL =
  process.env.NEXT_PUBLIC_NEWSLETTER_API_URL || '/api/newsletter';
