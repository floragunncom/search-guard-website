# Search Guard Website Migration Guide

## Executive Summary

This document outlines the migration strategy for updating the Search Guard website from an outdated Create React App setup to a modern Next.js application with current versions of Node.js and React.

**Current State:**
- Node.js: 14.x (EOL April 2023)
- React: 16.8.4 (released March 2019)
- Build Tool: Create React App with react-scripts 2.1.8
- SSG Solution: react-snap (unmaintained, last update 2019)

**Target State:**
- Node.js: 20.x LTS (maintained until April 2026)
- React: 18.3.x (latest stable)
- Framework: Next.js 15.x (latest stable)
- Build Tool: Next.js built-in (Turbopack/Webpack)

**Migration Complexity:** High
**Estimated Effort:** 40-60 hours
**Risk Level:** Medium (requires careful testing of all routes and functionality)

---

## Table of Contents

1. [Pre-Migration Assessment](#1-pre-migration-assessment)
2. [Environment Setup](#2-environment-setup)
3. [Dependency Migration Strategy](#3-dependency-migration-strategy)
4. [Project Structure Transformation](#4-project-structure-transformation)
5. [Routing Migration](#5-routing-migration)
6. [Component Migration](#6-component-migration)
7. [Data Fetching Migration](#7-data-fetching-migration)
8. [Styling Migration](#8-styling-migration)
9. [Build and Deployment](#9-build-and-deployment)
10. [Testing and Validation](#10-testing-and-validation)
11. [Rollback Plan](#11-rollback-plan)
12. [Appendix](#appendix)

---

## 1. Pre-Migration Assessment

### Current Architecture Overview

The Search Guard website is a content-heavy marketing site with:
- **133 JavaScript/JSX files**
- **77 reusable components**
- **25+ page views**
- **44 routes** (static and dynamic)
- **Contentful CMS integration** for blog posts, whitepapers, authors
- **Algolia search integration**
- **Multiple analytics providers** (GTM, Plausible, Matomo)
- **85+ legacy URL redirects**

### Key Dependencies

```json
{
  "react": "^16.8.4",
  "react-dom": "^16.8.4",
  "react-router-dom": "^5.1.2",
  "react-scripts": "2.1.8",
  "react-snap": "^1.23.0",
  "contentful": "^7.5.0",
  "materialize-css": "^1.0.0",
  "react-helmet": "^5.2.1"
}
```

### Critical Features to Preserve

1. **SEO Optimization:** Meta tags, canonical URLs, Open Graph
2. **Static Site Generation:** Pre-rendered HTML for fast loading
3. **Content Management:** Contentful integration
4. **Search Functionality:** Algolia integration
5. **Analytics Tracking:** Multiple providers
6. **URL Redirects:** 85+ legacy redirects
7. **Responsive Design:** Mobile-first approach
8. **Performance:** Lazy loading, code splitting

### Breaking Changes to Expect

1. **React 16 → 18:**
   - ReactDOM.render() → createRoot()
   - New automatic batching behavior
   - Stricter effects in development mode
   - New concurrent features (optional)

2. **React Router → Next.js Router:**
   - Different routing paradigm (file-based)
   - Different Link component API
   - Different navigation methods
   - No BrowserRouter wrapper needed

3. **react-helmet → next/head:**
   - Different API for meta tags
   - Server-side rendering by default

4. **Build Process:**
   - No more react-scripts
   - Different build output structure
   - Different deployment requirements

---

## 2. Environment Setup

### Phase 1: Node.js Upgrade

**Action Items:**

1. **Update Node Version**
   ```bash
   # Update .nvmrc
   echo "20.18.1" > .nvmrc

   # Install and use Node 20
   nvm install 20
   nvm use 20
   ```

2. **Update package.json engines**
   ```json
   {
     "engines": {
       "node": "20.x",
       "npm": ">=10.0.0"
     }
   }
   ```

3. **Test Compatibility**
   ```bash
   node --version  # Should show v20.x.x
   npm --version   # Should show 10.x.x
   ```

### Phase 2: Create Next.js Project Structure

**Option A: Parallel Development (Recommended)**

Create a new Next.js project alongside the existing code:

```bash
# Create new directory for Next.js app
mkdir search-guard-nextjs
cd search-guard-nextjs

# Initialize Next.js with TypeScript (optional)
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"

# Or without TypeScript
npx create-next-app@latest . --no-typescript --no-tailwind --app --src-dir --import-alias "@/*"
```

**Option B: In-Place Migration (Higher Risk)**

Gradually convert the existing CRA project:

```bash
# Create feature branch
git checkout -b feature/nextjs-migration

# Install Next.js
npm install next@latest react@latest react-dom@latest
```

**Recommendation:** Use Option A for safer, parallel development with easy rollback.

---

## 3. Dependency Migration Strategy

### Core Dependencies Migration

| Current Package | Version | New Package | Version | Notes |
|----------------|---------|-------------|---------|-------|
| react | 16.8.4 | react | 18.3.1 | Major version upgrade |
| react-dom | 16.8.4 | react-dom | 18.3.1 | Major version upgrade |
| react-scripts | 2.1.8 | *(remove)* | - | Replaced by Next.js |
| react-snap | 1.23.0 | *(remove)* | - | Built into Next.js |
| react-router-dom | 5.1.2 | *(remove)* | - | Use Next.js router |
| react-helmet | 5.2.1 | *(remove)* | - | Use next/head |
| - | - | next | 15.1.0 | New framework |

### Content and Utilities

| Current Package | Version | New Package | Version | Action |
|----------------|---------|-------------|---------|--------|
| contentful | 7.5.0 | contentful | 10.x | Upgrade |
| @contentful/rich-text-react-renderer | 13.2.0 | @contentful/rich-text-react-renderer | 15.x | Upgrade |
| materialize-css | 1.0.0 | materialize-css | 1.0.0 | Keep (or migrate to Tailwind) |
| react-ga | 2.7.0 | react-ga4 | 2.x | Upgrade to GA4 |
| algoliasearch | 5.20.0 | algoliasearch | 5.x | Keep/Update |
| react-share | 3.0.1 | react-share | 5.x | Upgrade |
| lunr | 2.3.6 | lunr | 2.3.9 | Minor update |

### Styling Dependencies

| Current | Action |
|---------|--------|
| node-sass | Already using sass@1.53.0 (aliased), compatible with Next.js |
| materialize-css | Keep or consider migration to Tailwind/MUI |
| CSS Modules | Fully supported in Next.js |

### Development Tools

```json
{
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@types/node": "^20.0.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^15.1.0",
    "typescript": "^5.3.0"
  }
}
```

### Migration Commands

```bash
# Step 1: Remove old dependencies
npm uninstall react-scripts react-snap react-router-dom react-router-hash-link react-helmet

# Step 2: Update React
npm install react@latest react-dom@latest

# Step 3: Install Next.js
npm install next@latest

# Step 4: Install updated utilities
npm install contentful@latest @contentful/rich-text-react-renderer@latest

# Step 5: Install Next.js-specific tools
npm install sharp  # Required for next/image optimization

# Step 6: Update analytics
npm install react-ga4@latest

# Step 7: Install development tools
npm install --save-dev eslint-config-next@latest

# Step 8: Verify installation
npm list react react-dom next
```

---

## 4. Project Structure Transformation

### Current CRA Structure

```
search-guard-website/
├── public/
│   ├── index.html
│   └── assets/
├── src/
│   ├── index.js
│   ├── Routes.js
│   ├── components/
│   ├── views/
│   ├── utils/
│   ├── styles/
│   ├── images/
│   └── Api/
├── config/
│   └── webpack-*.js
├── scripts/
└── package.json
```

### Target Next.js Structure (App Router)

```
search-guard-nextjs/
├── public/
│   └── assets/           # Static files (fonts, images)
├── src/
│   ├── app/
│   │   ├── layout.tsx    # Root layout (replaces index.html)
│   │   ├── page.tsx      # Homepage
│   │   ├── blog/
│   │   │   ├── page.tsx             # Blog index
│   │   │   ├── [slug]/page.tsx      # Blog post
│   │   │   └── category/[slug]/page.tsx
│   │   ├── author/[slug]/page.tsx
│   │   ├── whitepapers/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── security/page.tsx
│   │   ├── compliance/page.tsx
│   │   ├── company/page.tsx
│   │   └── api/           # API routes (for redirects, webhooks)
│   ├── components/         # Reusable components (migrated as-is)
│   ├── lib/
│   │   ├── contentful.ts   # Contentful client
│   │   ├── algolia.ts      # Algolia integration
│   │   └── utils.ts        # Utility functions
│   ├── styles/
│   │   └── globals.scss    # Global styles
│   └── types/              # TypeScript types (if using TS)
├── .env.local              # Environment variables
├── next.config.js          # Next.js configuration
└── package.json
```

### Alternative: Pages Router Structure (Simpler Migration)

If App Router feels too different, use Pages Router:

```
src/
├── pages/
│   ├── _app.tsx          # Custom App component
│   ├── _document.tsx     # Custom Document
│   ├── index.tsx         # Homepage
│   ├── blog/
│   │   ├── index.tsx
│   │   ├── [slug].tsx
│   │   └── category/[slug].tsx
│   └── api/              # API routes
├── components/
├── lib/
└── styles/
```

**Recommendation:** Use **App Router** for new projects (better performance, server components), but **Pages Router** may be easier for migration from CRA.

---

## 5. Routing Migration

### Current React Router Setup

**src/Routes.js:**
```javascript
import { Switch, Route, Redirect } from 'react-router-dom';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/blog/" component={Blog} />
      <Route exact path="/blog/:slug/" component={BlogPostArticle} />
      <Route exact path="/author/:slug/" component={Author} />
      <Redirect from="/security-for-elasticsearch/" to="/security/" />
      <Redirect to="/404/" />
    </Switch>
  );
}
```

### Next.js Routing (App Router)

**File-based routing automatically creates routes:**

| Current Route | Next.js File Path | Type |
|--------------|------------------|------|
| `/` | `app/page.tsx` | Static |
| `/blog/` | `app/blog/page.tsx` | Static |
| `/blog/:slug/` | `app/blog/[slug]/page.tsx` | Dynamic |
| `/blog/page/:pageNumber/` | `app/blog/page/[pageNumber]/page.tsx` | Dynamic |
| `/blog/category/:slug/` | `app/blog/category/[slug]/page.tsx` | Dynamic |
| `/author/:slug/` | `app/author/[slug]/page.tsx` | Dynamic |
| `/whitepapers/` | `app/whitepapers/page.tsx` | Static |
| `/whitepapers/:slug/` | `app/whitepapers/[slug]/page.tsx` | Dynamic |
| `/security/` | `app/security/page.tsx` | Static |
| `/compliance/` | `app/compliance/page.tsx` | Static |

### Redirects Migration

**Create next.config.js:**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/security-for-elasticsearch/',
        destination: '/security/',
        permanent: true,
      },
      {
        source: '/elasticsearch-kibana-security/',
        destination: '/security/',
        permanent: true,
      },
      {
        source: '/white-papers/:path*',
        destination: '/whitepapers/:path*',
        permanent: true,
      },
      {
        source: '/product/:path*',
        destination: '/security/:path*',
        permanent: true,
      },
      // Add all 85+ redirects from index.js here
    ];
  },
};

module.exports = nextConfig;
```

### Link Migration

**Before (React Router):**
```javascript
import { Link } from 'react-router-dom';

<Link to="/blog/my-post/">Read More</Link>
```

**After (Next.js):**
```javascript
import Link from 'next/link';

<Link href="/blog/my-post/">Read More</Link>
```

### Navigation Migration

**Before:**
```javascript
import { useHistory } from 'react-router-dom';

const history = useHistory();
history.push('/blog/');
```

**After:**
```javascript
import { useRouter } from 'next/navigation';

const router = useRouter();
router.push('/blog/');
```

### Dynamic Route Example

**app/blog/[slug]/page.tsx:**
```typescript
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/contentful';

interface Props {
  params: { slug: string };
}

// Generate static pages at build time
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.fields.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  if (!post) return {};

  return {
    title: post.fields.title,
    description: post.fields.excerpt,
    openGraph: {
      title: post.fields.title,
      description: post.fields.excerpt,
      images: [post.fields.coverImage?.fields.file.url],
    },
  };
}

// Page component
export default async function BlogPost({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <h1>{post.fields.title}</h1>
      <div>{post.fields.body}</div>
    </article>
  );
}
```

---

## 6. Component Migration

### Component Categories

**77 components organized by complexity:**

1. **Zero-change components (50+):** Pure presentational, no routing/lifecycle
2. **Minor updates (15-20):** Replace Link/Helmet imports
3. **Major refactoring (5-10):** Use Next.js features (Image, Head)

### Migration Checklist per Component

- [ ] Replace `react-router-dom` imports with `next/link` and `next/navigation`
- [ ] Replace `react-helmet` with Next.js metadata API
- [ ] Replace `<img>` tags with `next/image` for optimization
- [ ] Update any client-side-only code with `'use client'` directive
- [ ] Replace relative imports with aliased imports (`@/components/...`)
- [ ] Update CSS imports (should work as-is with Next.js)
- [ ] Test component in isolation

### Example: Button Component (Zero Change)

**Current: src/components/Button/Button.js**
```javascript
import React from 'react';
import './Button.scss';

export default function Button({ children, onClick, variant = 'primary' }) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}
```

**After: src/components/Button/Button.tsx (No Changes Required)**
```typescript
import React from 'react';
import './Button.scss';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export default function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}
```

### Example: Navbar Component (Minor Updates)

**Before:**
```javascript
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/blog/">Blog</Link>
    </nav>
  );
}
```

**After:**
```javascript
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/blog/">Blog</Link>
    </nav>
  );
}
```

### Example: BlogPost Component (Major Refactoring)

**Before:**
```javascript
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import posts from '../../Api/contentfulPosts.json';

export default function BlogPostArticle() {
  const { slug } = useParams();
  const post = posts.find(p => p.fields.slug === slug);

  return (
    <>
      <Helmet>
        <title>{post.fields.title}</title>
        <meta name="description" content={post.fields.excerpt} />
      </Helmet>
      <article>
        <img src={post.fields.coverImage.fields.file.url} alt={post.fields.title} />
        <h1>{post.fields.title}</h1>
      </article>
    </>
  );
}
```

**After (App Router):**
```typescript
import Image from 'next/image';
import { getPostBySlug } from '@/lib/contentful';
import { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  return {
    title: post.fields.title,
    description: post.fields.excerpt,
  };
}

export default async function BlogPostArticle({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  return (
    <article>
      <Image
        src={`https:${post.fields.coverImage.fields.file.url}`}
        alt={post.fields.title}
        width={1200}
        height={630}
      />
      <h1>{post.fields.title}</h1>
    </article>
  );
}
```

### Client vs Server Components

**App Router introduces Server Components by default.**

**When to use 'use client' directive:**

- Components using React hooks (useState, useEffect, useContext)
- Event handlers (onClick, onChange)
- Browser APIs (window, localStorage, navigator)
- Third-party libraries requiring client-side (analytics, chat widgets)

**Example: Search Component (Client Component)**

```typescript
'use client';

import { useState } from 'react';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch';

export default function SearchComponent() {
  const [searchClient] = useState(algoliasearch('APP_ID', 'SEARCH_KEY'));

  return (
    <InstantSearch searchClient={searchClient} indexName="blog_posts">
      <SearchBox />
      <Hits />
    </InstantSearch>
  );
}
```

---

## 7. Data Fetching Migration

### Current Approach: Build-Time JSON Generation

**Current Flow:**
1. `npm run fetch` → Calls Contentful API
2. Saves responses to `src/Api/contentfulPosts.json` (1.3MB)
3. Components import JSON directly: `import posts from '../../Api/contentfulPosts.json'`
4. Client-side filtering: `posts.find(p => p.fields.slug === slug)`

**Problems:**
- Large JSON files increase bundle size
- All content loaded upfront (performance issue)
- No incremental updates without full rebuild
- API credentials in source code

### Next.js Approach: Server-Side Data Fetching

**Next.js Flow:**
1. Create reusable Contentful client
2. Fetch data per-page at build time
3. Use ISR (Incremental Static Regeneration) for updates
4. API credentials in environment variables

### Step 1: Create Contentful Client

**src/lib/contentful.ts:**

```typescript
import { createClient } from 'contentful';

if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('Contentful environment variables are not set');
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function getAllPosts() {
  const entries = await client.getEntries({
    content_type: 'post',
    order: ['-fields.date'],
  });
  return entries.items;
}

export async function getPostBySlug(slug: string) {
  const entries = await client.getEntries({
    content_type: 'post',
    'fields.slug': slug,
    limit: 1,
  });
  return entries.items[0] || null;
}

export async function getAllWhitepapers() {
  const entries = await client.getEntries({
    content_type: 'whitepaper',
    order: ['-fields.publishDate'],
  });
  return entries.items;
}

export async function getWhitepaperBySlug(slug: string) {
  const entries = await client.getEntries({
    content_type: 'whitepaper',
    'fields.slug': slug,
    limit: 1,
  });
  return entries.items[0] || null;
}

export async function getAllAuthors() {
  const entries = await client.getEntries({
    content_type: 'person',
  });
  return entries.items;
}

export async function getAuthorBySlug(slug: string) {
  const entries = await client.getEntries({
    content_type: 'person',
    'fields.slug': slug,
    limit: 1,
  });
  return entries.items[0] || null;
}
```

### Step 2: Environment Variables

**.env.local:**
```bash
CONTENTFUL_SPACE_ID=95di84mqkkro
CONTENTFUL_ACCESS_TOKEN=your_access_token_here
CONTENTFUL_PREVIEW_TOKEN=your_preview_token_here

NEXT_PUBLIC_ALGOLIA_APP_ID=your_app_id
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=your_search_key

NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**.env.example (commit to repo):**
```bash
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
CONTENTFUL_PREVIEW_TOKEN=

NEXT_PUBLIC_ALGOLIA_APP_ID=
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=

NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

### Step 3: Implement Static Generation

**app/blog/[slug]/page.tsx:**

```typescript
import { getAllPosts, getPostBySlug } from '@/lib/contentful';
import { notFound } from 'next/navigation';

// Tell Next.js all possible slugs at build time
export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.fields.slug,
  }));
}

