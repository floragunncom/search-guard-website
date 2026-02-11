# Search Guard Website

Corporate website for [Search Guard](https://search-guard.com/) — the enterprise security suite for Elasticsearch and OpenSearch. Built with React 18, Vite, and a custom static site generation pipeline.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **UI Framework** | React 18.3 |
| **Build Tool** | Vite 7.3 (SWC compiler) |
| **Routing** | React Router v6 |
| **CSS Framework** | Materialize CSS 1.0 + custom SCSS |
| **CMS** | Contentful (headless) |
| **Search** | Algolia (primary), Lunr (client-side fallback) |
| **SEO** | react-helmet-async + custom SSG + meta injection |
| **SSG** | Custom Puppeteer-based pre-renderer |
| **CI/CD** | GitLab CI |
| **CDN** | Cloudflare |
| **Analytics** | Google Analytics, Plausible, Matomo, Koala |
| **Node** | 20.18.1 |

---

## Project Structure

```
search-guard-website/
├── src/
│   ├── Api/                    # Contentful fetchers + cached JSON data
│   ├── components/             # 50+ reusable React components
│   ├── views/                  # 30+ page-level components (one per route)
│   ├── images/                 # SVG/PNG/JPG source images (~140 files)
│   ├── styles/                 # Global SCSS variables (Colors, Breakpoints)
│   ├── utils/                  # Utility functions
│   ├── downloads/              # Downloadable files
│   ├── Routes.jsx              # React Router route definitions
│   ├── routes-config.js        # Route list for SSG pre-rendering
│   ├── App.jsx                 # Root React component
│   └── index.jsx               # Application entry point
├── scripts/
│   ├── build-ssg.js            # Orchestrates the full SSG build
│   ├── prerender.js            # Puppeteer-based static HTML renderer
│   ├── inject-seo-tags.js      # Post-build SEO meta tag injection
│   ├── sitemap.js              # XML sitemap generator
│   └── find-unused-images.js   # Image cleanup utility
├── public/
│   ├── assets/                 # Fonts, Materialize CSS, third-party JS
│   ├── robots.txt              # Crawler directives
│   └── favicon files
├── index.html                  # Vite HTML entry point
├── index.js                    # Production server (serve-handler + redirects)
├── vite.config.mjs             # Vite configuration
├── .gitlab-ci.yml              # CI/CD pipeline
├── .nvmrc                      # Node version (20.18.1)
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js 20.18.1** — use [nvm](https://github.com/nvm-sh/nvm) for version management
- **npm** >= 10.0

### Installation

```bash
# Switch to the correct Node version
nvm use

# Install dependencies
npm install --legacy-peer-deps

# Fetch content from Contentful CMS
npm run fetch

# Start development server
npm run dev
```

The dev server starts at **http://localhost:3000** with hot module replacement (HMR).

---

## Commands

### Development

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server on port 3000 with HMR |
| `npm start` | Alias for `npm run dev` |
| `npm run preview` | Serve the production build locally on port 5000 |

### Content

| Command | Description |
|---|---|
| `npm run fetch` | Fetch all content from Contentful and save as local JSON files |
| `npm run indexBlogPosts -- --ALGOLIA_APP_ID=<id> --ALGOLIA_API_KEY=<key>` | Index blog posts to Algolia search |
| `npm run indexBlogPosts -- --FORCE=true --ALGOLIA_APP_ID=<id> --ALGOLIA_API_KEY=<key>` | Force reindex all posts |

### Building

| Command | Description |
|---|---|
| `npm run build` | Full production build: fetch content → Vite build → SSG pre-render → SEO injection → sitemap generation |
| `npm run build-local` | Vite-only build (no SSG, no content fetch) — useful for quick local testing |
| `npm run build:ssg` | Run only the SSG pre-rendering step |
| `npm run sitemap` | Generate `sitemap.xml` from the `dist/` directory |

### Utilities

| Command | Description |
|---|---|
| `npm run find-unused-images` | Scan the codebase and list images that aren't referenced |
| `npm run delete-unused-images` | Delete unreferenced images (prompts for confirmation) |
| `npm run lint` | Run ESLint |

---

## Architecture

### Build Pipeline

The full production build (`npm run build`) executes these stages in order:

```
1. npm run fetch
   └─ Pulls latest content from Contentful → saves to src/Api/*.json

2. vite build
   └─ Compiles React app → outputs SPA to dist/

3. scripts/prerender.js  (via build-ssg.js)
   ├─ Starts Vite preview server on port 5000
   ├─ Launches headless Chrome via Puppeteer
   ├─ Renders all routes (8 concurrent pages) → captures full HTML
   ├─ Extracts React Helmet <head> content
   └─ Saves static HTML files to dist/

4. scripts/inject-seo-tags.js
   └─ Ensures meta tags (title, description, OG, Twitter) exist in every HTML file

5. scripts/sitemap.js
   └─ Crawls dist/ directory → generates sitemap.xml
```

### Static Site Generation (SSG)

The project uses a custom Puppeteer-based SSG solution (replacing the deprecated `react-snap`). Key design decisions:

- **Parallel rendering** — 8 pages rendered concurrently for speed
- **React Helmet capture** — waits for Helmet to inject meta tags before snapshotting
- **Route discovery** — `src/routes-config.js` generates all routes from static definitions + Contentful JSON data (blog posts, authors, whitepapers)
- **Clean URLs** — every route gets its own `index.html` (e.g., `/blog/my-post/index.html`)

### Routing

Routes are defined in `src/Routes.jsx` using React Router v6. The site has 40+ routes:

- **Static pages** — `/`, `/security/`, `/alerting/`, `/company/`, `/contacts/`, etc.
- **Dynamic pages** — `/blog/:slug/`, `/author/:slug`, `/whitepapers/:slug`
- **Paginated** — `/blog/page/:pageNumber/`
- **Category** — `/blog/category/:slug/`
- **Redirects** — legacy URLs redirect to current paths

Route configuration for SSG lives in `src/routes-config.js`, which dynamically builds the full route list from static definitions and cached Contentful data.

### Component Architecture

Components follow a consistent pattern:

```
src/components/ComponentName/
├── ComponentName.jsx       # React component
└── ComponentName.scss      # Co-located styles
```

**Views** (page-level components) are in `src/views/` and follow a standard structure:

```jsx
import { Helmet } from 'react-helmet-async';
import PageWrapper from '../../components/PageWrapper/PageWrapper.jsx';

const PageName = () => {
  return (
    <PageWrapper background="#184962">
      <Helmet>
        <title>Page Title</title>
        <meta name="description" content="..." />
        <link rel="canonical" href="https://search-guard.com/page/" />
      </Helmet>
      {/* Page sections */}
    </PageWrapper>
  );
};
```

Every page is wrapped in `PageWrapper`, which provides the Navbar and Footer. SEO metadata is set via `react-helmet-async` and captured during SSG.

### Styling

The project uses **Materialize CSS** as a base framework with **custom SCSS** on top.

**Global SCSS variables** are auto-injected into every `.scss` file via Vite config:

- `src/styles/Colors.scss` — brand color palette
- `src/styles/Breakpoints.scss` — responsive breakpoints

**Color palette:**

| Variable | Value | Usage |
|---|---|---|
| `$primary` | `#184962` | Dark blue, brand color |
| `$secondary` | `#02F0DD` | Cyan/turquoise, accent |
| `$primary-light` | `#478EB3` | Light blue |
| `$secondary-light` | `#B0F8F2` | Light cyan |
| `$darkGrey` | `#63737E` | Text secondary |
| `$lightGrey` | `#E8ECED` | Backgrounds |

