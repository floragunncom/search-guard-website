import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import './Disclosure.scss';
import {Helmet} from "react-helmet";

const Disclosure = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Search Guard Disclosure Policy</title>
        <link
          rel="canonical"
          href="http://search-guard.com/disclosure-policy/"
        />
        <meta
          name="description"
          content="We take security seriously. Our policy for reporting security related issues found in Search Guard."
        />
      </Helmet>
      <NavBar />
      <Title
        headline="disclosure policy"
        text="Before reporting, please read our disclosure policy on how we handle security related bugs and issues."
      />
      <div className="row">
        <div className="col s12 l8 offset-l2">
          <div className="disclosure-wrapper">
            <div className="disclosure-main-headline">
              Vulnerability Disclosure Policy
            </div>
            <div className="disclosure-headline">
              floragunn GmbH/Search Guard Vulnerability Disclosure Policy
            </div>
            <div className="disclosure-text">
              We take the security of our systems seriously, and we value the
              security community. The disclosure of security vulnerabilities
              helps us ensure the security and privacy of our users.
            </div>
            <div className="disclosure-headline">Guidelines</div>
            <div className="disclosure-text">
              We require that all researchers:
              <br />
              <br />
              <ul className="disclosure-list">
                <li>
                  Make every effort to avoid privacy violations, degradation of
                  user experience, disruption to production systems, and
                  destruction of data during security testing;
                </li>
                <li>Perform research only within the scope set out below;</li>
                <li>
                  Use the identified communication channels to report
                  vulnerability information to us; and
                </li>
                <li>
                  Keep information about any vulnerabilities you’ve discovered
                  confidential between yourself and floragunn GmbH until we’ve
                  had 60 days to resolve the issue.
                </li>
              </ul>
              <br />
              If you follow these guidelines when reporting an issue to us, we
              commit to:
              <br />
              <br />
              <ul className="disclosure-list">
                <li>
                  Not pursue or support any legal action related to your
                  research;
                </li>
                <li>
                  Work with you to understand and resolve the issue quickly
                  (including an initial confirmation of your report within 72
                  hours of submission);
                </li>
                <li>
                  Recognise your contribution on our Security Researcher Hall of
                  Fame, if you are the first to report the issue and we make a
                  code or configuration change based on the issue.
                </li>
              </ul>
            </div>
            <div className="disclosure-headline">Scope</div>
            <div className="disclosure-text">
              Source code of the following public Gitlab repos:
              <br />
              <ul className="disclosure-list">
                <li>
                  <a
                    href="https://git.floragunn.com/search-guard/search-guard"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Search Guard
                  </a>
                </li>
                <li>
                  <a
                    href="https://git.floragunn.com/search-guard/search-guard-ssl"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Search Guard SSL
                  </a>
                </li>
                <li>
                  <a
                    href="https://git.floragunn.com/search-guard/search-guard-enterprise-modules"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Search Guard Enterprise Modules
                  </a>
                </li>
                <li>
                  <a
                    href="https://git.floragunn.com/search-guard/search-guard-kibana-plugin"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Search Guard Kibana Plugin
                  </a>
                </li>
                <li>
                  <a href="" target="_blank" rel="noreferrer noopener">
                    Search Guard Offline TLS Tool
                  </a>
                </li>
              </ul>
            </div>
            <div className="disclosure-headline">Out of scope</div>
            <div className="disclosure-text">
              Any services hosted by 3rd party providers and services mentioned
              below are excluded from scope.
              <br />
              <br />
              These services include (but are not limited to):
              <br />
              <br />
              <ul className="disclosure-list">
                <li>Gitlab itself</li>
                <li>The Search Guard Website</li>
                <li>The Search Guard Documentation Website</li>
                <li>Private Gitlab repos</li>
              </ul>
              <br />
              In the interest of the safety of our users, staff, the Internet at
              large and you as a security researcher, the following test types
              are excluded from scope:
              <br />
              <br />
              <ul className="disclosure-list">
                <li>
                  Findings from physical testing such as office access (e.g.
                  open doors, tailgating)
                </li>
                <li>
                  Findings derived primarily from social engineering (e.g.
                  phishing, vishing)
                </li>
                <li>
                  Findings from applications or systems not listed in the
                  ‘Scope’ section
                </li>
                <li>Spelling mistakes</li>
                <li>
                  Network level Denial of Service (DoS/DDoS) vulnerabilities
                </li>
              </ul>
            </div>
            <div className="disclosure-headline">
              How to report a security vulnerability?
            </div>
            <div className="disclosure-text">
              If you believe you’ve found a security vulnerability in one of our
              products (open source or commercial) please send it to us by
              emailing{' '}
              <a href="mailto:security@search-guard.com?Subject=Security%20Issue%20Search-Guard">
                security@floragunn.com
              </a>
              .
              <br />
              <br />
              We can accept only security issues at this address. Please include
              the following details with your report:
              <br />
              <br />
              <ul className="disclosure-list">
                <li>
                  Description of the location and potential impact of the
                  vulnerability;
                </li>
                <li>
                  A detailed description of the steps required to reproduce the
                  vulnerability (POC scripts, screenshots, and compressed screen
                  captures are all helpful to us); and
                </li>
                <li>
                  Your name/handle and a link for recognition in our Hall of
                  Fame.
                </li>
              </ul>
              <br />
              If you’d like to encrypt the information, please use our{' '}
              <a href="/security/">[PGP key].</a>
            </div>
          </div>
        </div>
      </div>
      <PreFooter />
      <Footer />
    </div>
  );
};

export default Disclosure;
