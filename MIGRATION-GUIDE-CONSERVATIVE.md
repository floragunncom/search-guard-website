# Search Guard Website - Conservative Migration Guide

## Executive Summary

This document outlines a conservative migration strategy that modernizes the Search Guard website's technology stack while **preserving the existing project structure** and development workflow. This approach minimizes risk and development time compared to a full Next.js migration.

**Current State:**
- Node.js: 14.x (EOL April 2023)
- React: 16.8.4 (released March 2019)
- Build Tool: Create React App (react-scripts 2.1.8) - **effectively unmaintained**
- SSG Solution: react-snap 1.23.0 - **unmaintained since 2019**

**Target State:**
- Node.js: 20.x LTS (maintained until April 2026)
- React: 18.3.x (latest stable)
- Build Tool: **Vite 6.x** (modern, fast, actively maintained)
- SSG Solution: **vite-plugin-ssr** or **vite-ssg** (actively maintained)

**Migration Complexity:** Medium
**Estimated Effort:** 16-24 hours
**Risk Level:** Low (incremental approach, similar structure)

---

## Table of Contents

1. [Why This Approach](#1-why-this-approach)
2. [Migration Options Comparison](#2-migration-options-comparison)
3. [Recommended Path: Vite + vite-ssg](#3-recommended-path-vite--vite-ssg)
4. [Step-by-Step Migration Guide](#4-step-by-step-migration-guide)
5. [Alternative: Stay with CRA + Prerender Service](#5-alternative-stay-with-cra--prerender-service)
6. [Dependency Updates](#6-dependency-updates)
7. [Testing and Validation](#7-testing-and-validation)
8. [Rollback Plan](#8-rollback-plan)

---

## 1. Why This Approach

### Problems with Current Setup

**Create React App (react-scripts):**
- Last meaningful update: 2021
- React team no longer recommends it
- Slow build times
- No longer actively maintained
- Difficult to customize without ejecting

**react-snap:**
- Last update: 2019 (7 years ago)
- Uses outdated Puppeteer
- Flaky, unreliable builds
- No support for React 18+
- Known bugs with no fixes

### Why NOT Full Next.js Migration?

While Next.js is excellent, it requires:
- Complete routing paradigm shift (React Router → file-based)
- Different data fetching patterns
- Learning curve for team
- Larger refactoring effort (40-60 hours)
- Different deployment model

### Why Vite?

**Vite is the modern replacement for Create React App:**
- ✅ Official React team recommendation
- ✅ 10-100x faster than CRA in development
- ✅ Hot Module Replacement (HMR) that actually works
- ✅ Simple migration from CRA
- ✅ Keeps React Router and existing structure
- ✅ Actively maintained by Evan You (Vue.js creator)
- ✅ Excellent SSG plugin ecosystem
- ✅ Better bundle optimization than CRA
- ✅ Native ESM support

---

## 2. Migration Options Comparison

| Approach | Pros | Cons | Effort | Recommendation |
|----------|------|------|--------|----------------|
| **Option 1: Vite + vite-ssg** | Modern, fast, SSG built-in, minimal changes | Requires build config migration | 16-24h | ⭐ **Recommended** |
| **Option 2: Vite + vike (vite-plugin-ssr)** | More powerful SSR/SSG, flexible | More complex, steeper learning curve | 24-32h | Good for future growth |
| **Option 3: CRA + Prerender.io** | Zero code changes | Costs $30-200/month, external dependency | 4-8h | Quick fix, not long-term |
| **Option 4: CRA + Custom Puppeteer** | Free, full control | Maintenance burden, recreating react-snap | 12-16h | Not recommended |
| **Option 5: Stay on CRA + react-snap** | No effort | Security risks, compatibility issues | 0h | ❌ Not recommended |

**Winner: Option 1 - Migrate to Vite + vite-ssg**

---

## 3. Recommended Path: Vite + vite-ssg

### What is vite-ssg?

**vite-ssg** is a Static Site Generation plugin for Vite that:
- Pre-renders your React Router application at build time
- Generates static HTML files for all routes
- Supports dynamic routes (like `/blog/:slug`)
- Generates sitemap automatically
- Works seamlessly with React 18
- Actively maintained (updated regularly)
- Zero runtime overhead

### How It Works

```
Development: npm run dev
  → Vite dev server with instant HMR

Build: npm run build
  → vite-ssg crawls your routes
  → Generates static HTML for each route
  → Outputs to dist/ folder
  → Creates sitemap.xml

Deploy: Serve static files from dist/
```

### Project Structure (Nearly Identical to Current)

```
search-guard-website/
├── public/              # Static assets (same as CRA)
│   └── assets/
├── src/
│   ├── main.jsx         # Entry point (was index.js)
│   ├── Routes.jsx       # React Router setup (minimal changes)
│   ├── components/      # Same as current
│   ├── views/           # Same as current
│   ├── utils/           # Same as current
│   ├── styles/          # Same as current
│   ├── images/          # Same as current
│   └── Api/             # Same as current
├── index.html           # Moved from public/ to root
├── vite.config.js       # New: Vite configuration
└── package.json         # Updated dependencies
```

**Key Difference:** `index.html` moves from `public/` to project root (Vite convention).

---

## 4. Step-by-Step Migration Guide

### Phase 1: Backup and Preparation

**Step 1.1: Create Backup**

```bash
# Create feature branch
git checkout -b feature/vite-migration

# Tag current state
git tag pre-vite-migration
git push origin pre-vite-migration
```

**Step 1.2: Update Node.js**

```bash
# Update .nvmrc
echo "20.18.1" > .nvmrc

# Install and use Node 20
nvm install 20
nvm use 20

# Verify
node --version  # Should show v20.x.x
```

**Step 1.3: Document Current Build**

```bash
# Test current build works
npm run build
npm run postbuild

# Document bundle size
ls -lh build/static/js/
ls -lh build/static/css/

# Take screenshots of key pages
# Run Lighthouse audit
```

---

### Phase 2: Install Vite and Dependencies

**Step 2.1: Install Vite and Plugins**

```bash
# Install Vite and core dependencies
npm install --save-dev vite @vitejs/plugin-react vite-ssg

# Install React 18
npm install react@^18.3.1 react-dom@^18.3.1

# Install updated React Router (v6)
npm install react-router-dom@^6.28.0

# Install Vite SCSS support
npm install --save-dev sass
```

**Step 2.2: Remove CRA Dependencies**

```bash
# Remove react-scripts
npm uninstall react-scripts

# Remove react-snap
npm uninstall react-snap

# Remove react-snapshot (if present)
npm uninstall react-snapshot
```

**Step 2.3: Update package.json Scripts**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite-ssg build",
    "preview": "vite preview",
    "fetch": "node ./src/Api/fetchContentfulPosts.js && node ./src/Api/fetchContentfulEvents.js && node ./src/Api/fetchContentfulWhitepapers.js && node ./src/Api/fetchContentfulVideos.js && node ./src/Api/fetchContentfulPersons.js && node ./src/Api/fetchContentfulPageContents.js",
    "prebuild": "npm run fetch",
    "sitemap": "./scripts/sitemap.js",
    "postbuild": "./scripts/sitemap.js -- --base-url='https://search-guard.com/'",
    "lint": "eslint src -c .eslintrc --ext js,jsx",
    "clean": "rm -rf dist/*"
  }
}
```

---

### Phase 3: Create Vite Configuration

**Step 3.1: Create vite.config.js**

Create a new file at the project root:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@views': resolve(__dirname, 'src/views'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@images': resolve(__dirname, 'src/images'),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/styles/Colors.scss";
          @import "@/styles/Breakpoints.scss";
        `,
      },
    },
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          contentful: ['contentful', '@contentful/rich-text-react-renderer'],
        },
      },
    },
  },

  server: {
    port: 3000,
    open: true,
  },

  preview: {
    port: 5000,
  },
});
```

**Step 3.2: Create vite-ssg Configuration**

Update `vite.config.js` to include SSG configuration:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],

  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    crittersOptions: {
      reduceInlineStyles: false,
    },
    // Define all routes that should be pre-rendered
    includedRoutes: (paths, routes) => {
      // Dynamic routes can be generated here
      return paths.filter((path) => {
        // Exclude preview routes
        return !path.startsWith('/preview');
      });
    },
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@views': resolve(__dirname, 'src/views'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@images': resolve(__dirname, 'src/images'),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/styles/Colors.scss";
          @import "@/styles/Breakpoints.scss";
        `,
      },
    },
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          contentful: ['contentful', '@contentful/rich-text-react-renderer'],
        },
      },
    },
  },

  server: {
    port: 3000,
    open: true,
  },
});
```

---

### Phase 4: Update HTML Entry Point

**Step 4.1: Move and Update index.html**

Move `public/index.html` to the project root and update it:

```bash
mv public/index.html ./index.html
```

**Update index.html:**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/assets/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />

    <!-- All your existing meta tags, analytics, fonts, etc. -->

    <!-- CRITICAL: Vite requires this script tag -->
    <script type="module" src="/src/main.jsx"></script>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"><!--app-html--></div>

    <!-- All your existing scripts (Materialize, analytics, etc.) -->
  </body>
</html>
```

