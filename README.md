# Search Guard Website

This repository contains the source code for the Search Guard marketing website (floragunn GmbH).

The project has been migrated from an older React/Vite/react-snap style setup to a **Next.js static export** architecture while preserving the existing React Router-based page components and Contentful-driven content flow.

## Project Goals

- Build and deploy as a **fully static site**.
- Keep legacy page/component structure largely intact to reduce migration risk.
- Preserve SEO-critical metadata and structured data in prerendered HTML.
- Generate dynamic route lists from content and route definitions (no fragile hardcoded route list).

## Technology Stack

- **Framework**: Next.js (`output: 'export'`, Pages Router)
- **UI runtime**: React 18
- **Routing inside app**: `react-router-dom@5` (wrapped for server/static render)
- **Meta tags**: `react-helmet-async`
- **Styling/UI**: Materialize CSS + project CSS/Sass
- **Content source**: Contentful (JSON snapshots fetched before build)
- **Search indexing**: Algolia (optional during CI build)

## Runtime and Tooling Requirements

- Node.js: `>=20 <23` (see `package.json` engines)
- npm: current npm matching Node 20/22

## How Routing Works

This project uses a hybrid approach:

1. Next.js owns build/export and file-based pages under `/pages`.
2. A catch-all page (`/pages/[[...slug]].js`) maps static paths to the legacy React Router app.
3. The app itself renders via `src/NextRoutesApp.js`:
   - `StaticRouter` during server/static rendering
   - `BrowserRouter` in the browser

This allows static generation of existing route-driven pages with minimal rewrites.

## Static Generation Strategy

### Route discovery

`/pages/[[...slug]].js` `getStaticPaths()` builds routes dynamically from:

- Route definitions in `src/Routes.js`
- Contentful post slugs
- Contentful author slugs
- Contentful whitepaper slugs
- Derived blog pagination routes (`/blog/page/2/`, ...)
- Derived blog category routes

Excluded: `/404/`, `/500/` (managed separately)

### 404 page

- `/pages/404.js` renders the app at route `/404/` so the exported 404 uses the custom NotFound UI instead of generic Next fallback markup.

### Output

- Next export output is generated in `out/`.
- `out/` is the deployable artifact.

## Contentful Data Flow

Before production build, `npm run fetch` refreshes JSON files under `src/Api/` used by pages/components during static generation.

Fetch step includes posts, events, whitepapers, videos, persons, and page content.

## NPM Scripts

### Main scripts

- `npm start` / `npm run start:dev`: run Next dev server (default `http://localhost:3000`)
- `npm run build`: full production build
  - fetch Contentful data
  - `next build` (static export)
  - generate sitemap
  - generate postbuild redirect fallback pages
- `npm run build-local`: same as build, but skips Contentful fetch
- `npm run preview`: run Next production server (for non-exported runtime checks)

### Build internals

- `npm run next:build`: Next build/export
- `npm run sitemap`: builds `out/sitemap.xml`
- `npm run postbuild:redirects`: writes fallback redirect page(s), including:
  - `/blog/page/1/` -> `/blog/`
  - legacy root blog slugs (for example `/elasticsearch-tls-certificates/` -> `/blog/elasticsearch-tls-certificates/`)
  - explicit legacy/typo routes (for example `/imprint/` -> `/impressum/`)

### Legacy / migration scripts

Vite scripts still exist (`vite:dev`, `vite:build`, `vite:build-local`) but the active production path is the Next build pipeline.

## SEO and Metadata

Implemented/expected behavior:

- Page-level `<title>` and meta description are rendered via `react-helmet-async`.
- Canonical links and social tags are emitted in prerendered HTML.
- JSON-LD structured data is server-rendered into static HTML.
- Sitemap is generated from the static export directory, with deduplication and blacklist support.
- Sitemap excludes known non-canonical alias routes (for example `/security-for-elasticsearch/`, `/elasticsearch-kibana-security/`, `/tls-certificate-generator/`, `/blog/page/1/`).
- Build step creates static fallback redirects to canonical routes for legacy links.

### AI crawler guidance (`llms.txt`)

- The project maintains `/public/llms.txt` and ships it as `/llms.txt` in static output.
- Purpose: provide AI/LLM crawlers with canonical/high-value URL guidance and freshness hints.
- Keep this file aligned with current canonical routes, product pages, docs links, and crawl policy.

## Deployment

The deployable directory is:

- `out/`

Typical static hosting/CDN deployment uploads `out/` as website root.

### Important for real 404 behavior

