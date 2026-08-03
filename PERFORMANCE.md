# Performance Analysis — Search Guard Website

Generated: 2026-03-23 | Build: Next.js static export (`out/`)

---

## Executive Summary

The site ships **~2.7 MB of uncompressed JavaScript** on every page load (~800 KB gzipped). The recommended budget for good Core Web Vitals is 200-300 KB gzipped. The primary causes are a monolithic bundle with zero code splitting, inlined Contentful JSON data (1.4 MB), and eagerly loaded third-party libraries that are only needed on specific pages.

Additionally, **~2.3 MB of dead legacy Vite build artifacts** are deployed but never loaded, fonts are served in uncompressed formats (TTF/OTF instead of WOFF2), and `next/image` is not used for any images.

---

## 1. JavaScript Bundle Breakdown

### Per-Chunk Analysis

| Chunk | Raw Size | Gzipped | Contents |
|-------|----------|---------|----------|
| `314-*.js` | **1,784 KB** | ~478 KB | All app code + inlined `contentfulPosts.json` (1.4 MB) |
| `319-*.js` | 544 KB | ~149 KB | lunr.js + Algolia + Contentful SDK + react-router + react-share + react-svg |
| `_app-*.js` | 299 KB | ~85 KB | App wrapper + all i18n translations (4 languages) |
| `framework-*.js` | 137 KB | ~43 KB | React + ReactDOM |
| `main-*.js` | 122 KB | ~34 KB | Next.js runtime |
| `polyfills-*.js` | 109 KB | ~38 KB | Old browsers only (nomodule) |
| Other small chunks | ~16 KB | ~6 KB | Webpack runtime, error page, page entries |
| **Total** | **~2,900 KB** | **~800 KB** | |

### Key Issues

**No code splitting exists.** The entire application — all routes, all components, all data — loads as a single bundle on every page. There is zero usage of `React.lazy`, `next/dynamic`, or route-based splitting. A visitor viewing the homepage downloads the full blog engine, all blog post content, Algolia search, social sharing buttons, etc.

**Contentful blog data is inlined in JS.** `contentfulPosts.json` (1,405 KB) is statically imported by 6 source files. Webpack deduplicates the import but embeds the full JSON into chunk `314`, which loads on every page.

**Two competing search libraries are bundled.** Both `lunr.js` (client-side full-text search) and `algoliasearch` + `react-instantsearch` (cloud search) are bundled together in chunk `319`.

**Contentful SDK ships to the browser.** The `contentful` npm package (runtime API client + axios) is bundled even though it's only needed at build time for `npm run fetch`.

---

## 2. CSS Analysis

| File | Raw Size | Gzipped | Notes |
|------|----------|---------|-------|
| `materialize.min.css` | 139 KB | ~21 KB | Full framework; only grid + a few components used |
| `01fe6d59*.css` | 100 KB | ~14 KB | Compiled `main.scss` |
| `8584ffab*.css` | 30 KB | ~6 KB | Additional Next.js chunk |
| `fonts.css` | 2 KB | <1 KB | Font-face declarations |
| **Total** | **271 KB** | **~42 KB** | All 4 are render-blocking |

Materialize CSS (139 KB) accounts for over half of the CSS payload. Only a small subset is actually used: the grid system (`.row`, `.col`, `.s12`, `.m4`, `.l6`, etc.), sidenav, and dropdown components.

---

## 3. Font Loading

### Preloaded Fonts (loaded on every page)

| Font | Size | Format | Notes |
|------|------|--------|-------|
| Inter-Regular | 303 KB | TTF | WOFF2 would be ~180 KB |
| Parafina-BoldS | 63 KB | OTF | WOFF2 would be ~40 KB |
| Parafina-BlackS | 67 KB | OTF | WOFF2 would be ~42 KB |
| Material-Icons | 59 KB | WOFF2 | Already optimal |
| **Total preloaded** | **492 KB** | | WOFF2 conversion could save ~170 KB |

### Unused Font Files Deployed

14 font files (1,372 KB total) exist in `public/assets/fonts/` but are never declared in `fonts.css`:
- Inter: ExtraBold, ExtraLight variants (TTF, ~310 KB each)
- Parafina: 12 `-L` and `-M` optical size variants (~63 KB each)

Additionally, `fonts.css` declares 13 `@font-face` rules but only 4 fonts are preloaded. The remaining 9 declared fonts (~2.5 MB of TTF/OTF) download on demand when CSS references them.

All fonts use `font-display: swap` which is correct for avoiding invisible text.

---

## 4. Image Handling

- **`next/image` is not used anywhere.** All images use plain `<img>` tags — no responsive sizing, no automatic WebP/AVIF conversion, no built-in lazy loading.
- **Blog listing pages have zero `loading="lazy"`** on any of their 20 post thumbnail images. All load eagerly.
- **Blog listing images are missing `height` attributes** on 10/20 images, contributing to Cumulative Layout Shift (CLS).
- **SVG team portraits are 289-641 KB each** (`mechthild.svg` 641 KB, `jochen.svg` 375 KB, `claudia.svg` 289 KB). Optimized JPEG/WebP equivalents would be 20-50 KB.
- **`react-svg`** is used in 11 core components to inject SVGs via XHR at runtime. These could be inlined at build time to avoid additional network requests.

---

## 5. Dead / Legacy Assets

### Legacy Vite Build Artifacts (public/assets/)

