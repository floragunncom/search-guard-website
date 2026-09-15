import React from 'react';
import {withRouter} from 'react-router-dom';
import Button from './Button/Button';
import DropDown from './DropDown/DropDown';
import Turnstile from './Turnstile/Turnstile';
import {CONTACT_API_URL} from '../config/apiEndpoints';
import {CONTACT_FORM_COUNTRIES} from '../config/countries';
import RegionalSalesContacts from './RegionalSalesContacts/RegionalSalesContacts';

const ContactForm = () => {
  const [sendbuttonValue, setSendbuttonValue] = React.useState('Send Message');

  async function handleSubmit(formElements) {
    const data = {};
    formElements.forEach((input) => {
      data[input.name] = input.value;
    });

    return fetch(CONTACT_API_URL, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        accept: 'application/json; charset=utf-8',
        'content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(data),
    });
  }

  const postDataToCRM = async (event) => {
    event.preventDefault();

    setSendbuttonValue('Processing ...');

    const formElements = Array.from(event.target);

    handleSubmit(formElements)
      .then(() => {
        window.location.href = '/thanks/';
      })
      .catch(() => {
        window.location.href = '/thanks/';
      });
  };

  return (
    <div className="row contact-wrapper">
      <div className="col s12 l7 push-l5" id="contact">
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
                  options={CONTACT_FORM_COUNTRIES}
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
                <Button text={sendbuttonValue} additionalCss="cf-submit" variant="submit"/>
              </div>
                <div className="cf-feedback">
                    <h5>Processing</h5>
                </div>
            </div>
          </form>
        </div>
      </div>
        <div className="col s12 l5 pull-l7" id="contact">
            <div className="company-information-container">
                <h4 className="company-information-header">
                    Search Guard Headquarters
                </h4>
                <p className="company-information-text">
                    floragunn GmbH
                    <br />
                    Tempelhofer Ufer 16
                    <br />
                    10963 Berlin
                    <br />
                    Germany
                    <br />
                    <a href="mailto:info@floragunn.com">info@floragunn.com</a>
                </p>
                <RegionalSalesContacts />
            </div>
        </div>
    </div>
  );
};

export default withRouter(ContactForm);
