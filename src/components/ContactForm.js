import React from 'react';
import TextInput from './TextInput.js';
import './ContactForm.scss';

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
      // <div className="contact-form-container">
      //   <div>
      //     Placeholder
      //   </div>
      //   <div className="contact-form-wrapper">
      //     <div className="contact-information-wrapper">
      //       <div className="contact-title">
      //         CONTACT INFORMATION
      //       </div>
      //       <TextInput
      //         value={this.state.firstName} 
      //         onTextChange={this.onFirstNameChange}
      //         placeholder={'First name'}
      //       />
      //       <TextInput
      //         value={this.state.LastName}
      //         onTextChange={this.onLastNameChange}
      //         placeholder={'Last name'}
      //       />
      //       <TextInput
      //         value={this.state.jobTitle}
      //         onTextChange={this.onJobTitleChange}
      //         placeholder={'Job title (optional)'}
      //       />
      //       <TextInput
      //         value={this.state.email}
      //         onTextChange={this.onEmailChange}
      //         placeholder={'Email'}
      //       />
      //       <TextInput
      //         value={this.state.phoneNumber}
      //         onTextChange={this.onPhoneNumberChange}
      //         placeholder={'Phone Number (optional)'}
      //       />
      //       <TextInput
      //         value={this.state.website}
      //         onTextChange={this.onWebsiteChange}
      //         placeholder={'Website (optional)'}
      //       />
      //       <TextInput
      //         value={this.state.cpuntry}
      //         onTextChange={this.onCountryChange}
      //         placeholder={'Country'}
      //       />
      //     </div>
      //     <div className="technical-information-wrapper">
      //       <div className="contact-title">
      //         TECHNICAL INFORMATION
      //       </div>
      //       <TextInput
      //         value={this.state.firstName}
      //         onTextChange={this.onFirstNameChange}
      //         placeholder={'Elasticsearch version'}
      //       />
      //       <TextInput
      //         value={this.state.LastName}
      //         onTextChange={this.onLastNameChange}
      //         placeholder={'Current stage'}
      //       />
      //       <div class="input-field">
      //         <input placeholder="Placeholder" id="first_name" type="text" class="validate" />
      //         <label for="first_name">First Name</label>
      //       </div>
      //     </div>
      //     <div className="message-wrapper">
      //       <div className="contact-title">
      //         YOUR MESSAGE
      //       </div>
      //       <TextInput
      //         value={this.state.firstName}
      //         onTextChange={this.onFirstNameChange}
      //         placeholder={'Message'}
      //       />
      //     </div>
      //     <div className="newsletter-section-wrapper">
      //       <div className="contact-title">
      //         NEWSLETTER
      //       </div>
      //       <label>
      //         <input type="checkbox" class="filled-in" checked="checked" />
      //       </label>
      //     </div>
      //     <div className="privacy-policy">
      //       This form collects your name and email. Please take a look in our privacy policy for a better understanding on how we protect and manage your submitted data.
      //     </div>
      //     <div className="contact-cta">
      //       SEND MESSAGE
      //     </div>
      //   </div>
      // </div>
      <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s6">
              <input placeholder="Placeholder" id="first_name" type="text" class="validate"/>
                <label for="first_name">First Name</label>
        </div>
              <div class="input-field col s6">
                <input id="last_name" type="text" class="validate"/>
                  <label for="last_name">Last Name</label>
        </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <input disabled value="I am not editable" id="disabled" type="text" class="validate"/>
                    <label for="disabled">Disabled</label>
        </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <input id="password" type="password" class="validate"/>
                      <label for="password">Password</label>
        </div>
                  </div>
                  <div class="row">
                    <div class="input-field col s12">
                      <input id="email" type="email" class="validate"/>
                        <label for="email">Email</label>
        </div>
                    </div>
                    <div class="row">
                      <div class="col s12">
                        This is an inline input field:
          <div class="input-field inline">
                          <input id="email_inline" type="email" class="validate" />
                            <label for="email_inline">Email</label>
                            <span class="helper-text" data-error="wrong" data-success="right">Helper text</span>
          </div>
                        </div>
                      </div>
    </form>
                  </div>
    );
  }
}

export default ContactForm;