**Key Changes:**
1. Add `<script type="module" src="/src/main.jsx"></script>` in `<head>`
2. Change `<div id="root"></div>` to `<div id="root"><!--app-html--></div>`
3. Update asset paths from `/assets/` to `/assets/` (should work as-is)

---

### Phase 5: Update React Entry Point

**Step 5.1: Rename and Update index.js**

Rename `src/index.js` to `src/main.jsx`:

```bash
mv src/index.js src/main.jsx
```

**Update src/main.jsx for React 18 + vite-ssg:**

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import './index.scss';

// Import any global dependencies
import 'materialize-css/dist/css/materialize.min.css';
import 'font-awesome/css/font-awesome.min.css';

// Vite-ssg exports ViteSSG function for static generation
import { ViteSSG } from 'vite-ssg/single-page';

// For client-side rendering (development)
if (typeof window !== 'undefined') {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </React.StrictMode>
  );
}

// For static site generation (build time)
export const createApp = ViteSSG(
  () => (
    <Routes />
  ),
  {
    // Configure routes for pre-rendering
  }
);
```

**Alternative simpler approach (if vite-ssg single-page mode):**

```javascript
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import './index.scss';

import 'materialize-css/dist/css/materialize.min.css';
import 'font-awesome/css/font-awesome.min.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}
```

Then create `src/main.jsx`:

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ViteSSG } from 'vite-ssg/single-page';
import App from './App';

// Client-side rendering
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// SSG export
export const createApp = ViteSSG(App);
```

