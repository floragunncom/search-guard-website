import React from 'react';
import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './Footer.scss';

const Footer = ({ landing }) => {
  return (
    <div className="footer-container">
      <div className="footer-wrapper">
        {!landing ? (
          <div className="footer-links-container">
            <div className="row footer-row">
              <div className="footer-links-column-container col s12 m6 l3">
                <div className="footer-list-headline">
                  <NavLink to="/product/" onClick={window.scrollTo(0, 0)}>
                    product
                  </NavLink>
                </div>
                <div className="footer-list-item">
                  <HashLink to="/product#concept" className="footer-links">
                    What it is
                  </HashLink>
                </div>
                <div className="footer-list-item">
                  <HashLink to="/resource#videos" className="footer-links">
                    How it works
                  </HashLink>
                </div>
                <div className="footer-list-item">
                  <NavLink to="/certificates/" className="footer-links">
                    Certifications
                  </NavLink>
                </div>
              </div>
              <div className="filler-class" />
              <div className="footer-links-column-container col s12 m6 l3">
                <div className="footer-list-headline">
                  <NavLink to="/licensing/" onClick={window.scrollTo(0, 0)}>
                    license
                  </NavLink>
                </div>
                <div className="footer-list-item">
                  <HashLink to="/licensing#standard" className="footer-links">
                    Standard editions
                  </HashLink>
                </div>
                <div className="footer-list-item">
                  <HashLink to="/licensing#feature" className="footer-links">
                    Feature breakdown
                  </HashLink>
                </div>
                <div className="footer-list-item">
                  <HashLink to="/licensing#academic" className="footer-links">
                    Academic edition
                  </HashLink>
                </div>
                <div className="footer-list-item">
                  <HashLink to="/licensing#academic" className="footer-links">
                    Custom edition
                  </HashLink>
                </div>
                {/* <div className="footer-list-item">
                  <NavLink to="/education-program/" className="footer-links">
                    Education program
                  </NavLink>
                </div> */}
              </div>
              <div className="filler-class" />
              <div className="footer-links-column-container col s12 m6 l3">
                <div className="footer-list-headline">
                  <NavLink to="/resource/" onClick={window.scrollTo(0, 0)}>
                    resource hub
                  </NavLink>
                </div>
                <div className="footer-list-item">
                  <a
                    href="https://docs.search-guard.com/latest/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-links"
                  >
                    Documentation
                  </a>
                </div>
                <div className="footer-list-item">
                  <a
                    href="https://git.floragunn.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-links"
                  >
                    Source Code
                  </a>
                </div>
                <div className="footer-list-item">
                  <NavLink to="/faq/" className="footer-links">
                    FAQ
                  </NavLink>
                </div>
                <div className="footer-list-item">
                  <a
                    href="https://forum.search-guard.com/latest/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-links"
                  >
                    Community forum
                  </a>
                </div>
                <div className="footer-list-item">
                  <NavLink
                    to="/tls-certificate-generator/"
                    className="footer-links"
                  >
                    TLS certificate generator
                  </NavLink>
                </div>
                <div className="footer-list-item">
                  <NavLink to="/blog/" className="footer-links">
                    Blog
                  </NavLink>
                </div>
                <div className="footer-list-item">
                  <NavLink to="/presentations/" className="footer-links">
                    Presentations
                  </NavLink>
                </div>
                <div className="footer-list-item">
                  <NavLink to="/white-papers/" className="footer-links">
                    White papers
                  </NavLink>
                </div>
              </div>
              <div className="filler-class" />
              <div className="footer-links-column-container col s12 m6 l3">
                <div className="footer-list-headline">
                  <NavLink to="/company/" onClick={window.scrollTo(0, 0)}>
                    company
                  </NavLink>
                </div>
                <div className="footer-list-item">
                  <HashLink to="/company#team" className="footer-links">
                    Who we are
                  </HashLink>
                </div>
                <div className="footer-list-item">
                  <HashLink to="/company#partners" className="footer-links">
                    Partners
                  </HashLink>
                </div>
                <div className="footer-list-item">
                  <HashLink to="/product#integrators" className="footer-links">
                    Integrators
                  </HashLink>
                </div>
                <div className="footer-list-item">
                  <NavLink to="/datenschutz/" className="footer-links">
                    Data protection
                  </NavLink>
                </div>
                <div className="footer-list-item">
                  <NavLink to="/impressum/" className="footer-links">
                    Imprint
                  </NavLink>
                </div>
                <div className="footer-list-item">
                  <NavLink to="/security/" className="footer-links">
                    Public key & security
                  </NavLink>
                </div>
              </div>
              <div className="filler-class" />
            </div>
          </div>
        ) : null}
        <div
          className="footer-text"
          style={landing ? { paddingTop: '64px' } : null}
        >
          <p>© 2018 floragunn GmbH - All Rights Reserved</p>
          <p>
            Search Guard is a trademark of floragunn GmbH, registered in the
            U.S. and in other countries. Elasticsearch, Kibana, Logstash, and
            Beats are trademarks of Elasticsearch BV, registered in the U.S. and
            in other countries. Apache, Apache Lucene, Apache Hadoop, Hadoop,
            HDFS and the yellow elephant logo are trademarks of the Apache
            Software Foundation in the United States and/or other countries.
          </p>
          <NavLink className="hidden" to="/marketing/">m</NavLink>
          <NavLink className="hidden" to="/thanks/">t</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Footer;
