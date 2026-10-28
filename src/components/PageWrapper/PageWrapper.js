import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLocale } from '../../i18n/LocaleContext';
import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  isLocalizableRoute,
} from '../../i18n/locales';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import CampaignBar from '../CampaignBar/CampaignBar';
import QuizBadge from '../TenYears/QuizBadge';
import { ACTIVE_CAMPAIGN } from '../../config/campaign';

const BASE_URL = 'https://search-guard.com';
const DEFAULT_TITLE = 'Security and Alerting for Elasticsearch and Kibana | Search Guard';
const DEFAULT_DESCRIPTION =
  'Search Guard is a security plugin for Elasticsearch and Kibana. Search Guard offers security, audit logging, compliance, alerting and anomaly detection.';
// Default share image for link previews (WhatsApp, Slack, LinkedIn, X):
// 1200x630 PNG, white logo on the brand blue. Rendered from
// src/images/sg_logo_white.svg; messengers do not accept SVG here.
const DEFAULT_SOCIAL_IMAGE = `${BASE_URL}/assets/sg-social-default.png`;
const DEFAULT_SOCIAL_IMAGE_ALT = 'Search Guard logo';
const DEFAULT_SOCIAL_IMAGE_WIDTH = '1200';
const DEFAULT_SOCIAL_IMAGE_HEIGHT = '630';

const OG_LOCALE_MAP = {
  en: 'en_US',
  de: 'de_DE',
  es: 'es_ES',
  fr: 'fr_FR',
};

// Pages where the corner badge would be in the way rather than useful: the
// campaign's own landing page (it is already there), and any page whose whole
// job is a form — a floating chip over a submit button costs conversions on
// the pages that actually matter. Matched on the locale-stripped path, so the
// /de/ and /fr/ variants are covered too. The bar itself stays everywhere.
const BADGE_EXCLUDED_PATHS = [
  // The homepage has the AnniversaryBand instead. A badge there would be a
  // third element competing for the same click.
  '/',
  '/10-years/',
  '/10-years-terms/',
  '/contacts/',
  '/search-guard-free-trial/',
  '/newsletter/',
  '/thanks/',
  '/404/',
];

const PageWrapper = ({ children, background, landing }) => {
  const location = useLocation();
  const locale = useLocale();
  const pathname = location?.pathname || '/';
  const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`;

  // Build canonical URL with locale prefix for non-default locales
  const canonicalPath =
    locale !== DEFAULT_LOCALE
      ? normalizedPath === '/'
        ? `/${locale}/`
        : `/${locale}${normalizedPath}`
      : normalizedPath;
  const canonicalUrl = `${BASE_URL}${canonicalPath === '//' ? '/' : canonicalPath}`;

  // Determine if this route should have hreflang alternates
  const showHreflang = isLocalizableRoute(normalizedPath);

  // The router's basename already strips the locale prefix in the browser, but
  // the static render passes the full path — strip it here so both agree.
  const localeStrippedPath =
    locale !== DEFAULT_LOCALE && normalizedPath.startsWith(`/${locale}/`)
      ? normalizedPath.slice(locale.length + 1)
      : normalizedPath;
  const showBadge = !BADGE_EXCLUDED_PATHS.includes(localeStrippedPath);

  return (
    <>
      <Helmet>
        <title>{DEFAULT_TITLE}</title>
        <meta name="description" content={DEFAULT_DESCRIPTION} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:locale" content={OG_LOCALE_MAP[locale] || 'en_US'} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={DEFAULT_SOCIAL_IMAGE} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content={DEFAULT_SOCIAL_IMAGE_WIDTH} />
        <meta property="og:image:height" content={DEFAULT_SOCIAL_IMAGE_HEIGHT} />
        <meta property="og:image:alt" content={DEFAULT_SOCIAL_IMAGE_ALT} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={DEFAULT_SOCIAL_IMAGE} />
        <meta name="twitter:image:src" content={DEFAULT_SOCIAL_IMAGE} />
        <meta name="twitter:image:alt" content={DEFAULT_SOCIAL_IMAGE_ALT} />

        {showHreflang &&
          SUPPORTED_LOCALES.map((loc) => {
            const href =
              loc === DEFAULT_LOCALE
                ? `${BASE_URL}${normalizedPath}`
                : normalizedPath === '/'
                  ? `${BASE_URL}/${loc}/`
                  : `${BASE_URL}/${loc}${normalizedPath}`;
            return (
              <link
                key={`hreflang-${loc}`}
                rel="alternate"
                hrefLang={loc}
                href={href}
              />
            );
          })}
        {showHreflang && (
          <link
            rel="alternate"
            hrefLang="x-default"
            href={`${BASE_URL}${normalizedPath}`}
          />
        )}
      </Helmet>
      <CampaignBar campaign={ACTIVE_CAMPAIGN} />
      <Navbar background={background} landing={landing} />
      {children}
      <Footer landing={landing} />
      {showBadge ? <QuizBadge campaign={ACTIVE_CAMPAIGN} /> : null}
    </>
  );
};

export default PageWrapper;
