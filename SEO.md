# SEO Analysis for Static Build (`dist`)

Date: 2026-02-11  
Scope: Technical and on-page SEO review of the prerendered static output in `dist/` (228 HTML routes), with improvement ideas before any implementation changes.

## Executive Summary

The static rendering migration is a good foundation for SEO, but there are several high-impact issues in the current output:

1. Most pages ship with non-unique metadata in prerendered HTML (`<title>Search Guard</title>`) and missing canonical/description/social tags.
2. Some route aliases publish exact duplicate content without canonical consolidation.
3. Structured data exists broadly, but at least 6 pages emit invalid JSON-LD.
4. Internal linking includes many references to non-existing routes (or legacy URLs without redirects).
5. JavaScript and third-party script load profile is heavy, which is likely hurting Core Web Vitals (and therefore organic performance).

These are fixable within the current static pipeline.

## Methodology

- Analyzed all generated `index.html` files in `dist/`.
- Verified sitemap and robots behavior from generated outputs.
- Ran bulk checks for metadata, headings, schema validity, image attributes, and internal link integrity.
- Compared findings to current Google Search Central / web.dev guidance.

## Findings and Improvement Ideas

## 1) Metadata Coverage Is Incomplete on Most Pages (Critical)

### Evidence

- Total prerendered HTML routes: **228**
- Pages missing meta description: **189**
- Pages missing canonical: **189**
- Pages missing `og:title`: **200**
- Pages missing `og:description`: **200**
- Pages missing `twitter:card`: **200**
- Unique title values: **37** (but **189 pages** share `Search Guard`)

Examples with default title + missing metadata:

- `/security/`
- `/alerting/`
- `/blog/elasticsearch-gdpr/`
- `/author/aki-abramowski/`

### Why this matters

Google uses title links and snippets from page metadata/content. Missing or repeated metadata reduces CTR and creates duplicate/ambiguous relevance signals.

### Improvement ideas

- Ensure every prerendered route gets route-specific:
  - `<title>`
  - `<meta name="description">`
  - `<link rel="canonical">`
  - Open Graph + Twitter tags
- Enforce fallback hierarchy for metadata in build-time logic:
  1. Explicit SEO fields from CMS
  2. Derived from page title/excerpt
  3. Safe defaults by page type
- Add a CI check that fails the build if critical metadata is missing for indexable pages.

## 2) Duplicate Content Published on Multiple URLs (Critical)

### Evidence

Exact duplicate HTML group found:

- `/elasticsearch-kibana-security/`
- `/security-for-elasticsearch/`
- `/tls-certificate-generator/`

These pages currently lack canonical tags, so search engines may index duplicates independently.

### Why this matters

Duplicate URLs split ranking signals and can cause index selection instability.

### Improvement ideas

- Choose one canonical URL per content cluster.
- Add canonical tag on all aliases.
- Add static host redirects (301) from deprecated aliases to the canonical route where possible.

## 3) Structured Data Coverage Is Good, But Quality Has Breakages (High)

### Evidence

- Pages with JSON-LD script: **228 / 228**
- JSON-LD scripts found: **392**
- Invalid JSON-LD on at least **6 routes** (parse errors)

Affected examples:

- `/blog/2024-a-year-of-resilience-and-community/`
- `/blog/elasticsearch-curl-unable-to-get-local-issuer-certificate/`
- `/blog/hall-of-fame-vinton-cerf/`
- `/blog/john-draper-captain-crunch/`
- `/blog/kevin-mitnick/`
- `/blog/understanding-the-agpl-license/`

Root cause example: unescaped quotes inside JSON-LD `description` values.

### Why this matters

Invalid schema is ignored. For blog content, this can reduce eligibility for rich results and degrade semantic understanding.

### Improvement ideas

- Serialize JSON-LD via `JSON.stringify` at render time (never template raw strings).
- Validate JSON-LD in CI (parse test + targeted schema checks for required Article fields).

## 4) Sitemap Is Mostly Good, But Coverage/Signals Can Improve (High)

### Evidence

- HTML routes: **228**
- Sitemap URLs: **225**
- Not in sitemap: `/404/`, `/heise/`, `/thanks/`

Current sitemap entries include `changefreq`/`priority`, but no `lastmod`.

### Why this matters

Sitemaps should reflect canonical, indexable URLs and provide strong freshness hints where possible.

### Improvement ideas

- Explicitly define sitemap policy by page type:
  - Include: canonical indexable routes
  - Exclude: utility/thank-you/error routes
- Add `<lastmod>` using reliable source-of-truth timestamps (Contentful update date or git-derived last change date).
- Keep sitemap generation deterministic and validated in CI.

## 5) Internal Links Contain Many Non-Resolvable URLs (High)

