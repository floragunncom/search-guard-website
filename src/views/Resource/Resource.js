import React from 'react';
import { Helmet } from 'react-helmet';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import Tile from '../../components/Tile/Tile';
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
    { anchor: 'faq', name: 'faq' },
    { anchor: 'github', name: 'github' },
    { anchor: 'github', name: 'tls certificates' },
    { anchor: 'blog', name: 'blog' },
    { anchor: 'whitePapers', name: 'Presentations & white papers' },
    { anchor: 'videos', name: 'videos' },
  ];

  return (
    <div id="top">
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Product | Search Guard product overview for securing Elasticsearch
          cluster
        </title>
        <link rel="canonical" href="http://search-guard.com/resource/" />
        <meta
          name="description"
          content="Find out more about Search Guard features for Elasticsearch like LDAP, Active Directory, Kerberos/SPNEGO, JSON web token, audit logging, Kibana SSO, Kibana multitenancy, field-level security, document-level security, read histroy, write history, audit log event routing and many more."
        />
      </Helmet>
      <NavBar />
      <Title
        headline="resource hub"
        // text="Suspendisse potenti. Nunc imperdiet molestie elit, a auctor enim vestibulum rutrum. Aliquam non tempus elit. Mauris ut accumsan libero."
      />
      <AnchorNavBar anchors={anchors} />
      <Tile
        leftDark={false}
        leftIcon={iconFolder}
        rightIcon={iconPeople}
        leftHeadline="Documentation"
        leftText="Get the official technical documentation for all Search Guard versions."
        rightHeadline="Community forum"
        rightText="Any questions on installation or configuration? Ask our community forum."
        leftLink="https://docs.search-guard.com/latest/"
        rightLink="https://forum.search-guard.com/latest/"
        leftButtonTarget="_blank"
        rightButtonTarget="_blank"
      />
      <Faq />
      <div id="github">
        <Tile
          leftDark
          leftIcon={iconDownload}
          rightIcon={iconCertificate}
          leftHeadline="Source Code"
          leftText="Access, download and inspect all our code on Gitlab, report any issue you find or request a feature."
          rightHeadline="TLS Certificate Generator"
          rightText="If you need TLS certificates for testing or a PoC, our generator web service is here to ease the pain."
          leftLink="https://git.floragunn.com/"
          rightLink="/tls-certificate-generator/"
          leftButtonTarget="_blank"
        />
      </div>
      <BlogBox teaser headline="Blog" />
      <div id="whitePapers">
        <Tile
          leftDark={false}
          leftIcon={iconSpeaker}
          rightIcon={iconNote}
          leftHeadline="Presentations"
          rightHeadline="White Papers"
          leftText="Browse our library of presentations on all Search Guard features."
          rightText="Download our whitepapers on Search Guard use cases and implementation examples."
          leftLink="/presentations/"
          rightLink="/white-papers/"
        />
      </div>
      <Tile
        leftDark
        leftIcon={iconShield}
        rightIcon={iconLock}
        leftHeadline="CVE advisory"
        leftText="We are the official CVE numbering authority for Search Guard. Browse the list of known issues."
        rightHeadline="Disclosure Policy"
        rightText="If you have found a security related issue, please read our disclosure policy."
        leftLink="/cve-advisory/"
        rightLink="/disclosure-policy/"
      />
      <Video playlist />
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
