import React from 'react';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import i18n from './i18n/config';
import { LocaleProvider } from './i18n/LocaleContext';
import { DEFAULT_LOCALE } from './i18n/locales';
import Routes from './Routes';

const NextRoutesApp = ({ location, locale = DEFAULT_LOCALE }) => {
  // Set i18n language synchronously before render
  if (i18n.language !== locale) {
    i18n.changeLanguage(locale);
  }

  const basename = locale !== DEFAULT_LOCALE ? `/${locale}` : '';

  const content = (
    <LocaleProvider locale={locale}>
      <Routes />
    </LocaleProvider>
  );

  if (typeof window === 'undefined') {
    return (
      <StaticRouter location={location}>
        {content}
      </StaticRouter>
    );
  }

  return (
    <BrowserRouter basename={basename}>
      {content}
    </BrowserRouter>
  );
};

export default NextRoutesApp;
