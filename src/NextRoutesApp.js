import React from 'react';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import i18n from './i18n/config';
import { LocaleProvider } from './i18n/LocaleContext';
import { PageDataProvider } from './context/PageDataContext';
import { DEFAULT_LOCALE } from './i18n/locales';
import Routes from './Routes';

const NextRoutesApp = ({ location, locale = DEFAULT_LOCALE, pageData = null }) => {
  // Set i18n language synchronously before render
  if (i18n.language !== locale) {
    i18n.changeLanguage(locale);
  }

  const basename = locale !== DEFAULT_LOCALE ? `/${locale}` : '';

  const content = (
    <LocaleProvider locale={locale}>
      <PageDataProvider data={pageData}>
        <Routes />
      </PageDataProvider>
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