// Server Component - fetches data at build time
export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <h1>{post.fields.title}</h1>
      <div>{post.fields.body}</div>
    </article>
  );
}

// Optional: Enable ISR (revalidate every hour)
export const revalidate = 3600;
```

### Step 4: Incremental Static Regeneration (ISR)

**Benefits:**
- Pages rebuild automatically when content changes
- No need for full site rebuild
- Always serve fast static HTML

**Implementation:**

```typescript
// Revalidate every hour (3600 seconds)
export const revalidate = 3600;

// Or use on-demand revalidation via API route
```

**app/api/revalidate/route.ts:**
```typescript
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const path = request.nextUrl.searchParams.get('path');

  // Validate secret token
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  if (!path) {
    return NextResponse.json({ message: 'Missing path' }, { status: 400 });
  }

  try {
    await revalidatePath(path);
    return NextResponse.json({ revalidated: true, path });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
```

**Contentful Webhook Configuration:**
- Set webhook URL: `https://yourdomain.com/api/revalidate?secret=YOUR_SECRET&path=/blog/your-slug`
- Trigger on: Publish, Unpublish, Delete

### Step 5: Migration Strategy

**Phase 1: Parallel Systems**
- Keep existing JSON fetching during migration
- Add Next.js data fetching alongside
- Compare outputs for consistency

**Phase 2: Gradual Cutover**
- Migrate one content type at a time (posts → whitepapers → authors)
- Test thoroughly before removing JSON files
- Keep fallback mechanism

**Phase 3: Cleanup**
- Remove `src/Api/fetchContentful*.js` scripts
- Delete JSON files from git
- Remove `npm run fetch` from build process

---

## 8. Styling Migration

### Current Setup

- **SCSS Modules** with custom variables
- **Materialize CSS** for grid and utilities
- **Global styles** in `index.scss`
- **CSS-in-JS** for colors and breakpoints (`Fonts.js`, `Spaces.js`)
- **Font Awesome** icons

### Next.js Styling Options

**Option 1: Keep Current SCSS Setup (Easiest)**

Next.js supports SCSS out of the box:

```bash
npm install sass
```

**next.config.js:**
```javascript
const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    additionalData: `
      @import "Colors.scss";
      @import "Breakpoints.scss";
    `,
  },
};
```

**app/layout.tsx:**
```typescript
import '@/styles/globals.scss';
import 'materialize-css/dist/css/materialize.min.css';
```

**Option 2: Migrate to Tailwind CSS (Modern, Recommended)**

Benefits:
- Smaller bundle size (unused CSS purged)
- Better performance
- Modern utility-first approach
- Built-in responsive design

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Option 3: Hybrid Approach**
- Keep SCSS for complex components
- Use Tailwind for layout and utilities
- Gradually migrate over time

### Font Loading Optimization

**Current: Manual font loading in public/index.html**

```html
<link rel="preload" href="/assets/fonts/Inter-Regular.ttf" as="font" type="font/ttf" crossorigin>
```

**Next.js: Automatic Font Optimization**

```typescript
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

// Google Fonts
const inter = Inter({ subsets: ['latin'] });

// Local fonts
const parafina = localFont({
  src: [
    {
      path: '../public/assets/fonts/Parafina-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/Parafina-BoldS.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-parafina',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.className} ${parafina.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

### Image Optimization

**Replace all `<img>` tags with `next/image`:**

**Before:**
```javascript
<img src="/images/logo.png" alt="Search Guard" />
```

**After:**
```javascript
import Image from 'next/image';

<Image
  src="/images/logo.png"
  alt="Search Guard"
  width={200}
  height={50}
  priority // For above-the-fold images
/>
```

**Contentful Images:**
```javascript
<Image
  src={`https:${post.fields.coverImage.fields.file.url}`}
  alt={post.fields.title}
  width={post.fields.coverImage.fields.file.details.image.width}
  height={post.fields.coverImage.fields.file.details.image.height}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

**next.config.js for Contentful:**
```javascript
module.exports = {
  images: {
    domains: ['images.ctfassets.net'],
  },
};
```

---

## 9. Build and Deployment

### Build Process Comparison

**Current CRA Build:**
```bash
npm run fetch          # Fetch Contentful data → JSON
npm run build          # react-scripts build
npm run postbuild      # react-snap + sitemap generation
```

**Next.js Build:**
```bash
npm run build          # Next.js builds all pages
npm run start          # Production server
```

### Package.json Scripts Update

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "export": "next build && next export",
    "sitemap": "node scripts/generate-sitemap.js"
  }
}
```

### Static Export vs Server Rendering

**Option 1: Static Export (Closest to Current Setup)**

```bash
next build && next export
```

Generates static HTML files in `out/` directory.

**next.config.js:**
```javascript
module.exports = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
};
```

**Limitations:**
- No ISR (Incremental Static Regeneration)
- No API routes
- No Image Optimization (unless using CDN)
- No middleware

**Option 2: Node.js Server (Recommended)**

Use Next.js server for:
- ISR support
- API routes for webhooks
- Image optimization
- Better performance

### Deployment Options

**Option 1: Vercel (Easiest, Recommended)**

```bash
npm install -g vercel
vercel login
vercel
```

Benefits:
- Zero configuration
- Automatic deployments on git push
- Built-in CDN
- Serverless functions
- Preview deployments
- Free tier generous

**Option 2: Self-Hosted (Current Heroku Setup)**

**Dockerfile:**
```dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

