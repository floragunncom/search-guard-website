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
 * Prerender a single route
 */
async function prerenderRoute(page, route) {
  const url = `${BASE_URL}${route}`;

  try {
    console.log(`  Rendering: ${route}`);

    // Navigate to the route
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Wait for React to fully render and React Helmet to inject meta tags
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Extract the complete head HTML that React Helmet modified
    const headHTML = await page.evaluate(() => {
      // Get all elements that React Helmet typically manages
      const helmet = {
        title: document.querySelector('title') ? document.querySelector('title').outerHTML : '',
        metas: [],
        links: []
      };

      // Get meta tags (descriptions, OG tags, Twitter cards, etc.)
      document.querySelectorAll('head meta').forEach(meta => {
        helmet.metas.push(meta.outerHTML);
      });

      // Get link tags (canonical, etc.)
      document.querySelectorAll('head link').forEach(link => {
        helmet.links.push(link.outerHTML);
      });

      return helmet;
    });

    // Get the base HTML
    let html = await page.content();

    // Find the position to inject the helmet tags (after the existing title tag)
    const titleMatch = html.match(/<title>[^<]*<\/title>/);
    if (titleMatch && headHTML.title) {
      // Replace title
      html = html.replace(/<title>[^<]*<\/title>/, headHTML.title);

      // Insert meta and link tags right after title
      const insertPosition = html.indexOf('</title>') + '</title>'.length;
      const helmetTags = '\n    ' + headHTML.metas.join('\n    ') + '\n    ' + headHTML.links.join('\n    ');

      // Remove any existing duplicate meta/link tags from helmet to avoid duplication
      // Keep only the ones from the static HTML that helmet doesn't manage
      html = html.slice(0, insertPosition) + helmetTags + html.slice(insertPosition);
    }

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

module.exports = { prerender };