---

### Phase 6: Update React Router (v5 → v6)

React Router v6 has breaking changes but is straightforward to migrate.

**Step 6.1: Update Routes.js**

**Before (React Router v5):**

```javascript
import { Switch, Route, Redirect } from 'react-router-dom';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/blog/" component={Blog} />
      <Route exact path="/blog/:slug/" component={BlogPostArticle} />
      <Redirect from="/security-for-elasticsearch/" to="/security/" />
      <Redirect to="/404/" />
    </Switch>
  );
}
```

**After (React Router v6):**

```javascript
import { Routes, Route, Navigate } from 'react-router-dom';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog/" element={<Blog />} />
      <Route path="/blog/:slug/" element={<BlogPostArticle />} />

      {/* Redirects */}
      <Route path="/security-for-elasticsearch/" element={<Navigate to="/security/" replace />} />

      {/* 404 - must be last */}
      <Route path="*" element={<Navigate to="/404/" replace />} />
    </Routes>
  );
}
```

**Key Changes:**
- `Switch` → `Routes`
- `component={Component}` → `element={<Component />}`
- `Redirect` → `Navigate`
- `exact` prop removed (default behavior in v6)
- Rename function to avoid conflict with `Routes` component

**Step 6.2: Update useHistory/useLocation Hooks**

**Before (v5):**

```javascript
import { useHistory, useParams, useLocation } from 'react-router-dom';

const history = useHistory();
history.push('/blog/');
history.replace('/home/');
```

**After (v6):**

```javascript
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const navigate = useNavigate();
navigate('/blog/');
navigate('/home/', { replace: true });
```

**Step 6.3: Update Link Components**

Links mostly stay the same, but some patterns change:

**Before:**
```javascript
<Link to={{ pathname: `/blog/${slug}` }}>Read More</Link>
```

**After:**
```javascript
<Link to={`/blog/${slug}`}>Read More</Link>
```

