import React from 'react';
import TextInput from './TextInput.js';
import './ContactForm.scss';
import Button from '../components/Button/Button';
import DropDown from '../components/DropDown/DropDown';

class ContactForm extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    phoneNumber: '',
    website: '',
    country: ''
  }

  onFirstNameChange = (event) => {
    const firstName = event.target.value
    this.setState({
      firstName
    });
  }

  onLastNameChange = (event) => {
    const lastName = event.target.value
    this.setState({
      lastName
    });
  }

  onJobTitleChange = (event) => {
    const jobTitle = event.target.value
    this.setState({
      jobTitle
    });
  }
  onEmailChange = (event) => {
    const email = event.target.value
    this.setState({
      email
    });
  }
  onPhoneNumberChange = (event) => {
    const phoneNumber = event.target.value
    this.setState({
      phoneNumber
    });
  }
  onWebsiteChange = (event) => {
    const website = event.target.value
    this.setState({
      website
    });
  }
  onCountryChange = (event) => {
    const country = event.target.value
    this.setState({
      country
    });
  }

  render() {
    return (
      <div className="row contact-form-container">
        <div className="company-information-container">
          <p className="company-information-header">
            Serach Guard Headquarters
          </p>
          <p className="company-information-text">
            floragunn GmbH<br/>
            Tempelhofer Ufer 16<br />
            10963 Berlin<br />
            Germnay
          </p>
        </div>
        <div className="contact-form-wrapper">
          <div className="contact-information-wrapper">
            CONTACT INFORMATION
            <div class="row">
              <form class="col s12">
                <div class="row">
                  <div class="input-field col s12 m6 input-field-contact-wrapper">
                    <input id="first_name" type="text" class="validate input-field-contact" />
                    <label for="first_name">First Name</label>
                  </div>
                  <div class="input-field col s12 m6 input-field-contact-wrapper">
                    <input id="last_name" type="text" class="validate input-field-contact" />
                    <label for="last_name">Last Name</label>
                  </div>
                  <div class="input-field col s12 m6 input-field-contact-wrapper">
                    <input id="job_title" type="text" class="validate input-field-contact" />
                    <label for="job_title">Job title (optional)</label>
                  </div>
                  <div class="input-field col s12 m6 input-field-contact-wrapper">
                    <input id="email" type="text" class="validate input-field-contact" />
                    <label for="email">Email</label>
                  </div>
                  <div class="input-field col s12 m6 input-field-contact-wrapper">
                    <input id="phone_number" type="text" class="validate input-field-contact" />
                    <label for="phone_number">Phone number (optional)</label>
                  </div>
                  <div class="input-field col s12 m6 input-field-contact-wrapper">
                    <input id="website" type="text" class="validate input-field-contact" />
                    <label for="website">Website</label>
                  </div>
                  <DropDown
                    dropDownCategory="Country"
                    dropDownOptions={['Germany', 'France', 'Italy', 'England', 'United States', 'Netherlands', 'Ghana']}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="technical-information-wrapper">
            TECHNICAL INFORMATION
              <div class="row">
              <form class="col s12">
                <div class="row">
                  <DropDown
                    dropDownCategory="Elasticsearch version"
                    dropDownOptions={['1', '2', '3', '4', '5']}
                  />
                  <DropDown
                    dropDownCategory="Current stage"
                    dropDownOptions={['1', '2', '3', '4', '5']}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="message-wrapper">
            YOUR MESSAGE
              <div class="row">
              <form class="col s12">
                <div class="row">
                  <div class="input-field col s12 input-field-contact-wrapper">
                    <input id="your_message" type="text" class="validate input-field-contact" />
                    <label for="your_message">Message</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="newsletter-section-wrapper">
            NEWSLETTER
            <div className="privacy-policy-checkbox">
              <input type="checkbox" class="filled-in" checked="checked" />
              <span> Send me updates about Serach Guard products and services</span>
            </div>
          </div>
          <div class="privacy-policy">
            This form collects your name and email. PLease take a look in our privacy policy for a better understanding on how we protect and manage your submitted data.
          </div>
          <div className="cta-wrapper">
            <Button style='default-button' text={'send message'} />
          </div>
        </div>
      </div>
    );
  }
}

export default ContactForm;