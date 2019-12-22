import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '../../components/NavBar/NavBar';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button';

const WhitePapers = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Official Search Guard White Papers</title>
        <link rel="canonical" href="https://search-guard.com/white-papers/" />
        <meta
          name="description"
          content="How to use Search Guard to stay compliant with regulations like GDPR, HIPAA, PCI and SOX."
        />
      </Helmet>
      <NavBar />
      <Title
        headline="White Papers"
        text="How to use Search Guard to stay compliant with regulations like GDPR, HIPAA, PCI and SOX."
      />
      <div className="notfound-wrapper">
        <div className="row">
          <div className="col s12 m10 offset-m1 l8 offset-l2">
            <div className="notfound-warning">COMING SOON</div>
            <div className="notfound-text">
              Kindly,
              <br />
              Your Search Guard team
            </div>
            <div className="notfound-button">
              <Button text="Home" link="/" />
            </div>
          </div>
        </div>
      </div>
      <PreFooter />
      <Footer />
    </div>
  );
};

export default WhitePapers;
