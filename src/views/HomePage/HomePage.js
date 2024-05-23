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
        <link rel="canonical" href="https://preview.search-guard.com/" />
        <meta
          name="description"
          content="Search Guard is an Open Source security plugin for Elasticsearch, Kibana and the entire ELK stack. Search Guard offers encryption, authentication, authorization, audit logging, compliance as well as alerting and anomaly detection features."
        />
      </Helmet>
      <Hero />
      <TileSimple
        icon={multilevel}
        iconPosition="left"
        backgroundColor="dark"
        headline="Search Guard provides security on all levels"
        text="Search Guard provides an all-encompassing security solution to keep your most confidential data safe. Utilizing RBAC, Search Guard ensures the highest level of protection in your clusters, indices, and documents by adding encryption, authentication, authorization, audit logging, compliance as well as alerting and anomaly detection features."
      />
      <TileSimple
        icon={lock}
        iconPosition="right"
        backgroundColor="light"
        headline="Search Guard supports all industry standards"
        text="Search Guard supports all industry standards for authentication and authorization like LDAP, Active Directory, OpenID, SAML, Kerberos, JSON web tokens or client certificates. You can chose from a wide variety of modern and highly secure modern cipher suites."
      />
      <TileSimple
        icon={disk}
        iconPosition="left"
        backgroundColor="dark"
        headline="Search Guard protects all components of the Elastic Stack"
        text="Search Guard implements full access control over your entire Elasticsearch environment. Protect all components of the Elastic stack, including Kibana, Logstash and Beats."
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
        text="Want to see how your company can benefit from Search Guard? Sign up to our 60-day trial, completely free of charge. No credit card required."
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
