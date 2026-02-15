import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import ImageTextTile from '../../components/Tiles/ImageTextTile/ImageTextTile';
import FilledDivider from '../../components/FilledDivider/FilledDivider';
import CTAAlerting from '../../components/CTA/CTAAlerting';
import PreFooter from '../../components/PreFooter/PreFooter';
import AnomalyDetectionHowItWorks from '../../components/AnomalyDetection/AnomalyDetectionHowItWorks';
import AnomalyDetectionCapabilities from '../../components/AnomalyDetection/AnomalyDetectionCapabilities';
import AnomalyDetectionBenefits from '../../components/AnomalyDetection/AnomalyDetectionBenefits';
import ad_machine_learning from '../../images/ad_machine_learning.svg';
import ad_historical from '../../images/ad_historical.svg';
import ad_cardinality from '../../images/ad_cardinality.svg';
import alertingNotifications from '../../images/alerting_notifications.svg';

const DOCS_ANOMALY_DETECTION_URL = 'https://docs.search-guard.com/latest/anomaly-detection';

const AnomalyDetection = () => {
  const breadcrumb = [
    { id: 1, anchor: '/', name: 'Home' },
    { id: 2, anchor: '/anomaly-detection/', name: 'Anomaly Detection' },
  ];

  return (
    <PageWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>AI-Powered Anomaly Detection for Elasticsearch | Search Guard</title>
        <link rel="canonical" href="https://search-guard.com/anomaly-detection/" />
        <meta
          name="description"
          content="Detect anomalies in Elasticsearch data with machine learning. No training data required. Real-time and historical detection with Kibana UI and REST API."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Search Guard Anomaly Detection',
            applicationCategory: 'SecurityApplication',
            operatingSystem: 'Linux, Windows, macOS',
            url: 'https://search-guard.com/anomaly-detection/',
            description:
              'AI-powered anomaly detection for Elasticsearch using unsupervised machine learning. Detect spikes, dips, and unusual patterns in real time with no training data required.',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
            },
          })}
        </script>
      </Helmet>

      <Title
        headline="AI-Powered Anomaly Detection for Elasticsearch"
        text="Detect unusual patterns in your Elasticsearch data using unsupervised machine learning. No training data needed. Search Guard Anomaly Detection learns what is normal and alerts you when something changes."
        breadcrumb={breadcrumb}
      />

      <div id="concept">
        <ImageTextTile
          icon={ad_machine_learning}
          iconPosition="left"
          colorschema="light"
          headline="Machine learning that works out of the box"
          text="
            Search Guard Anomaly Detection uses the Random Cut Forest algorithm, an unsupervised machine learning
            approach that requires no labeled training data. Point it at your Elasticsearch indices and it
            automatically learns normal data patterns. When behavior deviates from the norm, anomalies are
            flagged with a confidence score so you can focus on what matters most.
          "
        />
      </div>

      <ImageTextTile
        icon={ad_historical}
        iconPosition="right"
        colorschema="dark"
        headline="Real-time and historical detection"
        text="
          Run detectors continuously for live monitoring or analyze past data to uncover anomalies you may
          have missed. Configure detection intervals from minutes to hours and fine-tune window delays to
          handle late-arriving data. Whether you are watching live metrics or investigating an incident,
          anomaly detection adapts to your workflow.
        "
      />

      <ImageTextTile
        icon={ad_cardinality}
        iconPosition="left"
        colorschema="light"
        headline="High-cardinality detectors for granular insights"
        text="
          Not all anomalies happen at the aggregate level. Use category fields to automatically create
          individual detection models per entity, such as per IP address, hostname, user, or service.
          Monitor thousands of entities simultaneously and pinpoint exactly which dimension is causing
          the anomaly instead of searching through aggregated data.
        "
      />

      <ImageTextTile
        icon={alertingNotifications}
        iconPosition="right"
        colorschema="dark"
        headline="Built-in alerting integration"
        text="
          Connect your anomaly detectors directly to Signals Alerting watches. Define thresholds for anomaly
          grades and confidence levels, configure severity escalation, and get notified through Email, Slack,
          PagerDuty, JIRA, or webhooks. Monitor multiple detectors in a single watch or set up entity-specific
          alerts for high-cardinality detectors.
        "
      />

      <FilledDivider colorschema="white" />

      <AnomalyDetectionHowItWorks />

      <div id="capabilities">
        <AnomalyDetectionCapabilities />
      </div>

      <div id="benefits">
        <AnomalyDetectionBenefits />
      </div>

      <div className="row" style={{ padding: '32px 0' }}>
        <div className="col s12 center">
          <a
            href={DOCS_ANOMALY_DETECTION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-default-container"
          >
            <div className="button-large">View Anomaly Detection Documentation</div>
          </a>
        </div>
      </div>

      <div id="tryit" style={{ marginTop: '-64px' }}>
        <CTAAlerting colorschema="white" />
      </div>

      <PreFooter />
    </PageWrapper>
  );
};

export default AnomalyDetection;
