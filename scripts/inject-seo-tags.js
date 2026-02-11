#!/usr/bin/env node

/**
 * Post-process script to inject SEO meta tags into static HTML files.
 *
 * Runs after Puppeteer-based SSG to ensure every page has unique,
 * accurate title, description, canonical, Open Graph, and Twitter Card tags.
 *
 * Covers:
 *  - All static pages (30+)
 *  - All 155 blog posts (from contentfulPosts.json)
 *  - Blog index + pagination pages
 *  - Blog category pages
 *  - Author list + individual author pages (from contentfulPersons.json)
 *  - Whitepaper pages (from contentfulWhitepapers.json)
 *  - Press release pages
 */

const fs = require('fs');
const path = require('path');
const posts = require('../src/Api/contentfulPosts.json');
const persons = require('../src/Api/contentfulPersons.json');
const whitepapers = require('../src/Api/contentfulWhitepapers.json');

const BUILD_DIR = path.join(__dirname, '../dist');
const SITE_URL = 'https://search-guard.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/sg_dlic_small.png`;

/**
 * Static page metadata — extracted from React Helmet declarations in each view.
 * Canonical URLs corrected where the original Helmet had wrong values.
 */
const staticPages = {
  '/': {
    title: 'Security and Alerting for Elasticsearch and Kibana | Search Guard',
    description: 'Search Guard is a security plugin for Elasticsearch and Kibana. Search Guard offers security, audit logging, compliance, alerting and anomaly detection.',
    canonical: `${SITE_URL}/`,
  },
  '/security/': {
    title: 'Secure Elasticsearch and Kibana with Search Guard',
    description: 'Secure your Elasticsearch and Kibana installation with Search Guard and add access control, encryption, audit logging and alerting.',
    canonical: `${SITE_URL}/security/`,
  },
  '/alerting/': {
    title: 'Free Elasticsearch and Kibana Alerting | Search Guard',
    description: 'Signals Alerting for Elasticsearch and Kibana detects data anomalies in your Elasticsearch cluster and sends notifications on various channels. For free.',
    canonical: `${SITE_URL}/alerting/`,
  },
  '/tlstool/': {
    title: 'Create TLS Certificates for Elasticsearch and Kibana | Search Guard',
    description: 'Search Guard TlsTool for Elasticsearch and Kibana makes it easy to generate all required TLS Certificates. Secure Your Elasticsearch Stack in Minutes.',
    canonical: `${SITE_URL}/tlstool/`,
  },
  '/encryption-at-rest/': {
    title: 'Take full control of your data with Encryption at Rest for Elasticsearch',
    description: 'We provide military-grade Encryption at Rest for Elasticsearch, ensuring complete data sovereignty and compliance with PCI, ISO, SOX and EU regulations.',
    canonical: `${SITE_URL}/encryption-at-rest/`,
  },
  '/indexmanagement/': {
    title: 'Automated Index Management for Elasticsearch | Search Guard',
    description: "Streamline Elasticsearch operations with Search Guard's Automated Index Management. Boost efficiency, reduce manual tasks, and ensure peak cluster performance effortlessly.",
    canonical: `${SITE_URL}/indexmanagement/`,
  },
  '/whitepapers/': {
    title: 'Search Guard Whitepapers for Elasticsearch',
    description: 'Search Guard whitepapers about security and alerting for Elasticsearch and Kibana',
    canonical: `${SITE_URL}/whitepapers/`,
  },
  '/compliance/': {
    title: 'Elasticsearch Compliance | GDPR, HIPAA, PCI, SOX and ISO',
    description: 'Keep your Elasticsearch and Kibana stack compliant with regulations like GDPR, PCI, SOX, HIPAA and ISO by using Search Guard',
    canonical: `${SITE_URL}/compliance/`,
  },
  '/company/': {
    title: 'Team | Get to know the minds behind Search Guard',
    description: 'Our mission is to shape IT security and Open Source business models. From day 1 until today, we follow our principles of putting security first and providing no-nonsense IT.',
    canonical: `${SITE_URL}/company/`,
  },
  '/resource/': {
    title: 'Search Guard Blog Posts, FAQ, and Documentation',
    description: 'Search Guard Resource Hub including Blog Posts, FAQ, Documentation, Presentations and Whitepapers',
    canonical: `${SITE_URL}/resource/`,
  },
  '/licensing/': {
    title: 'Pricing | Search Guard Community, Enterprise and Compliance Edition',
    description: 'Search Guard offers fair licensing to secure Elasticsearch and Kibana with an unlimited amount of nodes - scale your cluster not your costs.',
    canonical: `${SITE_URL}/licensing/`,
  },
  '/faq/': {
    title: 'Frequently asked questions | Search Guard | Security for Elasticsearch',
    description: 'Find answers to frequently asked questions about Search Guard, the rock-solid and battle proven security suite for Elasticsearch.',
    canonical: `${SITE_URL}/faq/`,
  },
  '/impressum/': {
    title: 'Impressum - Search Guard',
    description: 'Search Guard company information, contact details and VAT ID.',
    canonical: `${SITE_URL}/impressum/`,
  },
  '/presentations/': {
    title: 'Search Guard Security and Alerting Slide Decks for Elasticsearch',
    description: 'Search Guard slide decks regarding various topics around security and alerting for Elasticsearch',
    canonical: `${SITE_URL}/presentations/`,
  },
  '/datenschutz/': {
    title: 'Datenschutz - Search Guard',
    description: 'Unsere Richtlinie zur Erhebung und Nutzung personenbezogener Daten gemäß der DSGVO.',
    canonical: `${SITE_URL}/datenschutz/`,
  },
  '/dataprotection/': {
    title: 'Data Protection - Search Guard',
    description: 'Our policy regarding the collection and usage of personal data in accordance with GDPR.',
    canonical: `${SITE_URL}/dataprotection/`,
  },
  '/contacts/': {
    title: 'Contact the Search Guard team - get in touch with us',
    description: 'Any questions regarding Search Guard licensing, pricing or features? Drop us a message and we will get back to you as soon as possible.',
    canonical: `${SITE_URL}/contacts/`,
  },
  '/outdated-elasticsearch-versions-suppport/': {
    title: 'Support for Outdated Elasticsearch Versions | Search Guard',
    description: 'Search Guard still supports and provides Security and Alerting for outdated Elasticsearch Versions.',
    // Fixed: Helmet had /alerting/ which is a different page
    canonical: `${SITE_URL}/outdated-elasticsearch-versions-suppport/`,
  },
  '/newsletter/': {
    title: 'Search Guard Newsletter',
    description: 'Get the latest updates, insights, and tips on securing your Elasticsearch and OpenSearch clusters with the Search Guard Newsletter.',
    canonical: `${SITE_URL}/newsletter/`,
  },
  '/thanks/': {
    title: 'Search Guard | Thanks for your message',
    description: 'Thank you very much for getting in contact with Search Guard and our team.',
    canonical: `${SITE_URL}/thanks/`,
  },
  '/error/': {
    title: 'Search Guard | An error occurred',
    description: 'An internal error occurred, we humbly and deeply apologize.',
    canonical: `${SITE_URL}/error/`,
  },
  '/search-guard-free-trial/': {
    title: 'Start your free Search Guard Trial now',
    description: 'How to download and run your free 60 day Search Guard Enterprise Trial',
    canonical: `${SITE_URL}/search-guard-free-trial/`,
  },
  '/security-information/': {
    title: 'Security Information - Search Guard',
    description: 'Our public key and the Search Guard code signing key you can use to check the validity of each Search Guard binary.',
    // Fixed: Helmet had /security/ which is a different page
    canonical: `${SITE_URL}/security-information/`,
  },
  '/cve-advisory/': {
    title: 'CVE - advisory - Search Guard',
    description: 'Search Guard is an Open Source security plugin for Elasticsearch and the entire ELK stack. Search Guard offers encryption, authentification, authorization, audit logging, multitenancy and compliance features.',
    canonical: `${SITE_URL}/cve-advisory/`,
  },
  '/disclosure-policy/': {
    title: 'Search Guard Disclosure Policy',
    description: 'We take security seriously. Our policy for reporting security related issues found in Search Guard.',
    canonical: `${SITE_URL}/disclosure-policy/`,
  },
  '/authors/': {
    title: 'A list of all Search Guard Authors contributing to our blog',
    description: 'A list of all Search Guard Authors that are contributing to our blog and documentation.',
    canonical: `${SITE_URL}/authors/`,
    ogTitle: 'Search Guard Authors',
    ogDescription: 'A list of all Search Guard Authors',
  },
  '/certificates/': {
    title: 'Certificates - Search Guard',
    description: 'Search Guard is security certified and we are actively participating in various IT security associations.',
    canonical: `${SITE_URL}/certificates/`,
  },
  '/sitemap/': {
    title: 'Sitemap - Search Guard',
    description: 'Search Guard is an Open Source security plugin for Elasticsearch, Kibana and the entire ELK stack.',
    canonical: `${SITE_URL}/sitemap/`,
  },
  '/404/': {
    title: '404 - Page not found',
    description: 'The page you tried to access could not be found.',
    canonical: `${SITE_URL}/404.html`,
  },
  '/search-guard-flx/': {
    title: 'Search Guard FLX | Securing your Elasticsearch cluster has never been easier',
    description: 'Securing Elasticsearch and Kibana has never been easier with Search Guard FLX.',
    // Fixed: Helmet had /security/ which is a different page
    canonical: `${SITE_URL}/search-guard-flx/`,
  },
  '/heise/': {
    title: 'Search Guard reduces your TCO of Elasticsearch and Kibana',
    description: 'Use Search Guard to reduce your TCO of Elasticsearch and Kibana',
    canonical: `${SITE_URL}/heise/`,
  },

  // Press releases — DE
  '/press/de/search-guard-vertrieb-dach/': {
    title: 'Search Guard weitet Vertriebsaktivitäten in DACH aus',
    description: 'Die floragunn GmbH, Hersteller des Sicherheits-Plug-Ins Search Guard mit Sitz in Berlin, stärkt ihre Geschäftsaktivitäten auf dem deutschsprachigen Markt.',
    canonical: `${SITE_URL}/press/de/search-guard-vertrieb-dach/`,
  },
  '/press/de/search-guard-alerting/': {
    title: 'Effizientes Alert-Management für Big Data und IT-Infrastruktur',
    description: 'Effizientes Alert-Management für Elasticsearch und IT-Infrastruktur',
    canonical: `${SITE_URL}/press/de/search-guard-alerting/`,
  },
  '/press/de/elasticsearch-dsgvo/': {
    title: 'DSGVO-konforme Datenspeicherung in Elasticsearch mit Search Guard',
    description: 'Mit Search Guard sensible Daten in Elasticsearch-Clustern DSGVO-konform speichern',
    canonical: `${SITE_URL}/press/de/elasticsearch-dsgvo/`,
  },

  // Press releases — EN
  '/press/en/search-guard-sales-dach/': {
    title: 'Search Guard expands sales activities in DACH',
    description: 'floragunn GmbH, manufacturer of the security plug-in Search Guard, based in Berlin, is strengthening its business activities in the German-speaking market',
    // Fixed: Helmet pointed to the DE version
    canonical: `${SITE_URL}/press/en/search-guard-sales-dach/`,
  },
  '/press/en/search-guard-alerting/': {
    title: 'Efficient alert management for Big Data and IT infrastructures',
    description: 'Efficient alert management for Elasticsearch and IT infrastructures',
    canonical: `${SITE_URL}/press/en/search-guard-alerting/`,
  },
};

