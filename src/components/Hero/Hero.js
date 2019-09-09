import React from 'react';
import Button from '../../components/Button/Button';
import heroCertificates from '../../images/hero-certificates.svg';
import veracode from '../../images/veracode.svg';
import alliance from '../../images/alliance.svg';
import security from '../../images/security.svg';
import './Hero.scss';

const Hero = ({landing}) => {
  return (
    <div>
      <div className="hero-wrapper">
        <div className="row">
          <div className="hero-row-empty-mobile" />
          <div className="col s12 m5 l6">
            <div className="hero-col-wrapper">
              <div className="hero-text-wrapper">
                <div className="hero-text-wrapper-headline">
                  Security for Elasticsearch
                </div>
                <div className="hero-text-wrapper-text">
                  Search Guard is an Enterprise Security Suite that encrypts and
                  protects your data and data flows in the entire Elastic Stack,
                  including Kibana, Logstash and Beats.
                </div>
              </div>
              <div
                className="hero-button-wrapper"
                style={landing ? { visibility: 'hidden' } : null}
              >
                <Button
                  text="start free trial"
                  style="loud-link"
                  link="https://docs.search-guard.com/latest/demo-installer"
                  target="_blank"
                />
              </div>
              <a
                href="/certifications"
                className="hero-certificate-wrapper"
                style={landing ? { visibility: 'hidden' } : null}
              >
                <img src={heroCertificates} alt="icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className={landing ? "hidden" : "hero-certificate-wrapper-hidden"}>
        <img src={veracode} alt="icon" />
        <img src={alliance} alt="icon" />
        <img src={security} alt="icon" />
      </div>
    </div>
  );
};

export default Hero;
