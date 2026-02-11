# CLAUDE.md — Project Guide for AI Assistants

## Quick Reference

- **Stack**: React 18.3 + Vite 7.3 + React Router v6 + Materialize CSS + SCSS
- **CMS**: Contentful (headless, fetched at build time to local JSON)
- **Search**: Algolia + Lunr fallback
- **SSG**: Custom Puppeteer-based pre-renderer
- **Node**: 20.18.1 (enforced via `.nvmrc`)
- **Package install**: Always use `npm install --legacy-peer-deps`

---

## Commands

```bash
npm run dev              # Vite dev server on localhost:3000 with HMR
npm start                # Alias for dev
npm run fetch            # Pull all content from Contentful → src/Api/*.json
npm run build            # Full production: fetch → vite build → SSG → SEO inject → sitemap
npm run build-local      # Vite build only (no SSG, no fetch) — quick local test
npm run build:ssg        # SSG step only (expects dist/ to exist)
npm run preview          # Serve dist/ on localhost:5000
npm run sitemap          # Generate sitemap.xml
npm run lint             # ESLint (airbnb config)
npm run find-unused-images    # List unreferenced images
npm run delete-unused-images  # Delete unreferenced images
npm run indexBlogPosts   # Index blog posts to Algolia (needs --ALGOLIA_APP_ID and --ALGOLIA_API_KEY)
```

---

## Project Layout

```
src/
├── Api/                     # Contentful fetchers + cached JSON
│   ├── fetchContentfulPosts.js
│   ├── fetchContentfulPersons.js
│   ├── fetchContentfulWhitepapers.js
│   ├── fetchContentfulVideos.js
│   ├── fetchContentfulEvents.js
│   ├── fetchContentfulPageContents.js
│   ├── indexBlogposts.js    # Algolia indexer
│   ├── contentfulPosts.json       # ~500 blog posts
│   ├── contentfulPersons.json     # Authors
│   ├── contentfulWhitepapers.json
│   ├── contentfulVideos.json
│   └── contentfulEvents.json
├── components/              # Reusable UI components (50+)
├── views/                   # Page-level components (30+), one per route
├── images/                  # SVG/PNG/JPG (~140 files)
├── styles/
│   ├── Colors.scss          # Color variables (auto-injected)
│   └── Breakpoints.scss     # Breakpoint variables (auto-injected)
├── utils/                   # Utility functions
├── downloads/               # Downloadable files
├── Routes.jsx               # All route definitions
├── routes-config.js         # Route list generator for SSG
├── index.jsx                # Entry point (Router + hydrate/render)
└── index.scss               # Global styles

scripts/
├── build-ssg.js             # Orchestrates: vite build → preview server → prerender
├── prerender.js             # Puppeteer SSG (8 concurrent pages)
├── inject-seo-tags.js       # Post-build SEO meta tag injection
├── sitemap.js               # XML sitemap generator
└── find-unused-images.js    # Image cleanup utility

public/assets/               # Fonts, Materialize CSS, third-party JS
index.html                   # Vite entry (has #root div)
index.js                     # Production server (serve-handler + 80+ redirects)
vite.config.mjs              # Vite config
.gitlab-ci.yml               # CI/CD: build → deploy (SFTP) → cache purge (Cloudflare)
```

---

## Coding Patterns

### Creating a New Page (View)

Every page follows this exact pattern:

```jsx
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { initGA, PageView } from '../../components/Tracking/Tracking';
import PageWrapper from '../../components/PageWrapper/PageWrapper.jsx';
import PreFooter from '../../components/PreFooter/PreFooter.jsx';
import './PageName.scss';

const PageName = () => {
  useEffect(() => {
    initGA();
    PageView();
  }, []);

  return (
    <PageWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Page Title | Search Guard</title>
        <link rel="canonical" href="https://search-guard.com/page-slug/" />
        <meta name="description" content="Description for SEO." />
      </Helmet>

      {/* Page content sections */}

      <PreFooter />
    </PageWrapper>
  );
};

export default PageName;
```

**Checklist when adding a page:**
1. Create `src/views/PageName/PageName.jsx` and `PageName.scss`
2. Add route in `src/Routes.jsx`: `<Route path="/page-slug/" element={<PageName />} />`
3. Add path to static routes array in `src/routes-config.js`
4. Optionally add fallback SEO in `scripts/inject-seo-tags.js`
5. Optionally add to Navbar in `src/components/Navbar/Navbar.jsx`

### Creating a Component

```jsx
import React from 'react';
import './ComponentName.scss';

const ComponentName = ({ prop1, prop2 }) => {
  return (
    <div className="component-name-wrapper">
      <div className="row">
        <div className="col s12 m6 l4">
          {/* Content */}
        </div>
      </div>
    </div>
  );
};

export default ComponentName;
```

Components live in `src/components/ComponentName/` with co-located `.scss` file.

### Adding a Route

