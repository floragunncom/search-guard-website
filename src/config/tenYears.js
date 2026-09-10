// Configuration for the /10-years anniversary quiz (see src/views/TenYears).
//
// The quiz gate reuses the existing newsletter plumbing: it POSTs to
// NEWSLETTER_API_URL (the Cloudflare Pages Function in functions/api/newsletter.js),
// which subscribes the email to every SendGrid marketing list id passed in `ids`.
//
// Two DIFFERENT list ids are involved, and keeping them separate is what makes the
// gate legally clean:
//
//   * QUIZ_CAMPAIGN_LIST_ID — every entrant lands here. This is what delivers the
//     cookbook and records the prize-draw entry (i.e. tags the address as
//     source = 10y-quiz). Giving an email always adds the address to THIS list,
//     because receiving the cookbook + entering the draw is the explicit purpose
//     of the form.
//
//   * NEWSLETTER_LIST_ID — the ordinary marketing newsletter (same id the
//     PreFooter form in src/components/Email/Email.js uses). Added to the
//     submission ONLY when the visitor ticks the optional newsletter checkbox.
//
// Because the cookbook is tied to the campaign list and never to the newsletter
// list, a visitor can get the cookbook without subscribing to the newsletter —
// which is the Koppelungsverbot requirement from the build brief.

// SendGrid "10y-quiz" campaign list — every quiz entrant lands here (cookbook
// delivery + attribution). Overridable at build time via NEXT_PUBLIC_QUIZ_LIST_ID.
export const QUIZ_CAMPAIGN_LIST_ID =
  process.env.NEXT_PUBLIC_QUIZ_LIST_ID || '179da79e-ed9d-45fa-84c1-93164cddf846';

// Existing newsletter list id, mirrored from src/components/Email/Email.js.
export const NEWSLETTER_LIST_ID = '9254dc87-0c97-43a8-bf7b-85a624da753e';

// Dedicated list of prize-draw entrants. An entrant is added to this list only
// when they scored a perfect 10 AND ticked the draw opt-in (accepting the
// Teilnahmebedingungen). The winner is drawn from this list, so it stays clean
// of everyone who only wanted the cookbook.
// SendGrid "1010 Draw Entrants" list. Overridable via NEXT_PUBLIC_QUIZ_DRAW_LIST_ID.
export const QUIZ_DRAW_LIST_ID =
  process.env.NEXT_PUBLIC_QUIZ_DRAW_LIST_ID || 'ab021e16-852b-4e09-8cc4-8ac494cd05df';
