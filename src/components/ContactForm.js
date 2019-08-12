import React, { Component } from 'react';
import './ContactForm.scss';
import Button from '../components/Button/Button';
import DropDown from '../components/DropDown/DropDown';

class ContactForm extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    jobTitle: '',
    company: '',
    address: '',
    zipcode: '',
    city: '',
    email: '',
    phoneNumber: '',
    website: '',
    country: '',
    version: '',
    stage: '',
    message: '',
    newsletterCheck: false
  }

  onFirstNameChange = (event) => {
    const firstName = event.target.value;
    this.setState({ firstName });
  }

  onLastNameChange = (event) => {
    const lastName = event.target.value;
    this.setState({ lastName });
  }

  onJobTitleChange = (event) => {
    const jobTitle = event.target.value;
    this.setState({ jobTitle });
  }

  onCompanyChange = (event) => {
    const company = event.target.value;
    this.setState({ company });
  }

  onCityChange = (event) => {
    const city = event.target.value;
    this.setState({ city });
  }

  onZipcodeChange = (event) => {
    const zipcode = event.target.value;
    this.setState({ zipcode });
  }

  onAddressChange = (event) => {
    const address = event.target.value;
    this.setState({ address });
  }

  onEmailChange = (event) => {
    const email = event.target.value;
    this.setState({ email });
  }

  onPhoneNumberChange = (event) => {
    const phoneNumber = event.target.value;
    this.setState({ phoneNumber });
  }

  onMessageChange = (event) => {
    const message = event.target.value;
    this.setState({ message });
  }

  onWebsiteChange = (event) => {
    const website = event.target.value;
    this.setState({ website });
  }
  onCountryChange = (country) => {
    this.setState({ country });
  }

  onElasticsearchVersionChange = (version) => {
    this.setState({ version });
  }

  onStageChange = (stage) => {
    this.setState({ stage });
  }

  render() {
    console.log('this.state', this.state)
    return (
      <div className="row contact-wrapper">
        <div className="col s12 l4" id="contact">
          <div className="company-information-container">
            <p className="company-information-header">
              Serach Guard Headquarters
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
              France<br /> Excelerate Systems France<br /> Les Bureaux du Lac II, Rue Robert
              Caumont, Imm P<br /> 33049 Bordeaux<br />
              aadel.benyoussef@exceleratesystems.net
            </p>
            <p className="company-information-text">
              South America<br /> Excelerate Systems S de R.L. de C.V.<br /> Córdoba 42,
              Roma Norte, Cuauhtémoc, C.P.<br /> 06700, Ciudad de México<br />
              victor.pichardo@exceleratesystems.net
            </p>
          </div>
        </div>
        <div className="col s12 l8" id="contact">
          <div className="contact-info-container">
            <div className="contact-info-wrapper">
              <div className="contact-information-headline">
                contact information
              </div>
              <form>
                <div class="input-field col s12 m6">
                  <input
                    id="first_name"
                    type="text"
                    class="validate"
                    required=""
                    aria-required="true"
                    onChange={event => this.onFirstNameChange(event)}
                  />
                  <label
                    for="first_name"
                    class="input-field-label"
                    data-error="Please type in the correct format!"
                  >
                    First Name
                  </label>
                </div>
                <div class="input-field col s12 m6">
                  <input
                    id="last_name"
                    type="text"
                    class="validate input-field-contact"
                    onChange={event => this.onLastNameChange(event)}
                  />
                  <label for="last_name" class="input-field-label">
                    Last Name
                  </label>
                </div>
                <div class="input-field col s12 m6">
                  <input
                    id="company"
                    type="text"
                    class="validate input-field-contact"
                    onChange={event => this.onCompanyChange(event)}
                  />
                  <label for="company" class="input-field-label">
                    Company
                  </label>
                </div>
                <div class="input-field col s12 m6">
                  <input
                    id="address"
                    type="text"
                    class="validate input-field-contact"
                    onChange={event => this.onAddressChange(event)}
                  />
                  <label for="address" class="input-field-label">
                    Address
                  </label>
                </div>
                <div class="input-field col s12 m6">
                  <input
                    id="zipcode"
                    type="text"
                    class="validate input-field-contact"
                    onChange={event => this.onZipcodeChange(event)}
                  />
                  <label for="zipcode" class="input-field-label">
                    Zipcode
                  </label>
                </div>
                <div class="input-field col s12 m6">
                  <input
                    id="city"
                    type="text"
                    class="validate input-field-contact"
                    onChange={event => this.onCityChange(event)}
                  />
                  <label for="city" class="input-field-label">
                    City
                  </label>
                </div>
                <div class="input-field col s12 m6">
                  <input
                    id="website"
                    type="text"
                    class="validate input-field-contact"
                    onChange={event => this.onWebsiteChange(event)}
                  />
                  <label for="website" class="input-field-label">
                    Website
                  </label>
                </div>
                <div class="input-field col s12 m6">
                  <input
                    id="email2"
                    type="email"
                    className="validate"
                    onChange={event => this.onEmailChange(event)}
                  />
                  <label htmlFor="email2" id="email-input">
                    Email address
                  </label>
                  <span
                    className="helper-text"
                    data-error="Please type in the correct format!"
                    data-success="Valid format"
                  />
                </div>
                <div class="input-field col s12 m6">
                  <input
                    id="job_title"
                    type="text"
                    class="validate input-field-contact"
                    onChange={event => this.onJobTitleChange(event)}
                  />
                  <label for="job_title" class="input-field-label">
                    Job title (optional)
                  </label>
                </div>
                <div class="input-field col s12 m6">
                  <input
                    id="phone_number"
                    type="text"
                    class="validate input-field-contact"
                    onChange={event => this.onPhoneNumberChange(event)}
                  />
                  <label for="phone_number" class="input-field-label">
                    Phone number (optional)
                  </label>
                </div>
                <DropDown
                  dropDownCategory="Country"
                  dropDownOptions={[
                    'Germany',
                    'France',
                    'Italy',
                    'England',
                    'United States',
                    'Netherlands',
                    'Ghana',
                  ]}
                  onDropDownOptionChange={this.onCountryChange}
                />
              </form>
            </div>
            <div className="contact-tech-wrapper">
              <div className="contact-information-headline">
                technical information
              </div>
              <DropDown
                dropDownCategory="Elasticsearch version"
                dropDownOptions={['1', '2', '3', '4', '5']}
                onDropDownOptionChange={this.onElasticsearchVersionChange}
              />
              <DropDown
                dropDownCategory="Current stage"
                dropDownOptions={['1', '2', '3', '4', '5']}
                onDropDownOptionChange={this.onStageChange}
              />
            </div>
            <div className="contact-message-wrapper">
              <div className="contact-information-headline">your message</div>
              <div class="input-field col s12">
                <input
                  id="your_message"
                  type="text"
                  class="validate input-field-contact"
                  onChange={event => this.onMessageChange(event)}
                />
                <label for="your_message" class="input-field-label">
                  Message
                </label>
              </div>
            </div>
            <div className="contact-newsletter-wrapper">
              <div className="contact-information-headline">newsletter</div>
              <div
                className="privacy-policy-checkbox"
                onClick={() =>
                  this.setState({
                    newsletterCheck: !this.state.newsletterCheck,
                  })
                }
              >
                <input
                  type="checkbox"
                  class="filled-in"
                  checked={this.state.newsletterCheck}
                />
                <span>
                  {' '}
                  Send me updates about Serach Guard products and services
                </span>
              </div>
              <div class="privacy-policy">
                This form collects your name and email. PLease take a look in
                our privacy policy for a better understanding on how we protect
                and manage your submitted data.
              </div>
              <div className="cta-wrapper">
                <Button style="default-button" text={'send message'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactForm;