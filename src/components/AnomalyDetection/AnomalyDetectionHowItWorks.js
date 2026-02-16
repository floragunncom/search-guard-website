import React from 'react';
import { useTranslation } from 'react-i18next';

const AnomalyDetectionHowItWorks = () => {
  const { t } = useTranslation('anomalyDetection');

  const steps = [
    {
      number: 1,
      headline: t('howItWorks.step1.headline'),
      text: t('howItWorks.step1.text'),
    },
    {
      number: 2,
      headline: t('howItWorks.step2.headline'),
      text: t('howItWorks.step2.text'),
    },
    {
      number: 3,
      headline: t('howItWorks.step3.headline'),
      text: t('howItWorks.step3.text'),
    },
  ];

  return (
    <div className="ad-how-it-works-wrapper" id="howitworks">
      <h3 className="ad-how-it-works-headline">{t('howItWorks.headline')}</h3>
      <div className="row">
        {steps.map((step) => (
          <div key={step.number} className="col s12 m4">
            <div className="ad-step">
              <div className="ad-step-number">{step.number}</div>
              <h5 className="ad-step-headline">{step.headline}</h5>
              <div className="ad-step-text">{step.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnomalyDetectionHowItWorks;
