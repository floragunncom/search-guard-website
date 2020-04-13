import React from 'react';
import { Helmet } from 'react-helmet';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Button from '../../components/Button/Button';
import './CertificatesOnTheWay.scss';

const CertificatesOnTheWay = () => {
  return (
    <PageWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Search Guard | Thanks for using the certificate generator</title>
        <link rel="canonical" href="https://search-guard.com/thanks/" />
        <meta
          name="description"
          content="Thank you very much for using the Search Gard Certificate Generator service."
        />
      </Helmet>
      <div className="cow-wrapper">
        <div className="row">
          <div className="col s12 m10 offset-m1 l8 offset-l2">
            <div className="cow-warning">Thank you!</div>
            <div className="cow-text">
              Your certificates are being generated.
              <br />
              You should receive an email with the download link soon.
              <br />
              <br />
              Kindly,
              <br />
              Your Search Guard team
            </div>
            <div className="cow-button">
              <Button text="home" link="/" />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default CertificatesOnTheWay;
