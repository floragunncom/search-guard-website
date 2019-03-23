import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import deLocaleData from 'react-intl/locale-data/de';
import Routes from './Routes';
import translations from './i18n/locales';

addLocaleData(deLocaleData);

const getLanguage = () => {
  return localStorage.getItem('language');
};

const locale = getLanguage() || 'en';
const messages = translations[locale];

ReactDOM.render(
  <IntlProvider locale={locale} key={locale} messages={messages}>
    <Router>
      <Routes />
    </Router>
  </IntlProvider>,
  document.getElementById('root'),
);
