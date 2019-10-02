import React from 'react';
import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Button from '../Button/Button';
import './Faq.scss';

const Faq = () => {
  return (
    <div className="faq-wrapper" id="faq">
      <div className="row faq-row">
        <div className="faq-headline">Frequently asked questions</div>
        <div className="faq-info-boxes">
          <HashLink to="/faq#one" className="faq-info-box">
            <div className="faq-info-box-headline">What is Search Guard?</div>
            <div className="faq-info-box-text">
              Search Guard is an Enterprise Security Suite that encrypts and
              protects your data and data flows in the entire Elastic Stack,
              including Kibana, Logstash and Beats.
            </div>
          </HashLink>
          <div className="faq-info-box">
            <div className="faq-info-box-headline">Do you offer support?</div>
            <div className="faq-info-box-text">
              Of course. We offer both free support for the{' '}
              <a
                href="https://forum.search-guard.com/latest/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Search Guard community
              </a>{' '}
              as well as paid support for our customers. As paying customer you
              get direct access to the core Search Guard developers and we also
              guarantee SLAs via our support portal.
            </div>
          </div>
          <div className="faq-info-box">
            <div className="faq-info-box-headline">
              What is the easiest way to set up PoC?
            </div>
            <div className="faq-info-box-text">
              The easiest way to set up a PoC and try out all Search Guard
              features is to use the Search Guard Demo Installer:{' '}
              <a
                href="https://docs.search-guard.com/latest/demo-installer"
                target="_blank"
                rel="noopener noreferrer"
              >
                Search Guard Demo Installer
              </a>
              The installer comes with a trial license that enables all
              Enterprise and Compliance features for 60 days. If you need to
              extend your Search Guard trial, just{' '}
              <NavLink to="/contacts/">get in contact with us</NavLink> and
              we’re happy to provide you with an extended license.
            </div>
          </div>
        </div>
        <div className="faq-button">
          <Button text="see more" link="/faq/" />
        </div>
      </div>
    </div>
  );
};

export default Faq;