**next.config.js:**
```javascript
module.exports = {
  output: 'standalone',
};
```

**Option 3: Static Hosting (Netlify, Cloudflare Pages)**

Use static export and deploy to CDN:

```bash
npm run build
npm run export
```

Upload `out/` directory to host.

### CI/CD Pipeline

**GitHub Actions Workflow:**

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npm run type-check

      - name: Build
        env:
          CONTENTFUL_SPACE_ID: ${{ secrets.CONTENTFUL_SPACE_ID }}
          CONTENTFUL_ACCESS_TOKEN: ${{ secrets.CONTENTFUL_ACCESS_TOKEN }}
        run: npm run build

      - name: Deploy to Vercel
        if: github.ref == 'refs/heads/main'
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

### Environment Variables Configuration

**Production Environment:**

```bash
# Vercel
vercel env add CONTENTFUL_SPACE_ID
vercel env add CONTENTFUL_ACCESS_TOKEN
vercel env add NEXT_PUBLIC_ALGOLIA_APP_ID
vercel env add NEXT_PUBLIC_ALGOLIA_SEARCH_KEY

# Or Heroku
heroku config:set CONTENTFUL_SPACE_ID=xxx
heroku config:set CONTENTFUL_ACCESS_TOKEN=xxx
```

---

## 10. Testing and Validation

