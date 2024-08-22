import React from 'react';
import certificate from '../../images/icon-certificate.svg';
import check from '../../images/icon-check.svg';
import shieldWheel from '../../images/shield-wheel.svg';
import './../Labels/Labels.scss';


const Labels = () => {
  return (
    <div className="securityinfo-wrapper">
      <div className="row">
        <div className="col s12 m4">
          <div className="securityinfo-icon-wrapper">
            <img loading="lazy" src={certificate} alt="certificate icon" width="150px" height="150px" />
          </div>
          <div className="securityinfo-text-wrapper">
            <h2 className="securityinfo-headline">Certified Security for Elasticsearch</h2>
            <div className="securityinfo-content">
              Search Guard puts Security for Elasticsearch first. Our code is rigorously tested and verified by industry leaders like CA Veracode and NCC.
              We are committed to creating truly secure software for Elasticsearch since 2013 when no security solution for the Elastic Stack existed.
            </div>
          </div>
        </div>
        <div className="col s12 m4">
          <div className="securityinfo-icon-wrapper">
            <img loading="lazy" src={shieldWheel} alt="shield icon" width="150px" height="150px"/>
          </div>
          <div className="securityinfo-text-wrapper">
            <h2 className="securityinfo-headline">Support for Elasticsearch and Search Guard</h2>
            <div className="securityinfo-content">
              Besides our Community Forum we offer priority Elasticsearch and Search Guard support to our costumers with guaranteed SLAs and direct access to the Search Guard developer team.
              Custom support plans, including follow-the-sun and Elastic Stack support plans are available.
            </div>
          </div>
        </div>
        <div className="col s12 m4">
          <div className="securityinfo-icon-wrapper">
            <img loading="lazy" src={check} alt="checkmark icon" width="150px" height="150px" />
          </div>
          <div className="securityinfo-text-wrapper">
            <h2 className="securityinfo-headline">Trusted by Fortune 500 companies</h2>
            <div className="securityinfo-content">
              Search Guard for Elasticsearch is used in production environments by Fortune 500 companies around the globe.
              Including the federal sector, finance and healthcare companies, Telco providers and innovative start-ups.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Labels;
