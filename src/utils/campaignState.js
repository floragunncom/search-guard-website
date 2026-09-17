/**
 * Shared client state for the campaign bar and its corner badge.
 *
 * Two rules drive everything here:
 *   1. One dismissal covers the whole campaign. Closing either the bar or the
 *      badge silences both — a visitor should only have to say "no thanks" once.
 *   2. The badge never competes for attention. It stays hidden until the bar has
 *      been seen or dismissed AND the cookie banner is gone, so nobody meets two
 *      campaign elements (plus a consent dialog) in the same first glance.
 *
 * Every localStorage access is wrapped: Safari private mode throws on write, and
 * a visitor with site data blocked must still get a working page. On failure we
 * fail *open* (nothing dismissed), which shows the bar again rather than
 * silently hiding a live campaign.
 */

const DISMISS_PREFIX = 'sg-campaign-dismissed:';
const SEEN_PREFIX = 'sg-campaign-seen:';

const safeGet = (key) => {
  try {
    return window.localStorage.getItem(key);
  } catch (e) {
    return null;
  }
};

const safeSet = (key, value) => {
  try {
    window.localStorage.setItem(key, value);
  } catch (e) {
    // Private mode / blocked storage — the campaign simply won't be remembered.
  }
};

export const isDismissed = (id) => {
  if (typeof window === 'undefined' || !id) {
    return false;
  }
  return safeGet(`${DISMISS_PREFIX}${id}`) === '1';
};

export const setDismissed = (id) => {
  if (typeof window === 'undefined' || !id) {
    return;
  }
  safeSet(`${DISMISS_PREFIX}${id}`, '1');
};

export const wasSeen = (id) => {
  if (typeof window === 'undefined' || !id) {
    return false;
  }
  return safeGet(`${SEEN_PREFIX}${id}`) === '1';
};

export const setSeen = (id) => {
  if (typeof window === 'undefined' || !id) {
    return;
  }
  safeSet(`${SEEN_PREFIX}${id}`, '1');
};

/**
 * True while the campaign is still running.
 *
 * A missing or unparseable `endsAt` counts as "still running" rather than
 * "expired": a typo in the date should show the banner too long, not silently
 * suppress a live campaign nobody then notices is missing.
 */
export const isWithinWindow = (campaign) => {
  if (!campaign) {
    return false;
  }
  if (!campaign.endsAt) {
    return true;
  }
  const ends = Date.parse(campaign.endsAt);
  if (Number.isNaN(ends)) {
    return true;
  }
  return Date.now() <= ends;
};

/**
 * Whether the Cookie-Script consent dialog is currently on screen.
 *
 * Checks the wrapper's measured height, not `offsetParent`: the dialog is
 * position:fixed, and a fixed element always reports a null offsetParent, so the
 * usual visibility test would report "hidden" while the banner is plainly there.
 */
export const isCookieBannerVisible = () => {
  if (typeof document === 'undefined') {
    return false;
  }
  const el = document.getElementById('cookiescript_injected_wrapper');
  if (!el) {
    return false;
  }
  return el.getBoundingClientRect().height > 0;
};
