import React, {useState} from 'react';
import './ContactForm.scss';
import Button from './Button/Button';
import DropDown from './DropDown/DropDown';

const ContactForm = () => {

  return (
        <div className="contact-info-container">
            <form className="cf-form">
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
                    <Button text="Send Message" additionalCss="cf-submit" variant="submit"/>
                </div>
                <div className="cf-feedback">
                    <h5>Processing</h5>
                </div>
            </div>
          </form>
        </div>
  );
};

export default ContactForm;
