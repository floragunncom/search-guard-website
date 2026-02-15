import React from 'react';
import ColumnedTile from '../Tiles/ColumnedTile/ColumnedTile';

const AnomalyDetectionBenefits = () => {
  const benefits = [
    {
      headline: 'Fully integrated with Search Guard Security',
      text: 'Anomaly Detection is fully integrated with Search Guard role-based access control. Define who can create and manage detectors, and separate access using Search Guard tenancy and document-level security.',
      button: {
        text: 'View Security Docs',
        href: 'https://docs.search-guard.com/latest/anomaly-detection-security',
        target: '_blank',
      },
    },
    {
      headline: 'Enterprise-grade performance',
      text: 'Run up to 1,000 single-entity detectors and 10 high-cardinality detectors simultaneously. Built-in resource management protects your cluster with automatic memory limits and JVM safeguards.',
      button: {
        text: 'View Configuration',
        href: 'https://docs.search-guard.com/latest/anomaly-detection-settings',
        target: '_blank',
      },
    },
    {
      headline: 'Quick and easy setup',
      text: 'Get started in minutes with a straightforward installation process. Comprehensive documentation and sensible defaults let you deploy your first anomaly detector right away, with fine-tuning options for production workloads.',
      button: {
        text: 'Getting Started',
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
      headline="Built for production Elasticsearch clusters"
    />
  );
};

export default AnomalyDetectionBenefits;
