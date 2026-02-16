import React, { createContext, useContext } from 'react';
import { DEFAULT_LOCALE } from './locales';

const LocaleContext = createContext(DEFAULT_LOCALE);

export const LocaleProvider = ({ locale, children }) => {
  return (
    <LocaleContext.Provider value={locale || DEFAULT_LOCALE}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => useContext(LocaleContext);
