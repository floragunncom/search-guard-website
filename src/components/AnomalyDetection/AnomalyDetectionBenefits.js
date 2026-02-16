import React from 'react';
import { useTranslation } from 'react-i18next';
import ColumnedTile from '../Tiles/ColumnedTile/ColumnedTile';

const AnomalyDetectionBenefits = () => {
  const { t } = useTranslation('anomalyDetection');

  const benefits = [
    {
      headline: t('benefits.security.headline'),
      text: t('benefits.security.text'),
      button: {
        text: t('benefits.security.button'),
        href: 'https://docs.search-guard.com/latest/anomaly-detection-security',
        target: '_blank',
      },
    },
    {
      headline: t('benefits.performance.headline'),
      text: t('benefits.performance.text'),
      button: {
        text: t('benefits.performance.button'),
        href: 'https://docs.search-guard.com/latest/anomaly-detection-settings',
        target: '_blank',
      },
    },
    {
      headline: t('benefits.setup.headline'),
      text: t('benefits.setup.text'),
      button: {
        text: t('benefits.setup.button'),
        href: 'https://docs.search-guard.com/latest/anomaly-detection-getting-started',
        target: '_blank',
      },
    },
  ];

  return (
    <ColumnedTile
      colorschema="light"
      wrapperclass="default-padding-top-bottom"
      columns={benefits}
      headline={t('benefits.headline')}
    />
  );
};

export default AnomalyDetectionBenefits;
