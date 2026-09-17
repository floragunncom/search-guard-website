import React from 'react';
import { useTranslation } from 'react-i18next';
import MiniPlate from '../CampaignBar/MiniPlate';
import { isWithinWindow } from '../../utils/campaignState';

/**
 * The homepage band for the anniversary quiz — the campaign's prominent
 * placement, sitting directly under the hero.
 *
 * Cyan on purpose. Cyan appears everywhere else on the site as buttons and
 * small accents but never as a section background, and the two sections either
 * side of this one are already mint and navy. So the loudness comes from being
 * the one colour nothing else uses, rather than from anything outside the
 * palette.
 *
 * RENDERS SERVER-SIDE, unlike CampaignBar and QuizBadge. Those two are small
 * overlays whose visibility depends on a dismissal, so hiding them until after
 * hydration costs nothing. This is a ~200px block of page content: appearing
 * late would shove the whole homepage down a frame after load. So it ships in
 * the static HTML and only *removes* itself on the client if the campaign has
 * expired — which covers a CDN-cached page served after 20 Oct. During the
 * campaign, the common case, there is no layout shift at all.
 *
 * It also deliberately ignores the campaign dismissal that silences the bar and
 * badge. Those interrupt; this is a section of the homepage, with no close
 * button. Someone who waved away a floating chip has not asked us to restructure
 * the page.
 *
 * Deleting this component and its <AnniversaryBand/> line in HomePage.js is what
 * returns the homepage to its original state after the draw closes.
 */
const AnniversaryBand = ({ campaign }) => {
  const { t } = useTranslation('campaign');
  // Starts visible so the static HTML and the first client render agree.
  const [hasExpired, setHasExpired] = React.useState(false);

  React.useEffect(() => {
    if (campaign && !isWithinWindow(campaign)) {
      setHasExpired(true);
    }
  }, [campaign]);

  if (!campaign || !campaign.band || hasExpired) {
    return null;
  }

  const i18nKey = campaign.i18nKey;

  return (
    <div className="anniversary-band">
      <div className="anniversary-band__inner">
        <MiniPlate />

        <div className="anniversary-band__copy">
          <h2 className="anniversary-band__headline">{t(`${i18nKey}.bandHeadline`)}</h2>
          <p className="anniversary-band__sub">{t(`${i18nKey}.bandSub`)}</p>
        </div>

        <a className="anniversary-band__cta" href={campaign.href}>
          {t(`${i18nKey}.bandCta`)}
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>
    </div>
  );
};

export default AnniversaryBand;