In `src/Routes.jsx`:
```jsx
// Static page
<Route path="/new-page/" element={<NewPage />} />

// Redirect
<Route path="/old-url/" element={<Navigate to="/new-url/" replace />} />

// Dynamic route
<Route path="/resources/:slug/" element={<ResourcePage />} />

// Catch-all 404 is always last
<Route path="*" element={<Navigate to="/404/" replace />} />
```

### Adding a Dynamic Route for SSG

In `src/routes-config.js`, add to the `getRoutes()` function:
```javascript
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'Api/contentfulData.json'), 'utf8'));
data.forEach((item) => {
  if (item.fields && item.fields.slug) {
    routes.push(`/resource/${item.fields.slug}/`);
  }
});
```

---

## Styling Rules

### SCSS Auto-Injection

All `.scss` files automatically have access to these variables — **no import needed**:

**Colors** (`src/styles/Colors.scss`):
```scss
$primary: #184962;          // Dark blue (brand)
$primary-light: #478EB3;
$primary-dark: #184962;
$secondary: #02F0DD;        // Cyan/turquoise (accent)
$secondary-light: #B0F8F2;
$secondary-dark: #00B7A8;
$white: #FFF;
$black: #000;
$lightGrey: #E8ECED;
$darkGrey: #63737E;
$navyBlue: #246E94;
$darkBlueNav: #133346;
```

**Breakpoints** (`src/styles/Breakpoints.scss`):
```scss
$xxs: 0px;
$xs: 360px;
$m: 500px;
$mobile: 600px;
$tablet: 768px;
$tabletBig: 992px;
$xl: 1200px;
$xxl: 1500px;
```

### Grid System

Uses Materialize 12-column grid:
```jsx
<div className="row">
  <div className="col s12 m6 l4">  {/* full → half → third */}
</div>
```

Prefix meanings: `s` = small/mobile, `m` = medium/tablet, `l` = large/desktop, `xl` = extra large.

### Section Utility Classes

```scss
.color-schema-dark          // Dark background sections
.color-schema-light         // Light background sections
.color-schema-white         // White background sections
.default-padding-top-bottom // Standard section padding (96px desktop, 56px tablet, 42px mobile)
.default-margin-top-bottom  // Standard section margins
```

### Typography

- **Headings**: `font-family: 'Parafina-SemiWideXBold'`
- **Body text**: `font-family: 'Inter-Regular', sans-serif`
- Font files live in `public/assets/fonts/`

---

## Vite Configuration Details

### Path Aliases

Use these instead of long relative paths:

| Alias | Resolves to |
|---|---|
| `@` | `src/` |
| `@components` | `src/components/` |
| `@views` | `src/views/` |
| `@utils` | `src/utils/` |
| `@styles` | `src/styles/` |
| `@images` | `src/images/` |

### Plugins

- `@vitejs/plugin-react-swc` — React + Fast Refresh (SWC compiler), configured with `include: '**/*.{jsx,js}'`
- `vite-plugin-svgr` — import SVGs as React components

### Build Output

- Output directory: `dist/`
- All node_modules → single `vendor` chunk
- Target: `es2015`
- Minifier: `esbuild`
- No sourcemaps in production

---

## App Entry Point

`src/index.jsx` — no separate App.jsx exists:

```jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, hydrate } from 'react-dom';
import Routes from './Routes';

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  hydrate(<Router><Routes /></Router>, rootElement);
} else {
  render(<Router><Routes /></Router>, rootElement);
}
```

Uses hydrate when SSG HTML is present, render for fresh client-side rendering.

### PageWrapper Component

```jsx
const PageWrapper = ({ children, background, landing }) => (
  <>
    <Navbar background={background} landing={landing} />
    {children}
    <Footer landing={landing} />
  </>
);
```

Props:
- `background` — Navbar background color (e.g., `"#184962"`)
- `landing` — boolean, hides nav items and footer links for landing pages

---

## Content Management (Contentful)

### Fetching Content

`npm run fetch` runs all fetchers sequentially. Each fetcher:
1. Connects to Contentful API
2. Queries a content type
3. Writes results to `src/Api/contentful*.json`

### Content Types and Their JSON Files

| Content Type | Fetcher Script | JSON File | Fields |
|---|---|---|---|
| `post` | `fetchContentfulPosts.js` | `contentfulPosts.json` | title, slug, date, author, postContent (markdown), postImage, tags, category, htmlTitle, htmlDescription |
| `person` | `fetchContentfulPersons.js` | `contentfulPersons.json` | name, slug, bio, image |
| `whitepaper` | `fetchContentfulWhitepapers.js` | `contentfulWhitepapers.json` | title, slug, description, file |
| `video` | `fetchContentfulVideos.js` | `contentfulVideos.json` | title, url, description |
| `event` | `fetchContentfulEvents.js` | `contentfulEvents.json` | title, date, location |

### Blog Post Rendering

Blog post Markdown → React via `markdown-to-jsx` with custom overrides:
- `h1-h4` → styled headings with class names
- `code` → `CodeBlock` component
- `img` → lazy-loaded with class `blogpostarticle-image`
- `blockquote` → custom `Blockquote` component