### Pre-Migration Testing Checklist

- [ ] Document all current routes (use sitemap.xml)
- [ ] Create screenshots of key pages
- [ ] Run Lighthouse audits on current site
- [ ] Document current Core Web Vitals
- [ ] Test all forms and interactive elements
- [ ] Verify all external integrations (analytics, search)
- [ ] Export list of all redirects

### Migration Testing Strategy

**Phase 1: Component Testing**

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

**vitest.config.ts:**
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
});
```

**Example test:**
```typescript
import { render, screen } from '@testing-library/react';
import Button from '@/components/Button/Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

**Phase 2: E2E Testing**

```bash
npm install --save-dev @playwright/test
```

**tests/e2e/homepage.spec.ts:**
```typescript
import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.locator('h1')).toContainText('Search Guard');
});

test('navigation works', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.click('a[href="/blog/"]');
  await expect(page).toHaveURL(/.*blog/);
});
```

**Phase 3: Visual Regression Testing**

```bash
npm install --save-dev @playwright/test
```

**Take baseline screenshots:**
```typescript
test('homepage visual regression', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveScreenshot('homepage.png');
});
```

### Post-Migration Validation Checklist

**Functionality:**
- [ ] All routes return 200 status
- [ ] Dynamic routes work with all slugs
- [ ] Redirects work correctly
- [ ] Forms submit successfully
- [ ] Search functionality works
- [ ] Analytics tracking fires correctly
- [ ] Social sharing works
- [ ] Newsletter signup works
- [ ] All external links work