For unknown URLs to return an actual HTTP 404 status and show the custom page, configure your host/CDN to use `404.html` as the error document.

### Redirect behavior

A static fallback page is generated for `/blog/page/1/` pointing to `/blog/`.

If you use Cloudflare (recommended), keep a proper redirect rule there for canonical 301 handling.

## CI/CD (GitLab)

Pipeline (`.gitlab-ci.yml`) stages:

1. `build_prod`
2. `deploy_to_prod`
3. `flush_cloudflare_cache`

Build stage (`master` branch):

- `npm ci`
- `npm run build`
- hard-gates required artifacts:
  - `out/index.html` must exist
  - `out/sitemap.xml` must exist
  - at least one exported `index.html` page must exist in `out/`
- optional Algolia indexing if `ALGOLIA_APP_ID` and `ALGOLIA_API_KEY` are present

SEO/canonical gating in build job:

- `npm run build` always runs `npm run sitemap` and `npm run postbuild:redirects`.
- This guarantees sitemap generation and canonical fallback redirects are regenerated for every CI build artifact.

Deploy stage:

- uploads `out/` via SFTP mirror

Post-deploy:

- optionally purges Cloudflare cache

## Repository Layout (Key Paths)

- `/pages` - Next pages (`[[...slug]].js`, `_app.js`, `_document.js`, `404.js`)
- `/src/Routes.js` - legacy route definitions
- `/src/views` - page-level React views
- `/src/components` - reusable UI components
- `/src/Api` - Contentful fetchers + JSON data
- `/scripts/sitemap.js` - sitemap generator
- `/scripts/postbuild-redirects.js` - static fallback redirect pages
- `/public/llms.txt` - AI crawler guidance file served at `/llms.txt`
- `/out` - deployment artifact (generated)

## Local Development

1. Install dependencies:
   - `npm ci`
2. Start dev server:
   - `npm start`
3. Open:
   - `http://localhost:3000`

For a full local production-like artifact:

- `npm run build-local`

## Troubleshooting

### `ENOTFOUND registry.npmjs.org`

This indicates DNS/network restrictions in your environment. It is not a project code issue.

### Build appears much faster than before

Expected after migration to Next static export with deterministic route generation and without browser-driven snapshot crawling.

### Missing page in `out`

Check that route is discoverable via:

- `src/Routes.js` (static paths)
- Contentful slug sources (posts/authors/whitepapers)

Then rebuild.

### 404 page not shown in production

Configure hosting/CDN error-page behavior to serve `404.html` for unknown routes.

## Notes

- `out/` is the generated build artifact.
- Project linting currently targets `src/` (`npm run lint`).
- Tests are not yet configured (`npm test` placeholder).

## Release Checklist

Use this checklist before every production release:

1. Ensure dependencies install cleanly:
   - `npm ci`
2. Build a fresh production artifact:
   - `npm run build`
3. Verify required output exists:
   - `out/index.html`
   - `out/sitemap.xml`
   - `out/404.html`
4. Spot-check key routes in `out/`:
   - `/`
   - `/security/`
   - `/alerting/`
   - `/blog/`
   - at least one blog post page
5. Confirm metadata on representative pages:
   - `<title>`
   - `meta[name=\"description\"]`
   - canonical link
   - OG/Twitter tags
6. Confirm JSON-LD appears in prerendered HTML for pages that define it.
7. Validate sitemap quality:
   - no duplicate URLs
   - no blacklisted/internal-only URLs
   - no non-canonical alias URLs (`/security-for-elasticsearch/`, `/elasticsearch-kibana-security/`, `/tls-certificate-generator/`, `/blog/page/1/`)
   - expected canonical URL format (trailing slash)
8. Validate redirect/canonical behavior:
   - `/blog/page/1/` redirects (or fallback page present) to `/blog/`
   - legacy redirect pages generated by `postbuild:redirects` are present for known typo/alias paths
   - Cloudflare redirect rule for canonicalization is active
9. Validate 404 behavior in hosting/CDN:
   - unknown URL serves custom 404 page
   - unknown URL returns HTTP 404 status (host/CDN error-page config)
10. Verify CI/CD environment variables are present where needed:
   - deployment credentials
   - Cloudflare purge token (if cache purge is enabled)
   - Algolia credentials (only if indexing should run)
11. After deploy:
   - smoke-test top pages in production
   - verify sitemap is reachable at `/sitemap.xml`
   - verify AI guidance file is reachable at `/llms.txt`
   - verify Cloudflare cache purge completed (if enabled)