---

### Phase 7: Configure Static Route Generation

**Step 7.1: Create Route Manifest**

For vite-ssg to pre-render all your pages, you need to tell it about dynamic routes.

Create `src/routes-manifest.js`:

```javascript
import posts from './Api/contentfulPosts.json';
import whitepapers from './Api/contentfulWhitepapers.json';
import persons from './Api/contentfulPersons.json';

/**
 * Generate all static routes for pre-rendering
 */
export function getStaticRoutes() {
  const routes = [
    // Static routes
    '/',
    '/blog/',
    '/whitepapers/',
    '/security/',
    '/compliance/',
    '/company/',
    '/licensing/',
    '/faq/',
    '/contacts/',
    '/newsletter/',
    '/sitemap/',
    '/thanks/',
    '/search-guard-flx/',
    '/authors/',
    '/404/',
    // Add all your static routes here
  ];

  // Dynamic blog post routes
  posts.forEach((post) => {
    routes.push(`/blog/${post.fields.slug}/`);
  });

  // Dynamic whitepaper routes
  whitepapers.forEach((whitepaper) => {
    routes.push(`/whitepapers/${whitepaper.fields.slug}/`);
  });

  // Dynamic author routes
  persons.forEach((person) => {
    routes.push(`/author/${person.fields.slug}/`);
  });

  // Blog pagination routes
  const postsPerPage = 10;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    routes.push(`/blog/page/${i}/`);
  }

  // Blog category routes
  const categories = [...new Set(posts.map(p => p.fields.category).filter(Boolean))];
  categories.forEach(category => {
    routes.push(`/blog/category/${category}/`);
  });

  return routes;
}
```

**Step 7.2: Update vite.config.js to Use Routes**

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { getStaticRoutes } from './src/routes-manifest.js';

export default defineConfig({
  plugins: [react()],

  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    includedRoutes: () => {
      return getStaticRoutes();
    },
    onFinished() {
      console.log('✅ Static site generation complete!');
    },
  },

  // ... rest of config
});
```

---

### Phase 8: Handle Environment Variables

Vite uses a different environment variable system than CRA.

**Step 8.1: Create .env Files**

Vite only loads variables prefixed with `VITE_`.

**.env:**
```bash
# These are NOT exposed to client
CONTENTFUL_SPACE_ID=95di84mqkkro
CONTENTFUL_ACCESS_TOKEN=your_token

# These ARE exposed to client (VITE_ prefix)
VITE_ALGOLIA_APP_ID=your_app_id
VITE_ALGOLIA_SEARCH_KEY=your_key
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Step 8.2: Update Code to Use Vite Env Variables**

**Before (CRA):**
```javascript
const apiKey = process.env.REACT_APP_ALGOLIA_KEY;
```

**After (Vite):**
```javascript
const apiKey = import.meta.env.VITE_ALGOLIA_KEY;
```

**For build-time scripts (Node.js):**

Your `fetchContentful*.js` scripts run in Node, not browser, so they can use regular environment variables:

```javascript
// src/Api/fetchContentfulPosts.js
import dotenv from 'dotenv';
dotenv.config();

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});
```

---

### Phase 9: Update Import Paths (Optional)

Vite supports path aliases configured in `vite.config.js`.

**Before:**
```javascript
import Button from '../../../components/Button/Button';
```

**After (using aliases):**
```javascript
import Button from '@/components/Button/Button';
// or
import Button from '@components/Button/Button';
```

This is optional but recommended for cleaner imports.

---

### Phase 10: Handle Static Assets

**Step 10.1: Public Folder**

Vite's `public/` folder works the same as CRA:
- Files in `public/` are served at root
- Reference with absolute paths: `/assets/logo.png`

**Step 10.2: Importing Assets in Code**

**Images:**
```javascript
// Before (CRA)
import logo from './images/logo.png';

// After (Vite) - same!
import logo from './images/logo.png';
```

**SVG as Components:**
```javascript
// Install plugin
npm install --save-dev vite-plugin-svgr

// Update vite.config.js
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
  ],
});

// Use in code
import { ReactComponent as Logo } from './logo.svg';
```

---

### Phase 11: Update CSS/SCSS

