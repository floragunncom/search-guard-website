import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import FilledDivider from '../../components/FilledDivider/FilledDivider';
import Journey from '../../components/Journey/Journey';
import CTAStartFreeTrial from '../../components/CTA/CTAStartFreeTrial';
import Quiz from '../../components/TenYears/Quiz';
import { toSeoDescription, toSeoTitle } from '../../utils/urlUtils';

// NOTE: this page deliberately does NOT render <PreFooter/>. The quiz gate on
// the score screen is the newsletter capture for this page, so a second
// PreFooter signup would be a competing form (per the build brief).
const TenYears = () => {
  const { t } = useTranslation('tenyears');

  const breadcrumb = [
    { id: 1, anchor: '/', name: t('breadcrumb.home') },
    { id: 2, anchor: '/10-years/', name: t('breadcrumb.current') },
  ];

  const seoTitle = toSeoTitle(t('meta.title'), 60);
  const seoDescription = toSeoDescription(t('meta.description'), 155);

  return (
    <PageWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        {/* Distinct social share copy (COPY.md §0) — the OG/Twitter titles lead
            with the "receipt" hook rather than the SEO title. */}
        <meta property="og:title" content={t('meta.ogTitle')} />
        <meta property="og:description" content={t('meta.ogDescription')} />
        <meta name="twitter:title" content={t('meta.ogTitle')} />
        <meta name="twitter:description" content={t('meta.ogDescription')} />
      </Helmet>

      <Title
        headline={t('hero.headline')}
        text={t('hero.text')}
        breadcrumb={breadcrumb}
      />

      <Quiz />

      <FilledDivider colorschema="white" />

      {/*
        The company timeline gives the page a reason to exist after the campaign
        ends. It reuses the same <Journey/> as /company/.

        KNOWN ISSUE (flagged, not fixed — see 10y-handover/START-HERE.md, "Still
        open" #3): Journey still credits Search Guard with OpenSearch support in
        its 2021/2022 entries. That is Eliatra's now, and this campaign drives
        traffic straight at it. Needs an internal content decision before launch.
      */}
      <Journey />

      <CTAStartFreeTrial colorschema="white" />
    </PageWrapper>
  );
};

export default TenYears;
