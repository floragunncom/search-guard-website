import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

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
    <App />
  </IntlProvider>
  , document.getElementById('root')
);