**SEO:**
- [ ] Meta tags present on all pages
- [ ] Open Graph tags correct
- [ ] Canonical URLs correct
- [ ] Sitemap.xml generates correctly
- [ ] Robots.txt present
- [ ] Structured data (JSON-LD) present
- [ ] All pages indexed in Google Search Console

**Performance:**
- [ ] Lighthouse score >= 90 (current baseline)
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Time to Interactive < 3.8s
- [ ] Total bundle size reduced vs CRA

**Accessibility:**
- [ ] Lighthouse Accessibility score >= 90
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] ARIA labels present
- [ ] Color contrast meets WCAG AA

**Content:**
- [ ] All blog posts render correctly
- [ ] Images load and optimize correctly
- [ ] Rich text formatting preserved
- [ ] Code blocks render with syntax highlighting
- [ ] Author profiles display correctly
- [ ] Whitepapers download correctly

### Testing Tools

```bash
# Performance testing
npm install -g lighthouse
lighthouse https://yoursite.com --view

# Link checking
npm install -g broken-link-checker
blc https://yoursite.com -ro

# Accessibility testing
npm install -g @axe-core/cli
axe https://yoursite.com
```

---

## 11. Rollback Plan

### Git Strategy

**Create backup branch:**
```bash
git checkout -b backup/pre-nextjs-migration
git push origin backup/pre-nextjs-migration
```

