import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '../../components/NavBar/NavBar';
import Hero from '../../components/Hero/Hero';
import TileSimple from '../../components/TileSimple/TileSimple';
import Labels from '../../components/Labels/Labels';
import TrustedBy from '../../components/TrustedBy/TrustedBy';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import Cta from '../../components/Cta/Cta';
import Services from '../../components/Services/Services';
import Quotes from '../../components/Quotes/Quotes';
import LicensingModel from '../../components/LicensingModel/LicensingModel';
import lock from '../../images/tile-icon-wheel.svg';
import multilevel from '../../images/multilevel-security.svg';
import disk from '../../images/disk.svg';
import ctaIcon from '../../images/icon-sg.svg';

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Search Guard | Security for Elasticsearch and the ELK stack
        </title>
        <link rel="canonical" href="https://search-guard.com/" />
        <meta
          name="description"
          content="Search Guard is an Open Source security plugin for Elasticsearch and the entire ELK stack. Search Guard offers encryption, authentification, authorization, audit logging, multitenancy and compliance features (for regulations like GDPR, HIPAA, PCI DSS or SOX)."
        />
      </Helmet>
      <NavBar background="#184962" />
      <Hero />
      <TileSimple
        icon={multilevel}
        iconPosition="left"
        backgroundColor="dark"
        headline="Multilevel security"
        text="Protect your sensitive data on all levels by using role-based access control to your clusters, indices, documents and fields. Search Guard covers it all, from top to bottom, and adds encryption, authentication, authorization, audit logging, multi tenancy and compliance features to Elasticsearch and Kibana."
      />
      <TileSimple
        icon={lock}
        iconPosition="right"
        backgroundColor="light"
        headline="Industry standards"
        text="Search Guard supports all industry standards for authentication and authorization like LDAP, Active Directory, OpenID, SAML, Kerberos, JSON web tokens or client certificates. By using OpenSSL you can chose from a wide variety of modern and highly secure cipher suites."
      />
      <TileSimple
        icon={disk}
        iconPosition="left"
        backgroundColor="dark"
        headline="Elastic Stack"
        text="Search Guard gives you full security control over your entire Elastisearch environment. Protect the complete Elastic stack, including Kibana, logstash and beats."
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
        headline="Free 60-day trial"
        text="Want to see how your company can benefit from our Compliance edition? Sign up to our 60-day trial, completely free of charge."
        ctaText="start free trial"
        icon={ctaIcon}
      />
      <Quotes />
      <PreFooter />
      <Footer />
    </div>
  );
};

export default HomePage;
