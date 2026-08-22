// Cloudflare Turnstile site key for the contact and newsletter form widgets.
//
// The site key is public by design (it is shipped to every visitor in the
// client bundle), so it is safe to keep it in the source code. The matching
// secret key (TURNSTILE_SECRET_KEY) is the sensitive one and is only used
// server-side in functions/api/contact.js and functions/api/newsletter.js.
//
// NEXT_PUBLIC_TURNSTILE_SITE_KEY can optionally override the default at build
// time, e.g. to point a staging build at a different Turnstile widget.

const DEFAULT_TURNSTILE_SITE_KEY = '0x4AAAAAAEGG_qNEBYEQd3ke';

export const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || DEFAULT_TURNSTILE_SITE_KEY;
