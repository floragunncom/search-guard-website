import React from 'react';
import './index.scss';
import { injectIntl, defineMessages } from 'react-intl';
import Cta from './components/Cta/Cta';
import Title from './components/Title/Title';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import PreFooter from './components/PreFooter/PreFooter';

const messages = defineMessages({
  title: {
    id: 'app.title',
    defaultMessage: 'Get in touch toucher in get touch',
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
      <Title text={formatMessage(messages.title)} />
      <PreFooter />
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