/**
 * Escape special characters for safe use in HTML attributes.
 */
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Remove existing SEO meta tags from a <head> content string to prevent
 * duplicates when we inject fresh tags.
 */
function cleanExistingSeoTags(headContent) {
  return headContent
    .replace(/<meta\s[^>]*name\s*=\s*["']description["'][^>]*\/?>/gi, '')
    .replace(/<link\s[^>]*rel\s*=\s*["']canonical["'][^>]*\/?>/gi, '')
    .replace(/<meta\s[^>]*property\s*=\s*["']og:[^"']*["'][^>]*\/?>/gi, '')
    .replace(/<meta\s[^>]*name\s*=\s*["']twitter:[^"']*["'][^>]*\/?>/gi, '')
    .replace(/<meta\s[^>]*name\s*=\s*["']author["'][^>]*\/?>/gi, '')
    .replace(/<meta\s[^>]*name\s*=\s*["']copyright["'][^>]*\/?>/gi, '')
    .replace(/\n\s*\n\s*\n/g, '\n\n');
}

/**
 * Inject meta tags into HTML, replacing any existing SEO tags to avoid duplicates.
 */
function injectMetaTags(html, meta) {
  const headEndIdx = html.indexOf('</head>');
  if (headEndIdx === -1) return html;

  const headStartMatch = html.match(/<head[^>]*>/i);
  if (!headStartMatch) return html;

  const headOpenEnd = headStartMatch.index + headStartMatch[0].length;
  let headContent = html.slice(headOpenEnd, headEndIdx);
  const beforeHead = html.slice(0, headOpenEnd);
  const afterHead = html.slice(headEndIdx); // includes </head> and body

  // Remove existing SEO tags that we will re-inject
  headContent = cleanExistingSeoTags(headContent);

  // Replace the <title> tag
  headContent = headContent.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(meta.title)}</title>`
  );

  // Find insertion point right after </title>
  const titleEndIndex = headContent.indexOf('</title>');
  if (titleEndIndex === -1) return html;
  const insertPoint = titleEndIndex + '</title>'.length;

  const ogTitle = escapeHtml(meta.ogTitle || meta.title);
  const ogDescription = escapeHtml(meta.ogDescription || meta.description);
  const ogImage = meta.ogImage || DEFAULT_OG_IMAGE;

  // Build the SEO meta tags block
  const metaTags = `
    <meta name="description" content="${escapeHtml(meta.description)}">
    <link rel="canonical" href="${meta.canonical}">
    <meta property="og:title" content="${ogTitle}">
    <meta property="og:description" content="${ogDescription}">
    <meta property="og:url" content="${meta.canonical}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:type" content="${meta.ogType || 'website'}">
    <meta property="og:locale" content="en_US">
    <meta name="twitter:card" content="${meta.twitterCard || 'summary_large_image'}">
    <meta name="twitter:site" content="@searchguard">
    <meta name="twitter:title" content="${ogTitle}">
    <meta name="twitter:description" content="${ogDescription}">
    <meta name="twitter:image" content="${ogImage}">`;

  headContent =
    headContent.slice(0, insertPoint) +
    metaTags +
    headContent.slice(insertPoint);

  return beforeHead + headContent + afterHead;
}

/**
 * Resolve a route path to its HTML file in the build directory.
 * Mirrors the output path logic in prerender.js.
 */
function resolveFilePath(route) {
  if (route === '/') {
    return path.join(BUILD_DIR, 'index.html');
  } else if (route.endsWith('/')) {
    return path.join(BUILD_DIR, route, 'index.html');
  } else {
    return path.join(BUILD_DIR, `${route}.html`);
  }
}

/**
 * Process a single HTML file: read, inject tags, write back.
 * Returns true if the file was processed, false if it was not found.
 */
function processFile(filePath, meta) {
  if (!fs.existsSync(filePath)) {
    return false;
  }
  try {
    let html = fs.readFileSync(filePath, 'utf8');
    html = injectMetaTags(html, meta);
    fs.writeFileSync(filePath, html);
    console.log(`  ✓ ${filePath.replace(BUILD_DIR, '')}`);
    return true;
  } catch (error) {
    console.error(`  ✗ Error processing ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Safely access nested image URL from Contentful asset fields.
 */
function getImageUrl(asset) {
  try {
    return `https:${asset.fields.file.url}`;
  } catch {
    return null;
  }
}

/**
 * Main processing function
 */
function processSite() {
  console.log('\n🔧 Injecting SEO meta tags into static HTML files...\n');

  let processed = 0;
  let skipped = 0;

  // --- 1. Static pages ---
  console.log('Processing static pages...');
  for (const [route, meta] of Object.entries(staticPages)) {
    const filePath = resolveFilePath(route);
    if (processFile(filePath, meta)) {
      processed++;
    } else {
      console.log(`  – skipped ${route} (file not found)`);
      skipped++;
    }
  }

  // /heise without trailing slash produces dist/heise.html
  const heiseMeta = staticPages['/heise/'];
  if (heiseMeta) {
    const heisePath = path.join(BUILD_DIR, 'heise.html');
    if (processFile(heisePath, heiseMeta)) processed++;
  }

  // --- 2. Blog index + pagination ---
  console.log('\nProcessing blog index and pagination...');
  const blogBaseMeta = {
    title: 'Official Search Guard blog - news about security for Elasticsearch',
    description:
      'This is the official Search Guard blog. Here you can find articles, guidelines and news about Search Guard, new features and security for Elasticsearch.',
  };

  // Blog index /blog/
  const blogIndexPath = resolveFilePath('/blog/');
  if (
    processFile(blogIndexPath, {
      ...blogBaseMeta,
      canonical: `${SITE_URL}/blog/`,
    })
  ) {
    processed++;
  }

  // Pagination pages /blog/page/1/ … /blog/page/N/
  const postsPerPage = 10;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const pageMeta = {
      ...blogBaseMeta,
      title:
        i === 1
          ? blogBaseMeta.title
          : `Official Search Guard blog - Page ${i} | Search Guard`,
      canonical: `${SITE_URL}/blog/page/${i}/`,
    };
    if (processFile(resolveFilePath(`/blog/page/${i}/`), pageMeta)) {
      processed++;
    } else {
      skipped++;
    }
  }

  // --- 3. Blog posts ---
  console.log('\nProcessing blog posts...');
  posts.forEach((post) => {
    if (!post.fields || !post.fields.slug) return;

    const slug = post.fields.slug.replace(/\/$/, '');
    const title = post.fields.htmlTitle || post.fields.title;
    const description = post.fields.htmlDescription || post.fields.title;
    const ogImage = post.fields.postImage
      ? getImageUrl(post.fields.postImage)
      : null;

    const meta = {
      title,
      description,
      canonical: `${SITE_URL}/blog/${slug}/`,
      ogImage,
      ogType: 'article',
      twitterCard: 'summary_large_image',
    };

    const postPath = path.join(BUILD_DIR, 'blog', slug, 'index.html');
    if (processFile(postPath, meta)) {
      processed++;
    } else {
      skipped++;
    }
  });

  // --- 4. Blog categories ---
  console.log('\nProcessing blog categories...');
  const categories = new Set();
  posts.forEach((post) => {
    if (post.fields && post.fields.category) {
      categories.add(post.fields.category);
    }
  });

  if (categories.size === 0) {
    console.log('  (no categories found)');
  }

  categories.forEach((category) => {
    const meta = {
      title: `${category} - Search Guard Blog`,
      description: `Search Guard blog posts about ${category}. Articles, guidelines and news about ${category} for Elasticsearch.`,
      canonical: `${SITE_URL}/blog/category/${category}/`,
    };
    if (processFile(resolveFilePath(`/blog/category/${category}/`), meta)) {
      processed++;
    } else {
      skipped++;
    }
  });

  // --- 5. Author pages ---
  console.log('\nProcessing author pages...');
  persons.forEach((person) => {
    if (!person.fields || !person.fields.slug) return;

    const slug = person.fields.slug.replace(/\/$/, '');
    const fullName = `${person.fields.firstName} ${person.fields.lastName}`;
    const description =
      person.fields.htmlDescription ||
      person.fields.shortDescription ||
      `${fullName} - Search Guard Author`;
    const ogImage = person.fields.avatar
      ? getImageUrl(person.fields.avatar)
      : null;

    const meta = {
      title: `Search Guard Author: ${fullName}`,
      description,
      canonical: `${SITE_URL}/author/${slug}/`,
      ogTitle: fullName,
      ogDescription: description,
      ogImage,
      ogType: 'article',
      twitterCard: 'summary_large_image',
    };

    // The route is /author/{slug}/ — SSG creates dist/author/{slug}/index.html
    const authorPath = path.join(BUILD_DIR, 'author', slug, 'index.html');
    if (processFile(authorPath, meta)) {
      processed++;
    } else {
      // Fall back to dist/author/{slug}.html (no trailing slash route)
      const altPath = path.join(BUILD_DIR, 'author', `${slug}.html`);
      if (processFile(altPath, meta)) {
        processed++;
      } else {
        console.log(`  – skipped /author/${slug} (file not found)`);
        skipped++;
      }
    }
  });

  // --- 6. Whitepaper article pages ---
  console.log('\nProcessing whitepapers...');
  whitepapers.forEach((wp) => {
    if (!wp.fields || !wp.fields.slug) return;

    const slug = wp.fields.slug.replace(/\/$/, '');
    const title = wp.fields.title.trim();
    const description = wp.fields.description || title;
    const ogImage = wp.fields.cover ? getImageUrl(wp.fields.cover) : null;

    const meta = {
      title,
      description,
      canonical: `${SITE_URL}/whitepapers/${slug}/`,
      ogTitle: title,
      ogDescription: description,
      ogImage,
      ogType: 'article',
      twitterCard: 'summary',
    };

    // Route is /whitepapers/{slug} (slug has trailing slash → ends with /)
    // SSG creates dist/whitepapers/{slug}/index.html
    const wpPath = path.join(BUILD_DIR, 'whitepapers', slug, 'index.html');
    if (processFile(wpPath, meta)) {
      processed++;
    } else {
      const altPath = path.join(BUILD_DIR, 'whitepapers', `${slug}.html`);
      if (processFile(altPath, meta)) {
        processed++;
      } else {
        console.log(`  – skipped /whitepapers/${slug} (file not found)`);
        skipped++;
      }
    }
  });

  // --- Summary ---
  console.log('\n' + '='.repeat(50));
  console.log('✅ SEO meta tags injection complete!');
  console.log('='.repeat(50));
  console.log(`   Processed: ${processed}`);
  console.log(`   Skipped (file not found): ${skipped}`);
  console.log('='.repeat(50) + '\n');
}

// Run if called directly
if (require.main === module) {
  processSite();
}

module.exports = { processSite };
