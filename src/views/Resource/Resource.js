import React from 'react';
import {Helmet} from 'react-helmet';
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


const Resource = () => {

    const breadcrumb = [
        { id: 1, anchor: '/', name: 'Home' },
        { id: 1, anchor: '/resource/', name: 'Resources' },
    ];

  return (
    <PageWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Search Guard Blog Posts, FAQ, and Documentation
        </title>
        <link rel="canonical" href="https://search-guard.com/resource/" />
        <meta
          name="description"
          content="Search Guard Resource Hub including Blog Posts, FAQ, Documentation, Presentations and Whitepapers"
        />
      </Helmet>
      <Title
        headline="resources"
        text="Search Guard Resource Hub including Blog Posts, FAQ, Documentation, Presentations and Whitepapers"
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
            <BlogBox overview headline="Blog" />
        </div>

      <div id="git">
        <SourceCodeNewsletter />
      </div>

        <div id="videos">
            <Video playlist />
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
