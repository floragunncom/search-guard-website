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
              Search Guard puts “Security First”, your data is too valuable and
              sensitive to take any shortcut. Our code is being verified and
              certified from some of the industry leaders, like CA Veracode or
              NCC, which empowers us to demonstrate our commitment to creating
              truely secure software.
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
              Besides our community forum, where our technical team is very
              active, helping to solve any issue. We also offer first hand
              support to our costumers with a 48h response time, guaranteed.
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
              A wide variety of enterprises, from Fortune 500 companies to the
              most innovative start-ups around the world, are trusting in Search
              Guard to secure their environments, and for good reason.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Labels;
