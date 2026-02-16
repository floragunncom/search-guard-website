# Multi-language Support (i18n) Migration Plan

## Context

The site is English-only. The goal is to add German, Spanish, and French while keeping the existing architecture (Next.js static export + React Router v5 hybrid). English stays at the root path (`/alerting/`), other languages get prefixes (`/de/alerting/`). Only static feature/marketing pages are translated — blog, whitepapers, and author pages remain English-only. Translations live in JSON files.

## Architecture Overview

```
URL: /de/alerting/
  → getStaticProps extracts locale="de", routePath="/alerting/"
    → NextRoutesApp sets BrowserRouter basename="/de", i18n language="de"
      → React Router matches /alerting/ → <Alerting />
        → useTranslation('alerting') returns German strings
        → PageWrapper emits hreflang tags + canonical with /de/ prefix
```

Key insight: React Router routes stay unchanged. The locale prefix is stripped before reaching React Router (via `getStaticProps` for SSR, `BrowserRouter basename` for client).

## Dependencies

```
npm install i18next react-i18next
```

No backend/server plugin needed — translations are statically imported JSON.

## New Files

### i18n Infrastructure

| File | Purpose |
|------|---------|
| `src/i18n/config.js` | i18next init: static JSON imports, `fallbackLng: 'en'`, `useSuspense: false` |
| `src/i18n/locales.js` | Constants: `SUPPORTED_LOCALES`, `DEFAULT_LOCALE`, `LOCALIZABLE_ROUTES`, `NON_LOCALIZABLE_ROUTE_PREFIXES` |
| `src/i18n/LocaleContext.js` | React context + `LocaleProvider` + `useLocale()` hook |
| `src/i18n/useLocalizedPath.js` | Hook returning `lp(path)` — prepends locale prefix to internal links |

### Translation Files

```
src/i18n/locales/
  en/
    common.json          # Navbar, Footer, PreFooter, CTAs, shared UI
    meta.json            # Page titles + descriptions for all routes
    home.json            # HomePage strings
    alerting.json        # Alerting page strings
    security.json        # etc. — one namespace per view
    ...
  de/
    common.json
    meta.json
    ...
  es/ ...
  fr/ ...
```

`fallbackLng: 'en'` means missing keys automatically fall back to English — untranslated pages render English safely.

### New Components

| File | Purpose |
|------|---------|
| `src/components/LocalizedLink/LocalizedLink.js` | `<a>` wrapper that prepends locale prefix via `useLocalizedPath` |
| `src/components/LanguageSwitcher/LanguageSwitcher.js` | Dropdown in Navbar linking to same page in other locales. Hidden on non-localizable pages (blog, etc.) |

## Modified Files

### `pages/[[...slug]].js` — Route Generation

**`getStaticPaths()`**: For each localizable static route, generate 3 additional locale-prefixed paths. Blog/whitepaper/author routes are NOT multiplied (~230 existing + ~90 new = ~320 total).

**`getStaticProps()`**: If first slug segment is a supported locale (de/es/fr), extract it as `locale` and strip it from `routePath`. Pass both as props.

### `src/NextRoutesApp.js` — Router Entry

- Accept `locale` prop
- Call `i18n.changeLanguage(locale)` before render
- Set `BrowserRouter basename={locale !== 'en' ? '/${locale}' : ''}`
- Wrap children in `<LocaleProvider locale={locale}>`

This makes React Router match `/alerting/` regardless of whether the URL is `/alerting/` or `/de/alerting/`.

### `src/components/PageWrapper/PageWrapper.js` — SEO

- Read locale from `useLocale()`
- Generate `<link rel="alternate" hreflang="...">` tags for all supported locales + `x-default`
- Make canonical URL locale-aware (`/de/alerting/` for German)
- Set `<html lang={locale}>` via Helmet

### `pages/_app.js`

- Add `import '../src/i18n/config'` (one-time i18n initialization)

### `pages/_document.js`

