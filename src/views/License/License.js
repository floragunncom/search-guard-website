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

  const anchors = [
    { id: v4(), anchor: 'standard', name: 'standard editions' },
    { id: v4(), anchor: 'feature', name: 'feature breakdown' },
    { id: v4(), anchor: 'academic', name: 'Academic and Custom editions' },
  ];

  const breadcrumb = [
      { id: 1, anchor: '/', name: 'Home' },
      { id: 1, anchor: '/licensing/', name: 'Licensing' },
  ];

  return (
    <PageWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Licensing | Search Guard Community, Enterprise and Compliance Edition
        </title>
        <link rel="canonical" href="https://search-guard.com/licensing/" />
        <meta
          name="description"
          content="Get to know more about the Search Guard Editions and pricing. Fair licensing and secure your Elasticsearch cluster with an unlimited amount of nodes - scale your cluster not your costs."
        />
      </Helmet>
      <Title
        headline="licensing model"
        text="Unlimited nodes licensing for all security and alerting features. Scale your cluster, not your cost!"
        breadcrumb={breadcrumb}
      />
      <AnchorNavBar anchors={anchors} />
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
          headlineLeft="Academic & Scientific edition"
          headlineRight="OEM, integrators & resellers"
          textLeft="Because we love to support education and science, we offer a special license model for non-profit academic and scientific purposes. If you think your project/institution is eligible for this program, please contact us."
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
