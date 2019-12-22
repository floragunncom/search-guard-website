import React from 'react';
import { Helmet } from 'react-helmet';
import Button from '../../components/Button/Button';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import './Thanks.scss';

const Thanks = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Search Guard | Thanks for your message</title>
        <link rel="canonical" href="https://search-guard.com/thanks/" />
        <meta
          name="description"
          content="Thank you very much for getting in contact with Search Guard and our team."
        />
      </Helmet>
      <NavBar />
      <div className="thanks-wrapper">
        <div className="row">
          <div className="col s12 m10 offset-m1 l8 offset-l2">
            <div className="thanks-warning">Thank you!</div>
            <div className="thanks-text">
              Your contact form was successfully submitted.
              <br />
              Thank you for your interest in Search Guard, we will get back to
              you as soon as possible.
              <br />
              <br />
              Kindly,
              <br />
              Your Search Guard team
            </div>
            <div className="thanks-button">
              <Button text="home" link="/" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Thanks;
