import React from 'react';
import './HeroMarketing.scss';

const HeroLandingPage = () => {
  return (
    <div className="hero-landing__wrapper">
      <div className="row">
        <div className="hero-landing__content-container">
          <div className="hero-landing__content-container-headline">
            Security and Alerting for Elasticsearch
          </div>
          <div className="hero-landing__content-container-text">
            Search Guard is an Enterprise Security and Alerting Suite that
            encrypts and protects your data and data flows in the entire Elastic
            Stack, including Kibana, Logstash and Beats.
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroLandingPage;
