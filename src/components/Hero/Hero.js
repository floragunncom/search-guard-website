import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../Button/Button';
import heroCertificates from '../../images/hero-certificates.svg';
import veracode from '../../images/veracode.svg';
import alliance from '../../images/alliance.svg';
import security from '../../images/security.svg';
import './Hero.scss';
import hero from '../../images/hero-static.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// , url('../../images/hero-background.svg');
const Hero = () => {
  return (
    <div>
      <div className="hero-wrapper">
        <div className="row">
          <div className="hero-row-empty-mobile" />
          <div className="col s12 m7 l6">
            <div className="hero-col-wrapper">
              <div className="hero-text-wrapper">
                <h1 className="hero-text-wrapper-headline">
                  Security and Alerting for Elasticsearch and Kibana
                </h1>
                <div className="hero-text-wrapper-text">
                  Search Guard is a security and alerting plugin that encrypts and protects your data
                  and data flows from unauthorized access in the entire Elastic Stack.
                </div>
              </div>
              <div className="hero-button-wrapper">
                <Button
                  text="Free Search Guard Trial"
                  buttonStyle="light-aqua-button"
                  link="/search-guard-free-trial/"
                />
              </div>
              {/* what about this? not visible in figma */}
              {/* <a href="/certificates/" className="hero-certificate-wrapper">
                <img loading="lazy" src={heroCertificates} alt="certificate icon"/>
              </a> */}
            </div>
          </div>
          <div className="col s12 m5 l6 hero-image">
            <LazyLoadImage src={hero} className='hero-image-content'/>
        </div>
        </div>
      </div>
      <div className="hero-certificate-wrapper-hidden">
        <img loading="lazy" src={veracode} alt="veracode logo" width="128px" height="78px" />
        <img loading="lazy" src={alliance} alt="alliance logo" width="200px" height="78px"/>
        <img loading="lazy" src={security} alt="security logo" width="133px" height="81px"/>
      </div>
    </div>
  );
};

export default Hero;
