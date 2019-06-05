import React from 'react';
import {render} from 'react-snapshot';
import { BrowserRouter as Router } from 'react-router-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import deLocaleData from 'react-intl/locale-data/de';
import esLocaleData from 'react-intl/locale-data/es';
import Routes from './Routes';
import { Translations } from './i18n/locales';

addLocaleData(deLocaleData);
addLocaleData(esLocaleData);

const getLanguage = () => {
  return 'de';
};

const locale = getLanguage() || 'en';
const messages = Translations[locale];

render(
  <IntlProvider locale={locale} key={locale} messages={messages}>
    <Router>
      <Routes />
    </Router>
  </IntlProvider>,
  document.getElementById('root'),
);
