/**
 * The site-wide campaign bar's current occupant.
 *
 * The bar itself (src/components/CampaignBar/) is generic and permanent — the
 * anniversary quiz is only what it happens to be carrying right now. To hand it
 * to the next campaign, replace ACTIVE_CAMPAIGN below; to take it off the site
 * entirely, export `null`.
 *
 * LIFECYCLE (agreed 16 Sep 2026): after 20 Oct 2026, when the prize draw
 * closes, the corner badge goes away for good and the homepage returns to its
 * original state. The bar stays and moves on to the next announcement, most
 * likely a webinar — see TEN_YEARS_SUCCESSOR_EXAMPLE at the bottom of this file.
 *
 * `endsAt` makes that automatic: past it, the bar and badge stop rendering on
 * their own. Nobody has to remember to take the campaign down, and a stale
 * banner can never advertise a prize draw that has already been won.
 */

import { DRAW_CLOSES_AT } from './tenYears';

export const ACTIVE_CAMPAIGN = {
  // Also the localStorage dismissal key, so changing it re-shows the bar to
  // people who dismissed the previous campaign. Always change it for a new one.
  id: 'ten-years-2026',

  // Deliberately NOT run through useLocalizedPath(). `/10-years/` is absent
  // from LOCALIZABLE_ROUTES (src/i18n/locales.js), so getStaticPaths() never
  // generates /de/10-years/ et al — a localized href would 404. The bar's own
  // chrome is translated; the quiz it points at is English-only for now.
  href: '/10-years/',

  // i18n lookup prefix inside the `campaign` namespace, e.g. campaign:tenYears.lead
  i18nKey: 'tenYears',

  // 'cyan' | 'navy'. Cyan is the choice: navy merges into the navbar and gets
  // read as site chrome rather than as an announcement.
  tone: 'cyan',

  // Derived, not repeated: the draw's own deadline lives in src/config/tenYears.js
  // and is also what closes the opt-in on the quiz. One date, three consumers —
  // move it there and the banners follow.
  endsAt: DRAW_CLOSES_AT,

  // Show the brick "10" alongside the message. Campaign-specific; a webinar
  // announcement would set this false.
  plate: true,

  // Render the corner badge as well. Set false (or delete the component) after
  // 20 Oct 2026 — the bar outlives the badge.
  badge: true,

  // Render the prominent homepage band under the hero. Homepage only, and the
  // other half of what goes away after 20 Oct 2026 when the homepage returns to
  // its original state — see AnniversaryBand.js.
  band: true,
};

/**
 * What the bar is expected to carry after the anniversary. Kept here as the
 * worked example of a second campaign so the next person does not have to
 * reverse-engineer the shape — swap it into ACTIVE_CAMPAIGN when the time comes.
 *
 * import { DRAW_CLOSES_AT } from './tenYears';

export const ACTIVE_CAMPAIGN = {
 *   id: 'webinar-encryption-at-rest-oct-2026',
 *   href: '/webinars/',
 *   i18nKey: 'webinarEncryption',
 *   tone: 'cyan',
 *   endsAt: '2026-10-14T18:00:00+02:00',
 *   plate: false,
 *   badge: false,
 *   band: false,
 * };
 */
export const TEN_YEARS_SUCCESSOR_EXAMPLE = null;
