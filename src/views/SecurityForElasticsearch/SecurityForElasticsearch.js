import React from 'react';
import { Helmet } from 'react-helmet';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Hero from '../../components/SecurityForElasticsearch/Hero';
import Labels from "../../components/SecurityForElasticsearch/Labels";
import TableEditions from '../../components/SecurityForElasticsearch/TableEditions';
import LicensingModel from '../../components/SecurityForElasticsearch/LicensingModel';

import Cta from '../../components/Cta/Cta';
import shield from '../../images/icon-wheel-shield.svg';
import ContactFormSuperSlim from '../../components/ContactFormSuperSlim';
import TrustedBy from '../../components/TrustedBy/TrustedBy';



const SecurityForElasticsearch = () => {
  return (
    <PageWrapper background="#184962" landing>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
            Elastic Security | Free Security for Elasticsearch | Search Guard
        </title>
        <link
          rel="canonical"
          href="https://preview.search-guard.com/security-for-elasticsearch/"
        />
        <meta
          name="description"
          content="Search Guard is an Enterprise Security Suite for Elasticsearch that encrypts and protects your data in the entire Elastic Stack, including Kibana, Logstash and Beats."
        />
      </Helmet>
      <Hero />
      <Labels />
        <div className="row">
            <div className="col s12">
                <div className="licensing-comparison-headline">
                    Features
                </div>
                <TableEditions/>
            </div>
        </div>
      <TrustedBy />



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

export default SecurityForElasticsearch;
