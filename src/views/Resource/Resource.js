import React from 'react';
import { Helmet } from 'react-helmet';
import { v4 } from 'uuid';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import Card from '../../components/Card/Card';
import NavBar from '../../components/NavBar/NavBar';
import AnchorNavBar from '../../components/AnchorNavBar/AnchorNavBar';
import Title from '../../components/Title/Title';
import Cta from '../../components/Cta/Cta';
import Faq from '../../components/Faq/Faq';
import Video from '../../components/Video/Video';
import BlogBox from '../../components/BlogBox/BlogBox';
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
    { id: v4(), anchor: 'github', name: 'github' },
    { id: v4(), anchor: 'github', name: 'tls certificates' },
    { id: v4(), anchor: 'blog', name: 'blog' },
    { id: v4(), anchor: 'whitePapers', name: 'Presentations & white papers' },
    { id: v4(), anchor: 'videos', name: 'videos' },
  ];

  return (
    <div id="top">
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
      <NavBar />
      <Title
        headline="resource hub"
        text="Search Guard resource hub including blog posts, faq, documentation, presentations and whitepapers."
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
      <div id="github">
        <Card
          bgLeftDark
          iconLeft={iconDownload}
          iconRight={iconCertificate}
          headlineLeft="Source Code"
          headlineRight="TLS Certificate Generator"
          textLeft="Access, download and inspect all our code on Gitlab, report any issue you find or request a feature."
          textRight="If you need TLS certificates for testing or a PoC, our generator web service is here to ease the pain."
          linkLeft="https://git.floragunn.com/"
          linkRight="/tls-certificate-generator/"
          buttonTargetLeft="_blank"
        />
      </div>
      <BlogBox overview headline="Blog" />
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
          linkRight="/white-papers/"
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
      <Cta
        headline="Can’t find what you’re looking for?"
        text="No worries, maybe we can help you find the answer."
        ctaText="contact us"
        icon={envelope}
        link="/contacts/"
      />
      <PreFooter />
      <Footer />
    </div>
  );
};

export default Resource;
