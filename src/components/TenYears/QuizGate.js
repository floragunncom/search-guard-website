import React from 'react';
import { useTranslation } from 'react-i18next';
import Turnstile from '../Turnstile/Turnstile';
import { NEWSLETTER_API_URL } from '../../config/apiEndpoints';
import {
  QUIZ_CAMPAIGN_LIST_ID,
  NEWSLETTER_LIST_ID,
  QUIZ_DRAW_LIST_ID,
  isDrawOpen,
} from '../../config/tenYears';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * The score-screen email gate. Everyone who leaves an email gets the cookbook
 * and a prize-draw entry; the newsletter is a separate, unticked opt-in.
 *
 * Reuses the newsletter endpoint (functions/api/newsletter.js) and the shared
 * Turnstile widget. See src/config/tenYears.js for why the cookbook and the
 * newsletter are two different list ids (Koppelungsverbot).
 *
 * On success it calls onDone() so the parent can show the confirmation screen.
 *
 * AFTER THE DRAW CLOSES (DRAW_CLOSES_AT in src/config/tenYears.js) this form
 * keeps working and keeps delivering the cookbook — the quiz is meant to stay up
 * and be reused. The draw is what goes away: no opt-in, nothing written to
 * QUIZ_DRAW_LIST_ID, and the draw sentences swap for cookbook-only variants.
 *
 * `drawOpen` starts true and is corrected in an effect rather than read during
 * the first render. Reading the clock at render time would disagree with the
 * static HTML — which was built whenever CI last ran — and trip a hydration
 * mismatch. The consequence is that a stale cached page can show the opt-in for
 * one frame after the deadline; it cannot accept one, because handleSubmit
 * re-checks isDrawOpen() at submit time, which is the check that actually
 * matters.
 */
const QuizGate = ({ score, onDone }) => {
  const { t } = useTranslation('tenyears');
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [error, setError] = React.useState(null); // 'validation' | 'server' | null
  const [drawOpen, setDrawOpen] = React.useState(true);

  React.useEffect(() => {
    setDrawOpen(isDrawOpen());
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isProcessing) {
      return;
    }

    const formData = new FormData(event.target);
    const email = (formData.get('email') || '').trim();
    if (!EMAIL_RE.test(email)) {
      setError('validation');
      return;
    }
    setError(null);
    setIsProcessing(true);

    const wantsNewsletter = formData.get('newsletter') === 'on';
    // A perfect score can opt into the prize draw; the box only renders at 10/10
    // and only while the draw is open, but re-check both here so a tampered form
    // — or a page cached from before the deadline — can't self-enter. isDrawOpen()
    // is called fresh rather than reading `drawOpen`, so a tab left open across
    // the deadline is judged on submit time, not load time.
    const wantsDraw = score === 10 && isDrawOpen() && formData.get('draw') === 'on';
    // The campaign list is always included (cookbook delivery); the newsletter
    // and draw lists are added only when their box is ticked, so the cookbook is
    // never conditional on either consent (Koppelungsverbot).
    const ids = [QUIZ_CAMPAIGN_LIST_ID];
    if (wantsNewsletter) {
      ids.push(NEWSLETTER_LIST_ID);
    }
    if (wantsDraw) {
      ids.push(QUIZ_DRAW_LIST_ID);
    }

    const payload = {
      email,
      ids,
      // Injected by the Turnstile widget; verified server-side.
      'cf-turnstile-response': formData.get('cf-turnstile-response'),
      // Campaign attribution. `score` also decides prize-draw eligibility:
      // DRAW ENTRY = score === 10 (a perfect ten). Everyone who submits still
      // gets the cookbook; ops filters draw entrants by score. NOTE:
      // functions/api/newsletter.js currently only forwards `email` + `ids` to
      // SendGrid, so to actually store these as SendGrid custom fields the
      // functions/lib/sendgrid.js helper must be extended to pass
      // first_name / source / score through. Sent here so they are ready.
      firstName: (formData.get('firstName') || '').trim(),
      source: '10y-quiz',
      score,
    };

    try {
      const res = await fetch(NEWSLETTER_API_URL, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          accept: 'application/json; charset=utf-8',
          'content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error(`Newsletter endpoint returned ${res.status}`);
      }
    } catch (e) {
      setIsProcessing(false);
      setError('server');
      return;
    }

    setIsProcessing(false);
    if (onDone) {
      onDone();
    }
  };

  return (
    <form className="tenyears-gate-form" onSubmit={handleSubmit} noValidate>
      <div className="tenyears-field">
        <label htmlFor="tenyears-firstname">
          {t('gate.firstNameLabel')}{' '}
          <span className="tenyears-optional">({t('gate.firstNameOptional')})</span>
        </label>
        <input
          id="tenyears-firstname"
          name="firstName"
          type="text"
          placeholder={t('gate.firstNamePlaceholder')}
          autoComplete="given-name"
        />
      </div>

      <div className="tenyears-field">
        <label htmlFor="tenyears-email">{t('gate.emailLabel')}</label>
        <input
          id="tenyears-email"
          name="email"
          type="email"
          placeholder={t('gate.emailPlaceholder')}
          autoComplete="email"
          required
        />
      </div>

      {score === 10 && drawOpen ? (
        <label className="tenyears-check tenyears-check-draw" htmlFor="tenyears-draw">
          <input id="tenyears-draw" name="draw" type="checkbox" />
          <span>
            <strong>{t('gate.drawLabel')}</strong>
            {t('gate.drawTermsUrl') ? (
              <>
                {' — '}
                <a
                  href={t('gate.drawTermsUrl')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('gate.drawTerms')}
                </a>
              </>
            ) : null}
          </span>
        </label>
      ) : null}

      <label className="tenyears-check" htmlFor="tenyears-newsletter">
        <input id="tenyears-newsletter" name="newsletter" type="checkbox" />
        <span>
          {t('gate.consentLabel')}{' '}
          <span className="tenyears-consent-note">
            ({t(drawOpen ? 'gate.consentNote' : 'gate.consentNoteClosed')})
          </span>
        </span>
      </label>

      <Turnstile />

      {error ? (
        <p className="tenyears-error" role="alert">
          {error === 'validation' ? t('gate.validationError') : t('gate.serverError')}
        </p>
      ) : null}

      <div className="tenyears-actions">
        <button className="tenyears-btn" type="submit" disabled={isProcessing}>
          {isProcessing ? t('gate.processing') : t('gate.submit')}
        </button>
      </div>

      {/* The fineprint is shown at every score, so it carries the privacy +
          terms links for entrants who never see the draw checkbox (10/10 only).
          The terms URL is interpolated from the single source in i18n. Once the
          draw has closed it drops to the cookbook-only variant, which makes no
          claim about a draw and no longer links its terms. */}
      <p
        className="tenyears-fineprint"
        dangerouslySetInnerHTML={{
          __html: drawOpen
            ? t('gate.fineprint', { termsUrl: t('gate.drawTermsUrl') })
            : t('gate.fineprintClosed'),
        }}
      />
    </form>
  );
};

export default QuizGate;
