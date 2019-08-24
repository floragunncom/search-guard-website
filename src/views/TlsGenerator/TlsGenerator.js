import React, { Component } from 'react';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import DropDown from '../../components/DropDown/DropDown';
import './TlsGenerator.scss';

class TlsGenerator extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      tlsEmail: '',
      organization: '',
      tlsCountry: '',
      host1: '',
      host2: '',
      host3: '',
      host4: '',
      host5: '',
      host6: '',
      host7: '',
      host8: '',
      host9: '',
      host10: '',
      newsletter2Check: false,
    };
  }

  onOrganizationChange = event => {
    const organization = event.target.value;
    this.setState({ organization });
  };

  onTlsEmailChange = event => {
    const tlsEmail = event.target.value;
    this.setState({ tlsEmail });
  };

  onTlsCountryChange = tlsCountry => {
    this.setState({ tlsCountry });
  };

  onHost1Change = event => {
    const host1 = event.target.value;
    this.setState({ host1 });
  };

  onHost2Change = event => {
    const host2 = event.target.value;
    this.setState({ host2 });
  };

  onHost3Change = event => {
    const host3 = event.target.value;
    this.setState({ host3 });
  };

  onHost4Change = event => {
    const host4 = event.target.value;
    this.setState({ host4 });
  };

  onHost5Change = event => {
    const host5 = event.target.value;
    this.setState({ host5 });
  };

  onHost6Change = event => {
    const host6 = event.target.value;
    this.setState({ host6 });
  };

  onHost7Change = event => {
    const host7 = event.target.value;
    this.setState({ host7 });
  };

  onHost8Change = event => {
    const host8 = event.target.value;
    this.setState({ host8 });
  };

  onHost9Change = event => {
    const host9 = event.target.value;
    this.setState({ host9 });
  };

  onHost10Change = event => {
    const host10 = event.target.value;
    this.setState({ host10 });
  };

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    fetch('https://localhost:3000/', {
      method: 'POST',
      body: data,
    })
  }

  render() {
    return (
      <div>
        <NavBar />
        <Title
          headline="TLS Certificate Generator"
          text="If you need TLS certificates for setting up Search Guard, our certificate generator is here to ease the pain."
        />
        <div className="row">
          <div className="col s12 l8 offset-l2" id="tls">
            <div className="tls-wrapper">
              <div className="tls-headline">How does it work?</div>
              <div className="tls-text">
                Please fill out the following form, and we’ll arrange everything
                for you. The download will contain all certificates in various
                formats and a text file with the respective password and
                keystore passwords. You will also get a SHA-256 checksum to
                verify the integrity of the download.
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
              </div>
              <div className="tls-headline">Usage guidelines</div>
              <div className="tls-text">
                <ul>
                  <li>
                    Hostnames must be unique and must not contain special
                    characters. IP addresses are not supported.
                  </li>
                  <li>
                    Organization name becomes part of the certificate and must
                    not contain special characters (e.g. ‘&’)
                  </li>
                  <li>
                    The download link is sent to the email address you provided
                  </li>
                </ul>
              </div>
              <div className="tls-headline">TLS certificate generator</div>
              <div className="tls-text">
                Fields marked with an (*) are required
              </div>
              <div className="tls-info-wrapper">
                <form onSubmit={this.handleSubmit}>
                  <div className="contact-info-wrapper">
                    <div className="contact-information-headline">
                      contact information
                    </div>
                    <div className="input-field col s12 m6">
                      <input
                        id="tls-email"
                        type="email"
                        className="validate"
                        onChange={event => this.onTlsEmailChange(event)}
                      />
                      <label htmlFor="tls-email" id="email-input">
                        Email *
                      </label>
                      <span
                        className="helper-text"
                        data-error="Please type in the correct format!"
                        data-success="Valid format"
                      />
                    </div>
                    <div className="input-field col s12 m6">
                      <input
                        id="organization"
                        name="organization"
                        type="text"
                        className="validate input-field-contact"
                        onChange={event => this.onOrganizationChange(event)}
                      />
                      <label
                        htmlFor="organization"
                        className="input-field-label"
                      >
                        Organization name *
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
                      onDropDownOptionChange={this.onTlsCountryChange}
                    />
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
                        className="validate"
                        required=""
                        aria-required="true"
                        onChange={event => this.onHost1Change(event)}
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
                      <input
                        id="host2"
                        name="host2"
                        type="text"
                        className="validate"
                        onChange={event => this.onHost2Change(event)}
                      />
                      <label htmlFor="host2" className="input-field-label">
                        Hostname 2
                      </label>
                    </div>
                    <div className="input-field col s12">
                      <input
                        id="host3"
                        type="text"
                        className="validate"
                        onChange={event => this.onHost3Change(event)}
                      />
                      <label htmlFor="host3" className="input-field-label">
                        Hostname 3
                      </label>
                    </div>
                    <div className="input-field col s12">
                      <input
                        id="host4"
                        type="text"
                        className="validate"
                        onChange={event => this.onHost4Change(event)}
                      />
                      <label htmlFor="host4" className="input-field-label">
                        Hostname 4
                      </label>
                    </div>
                    <div className="input-field col s12">
                      <input
                        id="host5"
                        type="text"
                        className="validate"
                        onChange={event => this.onHost5Change(event)}
                      />
                      <label htmlFor="host5" className="input-field-label">
                        Hostname 5
                      </label>
                    </div>
                    <div className="input-field col s12">
                      <input
                        id="host6"
                        type="text"
                        className="validate"
                        onChange={event => this.onHost6Change(event)}
                      />
                      <label htmlFor="host6" className="input-field-label">
                        Hostname 6
                      </label>
                    </div>
                    <div className="input-field col s12">
                      <input
                        id="host7"
                        type="text"
                        className="validate"
                        onChange={event => this.onHost7Change(event)}
                      />
                      <label htmlFor="host7" className="input-field-label">
                        Hostname 7
                      </label>
                    </div>
                    <div className="input-field col s12">
                      <input
                        id="host8"
                        type="text"
                        className="validate"
                        onChange={event => this.onHost8Change(event)}
                      />
                      <label htmlFor="host8" className="input-field-label">
                        Hostname 8
                      </label>
                    </div>
                    <div className="input-field col s12">
                      <input
                        id="host9"
                        type="text"
                        className="validate"
                        onChange={event => this.onHost9Change(event)}
                      />
                      <label htmlFor="host9" className="input-field-label">
                        Hostname 9
                      </label>
                    </div>
                    <div className="input-field col s12">
                      <input
                        id="host10"
                        name="host10"
                        type="text"
                        className="validate"
                        onChange={event => this.onHost10Change(event)}
                      />
                      <label htmlFor="host10" className="input-field-label">
                        Hostname 10
                      </label>
                    </div>
                  </div>
                  <div className="contact-newsletter-wrapper">
                    <div className="contact-information-headline">
                      newsletter
                    </div>
                    <div
                      className="privacy-policy-checkbox"
                      onClick={() =>
                        this.setState({
                          newsletter2Check: !this.state.newsletter2Check,
                        })
                      }
                    >
                      <input
                        type="checkbox"
                        className="filled-in"
                        checked={this.state.newsletter2Check}
                      />
                      <span>
                        {' '}
                        Send me updates about Serach Guard products and services
                      </span>
                    </div>
                    <div className="privacy-policy">
                      This form collects your name and email. PLease take a look
                      in our privacy policy for a better understanding on how we
                      protect and manage your submitted data.
                    </div>
                    <div className="cta-wrapper">
                      {/* <Button style="default-button" text={'send message'} /> */}
                      <button>send</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <PreFooter />
        <Footer />
      </div>
    );
  }
};

export default TlsGenerator;
