import React from 'react';
import './Footer.scss';
import RichSnippetCompany from '../RichSnippets/RichSnippetCompany';

const Footer = ({ landing }) => {

  const currentYear = new Date().getFullYear();

  return (
    <div className="footer-container">
      <div className="footer-wrapper">
        {!landing ? (
          <div className="footer-links-container">
            <div className="row footer-row">
              <div className="footer-links-column-container col s12 m6 l3">
                <div className="footer-list-headline">
                  <a href="/security/">security</a>
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
                  <a href="/certificates/" className="footer-links">
                    Certifications
                  </a>
                </div>
                <div className="footer-list-item">
                  <a href="/compliance/" className="footer-links">
                    Compliance
                  </a>
                </div>
                <div className="footer-list-headline">
                </div>
                <div className="footer-list-headline">
                  <a href="/security/">alerting</a>
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
                  <a href="/alerting/#escalationmodel" className="footer-links">
                    Escalation model
                  </a>
                </div>
              </div>
              <div className="filler-class" />
              <div className="footer-links-column-container col s12 m6 l3">
                <div className="footer-list-headline">
                  <a href="/licensing/">license</a>
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
                  <a href="/resource/">resources</a>
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
                  <a href="/faq/" className="footer-links">
                    FAQ
                  </a>
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
                  <a href="/blog/" className="footer-links">
                    Blog
                  </a>
                </div>
                <div className="footer-list-item">
                  <a href="/presentations/" className="footer-links">
                    Presentations
                  </a>
                </div>
                <div className="footer-list-item">
                  <a href="/whitepapers/" className="footer-links">
                    White papers
                  </a>
                </div>
                <div className="footer-list-item">
                  <a href="/compliance/" className="footer-links">
                    Compliance
                  </a>
                </div>
                <div className="footer-list-item">
                  <a href="/sitemap/" className="footer-links">
                    Sitemap
                  </a>
                </div>
              </div>
              <div className="filler-class" />
              <div className="footer-links-column-container col s12 m6 l3">
                <div className="footer-list-headline">
                  <a href="/company/">company</a>
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
                  <a href="/datenschutz/" className="footer-links">
                    Data protection
                  </a>
                </div>
                <div className="footer-list-item">
                  <a href="/impressum/" className="footer-links">
                    Imprint
                  </a>
                </div>
                <div className="footer-list-item">
                  <a href="/security-information/" className="footer-links">
                    Public key & security
                  </a>
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
          <p>© {currentYear} floragunn GmbH - All Rights Reserved</p>
          <p>
            Search Guard is a trademark of floragunn GmbH, registered in the
            U.S. and in other countries. Elasticsearch, Kibana, Logstash, and
            Beats are trademarks of Elasticsearch BV, registered in the U.S. and
            in other countries. Apache, Apache Lucene, Apache Hadoop, Hadoop,
            HDFS and the yellow elephant logo are trademarks of the Apache
            Software Foundation in the United States and/or other countries.
          </p>
        </div>
      </div>
      <RichSnippetCompany />
    </div>
  );
};

export default Footer;