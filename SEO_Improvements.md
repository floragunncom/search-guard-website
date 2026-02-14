# SEO Improvements Report

**Date:** 2026-02-13 (updated)
**Scope:** Static site output in `dist/` (272 pages, 221 sitemap entries)

---

## Previously Reported Issues — Now Fixed

The following issues from the 2026-02-12 report have been resolved:

1. **~~404 Page Missing `noindex` Meta Tag~~** — `dist/404.html` and `dist/404/index.html` now have `<meta name="robots" content="noindex, nofollow">`.

2. **~~Blog Pagination Pages Have Identical Titles and Descriptions~~** — Pagination pages now have unique titles (e.g., "Official Search Guard blog - Page 3") and descriptions with page numbers. Blog category pages now have unique titles (e.g., "Search Guard Blog - Security Articles") and descriptions (e.g., "Browse security-related articles on the Search Guard blog.").

3. **~~German Pages Have Incorrect `lang="en"` Attribute~~** — German pages (`/datenschutz/`, `/press/de/*`) now correctly use `<html lang="de">`.

4. **~~No `hreflang` Tags for Language-Paired Content~~** — Hreflang tags are now implemented on language-paired pages (e.g., `/datenschutz/` ↔ `/dataprotection/`).

5. **~~Sitemap Missing `<lastmod>` Dates~~** — All 221 sitemap URLs now include `<lastmod>` timestamps.

6. **~~68 Pages Missing `og:image` Tag~~** — All 229 content pages now have `og:image`. Only the 44 redirect stubs (by design) lack OG tags.

7. **~~Blog Post and Author Canonical URLs Missing Trailing Slashes~~** — All canonical URLs now consistently include trailing slashes.

8. **~~Several Key Pages Have Titles Exceeding 60 Characters~~** — Most titles have been shortened:
   - Homepage: "Elasticsearch Security & Alerting | Search Guard" (48 chars)
   - Blog index: "Search Guard Blog: Elasticsearch Security News" (46 chars)
   - Licensing: "Search Guard Pricing: Community, Enterprise, Compliance" (55 chars)
   - FAQ: "Search Guard FAQ: Elasticsearch Security Answers" (48 chars)
   - Search Guard FLX: "Search Guard FLX: Elasticsearch Security Made Easy" (50 chars)

9. **~~No `rel="next"` / `rel="prev"` on Pagination Pages~~** — Pagination pages now have correct `rel="next"` and `rel="prev"` link tags.

10. **~~Font Preload Type Mismatch~~** — Font preload `type` attributes now match actual file formats (`font/ttf`, `font/otf`, `font/woff2`).

11. **~~OG Title/Description Mismatch with Page-Specific Metadata~~** — OG title and description now match page-specific `<title>` and `<meta name="description">` on all 229 content pages.

12. **~~Structured Data Uses Only Organization Type Globally~~** — Homepage now includes `WebSite` schema with `SearchAction`. Security page now includes `SoftwareApplication` schema. Blog posts have `Article` schema and author pages have `ProfilePage` schema.

13. **~~`/resource/` Broken Internal Link~~** — The `/resource/` page now exists. Navbar and footer links to it are no longer broken.

---

## Remaining Issues

### Medium Priority

#### 1. Utility Pages Missing `noindex` Tags

The following pages are excluded from the sitemap but lack `noindex` meta tags. If any external link points to them, they could be crawled and indexed:

- `/error/`
- `/thanks/`
- `/heise/` (campaign landing page)

**Fix:** Add `<meta name="robots" content="noindex">` to these pages via their Helmet configuration.

---

#### 2. Compliance Page Title Exceeds 60 Characters

The compliance page title was updated to include "Search Guard" (good for branding) but is now 71 characters:

| Page | Title | Length |
|------|-------|--------|
| `/compliance/` | Elasticsearch Compliance \| GDPR, HIPAA, PCI, SOX and ISO \| Search Guard | 71 |

**Fix:** Shorten to under 60 characters, e.g., "Elasticsearch Compliance \| Search Guard" (39 chars) or "GDPR, HIPAA & SOX Compliance \| Search Guard" (44 chars).

---

#### 3. H1 `lang` Attribute Mismatch on German Pages

While the `<html>` tag correctly uses `lang="de"` on German pages, the `<h1>` elements still have `lang="en"`:

- `/datenschutz/index.html`: `<h1 lang="en">Datenschutz</h1>` on a `lang="de"` page
- `/press/de/elasticsearch-dsgvo/index.html`: `<h1 lang="en">Mit Search Guard sensible Daten...</h1>` on a `lang="de"` page

