import React from 'react';
// import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-snapshot';
// import ReactDOM from 'react-dom';
// import { addLocaleData, IntlProvider } from 'react-intl';
// import deLocaleData from 'react-intl/locale-data/de';
// import esLocaleData from 'react-intl/locale-data/es';
import Routes from './Routes';
// import { Translations } from './i18n/locales';

// addLocaleData(deLocaleData);
// addLocaleData(esLocaleData);

// const getLanguage = () => {
//   return 'de';
// };

// const locale = getLanguage() || 'en';
// const messages = Translations[locale];

render(
// <IntlProvider locale={locale} key={locale} messages={messages}>
  <Router onUpdate={() => window.scrollTo(0, 0)}>
    <Routes />
  </Router>,
  // </IntlProvider>,
  document.getElementById('root'),
);
