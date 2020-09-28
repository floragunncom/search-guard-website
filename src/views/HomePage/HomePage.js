import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { initGA, PageView } from '../../components/Tracking/Tracking';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Hero from '../../components/Hero/Hero';
import TileSimple from '../../components/TileSimple/TileSimple';
import Labels from '../../components/Labels/Labels';
import TrustedBy from '../../components/TrustedBy/TrustedBy';
import PreFooter from '../../components/PreFooter/PreFooter';
import Cta from '../../components/Cta/Cta';
import Services from '../../components/Services/Services';
import Quotes from '../../components/Quotes/Quotes';
import LicensingModel from '../../components/LicensingModel/LicensingModel';
import lock from '../../images/tile-icon-wheel.svg';
import multilevel from '../../images/multilevel-security.svg';
import disk from '../../images/disk.svg';
import ctaIcon from '../../images/icon-sg.svg';



const HomePage = () => {
  useEffect(() => {
    initGA();
    PageView();
  }, []);

  return (
    <PageWrapper background="#184962">
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Security and Alerting for Elasticsearch and Kibana | Search Guard
        </title>
        <link rel="canonical" href="https://search-guard.com/" />
        <meta
          name="description"
          content="Search Guard is an Open Source security plugin for Elasticsearch and the entire ELK stack. Search Guard offers encryption, authentification, authorization, audit logging, multitenancy and compliance features (for regulations like GDPR, HIPAA, PCI DSS or SOX)."
        />
      </Helmet>
      <Hero />
      <TileSimple
        icon={multilevel}
        iconPosition="left"
        backgroundColor="dark"
        headline="Search Guard provides Multilayer security"
        text="Search Guard protects your most sensitive data on all levels using role-based access control (RBAC) on your clusters, indices, fields and documents. From top to bottom Search Guard covers it all adding encryption, authentication, authorization, audit logging, multi tenancy and extended features to meet your compliance needs."
      />
      <TileSimple
        icon={lock}
        iconPosition="right"
        backgroundColor="light"
        headline="Search Guard supports all industry standards"
        text="Search Guard supports all industry standards for authentication and authorization like LDAP, Active Directory, OpenID, SAML, Kerberos, JSON web tokens or client certificates. By using OpenSSL you can chose from a wide variety of modern and highly secure cipher suites."
      />
      <TileSimple
        icon={disk}
        iconPosition="left"
        backgroundColor="dark"
        headline="Search Guard protects all components of the Elastic Stack"
        text="Search Guard gives you full control over your entire Elastisearch environment. Protect all components of the Elastic stack, including Kibana, Logstash and Beats."
      />
      <TrustedBy />
      <Labels />
      <Services />
      <LicensingModel
        topButtons
        headline="Licensing models"
        tableView={false}
      />
      <Cta
        headline="60-day Trial License"
        text="Want to see how your company can benefit from our Compliance edition? Sign up to our 60-day trial, completely free of charge."
        ctaText="start free search guard trial"
        icon={ctaIcon}
        link="/contacts/"
      />
      <Quotes />
      <PreFooter />
    </PageWrapper>
  );
};

export default HomePage;
