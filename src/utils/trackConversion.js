// Reports a completed lead form to the analytics on the page. Call it only
// after the server has accepted the submission.
//
// Two receivers:
// - Google Tag Manager (GTM-TDLZ33C) gets a dataLayer event. GTM turns it into
//   the Google Ads conversion via a Custom Event trigger with the same name.
//   GTM only loads once the visitor accepts the Cookie-Script "performance"
//   category (see pages/_document.js); until then the push just waits in
//   window.dataLayer and nothing leaves the browser.
// - Plausible (cookieless, loaded for everyone) gets a custom event with the
//   same name. Add it as a custom-event goal in Plausible to see it.
//
// Event names, keep in sync with the GTM triggers and Plausible goals:
//   newsletter_signup   PreFooter newsletter form (src/components/Email/Email.js)
//   cookbook_signup     10-years quiz email gate (src/components/TenYears/QuizGate.js)
//
// Contact forms need no call. They redirect to /thanks/, and that page load is
// the conversion in Google Ads ("Submit lead form") and in Plausible.
//
// Never pass personal data (email, name) in props. Google Ads forbids it.

export const trackConversion = (eventName, props = {}) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...props });
  } catch (e) {
    // Tracking must never break a form.
  }

  try {
    if (typeof window.plausible === 'function') {
      window.plausible(eventName, { props });
    }
  } catch (e) {
    // Same as above.
  }
};

export default trackConversion;
