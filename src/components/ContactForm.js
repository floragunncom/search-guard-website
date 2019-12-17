import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './ContactForm.scss';
// import { throws } from 'assert';
import Button from './Button/Button';
import DropDown from './DropDown/DropDown';

const ContactForm = () => {
  const history = useHistory();
  const [newsletterValue, setNewsletterValue] = useState(false);

  function changeNewsletterValue() {
    setNewsletterValue(!newsletterValue);
  }

  const handleSubmit = async event => {
    event.preventDefault();
    const data = {};
    const formElements = await Array.from(event.target);
    formElements.map(input => (data[input.name] = input.value)); 
    // Log what our lambda function will receive
    // console.log(JSON.stringify(data));
    await fetch(
      // fetch('http://localhost:3000/', {
      'https://eb4bhjiig1.execute-api.eu-central-1.amazonaws.com/dev/',
      {
        method: 'POST',
        headers: {
          accept: 'application/json; charset=utf-8',
          'content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data),
      },
    );
    history.push('/thanks/');
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
          <p className="company-information-header">Authorized Partners</p>
          <p className="company-information-text">
            USA and Canada
            <br />
            Excelerate Systems LLC
            <br /> 2205 152nd Avenue NE Redmond
            <br />
            WA 98052
            <br /> david.bennett@exceleratesystems.net
          </p>
          <p className="company-information-text">
            France
            <br /> Excelerate Systems France
            <br /> Les Bureaux du Lac II, Rue Robert Caumont, Imm P<br /> 33049
            Bordeaux
            <br />
            aadel.benyoussef@exceleratesystems.net
          </p>
          <p className="company-information-text">
            South America
            <br /> Excelerate Systems S de R.L. de C.V.
            <br /> Córdoba 42, Roma Norte, Cuauhtémoc, C.P.
            <br /> 06700, Ciudad de México
            <br />
            victor.pichardo@exceleratesystems.net
          </p>
        </div>
      </div>
      <div className="col s12 l8" id="contact">
        <div className="contact-info-container">
          <form onSubmit={handleSubmit}>
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
                <div className="input-field col s12 m6">
                  <input
                    id="address"
                    name="address"
                    type="text"
                    className="input-field-contact"
                  />
                  <label htmlFor="address" className="input-field-label">
                    Address
                  </label>
                </div>
                <div className="input-field col s12 m6">
                  <input
                    id="zipcode"
                    name="zip"
                    type="text"
                    className="input-field-contact"
                  />
                  <label htmlFor="zipcode" className="input-field-label">
                    Zipcode
                  </label>
                </div>
                <div className="input-field col s12 m6">
                  <input
                    id="city"
                    name="city"
                    type="text"
                    className="input-field-contact"
                    required
                  />
                  <label htmlFor="city" className="input-field-label">
                    City *
                  </label>
                </div>
                <div className="input-field col s12 m6">
                  <input
                    id="website"
                    name="website"
                    type="text"
                    className="input-field-contact"
                  />
                  <label htmlFor="website" className="input-field-label">
                    Website
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
                    id="job_title"
                    name="job_position"
                    type="text"
                    className="input-field-contact"
                  />
                  <label htmlFor="job_title" className="input-field-label">
                    Job title (optional)
                  </label>
                </div>
                <div className="input-field col s12 m6">
                  <input
                    id="phone_number"
                    name="phone"
                    type="text"
                    className="input-field-contact"
                  />
                  <label htmlFor="phone_number" className="input-field-label">
                    Phone number (optional)
                  </label>
                </div>
                <DropDown
                  category="Country"
                  name="country"
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
              <div className="contact-tech-input-fields">
                <DropDown
                  category="Elasticsearch Version"
                  name="version"
                  options={['1', '2', '3', '4', '5']}
                />
                <DropDown
                  category="Current Stage"
                  name="stage"
                  options={['1', '2', '3', '4', '5']}
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
              <div className="cta-wrapper">
                <Button buttonStyle="default-button" text="send message" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
