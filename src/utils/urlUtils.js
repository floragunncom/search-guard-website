/**
 * Ensures a URL uses the https: protocol.
 * Converts protocol-relative URLs (//example.com/...) to https://example.com/...
 * Leaves already-absolute URLs unchanged.
 */
export const ensureHttps = (url) => {
  if (!url || typeof url !== 'string') return url;
  if (url.startsWith('//')) return `https:${url}`;
  return url;
};

/**
 * Upgrades absolute http:// URLs to https://.
 * Keeps localhost/http development URLs untouched.
 */
export const upgradeToHttps = (url) => {
  if (!url || typeof url !== 'string') return url;
  if (url.startsWith('http://localhost') || url.startsWith('http://127.0.0.1')) return url;
  if (url.startsWith('http://')) return `https://${url.slice('http://'.length)}`;
  return ensureHttps(url);
};

/**
 * Ensures a path string ends with a trailing slash.
 * Skips paths that look like file references (contain a dot extension).
 */
export const ensureTrailingSlash = (path) => {
  if (!path || typeof path !== 'string') return path;
  if (path.endsWith('/')) return path;
  if (/\.[a-z0-9]+$/i.test(path)) return path;
  return `${path}/`;
};

const NON_DEFAULT_LOCALES = new Set(['de', 'es', 'fr']);

const normalizePath = (pathValue) => {
  const raw = String(pathValue || '/').trim();
  const withLeadingSlash = raw.startsWith('/') ? raw : `/${raw}`;
  const collapsed = withLeadingSlash.replace(/\/{2,}/g, '/');
  return ensureTrailingSlash(collapsed) || '/';
};

/**
 * Prefixes a path with locale when appropriate.
 * English is the default locale and does not get a path prefix.
 */
export const toLocalePath = (pathValue, locale) => {
  const normalizedPath = normalizePath(pathValue);
  const normalizedLocale = String(locale || 'en').toLowerCase();
  if (!NON_DEFAULT_LOCALES.has(normalizedLocale)) {
    return normalizedPath;
  }
  if (new RegExp(`^/${normalizedLocale}(/|$)`).test(normalizedPath)) {
    return normalizedPath;
  }
  return normalizedPath === '/' ? `/${normalizedLocale}/` : `/${normalizedLocale}${normalizedPath}`;
};

/**
 * Builds an absolute canonical URL for search-guard.com with optional locale prefixing.
 */
export const toAbsoluteSiteUrl = (pathValue, locale) => `https://search-guard.com${toLocalePath(pathValue, locale)}`;

const normalizeWhitespace = (value) => String(value || '').replace(/\s+/g, ' ').trim();

export const truncateAtWord = (value, maxLength) => {
  const text = normalizeWhitespace(value);
  if (!text || !maxLength || text.length <= maxLength) return text;
  const hardCut = text.slice(0, maxLength);
  const lastSpace = hardCut.lastIndexOf(' ');
  const trimmed = (lastSpace > Math.floor(maxLength * 0.6) ? hardCut.slice(0, lastSpace) : hardCut).trim();
  return trimmed;
};

/**
 * Returns a title suitable for SERP display length.
 */
export const toSeoTitle = (value, maxLength = 60) => truncateAtWord(value, maxLength);

/**
 * Returns a description suitable for SERP display length.
 */
export const toSeoDescription = (value, maxLength = 155) => truncateAtWord(value, maxLength);
