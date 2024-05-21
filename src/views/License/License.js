import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { v4 } from 'uuid';
import { initGA, PageView } from '../../components/Tracking/Tracking';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import PreFooter from '../../components/PreFooter/PreFooter';
import Title from '../../components/Title/Title';
import Card from '../../components/Card/Card';
import AnchorNavBar from '../../components/AnchorNavBar/AnchorNavBar';
import LicensingModel from '../../components/LicensingModel/LicensingModel';
import References from '../../components/References/References';
import Cta from '../../components/Cta/Cta';
import ctaIcon from '../../images/icon-sg.svg';
import iconBook from '../../images/icon-book.svg';
import iconWheels from '../../images/icon-wheels.svg';

const License = () => {
  useEffect(() => {
    initGA();
    PageView();
  }, []);

  const breadcrumb = [
      { id: 1, anchor: '/', name: 'Home' },
      { id: 1, anchor: '/licensing/', name: 'Licensing' },
  ];

  return (
    <PageWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Pricing | Search Guard Community, Enterprise and Compliance Edition
        </title>
        <link rel="canonical" href="https://search-guard.com/licensing/" />
        <meta
          name="description"
          content="Get to know more about the Search Guard Editions and pricing. Fair licensing and secure your Elasticsearch cluster with an unlimited amount of nodes - scale your cluster not your costs."
        />
      </Helmet>
      <Title
        headline="Pricing"
        text="Unlimited nodes licensing for all Security and Alerting features. Scale your cluster, not your cost!"
        breadcrumb={breadcrumb}
      />
      <LicensingModel
        headline="Search Guard Editions"
        topButtons={false}
        tableView
      />
      <div id="academic">
        <Card
          bgLeftDark
          iconLeft={iconBook}
          iconRight={iconWheels}
          headlineLeft="Academic & Scientific Programme"
          headlineRight="OEM, Integrators & Resellers"
          textLeft="We want to give back to education and science and provide free licenses and special discounts for eligible institutions. Get in touch with us to learn more."
          textRight="We provide tailor made custom licenses for system integrators, OEM partners and resellers."
          linkLeft="/contacts/"
          linkRight="/contacts/"
        />
      </div>
      <References />
      <Cta
        headline="Interested?"
        text="Get in touch with us, or start your free 60-day trial."
        ctaText="Start free trial"
        icon={ctaIcon}
        link="/search-guard-free-trial/"
      />
      <PreFooter />
    </PageWrapper>
  );
};

export default License;
