# SEO Audit — Search Guard Website (Static Build)

**Date:** 2026-02-10
**Build analyzed:** `dist/` directory (214 HTML pages)
**Scope:** Full static build after SSG pre-rendering

---

## Executive Summary

The static build has severe SEO deficiencies. **87% of pages** lack unique titles, descriptions, canonical URLs, and Open Graph tags. The SSG pre-rendering process introduces massive HTML duplication — scripts, meta tags, and preload links are duplicated 2-7x per page. Only ~27 pages (13%) have any meaningful SEO metadata, and even those contain duplicate tags. Blog posts lack Article structured data. No pages use semantic HTML5 elements.

### Scores at a Glance

| Category | Score | Detail |
|---|---|---|
| **Meta Tags** | 2/10 | 187/214 pages have generic title, no description |
| **Structured Data** | 2/10 | No Article schema on blog posts, Organization only on homepage |
| **Semantic HTML** | 1/10 | Zero pages use `<main>`, `<article>`, `<section>`, `<header>`, `<footer>` |
| **Duplicate Content** | 2/10 | Massive tag duplication on every page |
| **Technical SEO** | 3/10 | No sitemap.xml, no noindex on utility pages, font preload type mismatch |
| **Social Sharing** | 2/10 | Only 21/214 pages have OG/Twitter tags |
| **Heading Structure** | 5/10 | All pages have single H1, but heading level skips exist |
| **Images** | 8/10 | Alt attributes present, lazy loading implemented |
| **Content Rendering** | 9/10 | SSG produces visible HTML content on all pages |

---

## Issue 1: Massive HTML Duplication from SSG (CRITICAL)

**Root cause:** The Puppeteer pre-renderer captures the full rendered DOM including all dynamically injected elements. Since `index.html` already contains scripts, meta tags, and preload hints, and these also get injected at runtime by analytics libraries and React, the static HTML ends up with multiple copies of everything.

### Evidence

| Element | Homepage | Security Page |
|---|---|---|
| `<title>` tags | 5 | 7 |
| `charset` meta tags | 6 | 10 |
| `rel="preload"` links | 16 | 32 |
| GTM script loads | 2 | 3 |
| Matomo script loads | 1 | 2 |
| Smartlook recorder | 1 | 3 |
| Cookie-script | 2 | 7 |
| Reddit pixel | 1 | 2 |

### Impact
- **Page weight inflation** — duplicated scripts and styles bloat every page by 20-50KB
- **Double/triple script execution** — analytics fire multiple times per page load, skewing data
- **CLS/LCP degradation** — duplicated preload hints confuse the browser's resource prioritization
- **Crawl budget waste** — search engines parse unnecessary duplicate markup

### Recommended Fix
Modify `scripts/prerender.js` to **deduplicate the `<head>` section** after capturing the rendered HTML. Before writing each HTML file:

1. Parse the captured HTML
2. Deduplicate `<meta>` tags by `name` and `property` attributes (keep first occurrence)
3. Deduplicate `<link>` tags by `href` + `rel` combination
4. Deduplicate `<script>` tags by `src` attribute
5. Ensure only one `<title>` tag remains (the one set by React Helmet, not the default)

---

## Issue 2: 87% of Pages Have Generic "Search Guard" Title (CRITICAL)

**187 out of 214 pages** have only `<title>Search Guard</title>` — the default from `index.html`. React Helmet's per-page titles are not being captured during SSG for the vast majority of pages.

### Pages WITHOUT a unique title (sample)

All 32 top-level pages except compliance, faq, presentations, and search-guard-free-trial:

| Page | Current Title | Should Be |
|---|---|---|
| `/` (homepage) | Search Guard | Security and Alerting for Elasticsearch and Kibana \| Search Guard |
| `/security/` | Search Guard | Elasticsearch & Kibana Security Plugin \| Search Guard |
| `/alerting/` | Search Guard | Elasticsearch Alerting & Anomaly Detection \| Search Guard |
| `/company/` | Search Guard | About Search Guard \| floragunn GmbH |
| `/contacts/` | Search Guard | Contact Us \| Search Guard |
| `/blog/` | Search Guard | Blog \| Search Guard |
| `/licensing/` | Search Guard | Licensing \| Search Guard |
| `/encryption-at-rest/` | Search Guard | Encryption at Rest for Elasticsearch \| Search Guard |
| `/indexmanagement/` | Search Guard | Index Management for Elasticsearch \| Search Guard |
| `/tlstool/` | Search Guard | TLS Tool for Elasticsearch \| Search Guard |
| `/404/` | Search Guard | Page Not Found \| Search Guard |