**Feature branch development:**
```bash
git checkout -b feature/nextjs-migration
```

**Multiple checkpoint commits:**
```bash
git commit -m "checkpoint: initial Next.js setup"
git commit -m "checkpoint: routes migrated"
git commit -m "checkpoint: components migrated"
git commit -m "checkpoint: data fetching complete"
```

### Deployment Strategy

**Blue-Green Deployment:**

1. **Blue Environment:** Current CRA site (production)
2. **Green Environment:** New Next.js site (staging)
3. Test Green thoroughly
4. Switch DNS/CDN to Green
5. Keep Blue running for 7 days
6. Rollback = switch DNS back to Blue

**Gradual Rollout:**

Use Cloudflare Workers or similar to split traffic:

```javascript
// 10% of users see new Next.js site
const isNextJS = Math.random() < 0.1;
const targetHost = isNextJS ? 'nextjs.example.com' : 'cra.example.com';
```

Gradually increase percentage as confidence grows.

### Rollback Triggers

**Automatic rollback if:**
- Error rate > 1%
- Response time > 3x baseline
- Lighthouse score drops > 20 points
- Core Web Vitals degrade significantly

**Manual rollback if:**
- Critical functionality broken
- SEO traffic drops > 10%
- User reports of broken features
- Analytics stop tracking

