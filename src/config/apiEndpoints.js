// Single source of truth for the form-processing API endpoints.
//
// Both endpoints are AWS API Gateway URLs in eu-central-1.
// Override at build time via NEXT_PUBLIC_* env vars if the backend changes,
// otherwise the defaults below are used.
//
// - CONTACT_API_URL:    used by the contact forms (name/email/company/message + newsletter opt-in)
// - NEWSLETTER_API_URL: used by the standalone newsletter subscribe form (PreFooter)

export const CONTACT_API_URL =
  process.env.NEXT_PUBLIC_CONTACT_API_URL ||
  'https://56dmarth25.execute-api.eu-central-1.amazonaws.com/prod/';

export const NEWSLETTER_API_URL =
  process.env.NEXT_PUBLIC_NEWSLETTER_API_URL ||
  'https://45xbqthu4l.execute-api.eu-central-1.amazonaws.com/prod/';