Vite supports SCSS out of the box (after `npm install sass`).

**No changes needed to your existing SCSS files!**

**CSS Modules work the same:**
```javascript
import styles from './Button.module.scss';

<div className={styles.button}>Click me</div>
```

**Global styles:**
```javascript
// main.jsx
import './index.scss';
import 'materialize-css/dist/css/materialize.min.css';
```

---

### Phase 12: Testing the Migration

**Step 12.1: Start Development Server**

```bash
npm run dev
```

Visit http://localhost:3000 and test:
- [ ] Homepage loads
- [ ] Navigation works
- [ ] All routes accessible
- [ ] Images load
- [ ] Styles apply correctly
- [ ] Forms work
- [ ] Analytics fire (check browser console)

**Step 12.2: Build for Production**

```bash
npm run build
```

This should:
1. Run `npm run fetch` (prebuild)
2. Build with Vite
3. Generate static HTML for all routes
4. Output to `dist/` folder

**Step 12.3: Preview Production Build**

```bash
npm run preview
```

Visit http://localhost:5000 and test thoroughly.

**Step 12.4: Check Generated Files**

```bash
ls -R dist/
```

You should see:
```
dist/
├── index.html
├── blog/
│   ├── post-slug-1/
│   │   └── index.html
│   ├── post-slug-2/
│   │   └── index.html
│   └── page/
│       └── 1/
│           └── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [images]
└── [other routes]
```

---

### Phase 13: Update Deployment

**Step 13.1: Update Heroku/Server Configuration**

If you're serving static files, update your server to serve from `dist/` instead of `build/`.

**Update serve configuration (if using):**

```json
{
  "scripts": {
    "start:prod": "npm run build && serve dist"
  }
}
```

**Update Nginx configuration (if applicable):**

```nginx
root /path/to/dist;
```

**Step 13.2: Update Build Command**

Update your deployment platform's build command:

**Before:**
```
npm run build && npm run postbuild
```

**After:**
```
npm run build && npm run postbuild
```

(Same, but now builds to `dist/` instead of `build/`)

---

## 5. Alternative: Stay with CRA + Prerender Service

If you want to avoid any code changes and just replace react-snap, you can use a prerendering service.

### Option A: Prerender.io

**Commercial service that pre-renders your SPA:**

**How it works:**
1. Deploy your regular CRA build (without react-snap)
2. Configure Prerender.io middleware
3. Their service crawls and caches pre-rendered versions
4. Serves static HTML to bots, JS app to users

**Setup:**

```bash
npm install prerender-node
```

**Add middleware to your server:**

```javascript
// index.js (your redirect server)
const prerender = require('prerender-node');

app.use(prerender.set('prerenderToken', 'YOUR_TOKEN'));
```

**Pricing:**
- Free tier: 250 pages
- Starter: $30/month (1000 pages)
- Business: $200/month (10,000 pages)

**Pros:**
- Zero code changes
- Works immediately
- Handles recrawling automatically

**Cons:**
- Monthly cost
- External dependency
- Still requires Heroku server (not static hosting)

### Option B: Custom Puppeteer Script

Write a custom pre-rendering script to replace react-snap:

```bash
npm install --save-dev puppeteer sitemap
```

**Create `scripts/prerender.js`:**

```javascript
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const routes = [
  '/',
  '/blog/',
  '/security/',
  // ... all your routes
];

async function prerender() {
  const browser = await puppeteer.launch();
  const buildDir = path.join(__dirname, '../build');

  for (const route of routes) {
    const page = await browser.newPage();
    await page.goto(`http://localhost:5000${route}`, {
      waitUntil: 'networkidle0',
    });

    const html = await page.content();

    // Save HTML
    const routePath = route === '/' ? 'index' : route.replace(/\/$/, '');
    const outputPath = path.join(buildDir, routePath, 'index.html');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, html);

    console.log(`✓ Pre-rendered: ${route}`);
  }

  await browser.close();
}

prerender();
```

**Update package.json:**

```json
{
  "scripts": {
    "postbuild": "serve -s build & node scripts/prerender.js && killall node"
  }
}
```

**Pros:**
- Free
- Full control
- No external dependencies

**Cons:**
- You maintain the code
- Slower than commercial solutions
- Essentially recreating react-snap

**Not recommended** - if you're going to write custom tooling, better to migrate to Vite.

---

## 6. Dependency Updates

### Complete Updated package.json

```json
{
  "name": "search-guard",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "engines": {
    "node": "20.x"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite-ssg build",
    "preview": "vite preview",
    "fetch": "node ./src/Api/fetchContentfulPosts.js && node ./src/Api/fetchContentfulEvents.js && node ./src/Api/fetchContentfulWhitepapers.js && node ./src/Api/fetchContentfulVideos.js && node ./src/Api/fetchContentfulPersons.js && node ./src/Api/fetchContentfulPageContents.js",
    "prebuild": "npm run fetch",
    "sitemap": "./scripts/sitemap.js",
    "postbuild": "./scripts/sitemap.js -- --base-url='https://search-guard.com/'",
    "lint": "eslint src -c .eslintrc --ext js,jsx",
    "clean": "rm -rf dist/*"
  },
  "dependencies": {
    "@contentful/rich-text-html-renderer": "^16.8.5",
    "@contentful/rich-text-react-renderer": "^15.22.11",
    "@contentful/rich-text-types": "^16.8.5",
    "contentful": "^10.18.2",
    "country-list": "^2.3.0",
    "font-awesome": "^4.7.0",
    "lunr": "^2.3.9",
    "markdown-to-jsx": "^7.5.0",
    "materialize-css": "^1.0.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-ga4": "^2.1.0",
    "react-headroom": "^3.2.1",
    "react-helmet": "^6.1.0",
    "react-instantsearch": "^7.16.3",
    "react-router-dom": "^6.28.0",
    "react-router-hash-link": "^2.4.3",
    "react-share": "^5.1.2",
    "react-slugify": "^3.0.3",
    "react-svg": "^16.2.0",
    "react-transition-group": "^4.4.5",
    "algoliasearch": "^5.20.0",
    "uuid": "^11.0.5"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "dotenv": "^16.4.7",
    "eslint": "^8.57.1",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-import": "^2.31.0",
    "eslint-plugin-jsx-a11y": "^6.10.2",
    "eslint-plugin-prettier": "^5.2.1",
    "eslint-plugin-react": "^7.37.2",
    "eslint-plugin-react-hooks": "^5.0.0",
    "prettier": "^3.4.2",
    "sass": "^1.83.0",
    "vite": "^6.0.5",
    "vite-plugin-svgr": "^4.3.0",
    "vite-ssg": "^0.23.10"
  }
}
```

### Key Updates

**Major Version Bumps:**
- React: 16.8 → 18.3 (+2 major versions)
- React Router: 5.x → 6.x (+1 major version)
- Contentful: 7.x → 10.x (+3 major versions)
- React GA: 2.x → react-ga4 2.x (new package for GA4)
- UUID: 3.x → 11.x (+8 major versions, fully ESM now)

**Removed:**
- react-scripts
- react-snap
- react-snapshot
- All webpack-related dev dependencies
- babel-loader, css-loader, file-loader, etc.

**Added:**
- vite
- @vitejs/plugin-react
- vite-ssg
- vite-plugin-svgr

---

## 7. Testing and Validation

### Pre-Migration Testing

```bash
# Current build
npm run build
npm run postbuild