### Rollback Procedure

**Vercel:**
```bash
# Roll back to previous deployment
vercel rollback [deployment-url]
```

**Heroku:**
```bash
heroku releases
heroku rollback v123
```

**DNS Rollback:**
```bash
# Switch CNAME back to old site
# Flush Cloudflare cache
curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache" \
  -H "Authorization: Bearer {api_token}" \
  -d '{"purge_everything":true}'
```

### Data Integrity

**Content changes during migration:**
- Contentful is source of truth
- No data loss risk
- Both old and new sites read from same API
- ISR ensures new content appears quickly

**Search index:**
- Re-run Algolia indexing script after rollback
- Keep both old and new indexing scripts during migration

---

## Appendix

### A. Complete Migration Timeline

**Week 1: Preparation**
- Set up new Next.js project
- Configure environment variables
- Create Contentful integration layer
- Set up development environment

**Week 2: Routing and Structure**
- Migrate all 44 routes
- Set up dynamic route templates
- Configure redirects
- Test navigation

**Week 3: Component Migration**
- Migrate presentational components (batch 1)
- Migrate presentational components (batch 2)
- Migrate view components
- Update styles

**Week 4: Data Fetching**
- Implement getStaticProps for all pages
- Test data fetching
- Remove JSON files
- Configure ISR

