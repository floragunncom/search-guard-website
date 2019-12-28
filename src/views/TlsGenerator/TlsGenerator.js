import React, { useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import DropDown from '../../components/DropDown/DropDown';
import './TlsGenerator.scss';

const TlsGenerator = () => {
  const history = useHistory();
  const [newsletterValue, setNewsletterValue] = useState(false);

  function changeNewsletterValue() {
    setNewsletterValue(!newsletterValue);
  }

  const handleSubmit = event => {
    event.preventDefault();
    const data = {};
    const formElements = Array.from(event.target);
    formElements.forEach(input => {
      data[input.name] = input.value;
    });
    // Log what our lambda function will receive
    //console.log(JSON.stringify(data));
    // fetch('http://localhost:3000/', {
    fetch('https://eq7lfmuqm7.execute-api.eu-central-1.amazonaws.com/dev/', {
      method: 'POST',
      headers: {
        accept: 'application/json; charset=utf-8',
        'content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(data),
    });
  };

  const postDataToCI = async event => {
    await handleSubmit(event);
    history.push('/certificates-on-the-way/');
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>TLS Certificate Generator - Search Guard</title>
        <link
          rel="canonical"
          href="https://search-guard.com/tls-certificate-generator/"
        />
        <meta
          name="description"
          content="Search Guard is an Open Source security plugin for Elasticsearch and the entire ELK stack. Search Guard offers encryption, authentification, authorization, audit logging, multitenancy and compliance features (for regulations like GDPR, HIPAA, PCI DSS or SOX)."
        />
      </Helmet>
      <NavBar />
      <Title
        headline="TLS Certificate Generator"
        text="Use our generator service to create all certificates required for configuring Search Guard."
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
              <br />
              <br />
              Downlaod TLS tool:
              <br />
              <br />
              <Button
                text="Download"
                link="https://docs.search-guard.com/latest/offline-tls-tool"
                target="_blank"
              />
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
                  contain special characters (e.g. ‘&’).
                </li>
                <li>
                  The download link is sent to the email address you provided.
                </li>
              </ul>
            </div>
            <div className="tls-headline">TLS certificate generator</div>
            <div className="tls-text">
              Fields marked with an (*) are required
            </div>
            <div className="tls-info-wrapper">
              <form onSubmit={postDataToCI}>
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
                        required
                      />
                      <label htmlFor="tls-email" id="email-input">
                        Email *
                      </label>
                      <span
                        className="helper-text"
                        data-error="Please type in a valid email address!"
                      />
                    </div>
                    <div className="input-field col s12 m6">
                      <input
                        id="organization"
                        name="organization"
                        type="text"
                        className="input-field-contact"
                        required
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
                      name="country"
                      options={[
                        'United States',
                        'Argentina',
                        'Australia',
                        'Austria',
                        'Bahrain',
                        'Bangladesh',
                        'Barbados',
                        'Belarus',
                        'Belgium',
                        'Belize',
                        'Benin',
                        'Bermuda',
                        'Bolivia',
                        'Bosnia and Herzegovina',
                        'Botswana',
                        'Brazil',
                        'Bulgaria',
                        'Burkina Faso',
                        'Burundi',
                        'Cambodia',
                        'Cameroon',
                        'Canada',
                        'Cape Verde',
                        'Cayman Islands',
                        'Central African Republic',
                        'Chile',
                        'China',
                        'Colombia',
                        'Congo',
                        'Costa Rica',
                        'Croatia',
                        'Cuba',
                        'Cyprus',
                        'Czech Republic',
                        'Denmark',
                        'Dominican Republic',
                        'Ecuador',
                        'Egypt',
                        'Estonia',
                        'Faroe Islands',
                        'Fiji',
                        'Finland',
                        'France',
                        'Gabon',
                        'Gambia',
                        'Georgia',
                        'Germany',
                        'Ghana',
                        'Gibraltar',
                        'Greece',
                        'Greenland',
                        'Grenada',
                        'Honduras',
                        'Hong Kong',
                        'Hungary',
                        'Iceland',
                        'India',
                        'Indonesia',
                        'Iran',
                        'Iraq',
                        'Ireland',
                        'Isle of Man',
                        'Israel',
                        'Italy',
                        'Jamaica',
                        'Japan',
                        'Jordan',
                        'Kazakhstan',
                        'Kuwait',
                        'Kyrgyzstan',
                        'Latvia',
                        'Liechtenstein',
                        'Lithuania',
                        'Luxembourg',
                        'Macedonia',
                        'Malaysia',
                        'Maldives',
                        'Malta',
                        'Mexico',
                        'Moldova',
                        'Monaco',
                        'Mongolia',
                        'Montenegro',
                        'Montserrat',
                        'Morocco',
                        'Myanmar',
                        'Nepal',
                        'Netherlands',
                        'New Zealand',
                        'Norway',
                        'Oman',
                        'Pakistan',
                        'Palestine',
                        'Panama',
                        'Paraguay',
                        'Peru',
                        'Philippines',
                        'Poland',
                        'Portugal',
                        'Puerto Rico',
                        'Qatar',
                        'Romania',
                        'Russian Federation',
                        'San Marino',
                        'Saudi Arabia',
                        'Serbia',
                        'Singapore',
                        'Slovakia',
                        'Slovenia',
                        'Solomon Islands',
                        'South Africa',
                        'South Korea',
                        'Spain',
                        'Sri Lanka',
                        'Sweden',
                        'Switzerland',
                        'Syrian Arab Republic',
                        'Taiwan',
                        'Tajikistan',
                        'Thailand',
                        'Tunisia',
                        'Turkey',
                        'Turkmenistan',
                        'Ukraine',
                        'United Arab Emirates',
                        'United Kingdom',
                        'Uruguay',
                        'Uzbekistan',
                        'Venezuela',
                        'Viet Nam',
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
                      required
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
                    <input id="host2" name="host2" type="text" />
                    <label htmlFor="host2" className="input-field-label">
                      Hostname 2
                    </label>
                  </div>
                  <div className="input-field col s12">
                    <input id="host3" name="host3" type="text" />
                    <label htmlFor="host3" className="input-field-label">
                      Hostname 3
                    </label>
                  </div>
                  <div className="input-field col s12">
                    <input id="host4" type="text" name="host4" />
                    <label htmlFor="host4" className="input-field-label">
                      Hostname 4
                    </label>
                  </div>
                  <div className="input-field col s12">
                    <input id="host5" type="text" name="host5" />
                    <label htmlFor="host5" className="input-field-label">
                      Hostname 5
                    </label>
                  </div>
                  <div className="input-field col s12">
                    <input id="host6" type="text" name="host6" />
                    <label htmlFor="host6" className="input-field-label">
                      Hostname 6
                    </label>
                  </div>
                  <div className="input-field col s12">
                    <input id="host7" type="text" name="host7" />
                    <label htmlFor="host7" className="input-field-label">
                      Hostname 7
                    </label>
                  </div>
                  <div className="input-field col s12">
                    <input id="host8" type="text" name="host8" />
                    <label htmlFor="host8" className="input-field-label">
                      Hostname 8
                    </label>
                  </div>
                  <div className="input-field col s12">
                    <input id="host9" type="text" name="host9" />
                    <label htmlFor="host9" className="input-field-label">
                      Hostname 9
                    </label>
                  </div>
                  <div className="input-field col s12">
                    <input id="host10" name="host10" type="text" />
                    <label htmlFor="host10" className="input-field-label">
                      Hostname 10
                    </label>
                  </div>
                </div>
                <div className="contact-newsletter-wrapper">
                  <div className="contact-information-headline">newsletter</div>
                  <div className="privacy-policy-checkbox">
                    <label>
                      <input
                        type="checkbox"
                        className="filled-in"
                        name="newsletter"
                        value={newsletterValue}
                        onClick={changeNewsletterValue}
                      />
                      <span>
                        Send me updates about Serach Guard products and services
                      </span>
                    </label>
                  </div>
                  <div className="privacy-policy">
                    This form collects your name and email. Please take a look
                    in our privacy policy for a better understanding on how we
                    protect and manage your submitted data.
                  </div>
                  <div className="cta-wrapper">
                    <Button buttonStyle="default-button" text="send message" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TlsGenerator;
