import React from 'react';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import Journey from '../../components/Journey/Journey';
import Button from '../../components/Button/Button';
import Cta from '../../components/Cta/Cta';
import Partners from '../../components/Partners/Partners';
import ctaIcon from '../../images/cta-banner-arrow.svg';
import Title from '../../components/Title/Title';
import Team from '../../components/Team/Team';
import AnchorNavBar from '../../components/AnchorNavBar/AnchorNavBar';

const Company = () => {
  const anchors = [
    { anchor: 'team', name: 'management team' },
    { anchor: 'partners', name: 'partners' },
    { anchor: 'journey', name: 'journey' },
  ];

  return (
    <div id="top">
      <NavBar />
      <Title
        headline="company"
        text="We shape IT security and Open Source business models."
      />
      <AnchorNavBar anchors={anchors} />
      <Team />
      <Partners />
      <Journey />
      <Cta
        headline="Free 60-day trial"
        text="Want to see how your company can benefit from our Compliance edition? Sign up to our 60-day trial, completely free of charge."
        ctaText="start free trial"
        icon={ctaIcon}
      />
      <PreFooter />
      <Footer />
    </div>
  );
};

export default Company;