**~136 blog posts** also have the generic title, meaning React Helmet's title override failed during pre-rendering for these posts.

### Root Cause
The SSG pre-renderer is not waiting long enough for React Helmet to update the `<title>` tag, OR Helmet's state updates are being lost during the snapshot. The `inject-seo-tags.js` script only covers the homepage and ~20 blog posts, leaving the rest with the default.

### Recommended Fix
**Option A (quick):** Expand `scripts/inject-seo-tags.js` to cover ALL pages with hardcoded titles and descriptions for static pages, and ensure ALL blog posts from `contentfulPosts.json` are processed (currently only ~20 are getting processed).

**Option B (proper):** Fix the SSG pre-renderer to reliably capture React Helmet's output. Add a wait condition that checks for the title tag to change from "Search Guard" before snapshotting.

---

## Issue 3: 87% of Pages Missing Meta Descriptions (CRITICAL)

**Only 27 out of 214 pages** have a `<meta name="description">` tag.

### Pages WITH descriptions (27 total)
- 4 static pages: `/compliance/`, `/faq/`, `/presentations/`, `/search-guard-free-trial/`
- ~20 blog posts (e.g., ada-lovelace, elasticsearch-single-sign-on, quantum-computing-security)
- 1 author page: `/author/verity-rainey/`
- 1 whitepaper: `/whitepapers/hipaa-compliance-elastic-slack/`
- 1 pagination page: `/blog/page/1/`, `/blog/page/2/`

### Pages WITHOUT descriptions (187 total)
- Homepage
- All major product pages (security, alerting, encryption-at-rest, indexmanagement, tlstool)
- All company pages (company, contacts, licensing, impressum, datenschutz, dataprotection)
- Blog index
- ~135 blog posts
- 4 out of 5 author pages
- All category pages
- All remaining pagination pages

### Recommended Fix
Same as Issue 2 — expand `inject-seo-tags.js` or fix SSG Helmet capture. Every page needs a unique, descriptive meta description under 160 characters.

---

## Issue 4: 87% of Pages Missing Canonical URLs (CRITICAL)

**Only 27 out of 214 pages** have `<link rel="canonical">`. Same pages as those with descriptions.

### Impact
- Search engines may index duplicate versions of pages (with/without trailing slash, with query params)
- Pagination pages without canonical/prev/next confuse crawlers
- Link equity gets diluted across duplicate URLs

### Additional Issue: Duplicated Canonicals
Pages that DO have canonical links have them **duplicated 2x** (once from Helmet, once from inject-seo-tags.js). Example from `/blog/elasticsearch-single-sign-on/`:
```
rel="canonical" href="https://search-guard.com/blog/elasticsearch-single-sign-on/" data-rh="true"
rel="canonical" href="https://search-guard.com/blog/elasticsearch-single-sign-on/" data-rh="true"
```

### Recommended Fix
1. Add canonical URLs to all pages via `inject-seo-tags.js`
2. Deduplicate canonical tags in the prerender step (see Issue 1)

---

## Issue 5: 90% of Pages Missing Open Graph & Twitter Tags (CRITICAL)

**Only 21 out of 214 pages** have Open Graph tags. **Only 21 pages** have Twitter Card tags.

### Impact
- Links shared on social media (LinkedIn, Twitter, Facebook, Slack) display as plain URLs without preview cards
- Missed opportunity for click-through from social sharing
- Particularly damaging for blog posts shared by authors or readers

### Recommended Fix
Expand `inject-seo-tags.js` to inject OG and Twitter tags for all pages. At minimum, every page needs:

```html
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:url" content="...">
<meta property="og:image" content="...">
<meta property="og:type" content="website"> <!-- or "article" for blog posts -->
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@searchguard">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="...">
```

---

## Issue 6: Zero Semantic HTML Elements (HIGH)

**0 out of 214 pages** use `<main>`, `<article>`, `<section>`, `<header>`, or `<footer>` elements. The entire site is built with `<div>` elements and Materialize CSS classes.

### Impact
- Search engines lose semantic signals about content hierarchy and purpose
- Screen readers cannot navigate by landmarks (accessibility failure)
- Blog posts without `<article>` miss Article-level semantic signals
- Core Web Vitals may be affected (browsers optimize rendering for semantic elements)

### Recommended Fix
Update the React components:

