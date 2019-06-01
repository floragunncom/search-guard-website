import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-wrapper">
        <div className="footer-links-container">
          <div className="row footer-row">
            <div className="footer-links-column-container col s12 m6 l3">
              <div className="footer-list-headline">product</div>
              <div className="footer-list-item">
                <a href="/" className="footer-links">What it is</a>
              </div>
              <div className="footer-list-item">
                <a href="/" className="footer-links">How it works</a>
              </div>
              <div className="footer-list-item">
                <a href="/certifications" className="footer-links">Certifications</a>
              </div>
            </div>
            <div className="filler-class" />
            <div className="footer-links-column-container col s12 m6 l3">
              <div className="footer-list-headline">licensing</div>
              <div className="footer-list-item">
                <a href="/license#standard" className="footer-links">Standard editions</a>
              </div>
              <div className="footer-list-item">
                <a href="/" className="footer-links">Feature breakdown</a>
              </div>
              <div className="footer-list-item">
                <a href="/" className="footer-links">Academic edition</a>
              </div>
              <div className="footer-list-item">
                <a href="/" className="footer-links">Custom edition</a>
              </div>
            </div>
            <div className="filler-class" />
            <div className="footer-links-column-container col s12 m6 l3">
              <div className="footer-list-headline">resource hub</div>
              <div className="footer-list-item">
                <a href="https://docs.search-guard.com/latest/" target="_blank" className="footer-links">Documentation</a>
              </div>
              <div className="footer-list-item">
                <a href="https://www.github.com/floragunn" target="_blank" className="footer-links">Github repo</a>
              </div>
              <div className="footer-list-item">
                <a href="/faq" className="footer-links">FAQ</a>
              </div>
              <div className="footer-list-item">
                <a href="/" className="footer-links">Community forum</a>
              </div>
              <div className="footer-list-item">
                <a href="/" className="footer-links">TLS certificate generator</a>
              </div>
              <div className="footer-list-item">
                <a href="/blog" className="footer-links">Blog</a>
              </div>
              <div className="footer-list-item">
                <a href="/presentations" className="footer-links">Presentations</a>
              </div>
              <div className="footer-list-item">
                <a href="/white-papers" className="footer-links">White Paper</a>
              </div>
            </div>
            <div className="filler-class" />
            <div className="footer-links-column-container col s12 m6 l3">
              <div className="footer-list-headline">company</div>
              <div className="footer-list-item">
                <a href="/" className="footer-links">Mission</a>
              </div>
              <div className="footer-list-item">
                <a href="/" className="footer-links">Who we are</a>
              </div>
              <div className="footer-list-item">
                <a href="/" className="footer-links">Partners</a>
              </div>
              <div className="footer-list-item">
                <a href="/" className="footer-links">Integrators</a>
              </div>
              <div className="footer-list-item">
                <a href="/data-protection" className="footer-links">Data protection</a>
              </div>
              <div className="footer-list-item">
                <a href="/imprint" className="footer-links">Imprint</a>
              </div>
              <div className="footer-list-item">
                <a href="/security" className="footer-links">Public key & security</a>
              </div>
            </div>
            <div className="filler-class" />
          </div>
        </div>
        <div className="footer-text">
          <p>© 2018 floragunn GmbH - All Rights Reserved</p>
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
    </div>
  );
};

export default Footer;
