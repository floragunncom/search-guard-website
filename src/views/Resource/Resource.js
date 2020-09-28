import React from 'react';
import { Helmet } from 'react-helmet';
import { v4 } from 'uuid';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import PreFooter from '../../components/PreFooter/PreFooter';
import Card from '../../components/Card/Card';
import AnchorNavBar from '../../components/AnchorNavBar/AnchorNavBar';
import Title from '../../components/Title/Title';
import Cta from '../../components/Cta/Cta';
import Faq from '../../components/Faq/Faq';
import Video from '../../components/Video/Video';
import BlogBox from '../../components/BlogBox/BlogBox';
import PressTeaser from '../../components/Press/PressTeaser';
import envelope from '../../images/icon-envelope.svg';
import iconNote from '../../images/icon-note.svg';
import iconPeople from '../../images/icon-people.svg';
import iconLock from '../../images/icon-multilayer-security.svg';
import iconShield from '../../images/icon-wheel-shield.svg';
import iconCertificate from '../../images/icon-certificate.svg';
import iconSpeaker from '../../images/icon-speaker.svg';
import iconFolder from '../../images/icon-folder.svg';
import iconDownload from '../../images/icon-download.svg';

const Resource = () => {
  const anchors = [
    { id: v4(), anchor: 'faq', name: 'faq' },
    { id: v4(), anchor: 'git', name: 'gitlab' },
    { id: v4(), anchor: 'git', name: 'tls certificates' },
    { id: v4(), anchor: 'blog', name: 'blog' },
    { id: v4(), anchor: 'whitePapers', name: 'Presentations & white papers' },
    { id: v4(), anchor: 'videos', name: 'videos' },
    { id: v4(), anchor: 'press', name: 'press' }
  ];

    const breadcrumb = [
        { id: 1, anchor: '/', name: 'Home' },
        { id: 1, anchor: '/resource/', name: 'Resource Hub' },
    ];

  return (
    <PageWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Resources | Search Guard blog posts, faq, documentation, presentations
          and whitepapers
        </title>
        <link rel="canonical" href="https://search-guard.com/resource/" />
        <meta
          name="description"
          content="Search Guard resource hub including blog posts, faq, documentation, presentations and whitepapers"
        />
      </Helmet>
      <Title
        headline="resource hub"
        text="Search Guard resource hub including blog posts, faq, documentation, presentations and whitepapers."
        breadcrumb={breadcrumb}
      />
      <AnchorNavBar anchors={anchors} />
      <Card
        bgLeftDark={false}
        iconLeft={iconFolder}
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
          bgLeftDark
          iconLeft={iconDownload}
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
          bgLeftDark={false}
          iconLeft={iconSpeaker}
          iconRight={iconNote}
          headlineLeft="Presentations"
          headlineRight="White Papers"
          textLeft="Browse our library of presentations on all Search Guard features."
          textRight="Download our whitepapers on Search Guard use cases and implementation examples."
          linkLeft="/presentations/"
          linkRight="/whitepapers/"
        />
      </div>
      <Card
        bgLeftDark
        iconLeft={iconShield}
        iconRight={iconLock}
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
        <div id="press">
            <PressTeaser />
        </div>
      <Cta
        headline="Can’t find what you’re looking for?"
        text="No worries,we're here to help!."
        ctaText="contact us"
        icon={envelope}
        link="/contacts/"
      />
      <PreFooter />
    </PageWrapper>
  );
};

export default Resource;
