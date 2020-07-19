import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { v4 } from 'uuid';
import { initGA, PageView } from '../../components/Tracking/Tracking';
import PreFooter from '../../components/PreFooter/PreFooter';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import TileSimple from '../../components/TileSimple/TileSimple';
import Cta from '../../components/Cta/Cta';
import Certified from '../../components/Certified/Certified';
import AnchorNavBar from '../../components/AnchorNavBar/AnchorNavBar';
import Integrators from '../../components/Integrators/Integrators';
import ctaIcon from '../../images/icon-sg.svg';
import fileCode from '../../images/file-code.svg';
import worldLock from '../../images/world-lock.svg';
import certificate from '../../images/certificate-big.svg';

const Security = () => {
  useEffect(() => {
    initGA();
    PageView();
  }, []);

  const anchors = [
    { id: v4(), anchor: 'concept', name: 'what it is' },
    { id: v4(), anchor: 'integrators', name: 'integrators' },
    { id: v4(), anchor: 'certified', name: 'certified' },
    { id: v4(), anchor: 'quote', name: 'get a quote' },
  ];

  return (
    <PageWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Search Guard Security | Securing your Elasticsearch cluster with Search Guard
        </title>
        <link rel="canonical" href="https://search-guard.com/security/" />
        <meta
          name="description"
          content="Find out more about Search Guard features for Elasticsearch like LDAP, Active Directory, Kerberos/SPNEGO, JSON web token, audit logging, Kibana SSO, Kibana multitenancy, field-level security, document-level security, read histroy, write history, audit log event routing and many more."
        />
      </Helmet>
      <Title
        headline="search guard security plugin"
        text="As the pioneers in securing Elasticsearch clusters, all decisions about our technology have the same purpose, to make your Elasticsearch environment more secure."
      />
      <AnchorNavBar anchors={anchors} />
      <div id="concept">
        <TileSimple
          icon={fileCode}
          iconPosition="left"
          backgroundColor="light"
          headline="Completely Open Source"
          text="Closed source security is no security, never leave the control of your data to a third party. Zero trust in networks, zero trust in closed source. We think that security software has to be Open Source by definition, so all of our code is available for you to download, inspect, evaluate and audit."
        />
      </div>
      <TileSimple
        icon={certificate}
        iconPosition="right"
        backgroundColor="dark"
        headline="Compliance ready"
        text="Security compliance regulations like GDPR, HIPAA, PCI-DSS or SOX require a business to protect, track and control access to sensitive data. Search Guard offers an extensive range of features that will help you to meet the technical requirements of compliance regulations."
      />
      <TileSimple
        icon={worldLock}
        iconPosition="left"
        backgroundColor="light"
        headline="All industry sectors"
        text="Search Guard runs on high-scale mission-critical production clusters protecting sensitive data in the finance, healthcare, pharmaceutical, aviation, telecommunications, security, and data intelligence sectors."
      />
      <Integrators />
      <Certified />
      <div id="quote">
        <Cta
          headline="60-day PoC License"
          text="Want to see how your company can benefit from our Compliance edition? Sign up to our 60-day trial, completely free of charge."
          ctaText="start free trial"
          icon={ctaIcon}
          link="/search-guard-free-trial/"
        />
      </div>
      <PreFooter />
    </PageWrapper>
  );
};

export default Security;
