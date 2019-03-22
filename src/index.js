import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from './Routes';

// i18n
import { addLocaleData, IntlProvider } from 'react-intl';
import deLocaleData from "react-intl/locale-data/de";
import translations from './i18n/locales/';


addLocaleData(deLocaleData);
const locale = window.location.search.replace("?locale=", "") || "en";
const messages = translations[locale];

ReactDOM.render(
  <IntlProvider 
    locale={locale}
    key={locale}
    messages={messages}
  >
    <Router>
      <Routes />
    </Router>
  </IntlProvider>
  , document.getElementById('root')
);