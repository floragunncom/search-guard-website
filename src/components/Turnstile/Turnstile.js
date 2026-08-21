import React, { useEffect, useRef } from 'react';
import { TURNSTILE_SITE_KEY } from '../../config/turnstile';

const TURNSTILE_SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

// The script must only be injected once, even with several widgets on a page.
let turnstileScriptPromise = null;

function loadTurnstileScript() {
  if (window.turnstile) {
    return Promise.resolve();
  }
  if (!turnstileScriptPromise) {
    turnstileScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = TURNSTILE_SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      script.onerror = () => {
        turnstileScriptPromise = null;
        reject(new Error('Failed to load the Cloudflare Turnstile script'));
      };
      document.head.appendChild(script);
    });
  }
  return turnstileScriptPromise;
}

/**
 * Cloudflare Turnstile widget for the contact forms.
 *
 * Must be placed inside the <form>: the widget injects a hidden
 * `cf-turnstile-response` input into the surrounding form, so the token is
 * picked up by the existing form serialization and verified server-side in
 * functions/api/contact.js.
 */
const Turnstile = () => {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !TURNSTILE_SITE_KEY) {
      return undefined;
    }

    let unmounted = false;

    loadTurnstileScript()
      .then(() => {
        if (unmounted || !containerRef.current || widgetIdRef.current !== null) {
          return;
        }
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
        });
      })
      .catch(() => {
        // Script blocked or offline: the form still submits and the server
        // rejects the tokenless request.
      });

    return () => {
      unmounted = true;
      if (widgetIdRef.current !== null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, []);

  return <div className="turnstile-widget" ref={containerRef} />;
};

export default Turnstile;
