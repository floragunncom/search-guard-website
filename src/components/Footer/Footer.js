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
                <a href="/">What it is</a>
              </div>
              <div className="footer-list-item">
                <a href="/">How it works</a>
              </div>
              <div className="footer-list-item">
                <a href="/">Certifications</a>
              </div>
            </div>
            <div className="filler-class" />
            <div className="footer-links-column-container col s12 m6 l3">
              <div className="footer-list-headline">licensing</div>
              <div className="footer-list-item">
                <a href="/">Standard editions</a>
              </div>
              <div className="footer-list-item">
                <a href="/">Feature breakdown</a>
              </div>
              <div className="footer-list-item">
                <a href="/">Academic & Custom editions</a>
              </div>
            </div>
            <div className="filler-class" />
            <div className="footer-links-column-container col s12 m6 l3">
              <div className="footer-list-headline">resource hub</div>
              <div className="footer-list-item">
                <a href="https://docs.search-guard.com/latest/" target="_blank">Documentation</a>
              </div>
              <div className="footer-list-item">
                <a href="/">Github repo</a>
              </div>
              <div className="footer-list-item">
                <a href="/faq">FAQ</a>
              </div>
              <div className="footer-list-item">
                <a href="/">Community forum</a>
              </div>
              <div className="footer-list-item">
                <a href="/">TLS certificate generator</a>
              </div>
              <div className="footer-list-item">
                <a href="/blog">Blog</a>
              </div>
              <div className="footer-list-item">
                <a href="/">Presentations</a>
              </div>
              <div className="footer-list-item">
                <a href="/">White Paper</a>
              </div>
              <div className="footer-list-item">
                <a href="/">Video Tutorials</a>
              </div>
            </div>
            <div className="filler-class" />
            <div className="footer-links-column-container col s12 m6 l3">
              <div className="footer-list-headline">company</div>
              <div className="footer-list-item">
                <a href="/">Mission</a>
              </div>
              <div className="footer-list-item">
                <a href="/">Who we are</a>
              </div>
              <div className="footer-list-item">
                <a href="/">Partners</a>
              </div>
              <div className="footer-list-item">
                <a href="/">Integrators</a>
              </div>
              <div className="footer-list-item">
                <a href="/">Data protection</a>
              </div>
              <div className="footer-list-item">
                <a href="/imprint">Imprint</a>
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