| Component | Change |
|---|---|
| `PageWrapper.jsx` | Wrap children in `<main>` |
| `Navbar.jsx` | Use `<header>` wrapper |
| `Footer.jsx` | Use `<footer>` wrapper |
| `BlogPostArticle.jsx` | Wrap post content in `<article>` |
| Content sections | Use `<section>` instead of outer `<div>` |

---

## Issue 7: No Sitemap.xml in Build (HIGH)

The `dist/` directory does **not contain a `sitemap.xml`** file. The `robots.txt` references `https://search-guard.com/sitemap.xml` but it doesn't exist.

### Impact
- Search engines have no complete URL inventory to crawl
- New pages and blog posts may take significantly longer to be discovered
- robots.txt pointing to a non-existent sitemap signals a misconfigured site

### Recommended Fix
Run `npm run sitemap` as part of the build, or verify the build command chain includes it. The sitemap script exists at `scripts/sitemap.js` but didn't execute or its output is missing.

---

## Issue 8: No Article Structured Data on Blog Posts (HIGH)

**0 out of 155 blog posts** have Article JSON-LD structured data in the static build.

### Evidence
- Blog posts have `BreadcrumbList` schema (193 pages have breadcrumbs) but no `Article` schema
- The homepage has 1 `application/ld+json` block (Organization schema)
- Blog posts like `/blog/elasticsearch-gdpr/` have 2 `application/ld+json` blocks but neither contains `"@type":"Article"`

### Impact
- Blog posts won't appear as rich results in Google (no article date, author, image in search results)
- Missed opportunity for Google Discover eligibility
- Competitors with Article schema will have more prominent SERP listings

### Recommended Fix
Add Article JSON-LD to every blog post, either:
- In the `BlogPostArticle.jsx` component via React Helmet, OR
- In `inject-seo-tags.js` as a post-build step

