import React from 'react';
import { Helmet } from 'react-helmet';
import { v4 } from 'uuid';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import Journey from '../../components/Journey/Journey';
import Cta from '../../components/Cta/Cta';
import Partners from '../../components/Partners/Partners';
import ctaIcon from '../../images/icon-sg.svg';
import Title from '../../components/Title/Title';
import Team from '../../components/Team/Team';
import News from '../../components/News/News';
import AnchorNavBar from '../../components/AnchorNavBar/AnchorNavBar';

const Company = () => {
  const anchors = [
    { id: v4(), anchor: 'news', name: 'News & Events' },
    { id: v4(), anchor: 'team', name: 'management team' },
    { id: v4(), anchor: 'partners', name: 'partners' },
    { id: v4(), anchor: 'journey', name: 'journey' },
  ];

  return (
    <div id="top">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Team | Get to know the minds behind Search Guard</title>
        <link rel="canonical" href="https://search-guard.com/company/" />
        <meta
          name="description"
          content="Our mission is to shape IT security and Open Source business models. From day 1 until today, we follow our principles of putting security first and providing no-nonsense IT."
        />
      </Helmet>
      <NavBar />
      <Title
        headline="company"
        text="We shape IT security and Open Source business models."
      />
      <AnchorNavBar anchors={anchors} />
      <News />
      <Team />
      <Partners />
      <Journey />
      <Cta
        headline="60-day PoC License"
        text="Want to see how your company can benefit from our Compliance edition? Sign up to our 60-day trial, completely free of charge."
        ctaText="start free trial"
        icon={ctaIcon}
        link="/contacts/"
      />
      <PreFooter />
      <Footer />
    </div>
  );
};

export default Company;
