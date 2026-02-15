import React from 'react';

const AnomalyDetectionHowItWorks = () => {
  const steps = [
    {
      number: 1,
      headline: 'Create a Detector',
      text: 'Point your detector to any Elasticsearch index. Apply filters to focus on the data that matters and set a detection interval that fits your use case.',
    },
    {
      number: 2,
      headline: 'Define Features',
      text: 'Choose from built-in aggregations like average, count, sum, min, or max. Need more control? Use custom Elasticsearch queries to define exactly what to monitor.',
    },
    {
      number: 3,
      headline: 'Detect and Act',
      text: 'Start real-time or historical detection. View anomaly scores and breakdowns in the Kibana UI, and connect to Signals Alerting for automated notifications.',
    },
  ];

  return (
    <div className="ad-how-it-works-wrapper" id="howitworks">
      <h3 className="ad-how-it-works-headline">How it works</h3>
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
