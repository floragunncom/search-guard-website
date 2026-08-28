import React from 'react';
import {useTranslation} from 'react-i18next';
import since from '../../images/clock-rotate-left-solid.svg';
import cve from '../../images/fingerprint-solid.svg';
import memberships from '../../images/certificate-solid.svg';
import germany from '../../images/location-dot-solid.svg';
import ColumnedTile from "../../components/Tiles/ColumnedTile/ColumnedTile";

// Trust bar (redesign Task 4) — replaces the old Labels component.
const TrustBar = () => {
  const { t } = useTranslation('home');

  let content = [
    {
      headline: t('trustbar.since.headline'),
      text: t('trustbar.since.text'),
      image: {
        src: since,
        width: 150,
        height: 150,
      },
    },
    {
      headline: t('trustbar.cve.headline'),
      text: t('trustbar.cve.text'),
      image: {
        src: cve,
        width: 150,
        height: 150,
      },
    },
    {
      headline: t('trustbar.memberships.headline'),
      text: t('trustbar.memberships.text'),
      image: {
        src: memberships,
        width: 150,
        height: 150,
      },
    },
    {
      headline: t('trustbar.germany.headline'),
      text: t('trustbar.germany.text'),
      image: {
        src: germany,
        width: 150,
        height: 150,
      },
    },
  ]

  return (
      <ColumnedTile
          colorschema="white"
          wrapperclass="default-padding-top-bottom labels-section"
          alignedHeadlines
          headline={t('trustbar.headline')}
          columns={content}
      />
  );
};

export default TrustBar;
