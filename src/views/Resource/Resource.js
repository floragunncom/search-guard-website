import React from 'react';
import { Helmet } from 'react-helmet';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import PreFooter from '../../components/PreFooter/PreFooter';
import Card from '../../components/Card/Card';
import Title from '../../components/Title/Title';
import Cta from '../../components/Cta/Cta';
import Faq from '../../components/Faq/Faq';
import Video from '../../components/Video/Video';
import BlogBox from '../../components/BlogBox/BlogBox';
import envelope from '../../images/icon-envelope.svg';
import iconBookRead from '../../images/book-open-reader-solid.svg';
import iconPeople from '../../images/people-carry-box-solid.svg';
import iconBellSlash from '../../images/bell-slash-regular.svg';
import iconDanger from '../../images/triangle-exclamation-solid.svg';
import iconCertificate from '../../images/certificate-solid.svg';
import iconPresentation from '../../images/person-chalkboard-solid.svg';
import iconBook from '../../images/file-lines-solid.svg';
import iconCode from '../../images/file-code-regular.svg';

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
          Resources | Search Guard Blog Posts, FAQ, Documentation and Presentations
          and whitepapers
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
      <Card
        dark={false}
        iconLeft={iconBook}
        iconRight={iconPeople}
        headlineLeft="Documentation"
        headlineRight="Community forum"
        textLeft="Get the official technical documentation for all Search Guard versions."
        textRight="Any questions on installation or configuration? Ask our community forum."
        linkLeft="https://docs.search-guard.com/latest/"
        linkRight="https://forum.search-guard.com/latest/"
        buttonTargetLeft="_blank"
        buttonTargetRight="_blank"
      />
      <Faq />
      <div id="git">
        <Card
          dark
          iconLeft={iconCode}
          iconRight={iconCertificate}
          headlineLeft="Source Code"
          headlineRight="TLS Certificate Generator"
          textLeft="Access, download and inspect all our code on Gitlab, report any issue you find or request a feature."
          textRight="If you need TLS certificates for testing or a PoC, our generator web service is here to ease the pain."
          linkLeft="https://git.floragunn.com/public/"
          linkRight="/tls-certificate-generator/"
          buttonTargetLeft="_blank"
        />
      </div>

        <div id="blog">
        <BlogBox overview headline="Blog" />
        </div>

      <div id="whitePapers">
        <Card
          dark={false}
          iconLeft={iconPresentation}
          iconRight={iconBookRead}
          headlineLeft="Presentations"
          headlineRight="White Papers"
          textLeft="Browse our library of presentations on all Search Guard features."
          textRight="Download our whitepapers on Search Guard use cases and implementation examples."
          linkLeft="/presentations/"
          linkRight="/whitepapers/"
        />
      </div>
      <Card
        dark
        iconLeft={iconDanger}
        iconRight={iconBellSlash}
        headlineLeft="CVE advisory"
        headlineRight="Disclosure Policy"
        textLeft="We are the official CVE numbering authority for Search Guard. Browse the list of known issues."
        textRight="If you have found a security related issue, please read our disclosure policy."
        linkLeft="/cve-advisory/"
        linkRight="/disclosure-policy/"
      />
      <div id="videos">
        <Video playlist />
      </div>

      <Cta
        headline="Can’t find what you’re looking for?"
        text="No worries,we're here to help!"
        ctaText="contact us"
        icon={envelope}
        link="/contacts/"
      />
      <PreFooter />
    </PageWrapper>
  );
};

export default Resource;
