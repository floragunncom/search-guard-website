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
              Search Guard puts <a href="/search-guard-puts-security-first/" target="_blank" rel="noopener nofollow">Security First</a>. Your data is too valuable to take any security shortcut.
              Our code is rigorously tested and verified by industry leaders like CA Veracode and NCC.
              We are committed to creating truly secure software for Elasticsearch since 2013
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
              Besides our active <a href="https://forum.search-guard.com" target="_blank" rel="noopener nofollow">Community Forum</a> we offer priority support to our costumers with guaranteed SLAs and direct access to the Search Guard developer team.
              Custom support plans, including follow-the-sun and Elastic Stack support plans are available.
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
              We are used in production environments by Fortune 500 companies, the federal sector, and innovative start-ups.
              Our clients span all across the world.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Labels;
