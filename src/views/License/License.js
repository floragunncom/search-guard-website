import React from 'react';
import { Helmet } from 'react-helmet';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import Title from '../../components/Title/Title';
import Tile from '../../components/Tile/Tile';
import AnchorNavBar from '../../components/AnchorNavBar/AnchorNavBar';
import LicensingModel from '../../components/LicensingModel/LicensingModel';
import References from '../../components/References/References';
import Cta from '../../components/Cta/Cta';
import ctaIcon from '../../images/icon-sg.svg';
import iconBook from '../../images/icon-book.svg';
import iconWheels from '../../images/icon-wheels.svg';

const License = () => {
  const anchors = [
    { anchor: 'standard', name: 'standard editions' },
    { anchor: 'feature', name: 'feature breakdown' },
    { anchor: 'academic', name: 'Academic and Custom editions' },
  ];

  return (
    <div id="top">
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
      <NavBar />
      <Title
        headline="licensing model"
        text="Unlimited nodes licensing for all security and alerting features. Scale your cluster, not your cost!"
      />
      <AnchorNavBar anchors={anchors} />
      <LicensingModel
        headline="Search Guard Editions"
        topButtons={false}
        tableView
      />
      <div id="academic">
        <Tile
          leftDark={false}
          leftIcon={iconBook}
          rightIcon={iconWheels}
          leftHeadline="Academic & Scientific edition"
          rightHeadline="OEM, integrators & resellers"
          leftText="Because we love to support education and science, we offer a special license model for non-profit academic and scientific purposes. If you think your project/institution is eligible for this program, please contact us."
          rightText="We provide tailor made custom licenses for system integrators, OEM partners and resellers."
          leftLink="/contacts/"
          rightLink="/contacts/"
        />
      </div>
      <References />
      <Cta
        headline="Interested?"
        text="Then you can either get in touch to find out more or start a 60-day trial with our Compliance edition."
        ctaText="Contact Us"
        icon={ctaIcon}
        link="/contacts/"
      />
      <PreFooter />
      <Footer />
    </div>
  );
};

export default License;
