import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.scss';
import RichSnippetCompany from '../RichSnippets/RichSnippetCompany';

const Footer = ({ landing }) => {
  return (
    <div className="footer-container">
      <div className="footer-wrapper">
        {!landing ? (
          <div className="footer-links-container">
            <div className="row footer-row">
              <div className="footer-links-column-container col s12 m6 l3">
                <div className="footer-list-headline">
                  <NavLink to="/security/">security</NavLink>
                </div>
                <div className="footer-list-item">
                  <a href="/security/#concept" className="footer-links">
                    What it is
                  </a>
                </div>
                <div className="footer-list-item">
                  <a href="/resource/#videos" className="footer-links">
                    How it works
                  </a>
                </div>
                <div className="footer-list-item">
                  <NavLink to="/certificates/" className="footer-links">
                    Certifications
                  </NavLink>
                </div>
                <div className="footer-list-item">
                  <NavLink to="/compliance/" className="footer-links">
                    Compliance
                  </NavLink>
                </div>
                <div className="footer-list-headline">
                </div>
                <div className="footer-list-headline">
                  <NavLink to="/security/">alerting</NavLink>
                </div>
                <div className="footer-list-item">
                  <a href="/alerting/#concept" className="footer-links">
                    What it is
                  </a>
                </div>
                <div className="footer-list-item">
                  <a href="/alerting/#connectors" className="footer-links">
                    Connectors
                  </a>
                </div>
                <div className="footer-list-item">
                  <NavLink to="/alerting/#escalationmodel" className="footer-links">
                    Escalation model
                  </NavLink>
                </div>
              </div>
              <div className="filler-class" />
              <div className="footer-links-column-container col s12 m6 l3">
                <div className="footer-list-headline">
                  <NavLink to="/licensing/">license</NavLink>
                </div>
                <div className="footer-list-item">
                  <a href="/licensing/#standard" className="footer-links">
                    Standard editions
                  </a>
                </div>
                <div className="footer-list-item">
                  <a href="/licensing/#feature" className="footer-links">
                    Feature breakdown
                  </a>
                </div>
                <div className="footer-list-item">
                  <a href="/licensing/#academic" className="footer-links">
                    Academic edition
                  </a>
                </div>
                <div className="footer-list-item">
                  <a href="/licensing/#academic" className="footer-links">
                    Custom edition
                  </a>
                </div>
              </div>
              <div className="filler-class" />
              <div className="footer-links-column-container col s12 m6 l3">
                <div className="footer-list-headline">
                  <NavLink to="/resource/">resources</NavLink>
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
                    href="https://git.floragunn.com/public/"
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
                  <NavLink to="/whitepapers/" className="footer-links">
                    White papers
                  </NavLink>
                </div>
                <div className="footer-list-item">
                  <NavLink to="/compliance/" className="footer-links">
                    Compliance
                  </NavLink>
                </div>
              </div>
              <div className="filler-class" />
              <div className="footer-links-column-container col s12 m6 l3">
                <div className="footer-list-headline">
                  <NavLink to="/company/">company</NavLink>
                </div>
                <div className="footer-list-item">
                  <a href="/company/#team" className="footer-links">
                    Who we are
                  </a>
                </div>
                <div className="footer-list-item">
                  <a href="/company/#partners" className="footer-links">
                    Partners
                  </a>
                </div>
                <div className="footer-list-item">
                  <a href="/security/#integrators" className="footer-links">
                    Integrators
                  </a>
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
                  <NavLink to="/security-information/" className="footer-links">
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
          <p>© 2022 floragunn GmbH - All Rights Reserved</p>
          <p>
            Search Guard is a trademark of floragunn GmbH, registered in the
            U.S. and in other countries. Elasticsearch, Kibana, Logstash, and
            Beats are trademarks of Elasticsearch BV, registered in the U.S. and
            in other countries. Apache, Apache Lucene, Apache Hadoop, Hadoop,
            HDFS and the yellow elephant logo are trademarks of the Apache
            Software Foundation in the United States and/or other countries.
            <br />
            <NavLink to="/heise/" className="footer-links">
              Lower your TCO
            </NavLink>
            <NavLink to="/outdated-elasticsearch-versions-suppport/" className="footer-links">
              Older Versions Support
            </NavLink>

          </p>
        </div>
      </div>
      <RichSnippetCompany />
    </div>
  );
};

export default Footer;