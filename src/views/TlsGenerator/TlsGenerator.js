import React from 'react';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import DropDown from '../../components/DropDown/DropDown';
import { Helmet } from 'react-helmet';
import './TlsGenerator.scss';

const TlsGenerator = () => {
  function handleSubmit(event) {
    event.preventDefault();
    const data = {};
    const formElements = Array.from(event.target);
    formElements.map(input => (data[input.name] = input.value));

    // Log what our lambda function will receive
    console.log(JSON.stringify(data));
    fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        accept: 'application/json; charset=utf-8',
        'content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(data),
    });
    // window.location.href = '/thanks';
  }

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>TLS Certificate Generator - Search Guard</title>
        <meta
          name="description"
          content="Search Guard is an Open Source security plugin for Elasticsearch and the entire ELK stack. Search Guard offers encryption, authentification, authorization, audit logging, multitenancy and compliance features (for regulations like GDPR, HIPAA, PCI DSS or SOX)."
        />
      </Helmet>
      <NavBar />
      <Title
        headline="TLS Certificate Generator"
        text="If you need TLS certificates for setting up Search Guard, our certificate generator is here to ease the pain."
      />
      <div className="row">
        <div className="col s12 l8 offset-l2" id="tls">
          <div className="tls-wrapper">
            <div className="tls-headline">How does it work?</div>
            <div className="tls-text">
              Please fill out the following form, and we’ll arrange everything
              for you. The download will contain all certificates in various
              formats and a text file with the respective password and keystore
              passwords. You will also get a SHA-256 checksum to verify the
              integrity of the download.
            </div>
            <div className="tls-headline">
              Note: Please use this service only for testing purposes, and not
              for production!
            </div>
            <div className="tls-text">
              Although the package is checksummed and the download is TLS
              protected, anyone with access to the link can obtain the
              certificates. If you want to generate production-ready
              certificates, please use our offline TLS tool.
            </div>
            <div className="tls-headline">Usage guidelines</div>
            <div className="tls-text">
              <ul>
                <li>
                  Hostnames must be unique and must not contain special
                  characters. IP addresses are not supported.
                </li>
                <li>
                  Organization name becomes part of the certificate and must not
                  contain special characters (e.g. ‘&’)
                </li>
                <li>
                  The download link is sent to the email address you provided
                </li>
              </ul>
            </div>
            <div className="tls-headline">TLS certificate generator</div>
            <div className="tls-text">
              Fields marked with an (*) are required
            </div>
            <div className="tls-info-wrapper">
              <form onSubmit={handleSubmit}>
                <div className="contact-info-wrapper">
                  <div className="contact-information-headline">
                    contact information
                  </div>
                  <div className="contact-info-input-fields">
                    <div className="input-field col s12 m6">
                      <input
                        id="tls-email"
                        type="email"
                        className="validate"
                        name="email"
                      />
                      <label htmlFor="tls-email" id="email-input">
                        Email *
                      </label>
                    </div>
                    <div className="input-field col s12 m6">
                      <input
                        id="organization"
                        name="organization"
                        type="text"
                        className="validate input-field-contact"
                        name="organization"
                      />
                      <label
                        htmlFor="organization"
                        className="input-field-label"
                      >
                        Organization name *
                      </label>
                    </div>
                    <DropDown
                      category="Country"
                      options={[
                        'Germany',
                        'France',
                        'Italy',
                        'England',
                        'United States',
                        'Netherlands',
                        'Ghana',
                      ]}
                    />
                  </div>
                </div>
                <div className="contact-tech-wrapper">
                  <div className="contact-information-headline">
                    technical information
                  </div>
                  <div className="input-field col s12">
                    <input
                      id="host1"
                      name="host1"
                      type="text"
                      className="validate"
                      required=""
                      aria-required="true"
                    />
                    <label
                      htmlFor="host1"
                      className="input-field-label"
                      data-error="Please type in the correct format!"
                    >
                      Hostname 1 *
                    </label>
                  </div>
                  <div className="input-field col s12">
                    <input
                      id="host2"
                      name="host2"
                      type="text"
                      className="validate"
                    />
                    <label htmlFor="host2" className="input-field-label">
                      Hostname 2
                    </label>
                  </div>
                  <div className="input-field col s12">
                    <input
                      id="host3"
                      name="host3"
                      type="text"
                      className="validate"
                    />
                    <label htmlFor="host3" className="input-field-label">
                      Hostname 3
                    </label>
                  </div>
                  <div className="input-field col s12">
                    <input
                      id="host4"
                      type="text"
                      className="validate"
                      name="host4"
                    />
                    <label htmlFor="host4" className="input-field-label">
                      Hostname 4
                    </label>
                  </div>
                  <div className="input-field col s12">
                    <input
                      id="host5"
                      type="text"
                      className="validate"
                      name="host5"
                    />
                    <label htmlFor="host5" className="input-field-label">
                      Hostname 5
                    </label>
                  </div>
                  <div className="input-field col s12">
                    <input
                      id="host6"
                      type="text"
                      className="validate"
                      name="host6"
                    />
                    <label htmlFor="host6" className="input-field-label">
                      Hostname 6
                    </label>
                  </div>
                  <div className="input-field col s12">
                    <input
                      id="host7"
                      type="text"
                      className="validate"
                      name="host7"
                    />
                    <label htmlFor="host7" className="input-field-label">
                      Hostname 7
                    </label>
                  </div>
                  <div className="input-field col s12">
                    <input
                      id="host8"
                      type="text"
                      className="validate"
                      name="host8"
                    />
                    <label htmlFor="host8" className="input-field-label">
                      Hostname 8
                    </label>
                  </div>
                  <div className="input-field col s12">
                    <input
                      id="host9"
                      type="text"
                      className="validate"
                      name="host9"
                    />
                    <label htmlFor="host9" className="input-field-label">
                      Hostname 9
                    </label>
                  </div>
                  <div className="input-field col s12">
                    <input
                      id="host10"
                      name="host10"
                      type="text"
                      className="validate"
                      name="host10"
                    />
                    <label htmlFor="host10" className="input-field-label">
                      Hostname 10
                    </label>
                  </div>
                </div>
                <div className="contact-newsletter-wrapper">
                  <div className="contact-information-headline">newsletter</div>
                  <div className="privacy-policy-checkbox">
                    <input
                      type="checkbox"
                      className="filled-in"
                      name="newsletter"
                    />
                    <span>
                      {' '}
                      Send me updates about Serach Guard products and services
                    </span>
                  </div>
                  <div className="privacy-policy">
                    This form collects your name and email. PLease take a look
                    in our privacy policy for a better understanding on how we
                    protect and manage your submitted data.
                  </div>
                  <div className="cta-wrapper">
                    <Button style="default-button" text="send message" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <PreFooter />
      <Footer />
    </div>
  );
};

export default TlsGenerator;
