import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import './Compliance.scss';
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
import complianceDataChanges from '../../images/compliance_change_tracking.svg';
import complianceFailedLogins from '../../images/compliance_failed_logins.svg';
import complianceEscalation from '../../images/alerting_escalation.svg';
import complianceUI from '../../images/alerting_ui.svg';
import Card from "../../components/Card/Card";
import iconSpeaker from "../../images/icon-speaker.svg";
import iconNote from "../../images/icon-note.svg";
import certificate from "../../images/icon-certificate.svg";
import shieldWheel from "../../images/shield-wheel.svg";
import check from "../../images/icon-check.svg";
import lock from '../../images/tile-icon-wheel.svg';

const Compliance = () => {
  useEffect(() => {
    initGA();
    PageView();
  }, []);

  const anchors = [
    { id: v4(), anchor: 'concept', name: 'what it is' },
    { id: v4(), anchor: 'connectors', name: 'connectors' },
    { id: v4(), anchor: 'escalationmodel', name: 'escalation model' },
    { id: v4(), anchor: 'tryit', name: 'Try it' },
  ];

  return (
      <PageWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
            Elasticsearch Compliance | Stay compliant with GDPR, HIPAA, PCI, SOX and ISO
        </title>
        <link rel="canonical" href="https://search-guard.com/compliance/" />
        <meta
          name="description"
          content="Keep your Elasticsearch and Kibana stack compliant with regulations like GDPR, PCI, SOX, HIPAA and ISO by using Search Guard"
        />
      </Helmet>
      <Title
        headline="Compliance for Elasticsearch"
        text="Keep your Elasticsearch and Kibana stack compliant with regulations like GDPR, PCI, SOX, HIPAA and ISO"
      />
      <AnchorNavBar anchors={anchors} />


          <div className="alerting-wrapper" >

              <div className="row alerting">
                  <div className="alerting-headline">Search Guard Compliance Edition</div>
                  <div className="alerting-content-text">
                        While the importance of data privacy is ever increasing, the burden that compliance regulations like
                        GDPR, PCI, HIPAA or SOX put on CISOs and IT operators is high.
                        <br /><br  />
                        The Search Guard Compliance Edition offers features that make it easy to implement compliance rules and
                        regulations for any Elasticsearch cluster.
                  </div>
              </div>
          </div>

          <div className="securityinfo-wrapper" id="concept">
              <div className="row">

                  <div className="col s12 m4">
                      <div className="securityinfo-icon-wrapper">
                          <img src={check} alt="checkmark icon" />
                      </div>
                      <div className="securityinfo-text-wrapper">
                          <div className="securityinfo-headline">Data Encryption</div>
                          <div className="securityinfo-content">
                              Search Guard encrypts all the traffic inside your Elasticsearch cluster, shields from data breaches and ensures the
                              integrity of your data.
                          </div>
                      </div>
                  </div>

                  <div className="col s12 m4">
                      <div className="securityinfo-icon-wrapper">
                          <img src={shieldWheel} alt="certificate icon" />
                      </div>
                      <div className="securityinfo-text-wrapper">
                          <div className="securityinfo-headline">Data Anonymization</div>
                          <div className="securityinfo-content">
                              Search Guard provides role-based access control to all data stored in your Elasticsearch cluster.
                              Control exactly which users can access PII or other sensitive data in cleartext or anonymized.
                          </div>
                      </div>
                  </div>

                  <div className="col s12 m4">
                      <div className="securityinfo-icon-wrapper">
                          <img src={shieldWheel} alt="shield icon" />
                      </div>
                      <div className="securityinfo-text-wrapper">
                          <div className="securityinfo-headline">Audit Trails</div>
                          <div className="securityinfo-content">
                              Search Guard generates audit trails on who has created, modified, accessed and deleted PII and other sensitive
                              data in your Elasticsearch cluster.
                          </div>
                      </div>
                  </div>
              </div>
          </div>



      <div id="concept">
        <TileSimple
          icon={lock}
          iconPosition="right"
          backgroundColor="light"
          headline="Fine-grained access control to all your data"
          text="
            Search Guard blocks any unauthorized access to any information inside Elasticsearch. With our fine-grained role-based
            access controls you are always in control over your data.
          "
        />
      </div>
      <TileSimple
        icon={complianceDataChanges}
        iconPosition="left"
        backgroundColor="dark"
        headline="Access tracking and change tracking"
        text="
            You need to ne
        "
      />
      <TileSimple
        icon={complianceEscalation}
        iconPosition="right"
        backgroundColor="light"
        headline="Right to be forgotten"
        text="
            The Signals compliance escalation model makes it possible to tailor notifications and actions to your specific use case. Define how often
            notifications are sent to which connector, configure different thresholds and escalation levels and trigger one or more actions for each level.
            If a detected anomaly is resolved, you can send out additional notfications as well.
        "
      />
        <TileSimple
            icon={complianceUI}
            iconPosition="right"
            backgroundColor="dark"
            headline="User Interface & REST API"
            text="
            Signals compliance ships with a fully fledged Kibana user interface which only requires a couple of clicks to set up alerts. You can use the
            Graph mode, Blocks mode or JSON mode based on the complexity of your use case. The extensive REST API makes it possible to fully
            automate configuration.

        "
        />



        <div className="certified-wrapper" id="connectors">
            <div className="certified-headline">Connectors</div>
            <div className="row certified-row-wrapper">
                <div className="col s12 m4">
                    <a
                        href="https://docs.search-guard.com/latest/elasticsearch-compliance-actions-email"
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
                        href="https://docs.search-guard.com/latest/elasticsearch-compliance-actions-slack"
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
                        href="https://docs.search-guard.com/latest/elasticsearch-compliance-actions-pagerduty"
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
                        Open PagerDuty incidents from Signals compliance automatically. The connnector supports resolving incidents
                        in PagerDuty as soon as the watch has left alert state.
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col s12 m4">
                    <a
                        href="https://docs.search-guard.com/latest/elasticsearch-compliance-actions-jira"
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
                        href="https://docs.search-guard.com/latest/elasticsearch-compliance-actions-webhook"
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
                        href="https://docs.search-guard.com/latest/elasticsearch-compliance-actions-index"
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

          <div className="compliance-wrapper" >

              <div className="row compliance">
                  <div className="compliance-headline">Free compliance for Elasticsearch.<br />Bundled and integrated with Search Guard.</div>

                  <div className="compliance-section" >
                      <div className="compliance-content">
                          <div className="compliance-content-headline">
                              Single download and install
                          </div>
                          <div className="compliance-content-text">
                              Signals compliance is bundled with any Search Guard download for Elasticsearch > 7.4. A single plugin install
                              that provides both Security and compliance features. It was never easier to supercharge your Elasticsearch cluster
                          </div>
                      </div>
                  </div>

                  <div className="compliance-section" >
                      <div className="compliance-content">
                          <div className="compliance-content-headline">
                              Free Community Edition - forever
                          </div>
                          <div className="compliance-content-text">
                              The Community Edition of Signals compliance is free and will always be. Signals compliance is ASL2 licensed, so you can use
                              it for any project, commercial or other, and even bundle it with your own projects.
                          </div>
                      </div>
                  </div>

                  <div className="compliance-section" >
                      <div className="compliance-content">
                          <div className="compliance-content-headline">
                              Fully integrated with Search Guard Security
                          </div>
                          <div className="compliance-content-text">
                              Signals compliance is fully integrated with all Search Guard Security features. Control access to alerts, configure
                              who can receive notifications, separate alert access by using Search Guard Multi Tenancy and leverage advanced features like
                              Document- and Field-level security.
                          </div>
                      </div>
                  </div>

              </div>
          </div>

      <div id="tryit">
        <Cta
          headline="Give Signals compliance a spin!"
          text="Follow these simple steps to install Signals compliance to your Elasticsearch cluster. "
          ctaText="Installation"
          icon={ctaIcon}
          link="/search-guard-free-trial/"
        />
      </div>
      <PreFooter />
    </PageWrapper>
  );
};

export default Compliance;
