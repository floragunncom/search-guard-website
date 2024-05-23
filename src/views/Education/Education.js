import React from 'react';
import { Helmet } from 'react-helmet';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import PreFooter from '../../components/PreFooter/PreFooter';
import Title from '../../components/Title/Title';
import './Education.scss';

const Education = () => {
  return (
    <PageWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Search Guard Education Program</title>
        <link
          rel="canonical"
          href="https://preview.search-guard.com/education-program/"
        />
        <meta
          name="description"
          content="We take security seriously. Our policy for reporting security related issues found in Search Guard."
        />
      </Helmet>
      <Title
        headline="Education program"
        text="We want to give back to education and science and provide special discounts and free licenses for eligible institutions. Get in touch with us to learn more."
      />
      <PreFooter />
    </PageWrapper>
  );
};

export default Education;
