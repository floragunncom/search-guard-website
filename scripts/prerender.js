#!/usr/bin/env node

/**
 * Static Site Generation (SSG) script
 * Replaces react-snap with a modern Puppeteer-based solution
 *
 * This script:
 * 1. Reads the routes configuration
 * 2. Launches Puppeteer to render each route
 * 3. Saves the rendered HTML to the build directory
 * 4. Supports parallel rendering for performance
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { getRoutes } = require('../src/routes-config.js');

const BUILD_DIR = path.join(__dirname, '../dist');
const BASE_URL = 'http://localhost:5000'; // Preview server
const CONCURRENCY = 8; // Number of pages to render in parallel

// Domains whose scripts are dynamically injected at runtime by analytics/tracking
// inline code. Puppeteer captures these alongside the originals, causing duplicates.
const DYNAMIC_SCRIPT_DOMAINS = [
  'googletagmanager.com',
  'google-analytics.com',
  'matomo.search-guard.com',
  'web-sdk.smartlook.com',
  'cdn.cookie-script.com',
  'redditstatic.com',
  'snap.licdn.com',
  'analytics.ahrefs.com',
  'cdn.getkoala.com',
];

/**
 * Ensure directory exists
 */
function ensureDir(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

/**
 * Get a deduplication key for a <meta> tag.
 * Returns null if the tag doesn't have a recognizable identity (and should be kept as-is).
 */
function getMetaKey(tag) {
  let match;

  // <meta charset="...">
  match = tag.match(/\bcharset\s*=\s*["']?([^"'\s>]+)/i);
  if (match) return 'charset';

  // <meta name="..." ...>
  match = tag.match(/\bname\s*=\s*["']([^"']+)["']/i);
  if (match) return `name:${match[1].toLowerCase()}`;

  // <meta property="..." ...>
  match = tag.match(/\bproperty\s*=\s*["']([^"']+)["']/i);
  if (match) return `property:${match[1].toLowerCase()}`;

  // <meta http-equiv="..." ...>
  match = tag.match(/\bhttp-equiv\s*=\s*["']([^"']+)["']/i);
  if (match) return `http-equiv:${match[1].toLowerCase()}`;

  return null;
}

/**
 * Get a deduplication key for a <link> tag.
 */
function getLinkKey(tag) {
  const relMatch = tag.match(/\brel\s*=\s*["']([^"']+)["']/i);
  const hrefMatch = tag.match(/\bhref\s*=\s*["']([^"']+)["']/i);
  if (relMatch && hrefMatch) return `${relMatch[1].toLowerCase()}|${hrefMatch[1]}`;
  if (relMatch) return `rel:${relMatch[1].toLowerCase()}`;
  return null;
}

/**
 * Check if a <script> tag was dynamically injected by analytics runtime code.
 * These are identified by having async="" and an src matching known tracking domains.
 */
function isDynamicallyInjectedScript(tag) {
  // Only target script tags with async attribute (dynamically created by inline code)
  if (!/\basync\s*=\s*["']\s*["']/i.test(tag) && !/\basync(?:\s|>)/i.test(tag)) {
    return false;
  }
  const srcMatch = tag.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
  if (!srcMatch) return false;
  const src = srcMatch[1];
  return DYNAMIC_SCRIPT_DOMAINS.some(domain => src.includes(domain));
}

/**
 * Deduplicate the <head> section of captured HTML.
 *
 * Puppeteer's page.content() captures the full rendered DOM, which includes:
 *  - The original template <head> content
 *  - React Helmet's modifications (marked with data-rh="true")
 *  - Scripts dynamically injected at runtime by analytics libraries
 *
 * This function:
 *  1. Removes dynamically injected analytics <script> tags
 *  2. Deduplicates <meta> tags (preferring React Helmet versions with data-rh)
 *  3. Deduplicates <link> tags (preferring React Helmet versions with data-rh)
 *  4. Keeps only one <title> in <head> (preferring the Helmet-set one)
 */
function deduplicateHead(html) {
  // Split at </head> to isolate head content
  const headEndIdx = html.indexOf('</head>');
  if (headEndIdx === -1) return html;

  const headStartTag = html.match(/<head[^>]*>/i);
  if (!headStartTag) return html;

  const headOpenEnd = headStartTag.index + headStartTag[0].length;
  const beforeHead = html.slice(0, headOpenEnd);
  const headContent = html.slice(headOpenEnd, headEndIdx);
  const afterHead = html.slice(headEndIdx); // includes </head> and everything after

  // --- 1. Remove dynamically injected analytics scripts ---
  // Match <script ...>...</script> and self-closing <script ... /> in head
  let cleaned = headContent.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, (match) => {
    if (isDynamicallyInjectedScript(match)) return '';
    return match;
  });

  // --- 2. Deduplicate <meta> tags ---
  const metaSeen = new Map(); // key -> { tag, hasRh }
  cleaned = cleaned.replace(/<meta\b[^>]*\/?>/gi, (match) => {
    const key = getMetaKey(match);
    if (!key) return match; // no identity — keep it

    const hasRh = /data-rh\s*=\s*["']true["']/i.test(match);
    const existing = metaSeen.get(key);

    if (!existing) {
      metaSeen.set(key, { tag: match, hasRh });
      return match; // first occurrence — keep
    }

    // Prefer the data-rh version (React Helmet managed)
    if (hasRh && !existing.hasRh) {
      // This new one is from Helmet, previous wasn't — swap: remove previous, keep this
      // We can't remove the previous in-place easily, so mark this as the winner
      // and we'll do a second pass
      metaSeen.set(key, { tag: match, hasRh: true });
      return match;
    }

    // Duplicate — remove this one
    return '';
  });

  // Second pass: if a key's winner changed (Helmet version appeared later), remove the earlier one
  // Rebuild by collecting all metas, keeping only the last winner for each key
  const metaFinal = new Map();
  const metaOrder = [];
  cleaned.replace(/<meta\b[^>]*\/?>/gi, (match) => {
    const key = getMetaKey(match);
    if (!key) {
      metaOrder.push({ key: null, tag: match });
      return match;
    }
    const hasRh = /data-rh\s*=\s*["']true["']/i.test(match);
    const existing = metaFinal.get(key);
    if (!existing || (hasRh && !existing.hasRh)) {
      metaFinal.set(key, { tag: match, hasRh });
    }
    if (!metaOrder.some(m => m.key === key)) {
      metaOrder.push({ key, tag: match });
    }
    return match;
  });

  // Remove all metas, then re-insert deduplicated ones at the position of the first <meta> occurrence
  const firstMetaIdx = cleaned.search(/<meta\b/i);
  const cleanedNoMetas = cleaned.replace(/<meta\b[^>]*\/?>/gi, '');
  if (firstMetaIdx !== -1) {
    const deduplicatedMetas = metaOrder
      .map(m => {
        if (m.key === null) return m.tag;
        const winner = metaFinal.get(m.key);
        return winner ? winner.tag : null;
      })
      .filter(Boolean)
      .join('\n    ');

    // Find where the first meta was in the cleaned-no-metas string (approximate: insert at same region)
    const insertIdx = cleanedNoMetas.indexOf('\n', Math.max(0, firstMetaIdx - 50));
    cleaned = cleanedNoMetas.slice(0, insertIdx) + '\n    ' + deduplicatedMetas + cleanedNoMetas.slice(insertIdx);
  }

  // --- 3. Deduplicate <link> tags ---
  const linkSeen = new Map();
  cleaned = cleaned.replace(/<link\b[^>]*\/?>/gi, (match) => {
    const key = getLinkKey(match);
    if (!key) return match;

    const hasRh = /data-rh\s*=\s*["']true["']/i.test(match);
    const existing = linkSeen.get(key);

    if (!existing) {
      linkSeen.set(key, { tag: match, hasRh });
      return match;
    }

    // Prefer the data-rh version
    if (hasRh && !existing.hasRh) {
      linkSeen.set(key, { tag: match, hasRh: true });
      return match;
    }

    return ''; // duplicate — remove
  });

  // Second pass for links: remove earlier non-rh duplicates if a later rh version was kept
  const linkFinal = new Map();
  cleaned.replace(/<link\b[^>]*\/?>/gi, (match) => {
    const key = getLinkKey(match);
    if (!key) return match;
    const hasRh = /data-rh\s*=\s*["']true["']/i.test(match);
    const existing = linkFinal.get(key);
    if (!existing || (hasRh && !existing.hasRh)) {
      linkFinal.set(key, { tag: match, hasRh });
    }
    return match;
  });
  cleaned = cleaned.replace(/<link\b[^>]*\/?>/gi, (match) => {
    const key = getLinkKey(match);
    if (!key) return match;
    const winner = linkFinal.get(key);
    if (winner && winner.tag !== match) return ''; // this is the loser duplicate
    // After this match is kept, remove it from the map so only one survives
    if (winner && winner.tag === match) {
      linkFinal.delete(key);
      return match;
    }
    return match;
  });

  // --- 4. Keep only one <title> tag in <head> ---
  // Collect all title tags; prefer the non-default one (React Helmet's)
  const titleRegex = /<title>[^<]*<\/title>/gi;
  const titles = [];
  let titleMatch;
  while ((titleMatch = titleRegex.exec(cleaned)) !== null) {
    titles.push(titleMatch[0]);
  }

  if (titles.length > 1) {
    // Pick the best title: prefer one that isn't the default "Search Guard"
    const bestTitle = titles.find(t => !t.includes('>Search Guard<') && !t.includes('>Title<')) || titles[0];
    let kept = false;
    cleaned = cleaned.replace(/<title>[^<]*<\/title>/gi, (match) => {
      if (!kept && match === bestTitle) {
        kept = true;
        return match; // keep the first occurrence of the best title
      }
      return ''; // remove all others
    });
  }

  // --- 5. Clean up empty lines left by removed tags ---
  cleaned = cleaned.replace(/\n\s*\n\s*\n/g, '\n\n');

  return beforeHead + cleaned + afterHead;
}

/**
 * Prerender a single route
 */
async function prerenderRoute(page, route) {
  const url = `${BASE_URL}${route}`;

  try {
    console.log(`  Rendering: ${route}`);

    // Block analytics/tracking requests during prerendering — they are not needed
    // for static HTML and their runtime script injection causes duplication
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const reqUrl = req.url();
      const shouldBlock = DYNAMIC_SCRIPT_DOMAINS.some(domain => reqUrl.includes(domain));
      if (shouldBlock && req.resourceType() === 'script') {
        req.abort();
      } else {
        req.continue();
      }
    });

    // Navigate to the route
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Wait for React to fully render and React Helmet to inject meta tags
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Get the fully rendered HTML — page.content() already includes
    // React Helmet's title/meta/link modifications in the DOM
    let html = await page.content();

    // Clean up the head: remove dynamic script duplicates, deduplicate meta/link/title
    html = deduplicateHead(html);

    // Determine output path
    let outputPath;
    if (route === '/') {
      outputPath = path.join(BUILD_DIR, 'index.html');
    } else if (route.endsWith('/')) {
      outputPath = path.join(BUILD_DIR, route, 'index.html');
    } else {
      outputPath = path.join(BUILD_DIR, `${route}.html`);
    }

    // Ensure directory exists
    ensureDir(outputPath);

    // Write the HTML file
    fs.writeFileSync(outputPath, html);

    console.log(`  ✓ Saved: ${outputPath.replace(BUILD_DIR, '')}`);

    return { route, success: true };
  } catch (error) {
    console.error(`  ✗ Error rendering ${route}:`, error.message);
    return { route, success: false, error: error.message };
  }
}

/**
 * Prerender routes in batches
 */
async function prerenderBatch(browser, routes, batchSize) {
  const results = [];

  for (let i = 0; i < routes.length; i += batchSize) {
    const batch = routes.slice(i, i + batchSize);
    console.log(`\nBatch ${Math.floor(i / batchSize) + 1}/${Math.ceil(routes.length / batchSize)}`);

    // Create pages for this batch
    const pages = await Promise.all(
      batch.map(() => browser.newPage())
    );

    // Render all pages in parallel
    const batchResults = await Promise.all(
      batch.map((route, index) => prerenderRoute(pages[index], route))
    );

    // Close pages
    await Promise.all(pages.map(page => page.close()));

    results.push(...batchResults);
  }

  return results;
}

/**
 * Main prerender function
 */
async function prerender() {
  console.log('\n🚀 Starting static site generation...\n');

  // Check if dist directory exists
  if (!fs.existsSync(BUILD_DIR)) {
    console.error('❌ Build directory not found. Run "npm run build-local" first.');
    process.exit(1);
  }

  // Get all routes to render
  console.log('📋 Loading routes...');
  const routes = await getRoutes();
  console.log(`   Found ${routes.length} routes to prerender\n`);

  // Launch browser
  console.log('🌐 Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
    ],
  });

  try {
    // Prerender all routes
    const startTime = Date.now();
    const results = await prerenderBatch(browser, routes, CONCURRENCY);
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    // Summary
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    console.log('\n' + '='.repeat(50));
    console.log('✅ Static site generation complete!');
    console.log('='.repeat(50));
    console.log(`   Total routes: ${routes.length}`);
    console.log(`   Successful: ${successful}`);
    console.log(`   Failed: ${failed}`);
    console.log(`   Duration: ${duration}s`);
    console.log('='.repeat(50) + '\n');

    if (failed > 0) {
      console.warn('⚠️  Some routes failed to render:');
      results
        .filter(r => !r.success)
        .forEach(r => console.warn(`     - ${r.route}: ${r.error}`));
      console.log('');
    }

    // Exit with error if any routes failed
    if (failed > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Prerendering failed:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

// Run if called directly
if (require.main === module) {
  prerender().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { prerender, deduplicateHead };
