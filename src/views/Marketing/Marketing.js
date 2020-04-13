import React from 'react';
import { Helmet } from 'react-helmet';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import HeroMarketing from '../../components/HeroMarketing/HeroMarketing';
import Cta from '../../components/Cta/Cta';
import shield from '../../images/icon-wheel-shield.svg';
import ContactFormSuperSlim from '../../components/ContactFormSuperSlim';
import TrustedBy from '../../components/TrustedBy/TrustedBy';
import LicensingModel from '../../components/LicensingModel/LicensingModel';

const Marketing = () => {
  return (
    <PageWrapper background="#184962" landing>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Product | Search Guard product overview for securing Elasticsearch
          cluster
        </title>
        <link
          rel="canonical"
          href="https://search-guard.com/security-for-elasticsearch/"
        />
        <meta
          name="description"
          content="Find out more about Search Guard features for Elasticsearch like LDAP, Active Directory, Kerberos/SPNEGO, JSON web token, audit logging, Kibana SSO, Kibana multitenancy, field-level security, document-level security, read histroy, write history, audit log event routing and many more."
        />
      </Helmet>
      <HeroMarketing />
      <TrustedBy />
      <LicensingModel
        topButtons
        headline="Licensing models"
        subheadline="Unlimited nodes - Scale your cluster, not your cost!"
        tableView={false}
      />
      <Cta
        headline="Questions?"
        text="Want to see how your company can benefit from our Compliance edition? Sign up to our 60-day trial, completely free of charge."
        icon={shield}
      />
      <ContactFormSuperSlim />
    </PageWrapper>
  );
};

export default Marketing;
