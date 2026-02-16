import React from 'react';
import { useLocation } from 'react-router-dom';
import { useLocale } from '../../i18n/LocaleContext';
import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  LOCALE_LABELS,
  isNonLocalizableRoute,
} from '../../i18n/locales';

const LOCALE_FLAGS = {
  en: '\u{1F1EC}\u{1F1E7}',
  de: '\u{1F1E9}\u{1F1EA}',
  es: '\u{1F1EA}\u{1F1F8}',
  fr: '\u{1F1EB}\u{1F1F7}',
};

/**
 * Language switcher dropdown for the Navbar.
 * Hidden on non-localizable pages (blog, authors, whitepapers, etc.).
 * Links to the same page in other locales via flag icons.
 */
const LanguageSwitcher = () => {
  const locale = useLocale();
  const location = useLocation();
  const routePath = location?.pathname || '/';

  // Hide on non-localizable pages
  if (isNonLocalizableRoute(routePath)) {
    return null;
  }

  const buildLocalizedHref = (targetLocale) => {
    if (targetLocale === DEFAULT_LOCALE) {
      return routePath;
    }
    return routePath === '/' ? `/${targetLocale}/` : `/${targetLocale}${routePath}`;
  };

  return (
    <li className="language-switcher">
      <a
        href="#!"
        data-target="nav-languages"
        className="dropdown-trigger language-switcher__trigger"
        aria-label={LOCALE_LABELS[locale]}
      >
        <span className="language-switcher__flag">{LOCALE_FLAGS[locale]}</span>
      </a>
      <ul id="nav-languages" className="dropdown-content language-switcher__dropdown">
        {SUPPORTED_LOCALES.map((loc) => (
          <li key={loc} className={loc === locale ? 'active' : ''}>
            <a href={buildLocalizedHref(loc)}>
              <span className="language-switcher__flag">{LOCALE_FLAGS[loc]}</span>
              {LOCALE_LABELS[loc]}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default LanguageSwitcher;
