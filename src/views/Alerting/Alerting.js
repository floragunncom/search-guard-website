import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import './Alerting.scss';
import { v4 } from 'uuid';
import { initGA, PageView } from '../../components/Tracking/Tracking';
import PreFooter from '../../components/PreFooter/PreFooter';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import TileSimple from '../../components/TileSimple/TileSimple';
import Cta from '../../components/Cta/Cta';
import AnchorNavBar from '../../components/AnchorNavBar/AnchorNavBar';
import ctaIcon from '../../images/icon-sg.svg';
import fileCode from '../../images/file-code.svg';
import worldLock from '../../images/world-lock.svg';
import alertingAnomalies from '../../images/alerting_anomalies.svg';
import alertingNotifications from '../../images/alerting_notifications.svg';
import alertingEscalation from '../../images/alerting_escalation.svg';
import alertingUI from '../../images/alerting_ui.svg';
import Card from "../../components/Card/Card";
import iconSpeaker from "../../images/icon-speaker.svg";
import iconNote from "../../images/icon-note.svg";

const Alerting = () => {
  useEffect(() => {
    initGA();
    PageView();
  }, []);

  const anchors = [
    { id: v4(), anchor: 'concept', name: 'what it is' },
    { id: v4(), anchor: 'connectors', name: 'connectors' },
    { id: v4(), anchor: 'escalationmodel', name: 'escalation model' },
    { id: v4(), anchor: 'quote', name: 'get a quote' },
  ];

  return (
      <PageWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
            Search Guard Alerting | Detect anomalies in your Elasticsearch cluster for free
        </title>
        <link rel="canonical" href="https://search-guard.com/alerting/" />
        <meta
          name="description"
          content="Signals Alerting detects data anomalies in your Elasticsearch cluster and sends notifications on various channels. Fully integrated with Search Guard Security. For free."
        />
      </Helmet>
      <Title
        headline="Signals Alerting for Elasticsearch"
        text="Signals Alerting detects data anomalies in your Elasticsearch cluster and sends notifications by using a fully fledged escalation model. Perfectly integrated with Search Guard Security."
      />
      <AnchorNavBar anchors={anchors} />
      <div id="concept">
        <TileSimple
          icon={alertingAnomalies}
          iconPosition="left"
          backgroundColor="light"
          headline="Anomaly detection"
          text="
            Signals Alerting can detect anomalies in data stored in Elasticsearch and other IT systems.
            Correlate your already existing Elasticsearch data with data from any REST endpoint, run calculations and statistics,
            and trigger notification if an anomaly was detected. Fully integrated with Search Guard Security.
          "
        />
      </div>
      <TileSimple
        icon={alertingNotifications}
        iconPosition="right"
        backgroundColor="dark"
        headline="Actions & Notifications"
        text="
            If an anomaly is detected you can use a wide range of connectors to trigger an action: Create messages on Slack, send out an email,
            trigger a Pager Duty event, open a JIRA issue, write data back to Elasticsearch or post to a Webhook. Signals supports multiple
            connectors per Alert.
        "
      />
      <TileSimple
        icon={alertingEscalation}
        iconPosition="left"
        backgroundColor="light"
        headline="Escalation levels"
        text="
            The Signals Alerting escalation model makes it possible to tailor notifications and actions to your specific use case. Define how often
            notifications are sent to which connector, configure different thresholds and escalation levels and trigger one or more actions for each level.
            If a detected anomaly is resolved, you can send out additional notfications as well.
        "
      />
        <TileSimple
            icon={alertingUI}
            iconPosition="right"
            backgroundColor="dark"
            headline="User Interface & REST API"
            text="
            Signals Alerting ships with a fully fledged Kibana user interface which only requires a couple of clicks to set up alerts. You can use the
            Graph mode, Blocks mode or JSON mode based on the complexity of your use case. The extensive REST API makes it possible to fully
            automate configuration.

        "
        />



        <div className="certified-wrapper" id="connectors">
            <div className="certified-headline">Connectors</div>
            <div className="row certified-row-wrapper">
                <div className="col s12 m4">
                    <a
                        href="https://docs.search-guard.com/latest/elasticsearch-alerting-actions-email"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="certified-col-img"
                    >
                        <i className="material-icons md-96 md-dark">mail_outline</i>
                    </a>
                    <div className="certified-col-headline">Email</div>
                    <div className="certified-col-text">
                        Send out Email notifications by connecting to any
                        SMTP provider. Supports TLS, StartTLS, Proxies and
                        default fields.
                    </div>
                </div>
                <div className="col s12 m4">
                    <a
                        href="https://docs.search-guard.com/latest/elasticsearch-alerting-actions-slack"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="certified-col-img"
                    >
                        <i className="material-icons md-96 md-dark">message</i>
                    </a>
                    <div className="certified-col-headline">
                        Slack
                    </div>
                    <div className="certified-col-text">
                        Inform your team or individuals about anomalies by sending out
                        a message on Slack.
                    </div>
                </div>
                <div className="col s12 m4">
                    <a
                        href="https://docs.search-guard.com/latest/elasticsearch-alerting-actions-pagerduty"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="certified-col-img"
                    >
                        <i className="material-icons md-96 md-dark">phone_callback</i>
                    </a>
                    <div className="certified-col-headline">
                        PagerDuty
                    </div>
                    <div className="certified-col-text">
                        Open PagerDuty incidents from Signals Alerting automatically. The connnector supports resolving incidents
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
                        className="certified-col-img"
                    >
                        <i className="material-icons md-96 md-dark">people_alt</i>
                    </a>
                    <div className="certified-col-headline">JIRA</div>
                    <div className="certified-col-text">
                        Create, open or resolve JIRA issues based on the state of an alert. Supports labels, components, priorities and subtasks.
                    </div>
                </div>
                <div className="col s12 m4">
                    <a
                        href="https://docs.search-guard.com/latest/elasticsearch-alerting-actions-webhook"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="certified-col-img"
                    >
                        <i className="material-icons md-96 md-dark">http</i>
                    </a>
                    <div className="certified-col-headline">Webhooks</div>
                    <div className="certified-col-text">
                        Post data generated by an alert to any system that supports Webhooks. Includes full control over
                        all HTTP headers.
                    </div>
                </div>
                <div className="col s12 m4">
                    <a
                        href="https://docs.search-guard.com/latest/elasticsearch-alerting-actions-index"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="certified-col-img"
                    >
                        <i className="material-icons md-96 md-dark">storage</i>
                    </a>
                    <div className="certified-col-headline">Elasticsearch</div>
                    <div className="certified-col-text">
                        Write any data back to a local or remote Elasticsearch index for building time-series based datapoints.

                    </div>
                </div>
            </div>
        </div>




          <div id="escalationmodel">
              <Card
                  bgLeftDark={false}
                  iconLeft={iconSpeaker}
                  iconRight={iconNote}
                  headlineLeft="Escalation by Severity Levels"
                  headlineRight="Resolve Notifications"
                  textLeft="Define severity levels and get notified on different channels for different levels. Send out Slack notifications for error conditions, and additional Email and PagerDuty alerts for critical conditions."
                  textRight="A critical system condition is hopefully just temporary: Get notified once an alert is resolved and everything is back to normal."
              />
          </div>

          <div className="alerting-wrapper" >

              <div className="row alerting">
                  <div className="alerting-headline">Free Alerting for Elasticsearch.<br />Bundled and integrated with Search Guard.</div>

                  <div className="alerting-section" >
                      <div className="alerting-content">
                          <div className="alerting-content-headline">
                              Single download and install
                          </div>
                          <div className="alerting-content-text">
                              Signals Alerting is bundled with any Search Guard download for Elasticsearch > 7.4. A single plugin install
                              that provides both Security and Alerting features. It was never easier to supercharge your Elasticsearch cluster
                          </div>
                      </div>
                  </div>

                  <div className="alerting-section" >
                      <div className="alerting-content">
                          <div className="alerting-content-headline">
                              Free Community Edition - forever
                          </div>
                          <div className="alerting-content-text">
                              The Community Edition of Signals Alerting is free and will always be. Signals Alerting is ASL2 licensed, so you can use
                              it for any project, commercial or other, and even bundle it with your own projects.
                          </div>
                      </div>
                  </div>

                  <div className="alerting-section" >
                      <div className="alerting-content">
                          <div className="alerting-content-headline">
                              Fully integrated with Search Guard Security
                          </div>
                          <div className="alerting-content-text">
                              Signals Alerting is fully integrated with all Search Guard Security features. Control access to alerts, configure
                              who can receive notifications, separate alert access by using Search Guard Multi Tenancy and leverage advanced features like
                              Document- and Field-level security.
                          </div>
                      </div>
                  </div>

              </div>
          </div>

      <div id="quote">
        <Cta
          headline="Give Signals Alerting a spin!"
          text="Follow these simple steps to install Signals Alerting to your Elasticsearch cluster. "
          ctaText="Installation"
          icon={ctaIcon}
          link="/search-guard-free-trial/"
        />
      </div>
      <PreFooter />
    </PageWrapper>
  );
};

export default Alerting;
