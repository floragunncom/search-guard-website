import React from 'react';
import { useTranslation } from 'react-i18next';

const AnomalyDetectionCapabilities = () => {
  const { t } = useTranslation('anomalyDetection');

  const capabilities = [
    {
      icon: 'trending_up',
      headline: t('capabilities.spikes.headline'),
      text: t('capabilities.spikes.text'),
    },
    {
      icon: 'category',
      headline: t('capabilities.perEntity.headline'),
      text: t('capabilities.perEntity.text'),
    },
    {
      icon: 'history',
      headline: t('capabilities.historical.headline'),
      text: t('capabilities.historical.text'),
    },
    {
      icon: 'tune',
      headline: t('capabilities.customAggregations.headline'),
      text: t('capabilities.customAggregations.text'),
    },
    {
      icon: 'notifications_active',
      headline: t('capabilities.signalsAlerting.headline'),
      text: t('capabilities.signalsAlerting.text'),
    },
    {
      icon: 'settings_ethernet',
      headline: t('capabilities.restApi.headline'),
      text: t('capabilities.restApi.text'),
    },
  ];

  return (
    <div className="ad-capabilities-wrapper" id="capabilities">
      <h3 className="ad-capabilities-headline">{t('capabilities.headline')}</h3>
      <div className="row">
        {capabilities.slice(0, 3).map((cap, index) => (
          <div key={index} className="col s12 m4">
            <div className="ad-capability">
              <div className="ad-capability-icon">
                <i className="material-icons">{cap.icon}</i>
              </div>
              <h5 className="ad-capability-headline">{cap.headline}</h5>
              <div className="ad-capability-text">{cap.text}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="row">
        {capabilities.slice(3).map((cap, index) => (
          <div key={index} className="col s12 m4">
            <div className="ad-capability">
              <div className="ad-capability-icon">
                <i className="material-icons">{cap.icon}</i>
              </div>
              <h5 className="ad-capability-headline">{cap.headline}</h5>
              <div className="ad-capability-text">{cap.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnomalyDetectionCapabilities;
