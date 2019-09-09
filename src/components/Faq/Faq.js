import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '../Button/Button';
import './Faq.scss';

class Faq extends Component {
  onFaqButtonPress() {
    return <Redirect to="/faq" />;
  }

  render() {
    return (
      <div className="faq-wrapper" id="faq">
        <div className="row faq-row">
          <div className="faq-headline">Frequently asked questions</div>
          <div className="faq-info-boxes">
            <a className="faq-info-box" href="faq#one">
              <div className="faq-info-box-headline">What is Search Guard?</div>
              <div className="faq-info-box-text">
                Search Guard is an Enterprise Security Suite that encrypts and
                protects your data and data flows in the entire Elastic Stack,
                including Kibana, Logstash and Beats.
              </div>
            </a>
            <a className="faq-info-box" href="faq#four">
              <div className="faq-info-box-headline">Do you offer support?</div>
              <div className="faq-info-box-text">
                Of course. We offer both free support for the{' '}
                <a
                  href="https://forum.search-guard.com/latest/"
                  target="_blank"
                >
                  Search Guard community
                </a>{' '}
                as well as paid support for our customers. As paying customer
                you get direct access to the core Search Guard developers and we
                also guarantee SLAs via our support portal.
              </div>
            </a>
            <a className="faq-info-box" href="faq#thirteen">
              <div className="faq-info-box-headline">
                What is the easiest way to set up PoC?
              </div>
              <div className="faq-info-box-text">
                The easiest way to set up a PoC and try out all Search Guard
                features is to use the Search Guard Demo Installer:
                <a
                  href="https://docs.search-guard.com/latest/demo-installer"
                  target="_blank"
                >
                  Search Guard Demo Installer
                </a>
                The installer comes with a trial license that enables all
                Enterprise and Compliance features for 60 days. If you need to
                extend your Search Guard trial, just{' '}
                <a href="/contact">get in contact with us</a> and we’re happy to
                provide you with an extended license.
              </div>
            </a>
          </div>
          <div className="faq-button">
            <Button text="see more" link="/faq" />
          </div>
        </div>
      </div>
    );
  }
};

export default Faq;
