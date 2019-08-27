import React, { Component } from 'react';
import './ContactForm.scss';
import { throws } from 'assert';
import Button from '../components/Button/Button';
import DropDown from '../components/DropDown/DropDown';

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
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
      newsletterCheck: false,
    };
  }

  // onFirstNameChange = event => {
  //   const firstName = event.target.value;
  //   this.setState({ firstName });
  // };

  // onLastNameChange = event => {
  //   const lastName = event.target.value;
  //   this.setState({ lastName });
  // };

  // onJobTitleChange = event => {
  //   const jobTitle = event.target.value;
  //   this.setState({ jobTitle });
  // };

  // onCompanyChange = event => {
  //   const company = event.target.value;
  //   this.setState({ company });
  // };

  // onCityChange = event => {
  //   const city = event.target.value;
  //   this.setState({ city });
  // };

  // onZipcodeChange = event => {
  //   const zipcode = event.target.value;
  //   this.setState({ zipcode });
  // };

  // onAddressChange = event => {
  //   const address = event.target.value;
  //   this.setState({ address });
  // };

  // onEmailChange = event => {
  //   const email = event.target.value;
  //   this.setState({ email });
  // };

  // onPhoneNumberChange = event => {
  //   const phoneNumber = event.target.value;
  //   this.setState({ phoneNumber });
  // };

  // onMessageChange = event => {
  //   const message = event.target.value;
  //   this.setState({ message });
  // };

  // onWebsiteChange = event => {
  //   const website = event.target.value;
  //   this.setState({ website });
  // };
  // onCountryChange = country => {
  //   this.setState({ country });
  // };

  // onElasticsearchVersionChange = version => {
  //   this.setState({ version });
  // };

  // onStageChange = stage => {
  //   this.setState({ stage });
  // };

  handleSubmit(event) {
    event.preventDefault();
    const data = {};
    const formElements = Array.from(event.target);
    formElements.map(input => (data[input.name] = input.value));

    // Log what our lambda function will receive
    console.log(JSON.stringify(data));
    fetch('http://localhost:3000/', {
      method: 'POST',
      "headers": {
        "accept": "application/json; charset=utf-8",
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    });
    // window.location.reload();
  }
  
  render() {
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
              France
              <br /> Excelerate Systems France
              <br /> Les Bureaux du Lac II, Rue Robert Caumont, Imm P<br />{' '}
              33049 Bordeaux
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
            <form onSubmit={this.handleSubmit}>
              <div className="contact-info-wrapper">
                <div className="contact-information-headline">
                  contact information
                </div>
                <div className="contact-info-input-fields">
                  <div className="input-field col s12 m6">
                    <input
                      id="first_name"
                      name="first_name"
                      type="text"
                      className="validate"
                      required=""
                      aria-required="true"
                      // onChange={event => this.onFirstNameChange(event)}
                    />
                    <label
                      htmlFor="first_name"
                      className="input-field-label"
                      data-error="Please type in the correct format!"
                    >
                      First Name
                    </label>
                  </div>
                  <div className="input-field col s12 m6">
                    <input
                      id="last_name"
                      name="last_name"
                      type="text"
                      className="validate input-field-contact"
                      // onChange={event => this.onLastNameChange(event)}
                    />
                    <label htmlFor="last_name" className="input-field-label">
                      Last Name
                    </label>
                  </div>
                  <div className="input-field col s12 m6">
                    <input
                      id="company"
                      name="company"
                      type="text"
                      className="validate input-field-contact"
                      // onChange={event => this.onCompanyChange(event)}
                    />
                    <label htmlFor="company" className="input-field-label">
                      Company
                    </label>
                  </div>
                  <div className="input-field col s12 m6">
                    <input
                      id="address"
                      name="address"
                      type="text"
                      className="validate input-field-contact"
                      // onChange={event => this.onAddressChange(event)}
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
                      className="validate input-field-contact"
                      // onChange={event => this.onZipcodeChange(event)}
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
                      className="validate input-field-contact"
                      // onChange={event => this.onCityChange(event)}
                    />
                    <label htmlFor="city" className="input-field-label">
                      City
                    </label>
                  </div>
                  <div className="input-field col s12 m6">
                    <input
                      id="website"
                      name="website"
                      type="text"
                      className="validate input-field-contact"
                      // onChange={event => this.onWebsiteChange(event)}
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
                      // onChange={event => this.onEmailChange(event)}
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
                  <div className="input-field col s12 m6">
                    <input
                      id="job_title"
                      name="job_position"
                      type="text"
                      className="validate input-field-contact"
                      // onChange={event => this.onJobTitleChange(event)}
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
                      className="validate input-field-contact"
                      // onChange={event => this.onPhoneNumberChange(event)}
                    />
                    <label htmlFor="phone_number" className="input-field-label">
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
                    name="country"
                  />
                </div>
              </div>
              <div className="contact-tech-wrapper">
                <div className="contact-information-headline">
                  technical information
                </div>
                <div className="contact-tech-input-fields">
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
              </div>
              <div className="contact-message-wrapper">
                <div className="contact-information-headline">your message</div>
                <div className="input-field col s12">
                  <input
                    id="your_message"
                    name="message"
                    type="text"
                    className="validate input-field-contact"
                    // onChange={event => this.onMessageChange(event)}
                  />
                  <label htmlFor="your_message" className="input-field-label">
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
                    name="newsletter"
                    p
                    className="filled-in"
                    checked={this.state.newsletterCheck}
                  />
                  <span>
                    {' '}
                    Send me updates about Serach Guard products and services
                  </span>
                </div>
                <div className="privacy-policy">
                  This form collects your name and email. PLease take a look in
                  our privacy policy for a better understanding on how we
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
    );
  }
}

export default ContactForm;
