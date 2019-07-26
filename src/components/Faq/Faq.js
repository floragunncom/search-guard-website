import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '../Button/Button';
import './Faq.scss';

class Faq extends Component {
  onFaqButtonPress() {
    return <Redirect to="/faq" />;
  }

  render() {
    return (
      <div className="faq-wrapper" id="faq">
        <div className="row faq-row">
          <div className="faq-headline">Frequently asked questions</div>
          <div className="faq-info-boxes">
            <a className="faq-info-box" href="faq#first">
              <div className="faq-info-box-headline">
                How does Search Guard compare to Shield / X-Pack Security?
              </div>
              <div className="faq-info-box-text">
                Search Guard is an independent implementation of a security access
                layer for Elasticsearch and is completely independent of
                Elasticsearch’s own security offerings. Search Guard offers
                similar functionality as competitor products and adds additional
                features on top, with a flexible licensing model…
              </div>
            </a>
            <a className="faq-info-box" href="faq#second">
              <div className="faq-info-box-headline">
                Who is using Search Guard?
              </div>
              <div className="faq-info-box-text">
                Search Guard runs on mission-critical production clusters
                protecting sensitive data in the finance, healthcare,
                pharmaceutical, aviation, telecommunications, security, and data
                intelligence industries. The cluster sizes range from typical ELK
                installations to hundreds of data nodes storing petabytes of data.
                For a list of Enterprise integrations...
              </div>
            </a>
            <a className="faq-info-box" href="faq#third">
              <div className="faq-info-box-headline">
                How secure is Search Guard?
              </div>
              <div className="faq-info-box-text">
                Search Guard runs on mission-critical production clusters
                protecting sensitive data in the finance, healthcare,
                pharmaceutical, aviation, telecommunications, security, and data
                intelligence industries. The cluster sizes range from typical ELK
                installations to hundreds of data nodes storing petabytes of data.
                installations to hundreds of data nodes storing petabytes of data.
                installations to hundreds of data nodes storing petabytes of data.
                For a list of Enterprise integrations...
              </div>
            </a>
          </div>
          <div className="faq-button">
            <Button text="see more" link="/faq" />
          </div>
        </div>
      </div>
    );
  }
};

export default Faq;