| File | Size | Status |
|------|------|--------|
| `index-BdjIcIly.js` | **2,300 KB** | Unreferenced legacy Vite JS bundle |
| `index-CWwuTaby.css` | 121 KB | Unreferenced legacy Vite CSS |
| `lazysizes.min.js` | 7.6 KB | Not imported anywhere |
| `main.js` | 0.9 KB | Legacy Materialize init script |
| Vite-hashed font-awesome webfonts | ~930 KB | Unreferenced copies |
| **Total dead assets** | **~3,360 KB** | |

### Duplicated Assets

27 files exist in **both** `out/assets/` (from `public/`) and `out/_next/static/media/` (from webpack imports), totaling ~5.2 MB of duplication. Next.js imports create content-hashed copies while the originals remain in `public/assets/`.

### Unused npm Dependencies

These are listed in `dependencies` but not imported anywhere in `src/`:

- `country-list`
- `uuid`
- `serve-handler`
- `react-headroom`
- `react-transition-group`
- `react-ga`

---

## 6. Configuration Gaps

`next.config.mjs` contains only basic settings (`output: 'export'`, `trailingSlash: true`). Missing:

- No `modularizeImports` for large libraries (e.g., `react-instantsearch`)
- No custom webpack config for bundle analysis or splitting
- No `compiler.removeConsole` for production
- No `experimental.optimizeCss` for CSS optimization

---

## 7. Per-Page Load Profile

First-time visitor loading the homepage:

| Resource | Uncompressed | Gzipped (est.) |
|----------|-------------|----------------|
| HTML | 37 KB | ~10 KB |
| CSS (4 files, render-blocking) | 271 KB | ~42 KB |
| JS (10 script files) | 2,700 KB | ~800 KB |
| Fonts (4 preloaded) | 492 KB | ~400 KB |
| **Total before images** | **~3,500 KB** | **~1,250 KB** |

---

## Recommendations (by impact)

### High Impact

| # | Recommendation | Estimated Saving | Effort |
|---|---------------|-----------------|--------|
| 1 | **Move Contentful data out of the JS bundle.** Pass blog data via `getStaticProps` so it lives in HTML, not JS. Only blog pages would receive blog data. | ~1,400 KB raw JS | High |
| 2 | **Add code splitting with `next/dynamic`.** Lazy-load Algolia search, react-share, blog components, and other page-specific code so they only load when needed. | ~300-500 KB raw JS | Medium |
| 3 | **Remove duplicate search library.** Pick either lunr.js or Algolia — not both. | ~80-200 KB raw JS | Low |
| 4 | **Remove Contentful SDK from browser bundle.** Move `contentful` to `devDependencies` since it's only used by fetch scripts. | ~150 KB raw JS | Low |
| 5 | **Delete legacy Vite artifacts** from `public/assets/` (`index-BdjIcIly.js`, `index-CWwuTaby.css`, `lazysizes.min.js`, `main.js`). | 2,430 KB deploy size | Low |
| 6 | **Convert fonts to WOFF2 format** and remove unused font files from `public/assets/fonts/`. | ~170 KB per page load + 1,372 KB deploy size | Low |

### Medium Impact

| # | Recommendation | Estimated Saving | Effort |
|---|---------------|-----------------|--------|
| 7 | **Lazy-load i18n translations.** Only load the active locale's translations; fetch others on language switch. | ~250 KB raw in `_app` chunk | Medium |
| 8 | **Purge unused Materialize CSS** (use PurgeCSS or extract only the grid subset). | ~100 KB raw CSS | Medium |
| 9 | **Add `loading="lazy"` to blog listing images** (`BlogPost.js`) and ensure all images have `width` and `height` for CLS. | Reduced initial load, better CLS | Low |
| 10 | **Convert large SVG portraits to WebP/JPEG.** `mechthild.svg` (641 KB), `jochen.svg` (375 KB), `claudia.svg` (289 KB). | ~1,200 KB for those 3 images | Low |
| 11 | **Remove 6 unused npm dependencies** from `package.json` (`country-list`, `uuid`, `serve-handler`, `react-headroom`, `react-transition-group`, `react-ga`). | Cleaner deps, potential bundle reduction | Low |

### Lower Impact / Long-term

| # | Recommendation | Notes |
|---|---------------|-------|
| 12 | **Use `next/image`** for automatic responsive images, WebP conversion, and lazy loading. | Requires custom loader for static export. |
| 13 | **Replace `react-svg` runtime injection** with build-time SVG inlining (e.g., `@svgr/webpack`). | Eliminates per-SVG XHR requests. |
| 14 | **Add pagination to blog category pages.** The "search-guard" category page renders 68 images without pagination (81 KB HTML). | Improves largest pages. |
| 15 | **Deduplicate assets** between `public/assets/` and webpack imports. Remove originals from `public/` for assets that are imported by components. | ~5.2 MB deploy size. |
| 16 | **Add `modularizeImports`** in `next.config.mjs` for `react-instantsearch` and other barrel-exported libraries. | May improve tree-shaking. |

---

## Current vs Target Budget

| Metric | Current | Target | Gap |
|--------|---------|--------|-----|
| JS (gzipped) | ~800 KB | <300 KB | 500 KB over |
| CSS (gzipped) | ~42 KB | <30 KB | 12 KB over |
| Fonts (preloaded) | 492 KB | <300 KB | 192 KB over |
| Largest Contentful Paint | Likely >2.5s | <2.5s | Unknown (needs field data) |
| Total page weight (no images) | ~1,250 KB gz | <500 KB gz | 750 KB over |

Implementing recommendations 1-6 alone would reduce the JS payload by an estimated 60-70%, bringing it close to the 300 KB gzipped target.