**Week 5: Features and Integrations**
- Migrate analytics
- Migrate search functionality
- Migrate forms
- Test third-party integrations

**Week 6: Testing and QA**
- Component tests
- E2E tests
- Performance testing
- SEO validation
- Accessibility audit

**Week 7: Deployment Preparation**
- Set up CI/CD
- Configure production environment
- Load testing
- Create rollback plan

**Week 8: Launch**
- Deploy to staging
- Final testing
- Gradual rollout
- Monitor metrics
- Full cutover

### B. Key Differences Summary

| Feature | Current (CRA) | New (Next.js) |
|---------|--------------|---------------|
| Routing | React Router | File-based |
| Data Fetching | Build-time JSON | Server-side per page |
| Rendering | Client-side hydration | SSG/ISR |
| Meta Tags | react-helmet | Metadata API |
| Images | `<img>` | `next/image` |
| Styles | SCSS Modules | SCSS Modules (compatible) |
| Build Tool | react-scripts | Next.js |
| Server | Express (redirects) | Next.js server |
| Bundle Size | Large (all upfront) | Code-split per page |

### C. Common Pitfalls and Solutions

**Pitfall 1: Forgetting 'use client'**
- **Error:** "useState is not defined"
- **Solution:** Add `'use client'` directive to component

**Pitfall 2: Image optimization errors**
- **Error:** "Image optimization requires width and height"
- **Solution:** Always provide width/height or use `fill` prop

**Pitfall 3: Environment variables not working**
- **Error:** `process.env.VAR is undefined`
- **Solution:** Prefix with `NEXT_PUBLIC_` for client-side access

**Pitfall 4: CSS modules not scoping**
- **Error:** Global CSS leaking
- **Solution:** Use `.module.scss` extension

**Pitfall 5: Absolute imports not working**
- **Error:** "Cannot find module '@/components'"
- **Solution:** Configure `tsconfig.json` paths

**Pitfall 6: Static export limitations**
- **Error:** "Dynamic routes don't work in export"
- **Solution:** Use `generateStaticParams`

### D. Resource Links

**Official Documentation:**
- Next.js: https://nextjs.org/docs
- React 18: https://react.dev/
- Contentful: https://www.contentful.com/developers/docs/

**Migration Guides:**
- CRA to Next.js: https://nextjs.org/docs/app/building-your-application/upgrading/from-create-react-app
- React Router to Next.js: https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration

**Community Resources:**
- Next.js GitHub Discussions
- Vercel Discord
- Stack Overflow [nextjs] tag

**Tools:**
- next-codemod: Automated code transformations
- @next/bundle-analyzer: Analyze bundle size
- next-sitemap: Generate sitemap.xml

### E. Support and Maintenance

**During Migration:**
- Weekly team sync meetings
- Daily Slack updates
- Shared migration checklist
- Blocked issues tracker

**Post-Migration:**
- Monitor error tracking (Sentry)
- Review Core Web Vitals weekly
- Check Google Search Console
- Update documentation

**Long-term:**
- Keep Next.js updated (minor versions monthly)
- Review and update dependencies quarterly
- Performance audits quarterly
- Accessibility audits semi-annually

---

## Conclusion

This migration from Create React App to Next.js represents a significant modernization effort that will:

✅ Update to supported Node.js and React versions
✅ Replace unmaintained react-snap with Next.js SSG
✅ Improve performance through code splitting and optimization
✅ Enable incremental content updates via ISR
✅ Simplify deployment and scaling
✅ Provide better developer experience
✅ Future-proof the codebase

**Next Steps:**
1. Review this document with the team
2. Set up development environment
3. Begin Phase 1: Project setup and configuration
4. Follow weekly timeline in Appendix A

**Questions or concerns?** Schedule a migration planning session to discuss specific requirements and risks.

---

**Document Version:** 1.0
**Last Updated:** 2026-01-08
**Author:** Migration Planning Team