### Evidence

Automated crawl of internal anchors found many references to routes without corresponding static pages (197 unique unresolved paths).

Top examples:

- `/blog/page/1/`
- `/elasticsearch-tls-certificates/`
- `/immutable-indices-gdpr/`
- `/signals-alerting-elasticsearch-released/`
- `/searchguard-elasicsearch-transport-clients/`

Some look like legacy slugs or typo variants.

### Why this matters

Broken internal links waste crawl budget, create poor UX, and weaken internal authority flow.

### Improvement ideas

- Build-time link checker against generated route set.
- Introduce a managed redirect map for legacy slugs.
- Normalize slug generation and enforce validation for CMS-linked URLs.

## 6) Heading and Indexability Hygiene Has Edge Cases (Medium)

### Evidence

- Missing `<h1>`: **1 route** (`/error/`)
- Multiple `<h1>` on **7 routes** (including `/security-for-elasticsearch/` and several blog posts)
- No `meta robots` directives found in any page (including utility/error pages)

### Why this matters

Not always fatal, but consistent heading semantics and explicit noindex policy for utility pages reduces index noise.

### Improvement ideas

- Enforce one primary `<h1>` per page template.
- Add `noindex,follow` for pages not intended to rank (e.g., thank-you/error pages), and ensure HTTP status behavior is correct on deploy.

## 7) Performance/CWV Risk: Large JS + Heavy Third-Party Scripts (Medium to High)

### Evidence

- Main JS bundle: **2.46 MB raw** (~686 KB gzip, ~517 KB brotli)
- Homepage includes many head scripts (analytics/recording/tag tools), including an external script without defer/async.
- Median prerendered HTML is relatively large (~73 KB; largest ~492 KB)

### Why this matters

Core Web Vitals are ranking signals. JS/third-party overhead commonly hurts LCP/INP on real devices/networks.

### Improvement ideas

- Split and defer non-critical JS more aggressively.
- Gate analytics/recording scripts by consent and load later (`defer`, idle callback, or after first interaction where possible).
- Reduce client-side JS needed at startup for content pages.
- Add performance budgets in CI (bundle size and CWV checks).

## 8) Image SEO and Layout Stability Opportunities (Medium)

### Evidence

- Total `<img>` tags scanned: **2856**
- Missing `alt`: **30**
- Missing explicit `width`/`height`: **1291**

### Why this matters

Missing alt weakens accessibility/image SEO; missing dimensions can increase CLS risk.

### Improvement ideas

- Enforce `alt` in content components and CMS validation.
- Provide intrinsic dimensions (or CSS aspect-ratio containers) consistently.
- Use modern image formats and size variants where feasible.

## 9) International SEO Opportunity (Medium)

### Evidence

Site contains language/region variants (e.g., `/press/de/...` and `/press/en/...`) but no detected `hreflang` annotations.

### Improvement ideas

- If these pages target different language audiences, implement `hreflang` clusters + self-referencing canonical per locale.
- If localization is partial, define a stricter policy to avoid mixed signals.

## Prioritized Implementation Backlog

## Phase 1 (Highest Impact)

1. Fix metadata generation for all indexable routes (title, description, canonical, OG/Twitter).
2. Fix duplicate content aliases with canonical + redirects.
3. Repair invalid JSON-LD serialization.
4. Add internal link validation and redirect map for legacy slugs.

## Phase 2

1. Improve sitemap generation (`lastmod`, inclusion policy checks).
2. Clean heading semantics and utility-page indexability directives.
3. Add image attribute quality gates (alt + dimensions).

## Phase 3

1. Reduce JS payload and third-party script impact.
2. Add automated CWV/performance budgets and periodic Lighthouse CI runs.
3. Add `hreflang` if multilingual strategy is intentional.

## Suggested CI SEO Gates

- `title` present and non-default for all indexable pages.
- `meta description` present for all indexable pages.
- Self-canonical present and valid for all indexable pages.
- JSON-LD parseable on all pages.
- No internal links to non-existent routes unless explicitly redirected.
- Sitemap contains only canonical indexable URLs.

## References (Current Guidance)

- Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- JavaScript SEO basics: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Create unique, accurate titles: https://developers.google.com/search/docs/appearance/title-link
- Snippet and description guidance: https://developers.google.com/search/docs/appearance/snippet
- Canonicalization guidance: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Robots meta and indexing controls: https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag
- Build and submit sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Article structured data: https://developers.google.com/search/docs/appearance/structured-data/article
- Core Web Vitals overview: https://web.dev/articles/vitals
- LCP optimization: https://web.dev/articles/optimize-lcp
- CLS optimization: https://web.dev/articles/optimize-cls
