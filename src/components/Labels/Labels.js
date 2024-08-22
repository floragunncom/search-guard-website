import React from 'react';
import certificate from '../../images/icon-certificate.svg';
import check from '../../images/icon-check.svg';
import shieldWheel from '../../images/shield-wheel.svg';
import './Labels.scss';

const Labels = () => {
  return (
    <div className="securityinfo-wrapper">
      <div className="row">
        <div className="col s12 m4">
          <div className="securityinfo-icon-wrapper">
            <img loading="lazy" src={certificate} alt="certificate icon" width="150px" height="150px" />
          </div>
          <div className="securityinfo-text-wrapper">
            <div className=" securityinfo-headline subtitle">Certified</div>
            <div className="securityinfo-content">
              Since 2013, Search Guard has been pushing the boundaries of Elastic Stack security.
              We don't take any shortcuts when it comes to data protection - our code is rigorously tested and verified by
              leading industry experts like CA Veracode and NCC for maximum assurance that your valuable data is safe and secure.
            </div>
          </div>
        </div>
        <div className="col s12 m4">
          <div className="securityinfo-icon-wrapper">
            <img loading="lazy" src={shieldWheel} alt="shield icon" width="150px" height="150px"/>
          </div>
          <div className="securityinfo-text-wrapper">
            <div className="securityinfo-headline subtitle">Priority support</div>
            <div className="securityinfo-content">
              Our customers enjoy priority support with guaranteed service-level agreements and direct access to the Search Guard developer team.
              Custom plans that include 24/7 coverage and  Elastic Stack support are available for maximum peace of mind.
              Get connected today on our active  <a href="https://forum.search-guard.com" target="_blank" rel="noopener noreferrer">Community Forum</a>!
            </div>
          </div>
        </div>
        <div className="col s12 m4">
          <div className="securityinfo-icon-wrapper">
            <img loading="lazy" src={check} alt="checkmark icon" width="150px" height="150px" />
          </div>
          <div className="securityinfo-text-wrapper">
            <div className="securityinfo-headline subtitle">Trusted by</div>
            <div className="securityinfo-content">
              Our clients span the globe, from Fortune 500s and federal entities to groundbreaking start-ups.
              They trust us with their most important projects - no matter the size or type.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Labels;
