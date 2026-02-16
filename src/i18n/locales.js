export const DEFAULT_LOCALE = 'en';

export const SUPPORTED_LOCALES = ['en', 'de', 'es', 'fr'];

export const LOCALE_LABELS = {
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
};

// Routes that should NOT get locale variants (blog, authors, whitepapers, preview, etc.)
export const NON_LOCALIZABLE_ROUTE_PREFIXES = [
  '/blog/',
  '/blog',
  '/author/',
  '/authors/',
  '/whitepapers/',
  '/preview/',
  '/press/',
];

// Static routes that ARE localizable (derived from Routes.js, excluding non-localizable prefixes,
// legacy redirects, and utility pages like 404/error/thanks)
export const LOCALIZABLE_ROUTES = [
  '/',
  '/security/',
  '/alerting/',
  '/anomaly-detection/',
  '/encryption-at-rest/',
  '/indexmanagement/',
  '/tlstool/',
  '/compliance/',
  '/licensing/',
  '/contacts/',
  '/company/',
  '/resource/',
  '/faq/',
  '/search-guard-free-trial/',
  '/search-guard-flx/',
  '/certificates/',
  '/newsletter/',
  '/sitemap/',
  '/outdated-elasticsearch-versions-suppport/',
  '/security-information/',
  '/cve-advisory/',
  '/disclosure-policy/',
];

export const isLocalizableRoute = (routePath) => {
  // Check explicit list first
  if (LOCALIZABLE_ROUTES.includes(routePath)) {
    return true;
  }
  return false;
};

export const isNonLocalizableRoute = (routePath) => {
  return NON_LOCALIZABLE_ROUTE_PREFIXES.some(
    (prefix) => routePath === prefix || routePath.startsWith(prefix)
  );
};
