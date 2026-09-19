import React, {useState} from 'react';
import Button from './Button/Button';
import DropDown from './DropDown/DropDown';
import Turnstile from './Turnstile/Turnstile';
import {CONTACT_API_URL} from '../config/apiEndpoints';
import RegionalSalesContacts from './RegionalSalesContacts/RegionalSalesContacts';

const ContactForm = () => {

    const [newsletterValue, setNewsletterValue,] = useState(false);
    const [sendbuttonValue, setSendbuttonValue] = useState("send message");

    function changeNewsletterValue() {
        setNewsletterValue(!newsletterValue);
    }

    async function handleSubmit(formElements) {
        const data = {};
        formElements.forEach(input => {
            data[input.name] = input.value;
        });
        // Default options are marked with *
        return fetch(CONTACT_API_URL, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                accept: 'application/json; charset=utf-8',
                'content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(data)
        });
    }

    const postDataToCRM = async event => {

        event.preventDefault();

        setSendbuttonValue("Processing ...");

        const formElements = Array.from(event.target);

        handleSubmit(formElements)
            .then(response => {
                if (response && response.ok) {
                    window.location.href = "/thanks/";
                } else {
                    window.location.href = "/thanks/";
                }
            }).catch(function (error) {
            window.location.href = "/thanks/";
        });
    };

  return (
    <div className="row contact-wrapper">
      <div className="col s12 l4" id="contact">
        <div className="company-information-container">
          <p className="company-information-header">
            Search Guard Headquarters
          </p>
          <p className="company-information-text">
            floragunn GmbH
            <br />
            Tempelhofer Ufer 16
            <br />
            10963 Berlin
            <br />
            Germnay
          </p>
          {/* The form sits directly beside this listing and the layout's
              first id="contact" is this very column, so an in-page anchor
              would jump nowhere useful — the "All other regions" row links
              the HQ mailbox instead. */}
          <RegionalSalesContacts
              headingTag="p"
              otherRegionsHref="mailto:info@floragunn.com"
              otherRegionsLinkText="info@floragunn.com"
          />
        </div>
      </div>
      <div className="col s12 l8" id="contact">
        <div className="contact-info-container">
          <form onSubmit={postDataToCRM}>
            <div className="contact-info-wrapper">
              <div className="contact-information-headline">
                contact information
                <br />
                (Fields marked with an (*) are required)
              </div>
              <div className="contact-info-input-fields">
                <div className="input-field col s12 m6">
                  <input
                      id="first_name"
                      name="first_name"
                      type="text"
                      required
                  />
                  <label htmlFor="first_name" className="input-field-label">
                    First Name *
                  </label>
                </div>
                <div className="input-field col s12 m6">
                  <input
                      id="last_name"
                      name="last_name"
                      type="text"
                      className="input-field-contact"
                      required
                  />
                  <label htmlFor="last_name" className="input-field-label">
                    Last Name *
                  </label>
                </div>
                <div className="input-field col s12 m6">
                  <input
                      id="email2"
                      name="email"
                      type="email"
                      className="validate"
                      required
                  />
                  <label htmlFor="email2" id="email-input">
                    Email address *
                  </label>
                  <span
                      className="helper-text"
                      data-error="Please type in a valid email address!"
                  />
                </div>
                <div className="input-field col s12 m6">
                  <input
                      id="company"
                      name="company"
                      type="text"
                      className="input-field-contact"
                      required
                  />
                  <label htmlFor="company" className="input-field-label">
                    Company *
                  </label>
                </div>
              </div>
              <div className="contact-info-input-fields">
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
                      'Russia',
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

            <div className="contact-message-wrapper">
              <div className="contact-information-headline">your message</div>
              <div className="input-field col s12">
                <textarea
                  id="message"
                  name="message"
                  type="text"
                  className="input-field-contact materialize-textarea"
                  required
                />
                <label htmlFor="message" className="input-field-label">
                  Message *
                </label>
              </div>
            </div>
            <div className="contact-newsletter-wrapper">
              <div className="contact-information-headline">newsletter</div>
              <div className="privacy-policy-checkbox">
                <label>
                  <input
                    id="check"
                    type="checkbox"
                    name="newsletter"
                    className="filled-in"
                    onClick={changeNewsletterValue}
                    value={newsletterValue}
                  />
                  <span>
                    Send me updates about Search Guard products and services
                  </span>
                </label>
              </div>
              <div className="privacy-policy">
                This form collects your name and email. Please take a look in
                our privacy policy for a better understanding on how we protect
                and manage your submitted data.
              </div>
              <Turnstile />
              <div className="cta-wrapper">
                <Button buttonStyle="default-button" text={sendbuttonValue}  />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
