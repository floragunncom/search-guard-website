import React from 'react';

const AnomalyDetectionCapabilities = () => {
  const capabilities = [
    {
      icon: 'trending_up',
      headline: 'Spikes and Dips',
      text: 'Detect unexpected spikes, dips, or both in any metric. Fine-tune each feature to only flag the anomaly types that matter to your operations.',
    },
    {
      icon: 'category',
      headline: 'Per-Entity Detection',
      text: 'Use category fields to create high-cardinality detectors that monitor anomalies per IP address, hostname, user, or any other dimension in your data.',
    },
    {
      icon: 'history',
      headline: 'Historical Analysis',
      text: 'Analyze past data to uncover anomalies you may have missed. Run historical detectors over any time range to identify patterns and validate your detection strategy.',
    },
    {
      icon: 'tune',
      headline: 'Custom Aggregations',
      text: 'Go beyond built-in aggregations with custom Elasticsearch queries. Define exactly what to measure using the full power of Elasticsearch query DSL.',
    },
    {
      icon: 'notifications_active',
      headline: 'Signals Alerting',
      text: 'Connect anomaly detectors to Signals Alerting watches. Set thresholds and get notifications via Email, Slack, PagerDuty, JIRA, or webhooks.',
    },
    {
      icon: 'settings_ethernet',
      headline: 'Full REST API',
      text: 'Automate detector creation, management, and result retrieval with a comprehensive REST API. Integrate anomaly detection into your existing DevOps workflows.',
    },
  ];

  return (
    <div className="ad-capabilities-wrapper" id="capabilities">
      <h3 className="ad-capabilities-headline">Key capabilities</h3>
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
