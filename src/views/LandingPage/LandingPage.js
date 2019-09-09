import React from 'react';
import { Helmet } from 'react-helmet';
import Hero from '../../components/Hero/Hero';
import NavBar from '../../components/NavBar/NavBar';
import Certified from '../../components/Certified/Certified';
import References from '../../components/References/References';
import Cta from '../../components/Cta/Cta';
import Services from '../../components/Services/Services';
import SEOSection from '../../components/SEOSection/SEOSection';
import Footer from '../../components/Footer/Footer';
import LandingUSP from '../../components/LandingUSP/LandingUSP';
import LicensingInfo from '../../components/LicensingInfo/LicensingInfo';
import shield from '../../images/icon-wheel-shield.svg';

const LandingPage = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {/* Product | Search Guard product overview for securing Elasticsearch
          cluster */}
        </title>
        <meta
          name="description"
          // content="Find out more about Search Guard features for Elasticsearch like LDAP, Active Directory, Kerberos/SPNEGO, JSON web token, audit logging, Kibana SSO, Kibana multitenancy, field-level security, document-level security, read histroy, write history, audit log event routing and many more."
        />
      </Helmet>
      <NavBar background="#184962" landing />
      <Hero landing />
      <LandingUSP />
      <Services landing />
      <SEOSection />
      <LicensingInfo />
      <References />
      <Certified />
      <Cta
        headline="What would you like to know?"
        text="Want to see how your company can benefit from our Compliance edition? Sign up to our 60-day trial, completely free of charge."
        ctaText="start free trial"
        icon={shield}
      />
      <Footer landing />
    </div>
  );
};

export default LandingPage;
