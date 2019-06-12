import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import PreFooter from '../../components/PreFooter/PreFooter';
import Cta from '../../components/Cta/Cta';
import Title from '../../components/Title/Title';
import envelope from '../../images/icon-envelope.svg';
import './Faqs.scss';

const Faqs = () => {
  return (
    <div>
      <NavBar />
      <Title
        headline="Frequently asked questions"
        text="Suspendisse potenti. Nunc imperdiet molestie elit, a auctor enim vestibulum rutrum. Aliquam non tempus elit. Mauris ut accumsan libero."
      />
      <div className="row faq-row-wrapper">
        <div className="col s12 l4">
          <div className="faq-question-section">
            <div className="faq-question-headline">Nullam at porta</div>
            <div className="faq-question-text">
              <a href="#">
                How does Search Guard compare to Shield / X-Pack Security?
              </a>
            </div>
            <div className="faq-question-text">
              <a href="#">
                Who is using Search Guard?
              </a>
            </div>
            <div className="faq-question-text">
              <a href="#">
                How secure is Search Guard?
              </a>
            </div>
          </div>
          <div className="faq-question-section">
            <div className="faq-question-headline">Aenean volutpat</div>
            <div className="faq-question-text">
              <a href="#">
                What is your licensing model?
              </a>
            </div>
            <div className="faq-question-text">
              <a href="#">
                What's the easiest way to set up a PoC?
              </a>
            </div>
            <div className="faq-question-text">
              <a href="#">
                How do I get/install the enterprise features?
              </a>
            </div>
          </div>
          <div className="faq-question-section">
            <div className="faq-question-headline">Suspendisse nibh libero</div>
            <div className="faq-question-text">
              <a href="#">
                Where can I get support?
              </a>
            </div>
            <div className="faq-question-text">
              <a href="#">
                Why is your complete code publicly visible?
              </a>
            </div>
            <div className="faq-question-text">
              <a href="#">
                If the license expires, what happens with my cluster?
              </a>
            </div>
            <div className="faq-question-text">
              <a href="#">
                Is Search Guard compatible with the Elastic Stack?
              </a>
            </div>
          </div>
        </div>
        <div className="col s12 l8 faq-answer-wrapper">
          <div className="faq-answer-section">
            <div className="faq-answer-section-headline">Nullam at porta</div>
            <div className="faq-answer-headline">
              How does Search Guard compare to Shield / X-Pack Security?
            </div>
            <div className="faq-answer-text">
              <p>
                Search Guard is an independent implementation of a security
                access layer for Elasticsearch and is completely independent of
                Elasticsearch’s own security offerings.
              </p>
              <br />
              <p>
                Search Guard offers similar functionality as competitor products
                and adds additional features on top, with a flexible licensing
                model.
              </p>
              <br />
              <p>Additional features include:</p>
              <br />
              <ul>
                <li>OpenSSL support</li>
                <li>Kerberos support</li>
                <li>JSON web token</li>
                <li>OpenID / JWKS</li>
                <li>Kibana multitenancy</li>
                <li>HTTP Proxy Authentication support</li>
                <li>Read- and write history compliance audit trails</li>
                <li>Field anonymization</li>
                <li>Immutable indices</li>
                <li>Open Source</li>
              </ul>
              Licenses for Search Guard are based on production clusters, not
              nodes. That means that you can scale your cluster up and down as
              necessary, without affecting the license costs. Development,
              staging, integration and QA/AUT-systems are covered by the license
              as well at no additional cost.
            </div>
            <div className="faq-answer-headline">
              Who is using Search Guard?
            </div>
            <div className="faq-answer-text">
              <p>
                Search Guard runs on mission-critical production clusters
                protecting sensitive data in the finance, healthcare,
                pharmaceutical, aviation, telecommunications, security, and data
                intelligence industries. The cluster sizes range from typical
                ELK installations to hundreds of data nodes storing petabytes of
                data.
              </p>
              <br />
              <p>
                For a list of Enterprise integrations, including Red Hat Open
                Shift and Pivotal Cloud Foundry, please see the list of
                integrators.
              </p>
              <br />
              <p>
                We also support non-profit organizations under our Scientific
                and Academic licensing programme. Customers include Harvard Law
                School, Princeton University, University of Chicago, Karlsruhe
                Institute of Technology (KIT), Université Laval or Centre de
                Calcul de l’Institut National de Physique Nucléaire (France).
              </p>
              <br />
            </div>
            <div className="faq-answer-headline">
              How secure is Search Guard?
            </div>
            <div className="faq-answer-text">
              <p>
                Our complete code is Open Source, so in addition to our own
                quality processes it has been audited several times by security
                experts and auditors of our customers.
              </p>
              <br />
              <p>
                Search Guard also participates in CA Veracode Verified, a
                program that validates a company’s secure software development
                processes, and has reached the verified status. CA Veracode
                Verified empowers us to demonstrate our commitment to creating
                secure software:
              </p>
              <br />
              <p>
                <a
                  href="https://www.veracode.com/verified/directory"
                  target="_blank"
                  className="faq-answer-links"
                >
                  https://www.veracode.com/verified/directory
                </a>
              </p>
              <p>
                <a
                  href="https://www.veracode.com/ratings/floragunngmbh"
                  target="_blank"
                  className="faq-answer-links"
                >
                  https://www.veracode.com/ratings/floragunngmbh
                </a>
              </p>
              <br />
              <p>
                We are also member of the IT Security Association Germany
                (TeleTrusT). TeleTrusT is a widespread competence network for IT
                security comprising members from industry, administration,
                consultancy and research as well as national and international
                partner organizations with similar objectives.
              </p>
              <br />
              <p>
                We also participate in the Alliance for Cybersecurity. The
                Alliance for Cyber Security is an initiative of the Federal
                Office for Information Security (BSI) founded in cooperation
                with the Federal Association for Information Technology,
                Telecommunications and New Media (BITKOM).
              </p>
            </div>
          </div>
          <div className="faq-answer-section">
            <div className="faq-answer-section-headline">Nullam at porta</div>
            <div className="faq-answer-headline">
              What is your licensing model?
            </div>
            <div className="faq-answer-text">
              <p>
                Search Guard is an independent implementation of a security
                access layer for Elasticsearch and is completely independent of
                Elasticsearch’s own security offerings.
              </p>
              <br />
              <p>
                Search Guard offers similar functionality as competitor products
                and adds additional features on top, with a flexible licensing
                model.
              </p>
              <br />
              <p>Additional features include:</p>
              <br />
              <ul>
                <li>OpenSSL support</li>
                <li>Kerberos support</li>
                <li>JSON web token</li>
                <li>OpenID / JWKS</li>
                <li>Kibana multitenancy</li>
                <li>HTTP Proxy Authentication support</li>
                <li>Read- and write history compliance audit trails</li>
                <li>Field anonymization</li>
                <li>Immutable indices</li>
                <li>Open Source</li>
              </ul>
              Licenses for Search Guard are based on production clusters, not
              nodes. That means that you can scale your cluster up and down as
              necessary, without affecting the license costs. Development,
              staging, integration and QA/AUT-systems are covered by the license
              as well at no additional cost.
            </div>
            <div className="faq-answer-headline">
              What's the easiest way to set up a PoC?
            </div>
            <div className="faq-answer-text">
              <p>
                Search Guard runs on mission-critical production clusters
                protecting sensitive data in the finance, healthcare,
                pharmaceutical, aviation, telecommunications, security, and data
                intelligence industries. The cluster sizes range from typical
                ELK installations to hundreds of data nodes storing petabytes of
                data.
              </p>
              <br />
              <p>
                For a list of Enterprise integrations, including Red Hat Open
                Shift and Pivotal Cloud Foundry, please see the list of
                integrators.
              </p>
              <br />
              <p>
                We also support non-profit organizations under our Scientific
                and Academic licensing programme. Customers include Harvard Law
                School, Princeton University, University of Chicago, Karlsruhe
                Institute of Technology (KIT), Université Laval or Centre de
                Calcul de l’Institut National de Physique Nucléaire (France).
              </p>
              <br />
            </div>
            <div className="faq-answer-headline">
              How do I get/install the enterprise features?
            </div>
            <div className="faq-answer-text">
              <p>
                Our complete code is Open Source, so in addition to our own
                quality processes it has been audited several times by security
                experts and auditors of our customers.
              </p>
              <br />
              <p>
                Search Guard also participates in CA Veracode Verified, a
                program that validates a company’s secure software development
                processes, and has reached the verified status. CA Veracode
                Verified empowers us to demonstrate our commitment to creating
                secure software:
              </p>
              <br />
              <p>
                <a
                  href="https://www.veracode.com/verified/directory"
                  target="_blank"
                  className="faq-answer-links"
                >
                  https://www.veracode.com/verified/directory
                </a>
              </p>
              <p>
                <a
                  href="https://www.veracode.com/ratings/floragunngmbh"
                  target="_blank"
                  className="faq-answer-links"
                >
                  https://www.veracode.com/ratings/floragunngmbh
                </a>
              </p>
              <br />
              <p>
                We are also member of the IT Security Association Germany
                (TeleTrusT). TeleTrusT is a widespread competence network for IT
                security comprising members from industry, administration,
                consultancy and research as well as national and international
                partner organizations with similar objectives.
              </p>
              <br />
              <p>
                We also participate in the Alliance for Cybersecurity. The
                Alliance for Cyber Security is an initiative of the Federal
                Office for Information Security (BSI) founded in cooperation
                with the Federal Association for Information Technology,
                Telecommunications and New Media (BITKOM).
              </p>
            </div>
          </div>
        </div>
      </div>
      <Cta
        headline="Can’t find what you’re looking for?"
        text="No worries, maybe we can help you find the answer."
        ctaText="contact us"
        icon={envelope}
      />
      <PreFooter />
      <Footer />
    </div>
  );
};

export default Faqs;
