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
            <img src={certificate} alt="certificate icon" />
          </div>
          <div className="securityinfo-text-wrapper">
            <div className="securityinfo-headline">Certified</div>
            <div className="securityinfo-content">
              Search Guard puts “Security First”. Your data is too valuable to take any security shortcut,
              which is why our code is rigorously tested by industry leaders, like CA Veracode and NCC.
              We have been committed to creating truly secure software for elasticsearch since 2013
              when no security solution existed for the Elastic Stack.
            </div>
          </div>
        </div>
        <div className="col s12 m4">
          <div className="securityinfo-icon-wrapper">
            <img src={shieldWheel} alt="shield icon" />
          </div>
          <div className="securityinfo-text-wrapper">
            <div className="securityinfo-headline">Priority support</div>
            <div className="securityinfo-content">
              Besides our active community forum we also offer priority support to our costumers with a 48h response time, guaranteed.
              Custom support plans, including follow-the-sun, and Elastic Stack support plans are also available
            </div>
          </div>
        </div>
        <div className="col s12 m4">
          <div className="securityinfo-icon-wrapper">
            <img src={check} alt="checkmark icon" />
          </div>
          <div className="securityinfo-text-wrapper">
            <div className="securityinfo-headline">Trusted by</div>
            <div className="securityinfo-content">
              We are used in production environments by Fortune 500, federal sector, and innovative start-ups.
              Our clients span all across the world.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Labels;
