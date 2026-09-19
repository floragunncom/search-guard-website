import React, {useState} from 'react';
import Button from './Button/Button';
import DropDown from './DropDown/DropDown';
import Turnstile from './Turnstile/Turnstile';
import {CONTACT_API_URL} from '../config/apiEndpoints';
import {CONTACT_FORM_COUNTRIES} from '../config/countries';

const ContactForm = () => {

    const [sendbuttonValue, setSendbuttonValue] = useState("send message");

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
        <div className="contact-info-container">
          <form onSubmit={postDataToCRM}>
            <div className="contact-info-wrapper">
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
              <Turnstile />
              <div className="cta-wrapper">
                <Button buttonStyle="default-button" text={sendbuttonValue}  />
              </div>
            </div>
          </form>
        </div>
  );
};

export default ContactForm;
