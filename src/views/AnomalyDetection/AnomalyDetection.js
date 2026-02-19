import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
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
import { toAbsoluteSiteUrl, toLocalePath } from '../../utils/urlUtils';

const DOCS_ANOMALY_DETECTION_URL = 'https://docs.search-guard.com/latest/anomaly-detection';

const AnomalyDetection = () => {
  const { t, i18n } = useTranslation('anomalyDetection');
  const locale = i18n?.resolvedLanguage || i18n?.language || 'en';

  const breadcrumb = [
    { id: 1, anchor: toLocalePath('/', locale), name: t('breadcrumb.home') },
    { id: 2, anchor: toLocalePath('/anomaly-detection/', locale), name: t('breadcrumb.anomalyDetection') },
  ];

  return (
    <PageWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t('meta.title')}</title>
        <meta
          name="description"
          content={t('meta.description')}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Search Guard Anomaly Detection',
            applicationCategory: 'SecurityApplication',
            operatingSystem: 'Linux, Windows, macOS',
            url: toAbsoluteSiteUrl('/anomaly-detection/', locale),
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
        headline={t('title.headline')}
        text={t('title.text')}
        breadcrumb={breadcrumb}
      />

      <div id="concept">
        <ImageTextTile
          icon={ad_machine_learning}
          iconPosition="left"
          colorschema="light"
          headline={t('concept.headline')}
          text={t('concept.text')}
        />
      </div>

      <ImageTextTile
        icon={ad_historical}
        iconPosition="right"
        colorschema="dark"
        headline={t('historical.headline')}
        text={t('historical.text')}
      />

      <ImageTextTile
        icon={ad_cardinality}
        iconPosition="left"
        colorschema="light"
        headline={t('cardinality.headline')}
        text={t('cardinality.text')}
      />

      <ImageTextTile
        icon={alertingNotifications}
        iconPosition="right"
        colorschema="dark"
        headline={t('alerting.headline')}
        text={t('alerting.text')}
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
            <div className="button-large">{t('docsButton')}</div>
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