- Replace hardcoded `getHtmlLang()` with reading the `locale` prop from pageProps

### `src/components/Navbar/Navbar.js`

- Add `LanguageSwitcher` component
- Convert internal links to use `LocalizedLink`
- Use `useTranslation('common')` for nav item text

### `src/components/Footer/Footer.js`

- Same pattern: `LocalizedLink` + `useTranslation('common')`

### View Components (phased, per-page)

Each view component conversion:
1. Add `const { t } = useTranslation('namespace');`
2. Replace hardcoded strings with `t('key')` calls
3. Remove hardcoded `<link rel="canonical">` (PageWrapper handles it)
4. Translate JSON-LD structured data fields

### `scripts/sitemap.js`

- Extend blacklist with locale variants of non-indexable pages
- Localized pages in `out/de/`, `out/es/`, `out/fr/` are auto-discovered by existing directory scan

## Implementation Phases

### Phase 0: Infrastructure (no visible changes)
- Install `i18next` and `react-i18next`
- Create i18n config, locale context, constants
- Create `en/common.json` with Navbar/Footer/shared strings
- Create stub `de/es/fr/common.json` (copies of English)
- Import i18n config in `_app.js`
- Verify build still works

### Phase 1: Routing + locale context (localized routes exist, serve English fallback)
- Modify `getStaticPaths` / `getStaticProps` for locale extraction
- Modify `NextRoutesApp` for basename + LocaleProvider
- Update `_document.js` html lang
- Verify: `out/de/alerting/index.html` exists with `<html lang="de">`

### Phase 2: Shared component translations
- Convert Navbar, Footer, PreFooter, CTA components
- Add LanguageSwitcher to Navbar
- Add hreflang + locale-aware canonical to PageWrapper
- Create LocalizedLink component
- Update sitemap blacklist

### Phase 3: View-by-view translation (incremental)
- Prioritize: HomePage, Security, Alerting, Licensing, Anomaly Detection
- Extract strings to namespace JSON files
- Replace hardcoded text with `t()` calls
- Provide actual de/es/fr translations
- Remaining ~35 views converted over time

## SEO Considerations

### hreflang Tags

Every localized page must include bidirectional alternate links:

```html
<!-- On /de/alerting/ -->
<link rel="alternate" hreflang="en" href="https://search-guard.com/alerting/" />
<link rel="alternate" hreflang="de" href="https://search-guard.com/de/alerting/" />
<link rel="alternate" hreflang="es" href="https://search-guard.com/es/alerting/" />
<link rel="alternate" hreflang="fr" href="https://search-guard.com/fr/alerting/" />
<link rel="alternate" hreflang="x-default" href="https://search-guard.com/alerting/" />
```

Rules:
- Every locale page must reference ALL other locale variants (bidirectional)
- Each page must include a self-reference
- `x-default` points to the English (root) version
- Blog/whitepaper pages do NOT get hreflang tags (English-only)

### Canonical URLs

- English `/alerting/` → canonical `https://search-guard.com/alerting/`
- German `/de/alerting/` → canonical `https://search-guard.com/de/alerting/`
- Each locale has its own canonical (they are distinct pages with distinct content)

### Sitemap

Localized pages are auto-discovered by the existing `scripts/sitemap.js` directory scan since they generate as `out/de/alerting/index.html`, etc. The blacklist needs extending for locale variants of non-indexable pages (404, error, thanks, heise).

## Verification Checklist

1. `npm run build-local` completes without errors
2. `out/de/alerting/index.html` exists with `<html lang="de">`
3. hreflang alternate links present on localized pages
4. Blog pages (`out/blog/`) have NO locale variants and NO hreflang tags
5. Language switcher appears on feature pages, hidden on blog pages
6. `/de/alerting/` renders German text (or English fallback if not yet translated)
7. Sitemap includes localized URLs
8. ~320 total routes (up from ~230)
9. Existing English URLs unchanged (no SEO disruption)
