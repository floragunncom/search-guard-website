import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';

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
  const { t } = useTranslation('webinars');

  const breadcrumb = [
    { anchor: '/', name: t('breadcrumb.home') },
    { anchor: '/resource/', name: t('breadcrumb.resources') },
    { anchor: '/webinars/', name: t('breadcrumb.webinars') },
  ];

  return (
    <PageWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
      </Helmet>
      <Title
        headline={t('title.headline')}
        text={t('title.text')}
        breadcrumb={breadcrumb}
      />
      <div className="row webinars-wrapper color-schema-white">
        <div className="col s12 webinars-intro">
          <h2 className="webinars-lead-headline">{t('lead.headline')}</h2>
          <p>{t('lead.text')}</p>
        </div>

        <div className="col s12">
          <h2 className="webinars-section-headline">{t('section.headline')}</h2>
        </div>

        {webinars.map((sessionId, i) => {
          return (
            <div className="col m6 s12 webinars-item" key={sessionId}>
              <div className="webinars-iframe-wrapper">
                <iframe
                  title={`${t('iframe.title')} ${i + 1}`}
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
