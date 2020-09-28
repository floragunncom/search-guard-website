import React from 'react';
import { Helmet } from 'react-helmet';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import HeroMarketing from '../../components/HeroMarketing/HeroMarketing';
import Cta from '../../components/Cta/Cta';
import shield from '../../images/icon-wheel-shield.svg';
import ContactFormSuperSlim from '../../components/ContactFormSuperSlim';
import TrustedBy from '../../components/TrustedBy/TrustedBy';
import LicensingModel from '../../components/LicensingModel/LicensingModel';
import Labels from "../../components/Labels/Labels";
import TableEditions from '../../components/TableEditions/TableEditions';

const Marketing = () => {
  return (
    <PageWrapper background="#184962" landing>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Search Guard | Security and Alerting for Elasticsearch and Kibana
        </title>
        <link
          rel="canonical"
          href="https://search-guard.com/security-for-elasticsearch/"
        />
        <meta
          name="description"
          content="Search Guard is an Enterprise Security and Alerting Suite that encrypts and protects your data and data flows in the entire Elastic Stack, including Kibana, Logstash and Beats."
        />
      </Helmet>
      <HeroMarketing />
      <Labels />
      <TrustedBy />

      <div className="row">
        <div className="col s12">
            <div className="licensing-comparison-headline">
                Features
            </div>
            <TableEditions/>
        </div>
      </div>

      <LicensingModel
        topButtons
        headline="Licensing models"
        subheadline="Unlimited nodes - Scale your cluster, not your cost!"
        tableView={false}
      />
      <Cta
        headline="Free Trial"
        text="Want to see how your company can benefit from our Compliance edition? Sign up to our 60-day trial, completely free of charge."
        icon={shield}
      />
      <ContactFormSuperSlim />
    </PageWrapper>
  );
};

export default Marketing;