**Breakpoints:**

| Variable | Value |
|---|---|
| `$mobile` | `600px` |
| `$tablet` | `768px` |
| `$tabletBig` | `992px` |
| `$xl` | `1200px` |
| `$xxl` | `1500px` |

**Typography:**
- **Headings** — Parafina-SemiWideXBold (custom font)
- **Body** — Inter-Regular (sans-serif)

**Utility classes:**

| Class | Purpose |
|---|---|
| `.color-schema-dark` | Dark background sections |
| `.color-schema-light` | Light background sections |
| `.color-schema-white` | White background sections |
| `.default-padding-top-bottom` | Consistent section spacing |
| `.default-margin-top-bottom` | Consistent section margins |

### Vite Configuration

Key settings in `vite.config.mjs`:

**Path aliases** — short imports across the codebase:

| Alias | Path |
|---|---|
| `@` | `src/` |
| `@components` | `src/components/` |
| `@views` | `src/views/` |
| `@utils` | `src/utils/` |
| `@styles` | `src/styles/` |
| `@images` | `src/images/` |

**Plugins:**
- `@vitejs/plugin-react-swc` — React support with SWC for fast compilation
- `vite-plugin-svgr` — import SVGs as React components

**Build settings:**
- Target: ES2015 for broad browser support
- Minification: esbuild
- Vendor chunk: all `node_modules` bundled into a single vendor chunk

