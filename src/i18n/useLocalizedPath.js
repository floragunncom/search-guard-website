import { useCallback } from 'react';
import { useLocale } from './LocaleContext';
import { DEFAULT_LOCALE } from './locales';

/**
 * Returns a function `lp(path)` that prepends the current locale prefix
 * to an internal path. English paths stay unprefixed.
 *
 * Usage:
 *   const lp = useLocalizedPath();
 *   <a href={lp('/alerting/')}>Alerting</a>
 *   // en → /alerting/
 *   // de → /de/alerting/
 */
export const useLocalizedPath = () => {
  const locale = useLocale();

  return useCallback(
    (path) => {
      if (!path || locale === DEFAULT_LOCALE) {
        return path;
      }
      // Don't prefix external URLs or anchor-only links
      if (path.startsWith('http') || path.startsWith('#') || path.startsWith('//')) {
        return path;
      }
      const normalizedPath = path.startsWith('/') ? path : `/${path}`;
      return `/${locale}${normalizedPath}`;
    },
    [locale]
  );
};
