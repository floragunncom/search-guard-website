import React from 'react';
import './index.scss';
import { injectIntl, defineMessages } from 'react-intl';
import LanguagePicker from './components/LanguagePicker';
import Cta from './components/Cta';
import Title from './components/Title';
import Footer from './components/Footer';
import NavBar from './components/NavBar';

const messages = defineMessages({
  title: {
    id: 'app.title',
    defaultMessage: 'Welcome to React',
  },
  content1: {
    id: 'app.content1',
    defaultMessage: 'To get started, edit',
  },
  content2: {
    id: 'app.content2',
    defaultMessage: 'and save to reload.',
  },
});

const App = props => {
  const {
    intl: { formatMessage },
  } = props;

  return (
    <div>
      <NavBar />
      {/* <LanguagePicker />
      <h1 className="App-title">{formatMessage(messages.title)}</h1>
      <div>
        {formatMessage(messages.content1)} <code>src/App.js</code>
        {formatMessage(messages.content2)}
      </div> */}
      <Title text="Search guard security plugin" />
      <Cta
        headline="Free 60-day trial"
        text="Want to see how your company can benefit from our Compliance
            edition? Sign up to our 60-day trial, completely free of charge."
        ctaText="start free trial"
      />
      <Footer />
    </div>
  );
};

export default injectIntl(App);