**Fix:** Remove the explicit `lang="en"` from H1 tags on German pages, or set it to `lang="de"`. This likely originates from the `TitleWrapper` or similar component that hardcodes `lang="en"` on headings.

---

#### 4. Three Blog Posts Have Multiple H1 Tags

These blog posts contain more than one `<h1>` in their rendered HTML (likely from Markdown content using `#` headings that render as H1 instead of H2):

- `/blog/why-encryption-at-rest-matters-for-your-business/`
- `/blog/what-are-5-security-themed-youtube-channels-worth-your-time/`
- `/blog/migrating-elasticsearch-indexes-from-version-6-to-8-a-real-world-approach/`

**Fix:** Ensure Contentful Markdown `#` headings render as `<h2>` in the blog post body, since the post title is already `<h1>`.

---



#### 6. All Sitemap Priorities Set to 0.5

Every URL in the sitemap has `<priority>0.5</priority>`. Differentiating priorities would help search engines understand page importance:
- Homepage, product pages: `1.0` or `0.8`
- Blog posts, feature pages: `0.6`
- Pagination, category, author pages: `0.3`
- Legal/utility pages: `0.2`

---

#### 7. Duplicate CSS Framework Loading

Both Materialize CSS (legacy) and Next.js compiled CSS are loaded on every page, increasing CSS payload. This is a known migration artifact.

**Long-term fix:** Gradually replace Materialize CSS usage with modern CSS and remove the legacy framework.

---

#### 8. High JavaScript File Count

Every page loads 11 script files (Next.js chunks + legacy scripts). While all use `defer`, the HTTP request count could be reduced.

**Optimization:** Consider combining legacy scripts or evaluating if `materialize.min.js` is needed on every page.

---

#### 9. `/error/` Page Missing H1 Tag

The `/error/` page uses `<div class="error-warning">An error occured</div>` instead of an `<h1>` tag. Also note the typo "occured" (should be "occurred").

**Fix:** Replace the `<div>` with `<h1>` and fix the typo.

---

#### 10. Newsletter H5 Feedback Elements

The newsletter signup section in the global page footer uses `<h5>` for feedback messages ("Thank you for signing up to our newsletter!" and "Processing"). These appear on virtually every page and should be non-heading elements like `<p>` or `<div>`.

---

#### 11. JSON-LD `@context` Uses `http://schema.org`

All JSON-LD blocks use `"@context": "http://schema.org"` instead of `"https://schema.org"`. While still supported, `https://schema.org` is the current recommendation.

---

#### 12. Blog Post Descriptions Exceeding 160 Characters

Approximately 20+ blog posts have meta descriptions exceeding the 160-character recommended limit for search result display. These descriptions come from Contentful CMS content.

**Fix:** Review and trim long descriptions in Contentful, or truncate programmatically at build time.

---

## What's Working Well

- **Canonical tags:** Present on all 272 pages with correct HTTPS URLs, consistent trailing slashes
- **og:image:** Present on all 229 content pages (100% coverage for non-redirect pages)
- **OG/Twitter metadata:** OG title, description, and Twitter Card tags all present and matching page-specific metadata on all content pages
- **Blog post metadata:** All 155 blog posts have unique titles, descriptions, Article JSON-LD schema with datePublished/dateModified, author info, and OG images
- **Author pages:** Unique titles, descriptions, ProfilePage structured data, and OG images
- **Blog pagination:** Unique titles/descriptions per page, correct `rel="next"`/`rel="prev"`, self-referencing canonicals
- **Blog categories:** 12 category pages with unique, category-specific titles and descriptions
- **Redirect handling:** 44 legacy URL redirects properly implemented with `noindex`, canonical tags, and meta-refresh
- **Blog page 1 canonicalization:** `/blog/page/1/` correctly redirects to `/blog/` with noindex
- **Sitemap:** All 221 URLs present with `<lastmod>` timestamps, no orphaned entries
- **Language handling:** German pages use `lang="de"`, hreflang tags connect language-paired pages
- **Font preloading:** Correct `type` attributes matching actual font formats
- **Structured data:** Organization (all pages), WebSite with SearchAction (homepage), SoftwareApplication (security page), Article (blog posts), ProfilePage (author pages) — all valid JSON
- **Image alt tags:** Excellent coverage across the site
- **Typo/legacy slug redirects:** Properly handled (e.g., "permssions" → "permissions", "captin" → "captain")
- **404 page:** Has `noindex, nofollow` directive
- **`/resource/` page:** Exists and resolves correctly
