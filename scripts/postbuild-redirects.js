#!/usr/bin/env node

const fs = require('fs/promises');
const path = require('path');

const args = process.argv;
const preFormattedOutDir = args.find((arg) => arg.startsWith('--out-dir='));
const stripWrappingQuotes = (value) => {
  if (!value) {
    return value;
  }
  return value.replace(/^['"]|['"]$/g, '');
};

const OUT_DIR = stripWrappingQuotes(preFormattedOutDir ? preFormattedOutDir.split('=')[1] : 'out');
const DIST_DIR = path.resolve(process.cwd(), OUT_DIR);
const BLOG_PAGE_ONE_DIR = path.join(DIST_DIR, 'blog', 'page', '1');
const BLOG_PAGE_ONE_INDEX = path.join(BLOG_PAGE_ONE_DIR, 'index.html');

const redirectHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Moved Permanently</title>
  <meta name="robots" content="noindex,follow" />
  <link rel="canonical" href="https://search-guard.com/blog/" />
  <meta http-equiv="refresh" content="0;url=/blog/" />
</head>
<body>
  <h1>Moved Permanently</h1>
  <p>This page has moved to <a href="/blog/">/blog/</a>.</p>
</body>
</html>
`;

async function ensureFallbackRedirectPage() {
  await fs.mkdir(BLOG_PAGE_ONE_DIR, { recursive: true });
  await fs.writeFile(BLOG_PAGE_ONE_INDEX, redirectHtml, 'utf8');
}

const normalizeRoutePath = (value) => {
  if (!value || typeof value !== 'string') {
    return null;
  }

  const [pathWithoutQuery] = value.split('#')[0].split('?');
  const trimmed = pathWithoutQuery.trim();

  if (!trimmed.startsWith('/')) {
    return null;
  }

  if (trimmed === '/') {
    return '/';
  }

  if (/\.[a-z0-9]+$/i.test(trimmed) && !trimmed.endsWith('.html')) {
    return null;
  }

  return trimmed.endsWith('/') ? trimmed : `${trimmed}/`;
};

const stripHtmlRoute = (filePath) =>
  filePath
    .replace(DIST_DIR, '')
    .replace(/\/index\.html$/, '/')
    .replace(/\\/g, '/');

const collectIndexFiles = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const nested = await collectIndexFiles(fullPath);
      files.push(...nested);
      continue;
    }

    if (entry.isFile() && entry.name === 'index.html') {
      files.push(fullPath);
    }
  }

  return files;
};

const extractInternalHrefCandidates = (html) => {
  const hrefs = [];
  const hrefPattern = /href=\"([^\"]+)\"/g;
  let match;

  while ((match = hrefPattern.exec(html))) {
    const href = match[1];
    if (
      !href ||
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('#') ||
      href.startsWith('javascript:')
    ) {
      continue;
    }

    const normalized = normalizeRoutePath(href);
    if (!normalized) {
      continue;
    }

    if (normalized.startsWith('/assets/') || normalized.startsWith('/_next/')) {
      continue;
    }

    hrefs.push(normalized);
  }

  return hrefs;
};

const buildRedirectHtml = (targetPath) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Moved Permanently</title>
  <meta name="robots" content="noindex,follow" />
  <link rel="canonical" href="https://search-guard.com${targetPath}" />
  <meta http-equiv="refresh" content="0;url=${targetPath}" />
</head>
<body>
  <h1>Moved Permanently</h1>
  <p>This page has moved to <a href="${targetPath}">${targetPath}</a>.</p>
</body>
</html>
`;

async function ensureLegacyRootBlogRedirects() {
  const indexFiles = await collectIndexFiles(DIST_DIR);
  const existingRoutes = new Set(indexFiles.map((filePath) => stripHtmlRoute(filePath)));
  const redirectsToCreate = [];

  for (const filePath of indexFiles) {
    const html = await fs.readFile(filePath, 'utf8');
    const hrefs = extractInternalHrefCandidates(html);

    for (const href of hrefs) {
      if (existingRoutes.has(href)) {
        continue;
      }

      const trimmed = href.replace(/^\/+|\/+$/g, '');
      if (!trimmed || trimmed.includes('/')) {
        continue;
      }

      const blogTarget = `/blog/${trimmed}/`;
      if (!existingRoutes.has(blogTarget)) {
        continue;
      }

      redirectsToCreate.push({ from: `/${trimmed}/`, to: blogTarget });
      existingRoutes.add(`/${trimmed}/`);
    }
  }

  for (const redirect of redirectsToCreate) {
    const fromDir = path.join(DIST_DIR, redirect.from.replace(/^\//, ''));
    const fromIndex = path.join(fromDir, 'index.html');
    await fs.mkdir(fromDir, { recursive: true });
    await fs.writeFile(fromIndex, buildRedirectHtml(redirect.to), 'utf8');
  }

  return redirectsToCreate.length;
}

const EXPLICIT_REDIRECTS = [
  {
    from: '/blog/from-x-pack-to-search-guard-part-2-roles-and-permssions/',
    to: '/blog/from-x-pack-to-search-guard-part-2-roles-and-permissions/',
  },
  {
    from: '/blog/writing-kibana-plugins-2/',
    to: '/blog/writing-kibana-plugins-part-2/',
  },
  {
    from: '/blog/john-draper-captin-crunch/',
    to: '/blog/john-draper-captain-crunch/',
  },
  {
    from: '/imprint/',
    to: '/impressum/',
  },
  {
    from: '/product/',
    to: '/security/',
  },
  {
    from: '/education-program/',
    to: '/blog/search-guard-academic-scientific-programme/',
  },
];

async function ensureExplicitRedirects() {
  for (const redirect of EXPLICIT_REDIRECTS) {
    const fromDir = path.join(DIST_DIR, redirect.from.replace(/^\//, ''));
    const fromIndex = path.join(fromDir, 'index.html');
    await fs.mkdir(fromDir, { recursive: true });
    await fs.writeFile(fromIndex, buildRedirectHtml(redirect.to), 'utf8');
  }

  return EXPLICIT_REDIRECTS.length;
}

async function run() {
  await ensureFallbackRedirectPage();
  const legacyRedirectCount = await ensureLegacyRootBlogRedirects();
  const explicitRedirectCount = await ensureExplicitRedirects();
  console.log('Added fallback redirect page for /blog/page/1/ -> /blog/');
  console.log(`Added legacy blog fallback redirects: ${legacyRedirectCount}`);
  console.log(`Added explicit legacy redirects: ${explicitRedirectCount}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
