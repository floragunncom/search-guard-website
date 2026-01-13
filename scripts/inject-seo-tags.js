#!/usr/bin/env node

/**
 * Post-process script to inject SEO meta tags into static HTML files
 * This bypasses React Helmet and directly modifies the generated HTML
 */

const fs = require('fs');
const path = require('path');
const posts = require('../src/Api/contentfulPosts.json');

const BUILD_DIR = path.join(__dirname, '../dist');

// Default meta tags for the homepage
const defaultMeta = {
  title: 'Security and Alerting for Elasticsearch and Kibana | Search Guard',
  description: 'Search Guard is a security plugin for Elasticsearch and Kibana. Search Guard offers security, audit logging, compliance, alerting and anomaly detection.',
  canonical: 'https://search-guard.com/',
  ogTitle: 'Security and Alerting for Elasticsearch and Kibana | Search Guard',
  ogDescription: 'Search Guard is a security plugin for Elasticsearch and Kibana. Search Guard offers security, audit logging, compliance, alerting and anomaly detection.',
  ogImage: 'https://search-guard.com/assets/sg_dlic_small.png'
};

/**
 * Inject meta tags into HTML
 */
function injectMetaTags(html, meta) {
  // Replace title
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`);

  // Find the insertion point (after title tag)
  const titleEndIndex = html.indexOf('</title>') + '</title>'.length;

  // Build meta tags HTML
  const metaTags = `
    <meta name="description" content="${meta.description}">
    <link rel="canonical" href="${meta.canonical}">
    <meta property="og:title" content="${meta.ogTitle}">
    <meta property="og:description" content="${meta.ogDescription}">
    <meta property="og:url" content="${meta.canonical}">
    <meta property="og:image" content="${meta.ogImage}">
    <meta property="og:type" content="${meta.ogType || 'website'}">
    <meta property="og:locale" content="en_US">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@searchguard">
    <meta name="twitter:title" content="${meta.ogTitle}">
    <meta name="twitter:description" content="${meta.ogDescription}">
    <meta name="twitter:image" content="${meta.ogImage}">`;

  // Insert meta tags
  html = html.slice(0, titleEndIndex) + metaTags + html.slice(titleEndIndex);

  return html;
}

/**
 * Process a single HTML file
 */
function processFile(filePath, meta) {
  try {
    let html = fs.readFileSync(filePath, 'utf8');
    html = injectMetaTags(html, meta);
    fs.writeFileSync(filePath, html);
    console.log(`  ✓ ${filePath.replace(BUILD_DIR, '')}`);
  } catch (error) {
    console.error(`  ✗ Error processing ${filePath}:`, error.message);
  }
}

/**
 * Main processing function
 */
function processSite() {
  console.log('\n🔧 Injecting SEO meta tags into static HTML files...\n');

  // Process homepage
  const homepagePath = path.join(BUILD_DIR, 'index.html');
  if (fs.existsSync(homepagePath)) {
    processFile(homepagePath, defaultMeta);
  }

  // Process blog posts
  console.log('\nProcessing blog posts...');
  posts.forEach(post => {
    if (post.fields && post.fields.slug) {
      const slug = post.fields.slug.replace(/\/$/, ''); // Remove trailing slash
      const postPath = path.join(BUILD_DIR, 'blog', slug, 'index.html');

      if (fs.existsSync(postPath)) {
        const title = post.fields.htmlTitle || post.fields.title;
        const meta = {
          title: title,
          description: post.fields.htmlDescription || post.fields.title,
          canonical: `https://search-guard.com/blog/${post.fields.slug}`,
          ogTitle: title,
          ogDescription: post.fields.htmlDescription || post.fields.title,
          ogImage: post.fields.postImage ? `https:${post.fields.postImage.fields.file.url}` : defaultMeta.ogImage,
          ogType: 'article'
        };
        processFile(postPath, meta);
      }
    }
  });

  console.log('\n✅ SEO meta tags injection complete!\n');
}

// Run if called directly
if (require.main === module) {
  processSite();
}

module.exports = { processSite };
