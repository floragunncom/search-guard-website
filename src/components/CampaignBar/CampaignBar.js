import React from 'react';
import { useTranslation } from 'react-i18next';
import MiniPlate from './MiniPlate';
import {
  isDismissed,
  setDismissed,
  setSeen,
  isWithinWindow,
} from '../../utils/campaignState';

/**
 * The site-wide announcement bar, above the navbar on every page.
 *
 * Generic on purpose. It knows nothing about the anniversary quiz — it renders
 * whatever src/config/campaign.js hands it, and outlives any one campaign. See
 * that file for the lifecycle.
 *
 * MOUNT-THEN-REVEAL: the bar renders nothing on the server and nothing on the
 * first client render, then appears in an effect. That is deliberate. Whether it
 * should show depends on localStorage and on the current time, neither of which
 * exists at build time — and this site is a static export, so "server render"
 * means "whatever was true when CI ran". Rendering it into the HTML would show a
 * dismissed bar to people who closed it, and would keep showing an expired
 * campaign to anyone served a cached page. The cost is one layout shift at
 * hydration, which is the right trade here.
 *
 * It offsets the Materialize navbar rather than scrolling away with the page:
 * `.navbar-fixed nav` is position:fixed, so a bar in normal flow would simply be
 * covered by it. The measured height goes out as --sg-campaign-bar-h and the
 * SCSS pushes both the fixed nav and its placeholder down by that much. Measured
 * rather than hard-coded because the message wraps to two or three lines on a
 * phone.
 */
const CampaignBar = ({ campaign, onVisibilityChange }) => {
  const { t } = useTranslation('campaign');
  const [isVisible, setIsVisible] = React.useState(false);
  const barRef = React.useRef(null);

  const id = campaign?.id;
  const i18nKey = campaign?.i18nKey;

  // Decide visibility once, after mount, where localStorage and the real clock exist.
  React.useEffect(() => {
    if (!campaign || !isWithinWindow(campaign) || isDismissed(id)) {
      return undefined;
    }
    setIsVisible(true);
    // Records that the bar has had its turn, which is what releases the corner
    // badge to appear on the next page view.
    setSeen(id);
    return undefined;
  }, [campaign, id]);

  // Publish the bar's height so the fixed navbar can be pushed down by exactly
  // as much as the bar actually occupies, at any width.
  React.useLayoutEffect(() => {
    const root = document.documentElement;

    if (!isVisible || !barRef.current) {
      root.style.removeProperty('--sg-campaign-bar-h');
      root.classList.remove('has-campaign-bar');
      return undefined;
    }

    const node = barRef.current;
    const apply = () => {
      root.style.setProperty('--sg-campaign-bar-h', `${node.offsetHeight}px`);
    };

    apply();
    root.classList.add('has-campaign-bar');

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', apply);
      return () => {
        window.removeEventListener('resize', apply);
        root.style.removeProperty('--sg-campaign-bar-h');
        root.classList.remove('has-campaign-bar');
      };
    }

    const observer = new ResizeObserver(apply);
    observer.observe(node);
    return () => {
      observer.disconnect();
      root.style.removeProperty('--sg-campaign-bar-h');
      root.classList.remove('has-campaign-bar');
    };
  }, [isVisible]);

  React.useEffect(() => {
    if (onVisibilityChange) {
      onVisibilityChange(isVisible);
    }
  }, [isVisible, onVisibilityChange]);

  const handleDismiss = () => {
    setDismissed(id);
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  const tone = campaign.tone === 'navy' ? 'navy' : 'cyan';

  return (
    <div
      className={`campaign-bar campaign-bar--${tone}`}
      ref={barRef}
      role="region"
      aria-label={t(`${i18nKey}.regionLabel`)}
    >
      <div className="campaign-bar__inner">
        {campaign.plate ? <MiniPlate onDark={tone === 'navy'} /> : null}

        <p className="campaign-bar__msg">
          <strong>{t(`${i18nKey}.lead`)}</strong>{' '}
          <span className="campaign-bar__detail">{t(`${i18nKey}.detail`)}</span>
        </p>

        <a className="campaign-bar__cta" href={campaign.href}>
          {t(`${i18nKey}.cta`)}
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>

      <button
        type="button"
        className="campaign-bar__close"
        onClick={handleDismiss}
        aria-label={t('dismiss')}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default CampaignBar;
