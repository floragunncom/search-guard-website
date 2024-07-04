import React from 'react';
import { Helmet } from 'react-helmet';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import PreFooter from '../../components/PreFooter/PreFooter';
import Journey from '../../components/Journey/Journey';
import Cta from '../../components/Cta/Cta';
import Partners from '../../components/Partners/Partners';
import ctaIcon from '../../images/icon-sg.svg';
import Title from '../../components/Title/Title';
import Team from '../../components/Team/Team';

const Company = () => {

    const breadcrumb = [
        { id: 1, anchor: '/', name: 'Home' },
        { id: 1, anchor: '/company/', name: 'Company' },
    ];

  return (
    <PageWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Team | Get to know the minds behind Search Guard</title>
        <link rel="canonical" href="https://preview.search-guard.com/company/" />
        <meta
          name="description"
          content="Our mission is to shape IT security and Open Source business models. From day 1 until today, we follow our principles of putting security first and providing no-nonsense IT."
        />
      </Helmet>
      <Title
        headline="company"
        text="We shape IT security and Open Source business models since 2013."
        breadcrumb={breadcrumb}
      />
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
    </PageWrapper>
  );
};

export default Company;
