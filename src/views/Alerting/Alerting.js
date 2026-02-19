import React from 'react';
import {Helmet} from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import PreFooter from '../../components/PreFooter/PreFooter';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import ImageTextTile from '../../components/Tiles/ImageTextTile/ImageTextTile';
import alertingAnomalies from '../../images/alerting_anomalies.svg';
import alertingNotifications from '../../images/alerting_notifications.svg';
import alertingEscalation from '../../images/alerting_escalation.svg';
import alertingUI from '../../images/alerting_ui.svg';
import FilledDivider from '../../components/FilledDivider/FilledDivider';
import AlertingNotificationModel from '../../components/Alerting/AlertingNotificationModel';
import CTAAlerting from "../../components/CTA/CTAAlerting";
import AlertingBenefits from "../../components/Alerting/AlertingBenefits";
import { toAbsoluteSiteUrl, toLocalePath } from '../../utils/urlUtils';

const Alerting = () => {
    const { t, i18n } = useTranslation('alerting');
    const locale = i18n?.resolvedLanguage || i18n?.language || 'en';

    const breadcrumb = [
        {id: 1, anchor: toLocalePath('/', locale), name: t('breadcrumb.home')},
        {id: 2, anchor: toLocalePath('/alerting/', locale), name: t('breadcrumb.alerting')},
    ];

    return (
        <PageWrapper>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>
                    {t('meta.title')}
                </title>
                <meta
                    name="description"
                    content={t('meta.description')}
                />
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'SoftwareApplication',
                        name: 'Search Guard Signals',
                        applicationCategory: 'SecurityApplication',
                        operatingSystem: 'Linux, Windows, macOS',
                        url: toAbsoluteSiteUrl('/alerting/', locale),
                        description: 'Alerting for Elasticsearch and Kibana with anomaly detection, escalation levels, and connectors like email, Slack, PagerDuty, JIRA and webhooks.',
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
                    icon={alertingAnomalies}
                    iconPosition="left"
                    colorschema="light"
                    headline={t('concept.headline')}
                    text={t('concept.text')}
                />
            </div>
            <ImageTextTile
                icon={alertingNotifications}
                iconPosition="right"
                colorschema="dark"
                headline={t('notifications.headline')}
                text={t('notifications.text')}
            />
            <ImageTextTile
                icon={alertingEscalation}
                iconPosition="left"
                colorschema="light"
                headline={t('escalation.headline')}
                text={t('escalation.text')}
            />
            <ImageTextTile
                icon={alertingUI}
                iconPosition="right"
                colorschema="dark"
                headline={t('ui.headline')}
                text={t('ui.text')}
            />
            <FilledDivider colorschema="white"/>

            <div className="alerting-wrapper alerting-connectors-wrapper" id="connectors">
                <h3 className="alerting-connectors-headline">{t('connectors.headline')}</h3>
                <div className="row alerting-connectors-row-wrapper">
                    <div className="col s12 m4">
                        <a
                            href="https://docs.search-guard.com/latest/elasticsearch-alerting-actions-email"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="alerting-col-img"
                        >
                            <i className="material-icons md-96 md-dark alerting-icon">mail_outline</i>
                        </a>
                        <h5 className="alering-col-headline">{t('connectors.email.title')}</h5>
                        <div className="alerting-col-text">
                            {t('connectors.email.text')}
                        </div>
                    </div>
                    <div className="col s12 m4">
                        <a
                            href="https://docs.search-guard.com/latest/elasticsearch-alerting-actions-slack"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="alerting-col-img"
                        >
                            <i className="material-icons md-96 md-dark alerting-icon">message</i>
                        </a>
                        <h5 className="alering-col-headline">
                            {t('connectors.slack.title')}
                        </h5>
                        <div className="alerting-col-text">
                            {t('connectors.slack.text')}
                        </div>
                    </div>
                    <div className="col s12 m4">
                        <a
                            href="https://docs.search-guard.com/latest/elasticsearch-alerting-actions-pagerduty"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="alerting-col-img"
                        >
                            <i className="material-icons md-96 md-dark alerting-icon">phone_callback</i>
                        </a>
                        <h5 className="alering-col-headline">
                            {t('connectors.pagerduty.title')}
                        </h5>
                        <div className="alerting-col-text">
                            {t('connectors.pagerduty.text')}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 m4">
                        <a
                            href="https://docs.search-guard.com/latest/elasticsearch-alerting-actions-jira"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="alerting-col-img"
                        >
                            <i className="material-icons md-96 md-dark alerting-icon">people_alt</i>
                        </a>
                        <h5 className="alering-col-headline">{t('connectors.jira.title')}</h5>
                        <div className="alerting-col-text">
                            {t('connectors.jira.text')}
                        </div>
                    </div>
                    <div className="col s12 m4">
                        <a
                            href="https://docs.search-guard.com/latest/elasticsearch-alerting-actions-webhook"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="alerting-col-img"
                        >
                            <i className="material-icons md-96 md-dark alerting-icon">http</i>
                        </a>
                        <h5 className="alering-col-headline">{t('connectors.webhooks.title')}</h5>
                        <div className="alerting-col-text">
                            {t('connectors.webhooks.text')}
                        </div>
                    </div>
                    <div className="col s12 m4">
                        <a
                            href="https://docs.search-guard.com/latest/elasticsearch-alerting-actions-index"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="alerting-col-img"
                        >
                            <i className="material-icons md-96 md-dark alerting-icon">storage</i>
                        </a>
                        <h5 className="alering-col-headline">{t('connectors.elasticsearch.title')}</h5>
                        <div className="alerting-col-text">
                            {t('connectors.elasticsearch.text')}
                        </div>
                    </div>
                </div>
            </div>
            <div id="escalationmodel">
                <AlertingNotificationModel/>
            </div>
            <div id="benefits">
                <AlertingBenefits/>
            </div>
            <div id="tryit">
                <CTAAlerting colorschema="white"/>
            </div>
            <PreFooter/>
        </PageWrapper>
    );
};

export default Alerting;
