import React from 'react';
import './contactUs.scss';
import Footer from '../components/Footer/Footer';
import NavBar from '../components/NavBar/NavBar';
import Title from '../components/Title/Title';
import { injectIntl, defineMessages } from 'react-intl';
import ContactForm from '../components/ContactForm';

const ContactUs = props => {
  return (
    <div>
      <NavBar />
      {/* <LanguagePicker />
      <h1 className="App-title">{formatMessage(messages.title)}</h1>
      <div>
        {formatMessage(messages.content1)} <code>src/App.js</code>
        {formatMessage(messages.content2)}
      </div> */}
      <Title headline="Get in touch" />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default injectIntl(ContactUs);