# Check bundle sizes
du -sh build/
ls -lh build/static/js/*.js
ls -lh build/static/css/*.css

# Lighthouse audit
lighthouse https://search-guard.com --view --output html --output-path ./lighthouse-before.html
```

### Post-Migration Testing

```bash
# New build
npm run build

# Check bundle sizes (should be smaller)
du -sh dist/
ls -lh dist/assets/*.js
ls -lh dist/assets/*.css

# Lighthouse audit
lighthouse http://localhost:5000 --view --output html --output-path ./lighthouse-after.html
```

### Comparison Checklist

- [ ] **Bundle size:** Should be 30-50% smaller with Vite
- [ ] **Build time:** Should be 2-5x faster
- [ ] **Dev server start:** Should be 10-100x faster
- [ ] **HMR speed:** Should be instant
- [ ] **Lighthouse Performance:** Should be equal or better
- [ ] **All routes work:** Test every route manually
- [ ] **SEO meta tags:** Verify with View Source on all pages
- [ ] **Analytics:** Check Google Analytics real-time
- [ ] **Forms:** Test all form submissions
- [ ] **Search:** Test Algolia integration

---

## 8. Rollback Plan

### Git Rollback

```bash
# If migration fails, rollback to tag
git checkout pre-vite-migration

# Or reset to specific commit
git reset --hard <commit-hash>

# Force push if needed (be careful!)
git push origin feature/vite-migration --force
```

### Deployment Rollback

**Option 1: Keep old build folder**

```bash
# Before migration
mv build build-backup

# After migration, if issues
rm -rf dist
mv build-backup build
```

**Option 2: Blue-Green Deployment**

Deploy new version to staging URL first:
- Test thoroughly
- Switch DNS/CDN to new version
- Keep old version running for 7 days

---

## 9. Migration Timeline

### Week 1: Preparation
- **Day 1-2:** Node.js upgrade, backup creation
- **Day 3-4:** Install Vite dependencies, configuration
- **Day 5:** Update HTML and entry points

### Week 2: Migration
- **Day 1-2:** React Router v6 migration
- **Day 3:** Environment variables, static routes
- **Day 4-5:** Testing, bug fixes

### Week 3: Validation
- **Day 1-3:** QA testing, performance testing
- **Day 4:** Staging deployment
- **Day 5:** Production deployment

**Total: 15 working days**

---

## 10. Expected Improvements

### Performance Gains

**Development:**
- Dev server start: 10-15 seconds → <1 second (10-15x faster)
- Hot reload: 2-5 seconds → 50-200ms (10-100x faster)
- Build time: 2-3 minutes → 30-60 seconds (2-4x faster)

**Production:**
- Bundle size: ~800KB → ~400-500KB (30-40% smaller)
- First Contentful Paint: Same or better
- Time to Interactive: Same or better
- Better code splitting out of the box

### Developer Experience

- ✅ Modern, actively maintained tools
- ✅ Faster development workflow
- ✅ Better error messages
- ✅ Native ESM support
- ✅ Automatic dependency pre-bundling
- ✅ Built-in TypeScript support (if you want to add it later)

### Maintenance

- ✅ All dependencies supported and updated
- ✅ Security vulnerabilities resolved
- ✅ Future-proof technology stack
- ✅ Active community and ecosystem

---

## 11. Troubleshooting Common Issues

### Issue: "require is not defined"

**Cause:** Vite uses ES modules, not CommonJS.

**Solution:**

```javascript
// Before
const contentful = require('contentful');

// After
import contentful from 'contentful';
```

For Node.js scripts, add `"type": "module"` to package.json or use `.mjs` extension.

### Issue: "global is not defined"

**Cause:** Some libraries expect Node.js globals.

**Solution:** Add to `vite.config.js`:

```javascript
export default defineConfig({
  define: {
    global: 'globalThis',
  },
});
```

### Issue: CSS not loading in production

**Cause:** Incorrect import order or path.

**Solution:** Ensure CSS imports are in `main.jsx`:

```javascript
import './index.scss';
import 'materialize-css/dist/css/materialize.min.css';
```

### Issue: Routes not pre-rendering

**Cause:** Routes not included in `getStaticRoutes()`.

**Solution:** Add all routes to manifest, check for typos.

### Issue: Environment variables not working

**Cause:** Missing `VITE_` prefix for client-side variables.

**Solution:**

```bash
# Wrong
REACT_APP_API_KEY=123

# Right
VITE_API_KEY=123
```

---

## 12. Conclusion

This conservative migration approach gives you:

✅ **Modern tooling** without architectural changes
✅ **Maintained dependencies** for long-term stability
✅ **Better performance** in development and production
✅ **Lower risk** than full framework migration
✅ **Faster execution** (16-24 hours vs 40-60 hours)
✅ **Familiar workflow** for the development team

**Next Steps:**

1. Review this guide with your team
2. Create feature branch and backup
3. Follow Phase 1-13 step by step
4. Test thoroughly before production deployment
5. Monitor metrics after deployment

**Questions?** This migration is straightforward - Vite has excellent documentation and active community support.

---

**Document Version:** 1.0
**Last Updated:** 2026-01-08
**Author:** Migration Planning Team
