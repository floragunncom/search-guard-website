import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';

const breadcrumb = [
  { anchor: '/', name: 'Home' },
  { anchor: '/resource/', name: 'Resources' },
  { anchor: '/webinars/', name: 'Webinars' },
];

// Zoho session IDs for the current webinars. Each renders its own title,
// date and registration button. Add a new session ID here — the grid lays
// them out two per row and wraps automatically as more are added.
const webinars = [
  '1063788891',
  '1082579670',
  '1093676383',
  '1024264501',
  '1027135029',
];

const Webinars = () => {
  return (
    <PageWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Search Guard Webinars | Live Elasticsearch Security &amp; Alerting Sessions
        </title>
        <link rel="canonical" href="https://search-guard.com/webinars/" />
        <meta
          name="description"
          content="Join free Search Guard webinars on Elasticsearch and Kibana security, alerting, and anomaly detection. Register for upcoming live sessions with expert Q&A."
        />
      </Helmet>
      <Title
        headline="Search Guard Webinars"
        text="Live sessions on securing, alerting, and monitoring Elasticsearch and Kibana — register for upcoming webinars and expert Q&amp;A."
        breadcrumb={breadcrumb}
      />
      <div className="row webinars-wrapper color-schema-white">
        <div className="col s12 webinars-intro">
          <h2 className="webinars-lead-headline">
            Practical Elasticsearch security sessions from the engineers who
            spend all day fixing it in production.
          </h2>
          <p>
            Most vendor webinars are 40 minutes of positioning and 5 minutes of
            substance. These aren&rsquo;t that. Each session is built around a
            real problem our engineers keep seeing in customer environments:
            auth setups that break at scale, RBAC models that leak, audit logs
            that miss what auditors care about, encryption that&rsquo;s
            technically enabled but functionally useless. We show the fix, walk
            through the config, and answer the questions you actually want to
            ask.
          </p>
        </div>

        <div className="col s12">
          <h2 className="webinars-section-headline">
            Live now — watch instantly
          </h2>
        </div>

        {webinars.map((sessionId, i) => {
          return (
            <div className="col m6 s12 webinars-item" key={sessionId}>
              <div className="webinars-iframe-wrapper">
                <iframe
                  title={`Search Guard webinar registration ${i + 1}`}
                  width="360"
                  height="240"
                  src={`https://webinar.zoho.com/meeting/register/embed?sessionId=${sessionId}`}
                  frameBorder="0"
                />
              </div>
            </div>
          );
        })}
      </div>
      <PreFooter />
    </PageWrapper>
  );
};

export default Webinars;
