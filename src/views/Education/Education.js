import React from 'react';
import { Helmet } from 'react-helmet';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
// import Cta from '../../components/Cta/Cta';
import NavBar from '../../components/NavBar/NavBar';
import Title from '../../components/Title/Title';
// import ctaIcon from '../../images/cta-banner-arrow.svg';
import './Education.scss';

const Education = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Search Guard Education Program</title>
        <link
          rel="canonical"
          href="http://search-guard.com/education-program/"
        />
        <meta
          name="description"
          content="We take security seriously. Our policy for reporting security related issues found in Search Guard."
        />
      </Helmet>
      <NavBar />
      <Title
        headline="Education program"
        text="We want to give back to education and science and provide special discounts and free licenses for eligible institutions. Get in touch with us to learn more."
      />
      {/* <Cta
        headline="Promotional banner"
        text="Want to see how your company can benefit from our Compliance edition? Sign up to our 60-day trial, completely free of charge."
        ctaText="start free trial"
        icon={ctaIcon}
      /> */}
      <PreFooter />
      <Footer />
    </div>
  );
}

export default Education;