Required Article schema fields:
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Post Title",
  "description": "Post description",
  "image": "https://...",
  "author": { "@type": "Person", "name": "Author Name" },
  "publisher": { "@type": "Organization", "name": "Search Guard", "logo": { "@type": "ImageObject", "url": "..." } },
  "datePublished": "2025-01-15",
  "dateModified": "2025-01-15"
}
```

---

## Issue 9: Font Preload Type Mismatch (MEDIUM)

Font files are preloaded with incorrect MIME types:

| File | Actual Format | Declared Type |
|---|---|---|
| `Inter-Regular.ttf` | TrueType (`.ttf`) | `font/woff2` |
| `Parafina-BoldS.otf` | OpenType (`.otf`) | `font/woff2` |
| `Parafina-BlackS.otf` | OpenType (`.otf`) | `font/woff2` |
| `Material-Icons.woff2` | WOFF2 (`.woff2`) | `font/woff2` (correct) |

### Impact
- Browsers may ignore preload hints due to type mismatch, negating the performance benefit
- Fonts load later than they should, causing Flash of Unstyled Text (FOUT)
- Lighthouse flags this as a performance issue

### Recommended Fix
In `index.html`, correct the preload type attributes:

```html
<link rel="preload" href="/assets/fonts/Inter-Regular.ttf" as="font" type="font/ttf" crossorigin="">
<link rel="preload" href="/assets/fonts/Parafina-BoldS.otf" as="font" type="font/otf" crossorigin="">
<link rel="preload" href="/assets/fonts/Parafina-BlackS.otf" as="font" type="font/otf" crossorigin="">
```

**Better fix:** Convert fonts to WOFF2 format (30-50% smaller than TTF/OTF) and update all references.

---

## Issue 10: No `noindex` on Utility Pages (MEDIUM)

The following pages should not be indexed by search engines but have no `<meta name="robots" content="noindex">` tag:

| Page | Reason |
|---|---|
| `/404/` | Error page |
| `/error/` | Error page |
| `/thanks/` | Post-form-submission thank-you page |
| `/heise/` | Campaign-specific landing page |
| `/newsletter/` | Newsletter signup (thin content) |

### Impact
- Crawl budget wasted on pages with no search value
- Thin content pages may dilute overall site quality signals

### Recommended Fix
Add `<meta name="robots" content="noindex, follow">` to these pages via React Helmet or `inject-seo-tags.js`.

---

## Issue 11: No Pagination `rel="prev"`/`rel="next"` (MEDIUM)

Blog pagination pages (`/blog/page/2/`, `/blog/page/3/`, etc.) have **no `rel="prev"` or `rel="next"` link tags**.

### Impact
- Search engines can't determine the relationship between paginated pages
- May result in only the first page being indexed, or random pagination pages appearing in search
- Google has deprecated these signals but Bing and others still use them

### Recommended Fix
Add to each pagination page:
```html
<link rel="prev" href="https://search-guard.com/blog/page/1/">
<link rel="next" href="https://search-guard.com/blog/page/3/">
```

Also add `<link rel="canonical">` pointing to each pagination page's own URL (not to page 1).

---

## Issue 12: Heading Level Skips (MEDIUM)

Multiple pages have heading hierarchy issues where levels are skipped.

### Findings

| Page | Issue |
|---|---|
| Homepage | H1 → H3 (skips H2 in hero section), H3 → H5 (licensing section) |
| Security | H3 → H5 (certificates section) |
| Blog index | Empty `<h2 class="title-text-style"></h2>` |
| All pages | H2/H3 → H5 jump in the newsletter/footer section |

### Impact
- Screen readers announce heading levels and skips confuse navigation
- Search engines use heading hierarchy to understand content structure
- Empty headings are flagged as errors by all SEO audit tools

### Recommended Fix
1. Remove the empty `<h2>` on the blog index (in the `Title` component when no text is provided)
2. Change the newsletter section headings from `<h5>` to the appropriate level
3. Ensure hero section content follows H1 → H2 → H3 order

---

## Issue 13: Render-Blocking Scripts in `<head>` (LOW)

The `<head>` section loads multiple analytics scripts synchronously or semi-synchronously:

| Script | Loading | Impact |
|---|---|---|
| Google Tag Manager | `async` | Moderate — triggers additional script loads |
| Plausible | `defer` | Low — properly deferred |
| Matomo | Inline + `async` | Moderate — inline JS blocks parsing momentarily |
| Google Analytics (gtag) | Inline | Moderate — blocks during execution |
| Smartlook | Inline + `async` | Moderate — inline JS blocks parsing momentarily |
| Cookie Script | `async` | Moderate — triggers additional loads |

### Impact
- Time to First Contentful Paint (FCP) increases
- Total Blocking Time (TBT) increases from inline scripts
- Multiple third-party domains add DNS resolution overhead

### Recommended Fix
1. Move all inline analytics scripts to just before `</body>` (or load them after `DOMContentLoaded`)
2. Combine GTM and individual GA configs — GTM should handle all analytics, making standalone Matomo/Plausible/Smartlook scripts redundant if configured in GTM
3. Consider loading analytics only after user consent (GDPR)

---

## Issue 14: Missing robots.txt Disallow Rules (LOW)

Current `robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://search-guard.com/sitemap.xml
```

### Recommended additions:
```
Disallow: /thanks/
Disallow: /error/
Disallow: /heise/
Disallow: /preview/
```

---

## Positive Findings

| Area | Status |
|---|---|
| `<html lang="en">` | Present on all pages |
| Single `<h1>` per page | All 214 pages have exactly one H1 |
| Image `alt` attributes | Present on all images |
| Lazy loading | Native `loading="lazy"` on images |
| SSG content rendering | All pages have visible HTML content (not empty shells) |
| Breadcrumb schema | 193 pages have `BreadcrumbList` JSON-LD |
| Organization schema | Present on homepage |
| HTTPS canonical URLs | All canonical URLs (where present) use HTTPS |
| Trailing slash consistency | All canonical URLs have trailing slashes |
| Blog related posts | Blog posts link to related articles |

---

## Implementation Priority

### Phase 1 — Fix the Build Pipeline (blocks everything else)

| # | Task | Impact | Files to Modify |
|---|---|---|---|
| 1.1 | **Deduplicate `<head>` in prerender.js** — after capturing HTML, remove duplicate `<meta>`, `<link>`, `<script>` tags | Critical | `scripts/prerender.js` |
| 1.2 | **Fix React Helmet capture** — ensure SSG waits for Helmet to update `<title>` before snapshotting | Critical | `scripts/prerender.js` |
| 1.3 | **Generate sitemap.xml** — ensure it's part of the build output | High | `scripts/build-ssg.js` or build command |

### Phase 2 — Meta Tags for All Pages

| # | Task | Impact | Files to Modify |
|---|---|---|---|
| 2.1 | **Expand inject-seo-tags.js** — add title, description, canonical, OG, Twitter for ALL static pages | Critical | `scripts/inject-seo-tags.js` |
| 2.2 | **Fix blog post coverage** — ensure all 155 blog posts get SEO tags, not just ~20 | Critical | `scripts/inject-seo-tags.js` |
| 2.3 | **Add author page SEO** — titles and descriptions for all 5 author pages | High | `scripts/inject-seo-tags.js` |
| 2.4 | **Add noindex to utility pages** — 404, error, thanks, heise | Medium | `scripts/inject-seo-tags.js` |

### Phase 3 — Structured Data

| # | Task | Impact | Files to Modify |
|---|---|---|---|
| 3.1 | **Add Article JSON-LD to blog posts** | High | `src/views/BlogPostArticle/` or `scripts/inject-seo-tags.js` |
| 3.2 | **Add Organization JSON-LD to all pages** (not just homepage) | Medium | `src/components/PageWrapper/` or inject script |

### Phase 4 — Semantic HTML

| # | Task | Impact | Files to Modify |
|---|---|---|---|
| 4.1 | **Add `<main>` to PageWrapper** | High | `src/components/PageWrapper/PageWrapper.jsx` |
| 4.2 | **Add `<header>` to Navbar** | High | `src/components/Navbar/Navbar.jsx` |
| 4.3 | **Add `<footer>` to Footer** | High | `src/components/Footer/Footer.jsx` |
| 4.4 | **Add `<article>` to blog posts** | High | `src/views/BlogPostArticle/` |
| 4.5 | **Fix heading level skips** | Medium | Various components |
| 4.6 | **Remove empty H2 on blog index** | Medium | `src/components/Title/Title.jsx` |

### Phase 5 — Performance & Technical

| # | Task | Impact | Files to Modify |
|---|---|---|---|
| 5.1 | **Fix font preload MIME types** | Medium | `index.html` |
| 5.2 | **Convert fonts to WOFF2** | Medium | `public/assets/fonts/` |
| 5.3 | **Add pagination prev/next links** | Medium | Blog pagination component or inject script |
| 5.4 | **Update robots.txt** with Disallow rules | Low | `public/robots.txt` |
| 5.5 | **Move analytics to end of body** | Low | `index.html` |

---

## Appendix: Full Page Inventory

### Static Pages (32)

| Path | Has Title | Has Description | Has OG | Has Canonical |
|---|---|---|---|---|
| `/` | generic | no | no | no |
| `/security/` | generic | no | no | no |
| `/alerting/` | generic | no | no | no |
| `/company/` | generic | no | no | no |
| `/contacts/` | generic | no | no | no |
| `/blog/` | generic | no | no | no |
| `/licensing/` | generic | no | no | no |
| `/encryption-at-rest/` | generic | no | no | no |
| `/indexmanagement/` | generic | no | no | no |
| `/tlstool/` | generic | no | no | no |
| `/search-guard-flx/` | generic | no | no | no |
| `/certificates/` | generic | no | no | no |
| `/cve-advisory/` | generic | no | no | no |
| `/impressum/` | generic | no | no | no |
| `/datenschutz/` | generic | no | no | no |
| `/dataprotection/` | generic | no | no | no |
| `/disclosure-policy/` | generic | no | no | no |
| `/security-information/` | generic | no | no | no |
| `/newsletter/` | generic | no | no | no |
| `/resource/` | generic | no | no | no |
| `/authors/` | generic | no | no | no |
| `/sitemap/` | generic | no | no | no |
| `/outdated-elasticsearch-versions-suppport/` | generic | no | no | no |
| `/whitepapers/` | generic | no | no | no |
| `/404/` | generic | no | no | no |
| `/error/` | generic | no | no | no |
| `/thanks/` | generic | no | no | no |
| `/heise/` | generic | no | no | no |
| `/compliance/` | unique | yes | no | yes |
| `/faq/` | unique | yes | no | yes |
| `/presentations/` | unique | yes | no | yes |
| `/search-guard-free-trial/` | unique | yes | no | yes |

### Blog Posts (155 total)
- **~20 posts** have full SEO (title, description, canonical, OG, Twitter)
- **~135 posts** have generic "Search Guard" title only

### Author Pages (5 total)
- **1 page** (`/author/verity-rainey/`) has full SEO
- **4 pages** have generic title only

### Pagination Pages (~16 total)
- **2 pages** (`/blog/page/1/`, `/blog/page/2/`) have description
- **~14 pages** have generic title only
- **0 pages** have prev/next links

### Category Pages (variable)
- All have generic title only
