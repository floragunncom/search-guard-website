import React from 'react';
import './../Hero/Hero.scss';
import Button from "../Button/Button";


const Hero = () => {
  return (
      <div>
        <div className="hero-wrapper">
          <div className="row">
            <div className="hero-row-empty-mobile" />
            <div className="col s12 m5 l6">
              <div className="hero-col-wrapper">
                <div className="hero-text-wrapper">
                  <h1 className="hero-text-wrapper-headline">
                    Enterprise Security for Elasticsearch and Kibana
                  </h1>
                  <h2 className="body1 hero-text-wrapper-text">
                    Search Guard is an Enterprise Security Suite for Elasticsearch that encrypts and protects your data in the entire Elastic Stack,
                    including Kibana, Logstash and Beats.
                  </h2>
                </div>
                <div className="hero-button-wrapper">
                  <Button
                      text="Free Search Guard Trial"
                      buttonStyle="loud-link"
                      link="/search-guard-free-trial/"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Hero;
