import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet';
import './Alerting.scss';
import {initGA, PageView} from '../../components/Tracking/Tracking';
import PreFooter from '../../components/PreFooter/PreFooter';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import ImageTextTile from '../../components/Tiles/ImageTextTile/ImageTextTile';
import alertingAnomalies from '../../images/alerting_anomalies.svg';
import alertingNotifications from '../../images/alerting_notifications.svg';
import alertingEscalation from '../../images/alerting_escalation.svg';
import alertingUI from '../../images/alerting_ui.svg';
import iconSpeaker from "../../images/bullhorn-solid.svg";
import FilledDivider from '../../components/FilledDivider/FilledDivider';
import AlertingNotificationModel from '../../components/Alerting/AlertingNotificationModel';
import certificate from "../../images/clipboard-check-solid.svg";
import CTAAlerting from "../../components/CTA/CTAAlerting";

const Alerting = () => {
    useEffect(() => {
        initGA();
        PageView();
    }, []);

    const breadcrumb = [
        {id: 1, anchor: '/', name: 'Home'},
        {id: 1, anchor: '/alerting/', name: 'Alerting'},
    ];

    let notificationmodel = [
        {
            headline: "Escalation by Severity Levels",
            text: "Define severity levels and get notified on different channels for different levels. Send out Slack notifications for error conditions, and additional Email and PagerDuty alerts for critical conditions.",
            image: {
                src: certificate,
                width: 150,
                height: 150,
            },
        },
        {
            headline: "Resolve Notifications",
            text: "A critical system condition is hopefully just temporary: Get notified once an alert is resolved and everything is back to normal.",
            image: {
                src: iconSpeaker,
                width: 150,
                height: 150,
            },
        },
    ]


    return (
        <PageWrapper>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>
                    Free Elasticsearch and Kibana Alerting| Search Guard
                </title>
                <link rel="canonical" href="https://search-guard.com/alerting/"/>
                <meta
                    name="description"
                    content="Signals Alerting for Elasticsearch and Kibana detects data anomalies in your Elasticsearch cluster and sends notifications on various channels. Fully integrated with Search Guard Security. For free."
                />
            </Helmet>
            <Title
                headline="Alerting for Elasticsearch and Kibana"
                text="Signals Alerting for Elasticsearch and Kibana detects data anomalies in your Elasticsearch cluster and sends notifications on various channels. Fully integrated with Search Guard Security. For free."
                breadcrumb={breadcrumb}
            />
            <div id="concept">
                <ImageTextTile
                    icon={alertingAnomalies}
                    iconPosition="left"
                    colorschema="light"
                    headline="Elasticsearch Anomaly detection"
                    text="
            Signals Alerting for Elasticsearch can detect anomalies in data stored in Elasticsearch and other IT systems.
            Correlate your already existing Elasticsearch data with data from any REST endpoint, run calculations and statistics,
            and trigger notification if an anomaly was detected. Fully integrated with Search Guard Security.
          "
                />
            </div>
            <ImageTextTile
                icon={alertingNotifications}
                iconPosition="right"
                colorschema="dark"
                headline="Elasticsearch Actions & Notifications"
                text="
            If an anomaly is detected in your Elasticsearch data you can use a wide range of connectors send alerting notifications: Create messages on Slack, send out an email,
            trigger a Pager Duty event, open a JIRA issue, write data back to Elasticsearch or post to a Webhook. Supports multiple
            connectors per Alert.
        "
            />
            <ImageTextTile
                icon={alertingEscalation}
                iconPosition="left"
                colorschema="light"
                headline="Escalation levels"
                text="
            The Signals Alerting for Elasticsearch escalation model makes it possible to tailor notifications and actions to your specific use case. Define how often
            alerts are sent to which connector, configure different thresholds and escalation levels and trigger one or more alerts for each level.
            If a detected anomaly is resolved, you can send out additional notifications as well.
        "
            />
            <ImageTextTile
                icon={alertingUI}
                iconPosition="right"
                colorschema="dark"
                headline="Kibana Alerting UI & REST API"
                text="
        Signals Alerting for Elasticsearch ships with a fully fledged Kibana user interface which only requires a couple of clicks to set up alerts.
        You can use the Graph mode, Blocks mode or JSON mode based on the complexity of your use case. Use the extensive REST API to fully
        automate your alerts configuration.
    "
            />
            <FilledDivider colorschema="white"/>

            <div className="alerting-wrapper alerting-connectors-wrapper" id="connectors">
                <h3 className="alerting-connectors-headline">Connectors</h3>
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
                        <h5 className="alering-col-headline">Email</h5>
                        <div className="body1 alerting-col-text">
                            Send out Email notifications from Elasticsearch and Kibana by connecting to any
                            SMTP provider. Supports TLS, StartTLS, Proxies and
                            default fields.
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
                            Slack
                        </h5>
                        <div className="body1 alerting-col-text">
                            Inform your team or individuals about anomalies by sending out
                            a message on Slack.
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
                            PagerDuty
                        </h5>
                        <div className="body1 alerting-col-text">
                            Open PagerDuty incidents from Signals Alerting automatically. The connnector supports
                            resolving incidents
                            in PagerDuty as soon as the watch has left alert state.
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
                        <h5 className="alering-col-headline">JIRA</h5>
                        <div className="body1 alerting-col-text">
                            Create, open or resolve JIRA issues based on the state of an alert. Supports labels,
                            components, priorities and subtasks.
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
                        <h5 className="alering-col-headline">Webhooks</h5>
                        <div className="body1 alerting-col-text">
                            Post data generated by an alert to any system that supports Webhooks. Includes full control
                            over
                            all HTTP headers.
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
                        <h5 className="alering-col-headline">Elasticsearch</h5>
                        <div className="body1 alerting-col-text">
                            Write any data back to a local or remote Elasticsearch index for building time-series based
                            datapoints.
                        </div>
                    </div>
                </div>
            </div>
            <div id="escalationmodel">
                <AlertingNotificationModel/>
            </div>
            <div className="alerting-wrapper">
                <h3 className="alerting-headline">Free Alerting for Elasticsearch and Kibana.<br/>Bundled and integrated
                    with Search Guard.</h3>
                <div className="row alerting-row">
                    <div className="col s12 m4">
                        <div className="alerting-section">
                            <div className="alerting-content">
                                <h5 className="alerting-content-headline">
                                    Elasticsearch and Kibana Alerting for free
                                </h5>
                                <div className="body1 alerting-content-text">
                                    Signals provides free alerting for Elasticsearch and Kibana.
                                    The <a href="https://git.floragunn.com/search-guard/search-guard-suite-enterprise"
                                           target="_blank" rel="noopener noreferrer">Community Edition of Signals
                                    Alerting is ASL2 licensed</a>, and will always be. You can use
                                    it for any project, commercial or other, and even bundle it with your own projects.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col s12 m4">
                        <div className="alerting-section">
                            <div className="alerting-content">
                                <h5 className="alerting-content-headline">
                                    Fully integrated with Search Guard Security
                                </h5>
                                <div className="body1 alerting-content-text">
                                    Signals Alerting is fully integrated with all Search Guard Security features.
                                    Control access to alerts, configure
                                    who can receive notifications, separate alert access by using Search Guard Multi
                                    Tenancy and leverage advanced features like
                                    Document- and Field-level security.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col s12 m4">
                        <div className="alerting-section">
                            <div className="alerting-content">
                                <h5 className="alerting-content-headline">
                                    Single download and install
                                </h5>
                                <div className="body1 alerting-content-text">
                                    Signals Alerting is bundled with any Search Guard download for Elasticsearch >
                                    7.4. <a href="/search-guard-free-trial/">A single plugin install</a> that
                                    provides both Security and Alerting features. It was never easier to supercharge
                                    your Elasticsearch cluster
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="tryit">
                <CTAAlerting colorschema="white"/>
            </div>
            <PreFooter/>
        </PageWrapper>
    );
};

export default Alerting;
