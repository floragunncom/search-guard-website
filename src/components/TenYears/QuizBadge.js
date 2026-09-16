import React from 'react';
import { useTranslation } from 'react-i18next';
import MiniPlate from '../CampaignBar/MiniPlate';
import {
  isDismissed,
  setDismissed,
  wasSeen,
  isWithinWindow,
  isCookieBannerVisible,
} from '../../utils/campaignState';

/**
 * The corner badge for the anniversary quiz.
 *
 * Unlike CampaignBar this one is campaign-specific and temporary: after
 * 20 Oct 2026 it goes away for good (set `badge: false` in
 * src/config/campaign.js, or delete this file). The bar stays.
 *
 * It says almost nothing — "Build the 10." and a link — because the bar has
 * already given the detail. A second element repeating the first is just noise.
 *
 * Four conditions gate it, and all four exist to stop it ambushing anyone:
 *   - the campaign is still running and nobody has dismissed it;
 *   - the bar rendered first. PageWrapper puts CampaignBar above this in the
 *     tree, so its effect sets the "seen" flag before ours reads it — which
 *     means the badge simply never appears when the bar didn't (dismissed,
 *     expired, or no active campaign). It does NOT hold the badge back to a
 *     later page view: once someone scrolls far enough, bar and badge are on
 *     screen together, which is the approved design;
 *   - the cookie dialog is gone. Cookie-Script sits bottom-centre and the badge
 *     bottom-right, so on a phone they overlap outright;
 *   - the reader has scrolled past SCROLL_TRIGGER, so it turns up when someone
 *     has finished reading and is deciding what to do next, not on first paint.
 *
 * The brick "10" is not decoration here: without it the badge reads as a chat
 * widget and gets dismissed on reflex.
 */
const SCROLL_TRIGGER = 0.4;

const QuizBadge = ({ campaign }) => {
  const { t } = useTranslation('campaign');
  const [isVisible, setIsVisible] = React.useState(false);

  const id = campaign?.id;
  const i18nKey = campaign?.i18nKey;
  const enabled = Boolean(campaign?.badge);

  React.useEffect(() => {
    if (!enabled || !isWithinWindow(campaign) || isDismissed(id) || !wasSeen(id)) {
      return undefined;
    }

    let frame = null;

    const evaluate = () => {
      frame = null;
      if (isDismissed(id)) {
        setIsVisible(false);
        return;
      }
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      // A page shorter than the viewport has nothing to scroll, so the
      // threshold can never be met — show the badge there rather than never.
      const scrolled = scrollable <= 0 ? 1 : window.scrollY / scrollable;
      setIsVisible(scrolled >= SCROLL_TRIGGER && !isCookieBannerVisible());
    };

    const onScroll = () => {
      if (frame === null) {
        frame = window.requestAnimationFrame(evaluate);
      }
    };

    evaluate();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [campaign, enabled, id]);

  const handleDismiss = () => {
    // Dismissing the badge silences the bar too — one "no thanks" should mean
    // the whole campaign, not this one element.
    setDismissed(id);
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="quiz-badge">
      <a className="quiz-badge__link" href={campaign.href}>
        <MiniPlate filled={6} onDark />
        <span className="quiz-badge__text">
          <strong>{t(`${i18nKey}.badgeTitle`)}</strong>
          <span className="quiz-badge__cta">
            {t(`${i18nKey}.badgeCta`)}
            <span aria-hidden="true"> &rarr;</span>
          </span>
        </span>
      </a>
      <button
        type="button"
        className="quiz-badge__close"
        onClick={handleDismiss}
        aria-label={t('dismiss')}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default QuizBadge;
