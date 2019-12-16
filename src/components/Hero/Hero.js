import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../Button/Button';
import heroCertificates from '../../images/hero-certificates.svg';
import veracode from '../../images/veracode.svg';
import alliance from '../../images/alliance.svg';
import security from '../../images/security.svg';
import './Hero.scss';

const Hero = () => {
  return (
    <div>
      <div className="hero-wrapper">
        <div className="row">
          <div className="hero-row-empty-mobile" />
          <div className="col s12 m5 l6">
            <div className="hero-col-wrapper">
              <div className="hero-text-wrapper">
                <div className="hero-text-wrapper-headline">
                  Security and Alerting for Elasticsearch
                </div>
                <div className="hero-text-wrapper-text">
                  Search Guard is an Enterprise Security and Alerting Suite that
                  encrypts and protects your data and data flows in the entire
                  Elastic Stack, including Kibana, Logstash and Beats.
                </div>
              </div>
              <div className="hero-button-wrapper">
                <Button
                  text="start free trial"
                  buttonStyle="loud-link"
                  link="https://docs.search-guard.com/latest/demo-installer"
                  target="_blank"
                />
              </div>
              <NavLink to="/certificates/" className="hero-certificate-wrapper">
                <img src={heroCertificates} alt="certificate icon" />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-certificate-wrapper-hidden">
        <img src={veracode} alt="veracode logo" />
        <img src={alliance} alt="alliance logo" />
        <img src={security} alt="security logo" />
      </div>
    </div>
  );
};

export default Hero;