---

## SEO Implementation

### Three Layers

1. **React Helmet Async** — each view sets meta tags at render time
2. **SSG capture** — Puppeteer waits for Helmet, then snapshots full HTML
3. **Post-build injection** (`scripts/inject-seo-tags.js`) — hardcoded fallback meta tags

### Adding SEO for a New Page

In `scripts/inject-seo-tags.js`, add an entry to the pages object:
```javascript
const pageMeta = {
  '/new-page/': {
    title: 'Page Title | Search Guard',
    description: 'Meta description.',
    canonical: 'https://search-guard.com/new-page/',
    ogTitle: 'Page Title | Search Guard',
    ogDescription: 'OG description.',
    ogImage: 'https://search-guard.com/assets/og-image.png',
    ogType: 'website'
  }
};
```

### Structured Data

Blog posts include JSON-LD Article schema. Author pages include Person schema. Some pages include Organization and VideoObject schemas.

---

## Build Pipeline

Full build (`npm run build`) executes in order:

```
1. npm run fetch          → Contentful API → src/Api/*.json
2. vite build             → React SPA → dist/
3. Puppeteer prerender    → Static HTML for all routes → dist/[route]/index.html
4. inject-seo-tags.js     → Ensures meta tags in every HTML file
5. sitemap.js             → Generates dist/sitemap.xml
```

The SSG step (`scripts/build-ssg.js`):
1. Runs `vite build` (creates SPA in dist/)
2. Starts Vite preview server on port 5000
3. Launches Puppeteer with 8 concurrent page renderers
4. Navigates to each route, waits for React Helmet, captures HTML
5. Writes static HTML files
6. Stops preview server

---

## CI/CD (GitLab)

Pipeline runs on `master` branch only.

**Stages:**
1. `build` — Node 20, installs Puppeteer deps, runs full build + Algolia indexing
2. `deploy` — SFTP upload via lftp to `/var/www/search-guard.com/html/`
3. `post_deploy` — Cloudflare cache purge

**CI variables needed:**
- `sftp_user_name`, `sftp_user_private_key_base64`, `sftp_server`
- `ALGOLIA_APP_ID`, `ALGOLIA_API_KEY`
- `SG_CLOUDFLARE_ZONEID`, `SG_CLOUDFLARE_DECACHE_TOKEN`

---

## Linting and Formatting

- **ESLint**: Airbnb config, Prettier integration
- **Prettier**: single quotes, trailing commas
- **Rules**: no prop-types enforcement, max line length 120, jsx in .js/.jsx files
- Run: `npm run lint`

---

## Key Libraries

| Library | Purpose | Import Example |
|---|---|---|
| `react-helmet-async` | SEO meta tags | `import { Helmet } from 'react-helmet-async'` |
| `react-router-dom` | Routing | `import { Route, Routes, Navigate, Link, useParams } from 'react-router-dom'` |
| `markdown-to-jsx` | Blog content rendering | `import Markdown from 'markdown-to-jsx'` |
| `react-svg` | SVG rendering with manipulation | `import { ReactSVG } from 'react-svg'` |
| `react-share` | Social sharing buttons | `import { TwitterShareButton, LinkedinShareButton } from 'react-share'` |
| `react-headroom` | Auto-hiding navbar | `import Headroom from 'react-headroom'` |
| `algoliasearch` | Search client | `import algoliasearch from 'algoliasearch'` |
| `react-instantsearch` | Search UI | `import { InstantSearch, SearchBox, Hits } from 'react-instantsearch'` |
| `materialize-css` | UI framework | Loaded globally from `public/assets/materialize.min.css` |
| `react-ga` | Google Analytics | `import { initGA, PageView } from '../../components/Tracking/Tracking'` |
| `contentful` | CMS SDK | Used only in fetch scripts (`src/Api/fetch*.js`) |

---

## Common Pitfalls

1. **Always use `--legacy-peer-deps`** when installing packages — peer dependency conflicts exist
2. **No App.jsx** — the app root is `src/index.jsx` directly wrapping Routes in Router
3. **SCSS variables are auto-injected** — never manually `@import` or `@use` Colors.scss or Breakpoints.scss in component files; they're already available
4. **Trailing slashes** — all routes end with `/` (e.g., `/security/` not `/security`)
5. **SSG requires all routes registered** — if you add a page, it must be in both `Routes.jsx` and `routes-config.js` or it won't be pre-rendered
6. **Contentful JSON files are gitignored** — run `npm run fetch` after cloning
7. **Materialize JS** — initialized globally via `window.M`, components access it via `useEffect` with a null check
8. **Image imports** — use ES module imports for src/images/; Contentful images are URLs with query params for transformations
9. **Build directory is `dist/`** — the old `build/` directory is no longer used (CRA legacy)
10. **Production server (`index.js`)** — handles redirects for legacy URLs; not used during development