### Content Management (Contentful)

Content is managed in [Contentful](https://www.contentful.com/) and fetched at build time.

**Content types:**

| Type | Fetcher | Cached File |
|---|---|---|
| Blog posts | `fetchContentfulPosts.js` | `contentfulPosts.json` |
| Authors | `fetchContentfulPersons.js` | `contentfulPersons.json` |
| Whitepapers | `fetchContentfulWhitepapers.js` | `contentfulWhitepapers.json` |
| Videos | `fetchContentfulVideos.js` | `contentfulVideos.json` |
| Events | `fetchContentfulEvents.js` | `contentfulEvents.json` |
| Page content | `fetchContentfulPageContents.js` | `contentfulPageContents.json` |

**Workflow:**
1. Content editors create/update content in Contentful
2. `npm run fetch` pulls latest data to local JSON files
3. React components read from these JSON files at build time
4. SSG renders pages with the fetched content

**Blog content rendering:**
Blog post bodies are written in Markdown and rendered via `markdown-to-jsx` with custom overrides for headings, code blocks, images, and blockquotes.

### Search (Algolia)

Blog posts are indexed to Algolia for full-text search:

- `src/Api/indexBlogposts.js` — splits posts by H2 sections and indexes to Algolia
- `react-instantsearch` — provides the search UI components
- `lunr` — client-side fallback search

### SEO

SEO is implemented in three layers:

1. **React Helmet** — each view sets `<title>`, `<meta>`, OG tags, Twitter cards, canonical URLs
2. **SSG capture** — Puppeteer waits for Helmet to inject tags, then snapshots the full HTML
3. **Post-build injection** (`scripts/inject-seo-tags.js`) — ensures meta tags exist even if JS hydration fails

Additional SEO features:
- **Structured data** — JSON-LD schemas (Article, Organization, Person, VideoObject) on relevant pages
- **Sitemap** — auto-generated `sitemap.xml`
- **Robots.txt** — allows all crawlers, points to sitemap
- **Canonical URLs** — set on every page

### Image Handling

**Source images** (`src/images/`) are imported as ES modules and processed by Vite (hashing, optimization).

**Contentful images** use URL-based transformations:
```
https://images.ctfassets.net/.../image.jpg?fm=jpg&fl=progressive&w=800&fit=scale
```

**SVGs** can be imported as React components via `vite-plugin-svgr` or rendered with `react-svg`.

**Lazy loading** — images use native `loading="lazy"` and the `lazysizes` library as a fallback.

---

## CI/CD Pipeline

The GitLab CI pipeline (`.gitlab-ci.yml`) runs on pushes to `master`:

### Stages

**1. Build**
- Installs system dependencies for Puppeteer (headless Chrome)
- Runs `npm ci --legacy-peer-deps`
- Executes the full build pipeline (`npm run build`)
- Indexes blog posts to Algolia
- Produces `dist/` as a build artifact

**2. Deploy**
- Uploads `dist/` to the production server via SFTP (`lftp` mirror)
- Parallel upload with 20 connections

**3. Post-deploy**
- Purges the Cloudflare cache via API to ensure fresh content delivery

### Required CI Variables

| Variable | Purpose |
|---|---|
| `sftp_user_name` | SFTP username |
| `sftp_user_private_key_base64` | SSH private key (base64-encoded) |
| `sftp_server` | SFTP server address |
| `ALGOLIA_APP_ID` | Algolia application ID |
| `ALGOLIA_API_KEY` | Algolia admin API key |
| `SG_CLOUDFLARE_ZONEID` | Cloudflare zone ID |
| `SG_CLOUDFLARE_DECACHE_TOKEN` | Cloudflare API token |

---

## Extending the Website

### Adding a New Static Page

1. **Create the view** — add a new component in `src/views/`:

```jsx
// src/views/NewPage/NewPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageWrapper from '../../components/PageWrapper/PageWrapper.jsx';
import './NewPage.scss';

const NewPage = () => {
  return (
    <PageWrapper background="#184962">
      <Helmet>
        <title>New Page | Search Guard</title>
        <meta name="description" content="Page description for SEO." />
        <link rel="canonical" href="https://search-guard.com/new-page/" />
        <meta property="og:title" content="New Page | Search Guard" />
        <meta property="og:url" content="https://search-guard.com/new-page/" />
      </Helmet>

      <section className="default-padding-top-bottom">
        <div className="container">
          {/* Page content */}
        </div>
      </section>
    </PageWrapper>
  );
};

export default NewPage;
```

2. **Add the route** — register it in `src/Routes.jsx`:

```jsx
import NewPage from './views/NewPage/NewPage.jsx';

// Inside the Routes component:
<Route path="/new-page/" element={<NewPage />} />
```

3. **Add to SSG route list** — include the path in `src/routes-config.js` so it gets pre-rendered:

```js
const staticRoutes = [
  // ... existing routes
  '/new-page/',
];
```

4. **Add SEO tags** — add an entry in `scripts/inject-seo-tags.js` if the page needs fallback meta tags beyond what Helmet provides.

5. **Add to navigation** (optional) — update `src/components/Navbar/Navbar.jsx` if the page should appear in the nav.

### Adding a New Reusable Component

1. Create a directory under `src/components/`:

```
src/components/MyComponent/
├── MyComponent.jsx
└── MyComponent.scss
```

2. SCSS files automatically have access to `$primary`, `$secondary`, and all breakpoint variables — no imports needed.

3. Use Materialize's 12-column grid for layout:

```jsx
<div className="row">
  <div className="col s12 m6 l4">
    {/* Content */}
  </div>
</div>
```

### Adding Content from Contentful

1. Create a new content type in the Contentful dashboard.
2. Add a fetcher script in `src/Api/` following the existing pattern (e.g., `fetchContentfulPosts.js`).
3. Register the fetcher in the `fetch` npm script or call it from an existing fetcher.
4. Import the cached JSON in your component:

```jsx
import data from '../../Api/contentfulNewType.json';
```

### Adding a New Dynamic Route

For routes driven by CMS content (like blog posts):

1. Add the route in `src/Routes.jsx`:

```jsx
<Route path="/resources/:slug/" element={<ResourcePage />} />
```

2. Generate the route list dynamically in `src/routes-config.js`:

```js
const resources = require('./src/Api/contentfulResources.json');
const resourceRoutes = resources.map(r => `/resources/${r.fields.slug}/`);
```

3. The SSG pipeline will automatically pre-render all generated routes.

### Adding a New Build Script

Place scripts in the `scripts/` directory. If the script should run as part of the production build, add it to the `build` command chain in `package.json`:

```json
"build": "npm run fetch && node ./scripts/build-ssg.js && node ./scripts/inject-seo-tags.js && node ./scripts/my-new-script.js && npm run sitemap"
```

### Modifying the Navbar or Footer

- **Navbar**: `src/components/Navbar/Navbar.jsx` — includes desktop nav, mobile sidenav, and dropdowns
- **Footer**: `src/components/Footer/Footer.jsx`
- **Pre-footer CTA**: `src/components/PreFooter/PreFooter.jsx`

### Adding Redirects

Server-side redirects are configured in `index.js` using the `redirects` array. Add entries following the existing pattern:

```js
{ source: '/old-path/', destination: '/new-path/' }
```

---

## Performance

Development performance after the Vite migration:

| Metric | Before (CRA) | After (Vite) |
|---|---|---|
| Dev server cold start | 10–15s | < 1s |
| Hot module replacement | 2–5s | 50–200ms |
| Production build | ~3 min | ~1 min |

---

## Deployment

Production deployments happen automatically when commits are pushed to `master` via the GitLab CI pipeline. The pipeline:

1. Builds the static site (with SSG)
2. Uploads to the production server via SFTP
3. Purges the Cloudflare cache

To deploy manually (not recommended):

```bash
npm run build
# Then upload the dist/ directory to the server
```
