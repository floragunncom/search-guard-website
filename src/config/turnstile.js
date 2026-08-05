// Cloudflare Turnstile site key for the contact form widgets.
//
// The site key is public and safe to embed in the client bundle. It is
// inlined at build time from NEXT_PUBLIC_TURNSTILE_SITE_KEY, so the variable
// must be set in the build environment (Cloudflare Pages build settings).
// The matching secret key (TURNSTILE_SECRET_KEY) is only used server-side in
// functions/api/contact.js.

export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';
