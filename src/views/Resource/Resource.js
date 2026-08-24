import React from 'react';
import {Helmet} from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import PreFooter from '../../components/PreFooter/PreFooter';
import DocumentationForum from '../../components/Resources/DocumentationForum';
import PresentationsWhitepapers from '../../components/Resources/PresentationsWhitepapers';
import SourceCodeNewsletter from '../../components/Resources/SourceCodeNewsletter';
import CVEDisclosure from '../../components/Resources/CVEDisclosure';
import Title from '../../components/Title/Title';
import Faq from '../../components/Faq/Faq';
import Video from '../../components/Video/Video';
import BlogBox from '../../components/BlogBox/BlogBox';
import CTAContactUs from "../../components/CTA/CTAContactUs";
import { usePageData } from '../../context/PageDataContext';


const Resource = () => {
    const pageData = usePageData();
    const { t } = useTranslation('resource');

    const breadcrumb = [
        { id: 1, anchor: '/', name: t('breadcrumb.home') },
        { id: 2, anchor: '/resource/', name: t('breadcrumb.resources') },
    ];

  return (
    <PageWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {t('meta.title')}
        </title>
        <meta
          name="description"
          content={t('meta.description')}
        />
      </Helmet>
      <Title
        headline={t('title.headline')}
        text={t('title.text')}
        breadcrumb={breadcrumb}
      />

        <div id="documentation">
      <DocumentationForum />
        </div>
      <Faq />

        <div id="whitePapers">
        <PresentationsWhitepapers />
        </div>

        <div id="blog">
            <BlogBox overview headline="Blog" posts={pageData?.recentPosts} />
        </div>

      <div id="git">
        <SourceCodeNewsletter />
      </div>

        <div id="videos">
            <Video playlist videos={pageData?.videos} />
        </div>

        <div id="cve">
            <CVEDisclosure />
        </div>


      <CTAContactUs colorschema="white" />
      <PreFooter />
    </PageWrapper>
  );
};

export default Resource;
