/**
 * Routes configuration for static site generation
 * This file generates all routes that should be pre-rendered at build time
 */

const fs = require('fs');
const path = require('path');

/**
 * Get all static and dynamic routes for pre-rendering
 */
async function getRoutes() {
  const routes = [
    // Home
    '/',

    // Static pages
    '/contacts/',
    '/security/',
    '/alerting/',
    '/tlstool/',
    '/encryption-at-rest/',
    '/indexmanagement/',
    '/whitepapers/',
    '/compliance/',
    '/company/',
    '/resource/',
    '/licensing/',
    '/faq/',
    '/impressum/',
    '/presentations/',
    '/datenschutz/',
    '/dataprotection/',
    '/outdated-elasticsearch-versions-suppport/',
    '/newsletter/',
    '/thanks/',
    '/error/',
    '/search-guard-free-trial/',
    '/security-information/',
    '/cve-advisory/',
    '/disclosure-policy/',
    '/authors/',
    '/certificates/',
    '/sitemap/',
    '/404/',
    '/search-guard-flx/',
    '/heise/',
    '/heise',

    // Press releases
    '/press/de/search-guard-vertrieb-dach/',
    '/press/en/search-guard-sales-dach/',
    '/press/de/search-guard-alerting/',
    '/press/en/search-guard-alerting/',
    '/press/de/elasticsearch-dsgvo/',
  ];

  // Load blog posts for dynamic routes
  try {
    const postsPath = path.join(__dirname, 'Api/contentfulPosts.json');
    const postsData = fs.readFileSync(postsPath, 'utf8');
    const posts = JSON.parse(postsData);

    // Add blog post routes
    if (Array.isArray(posts)) {
      posts.forEach((post) => {
        if (post.fields && post.fields.slug) {
          routes.push(`/blog/${post.fields.slug}/`);
        }
      });

      // Add blog index
      routes.push('/blog/');

      // Add blog pagination
      const postsPerPage = 10;
      const totalPages = Math.ceil(posts.length / postsPerPage);
      for (let i = 1; i <= totalPages; i++) {
        routes.push(`/blog/page/${i}/`);
      }

      // Add blog categories
      const categories = new Set();
      posts.forEach((post) => {
        if (post.fields && post.fields.category) {
          categories.add(post.fields.category);
        }
      });
      categories.forEach((category) => {
        routes.push(`/blog/category/${category}/`);
      });
    }
  } catch (error) {
    console.warn('Could not load blog posts for SSG:', error.message);
  }

  // Load whitepapers for dynamic routes
  try {
    const whitepapersPath = path.join(__dirname, 'Api/contentfulWhitepapers.json');
    const whitepapersData = fs.readFileSync(whitepapersPath, 'utf8');
    const whitepapers = JSON.parse(whitepapersData);

    if (Array.isArray(whitepapers)) {
      whitepapers.forEach((whitepaper) => {
        if (whitepaper.fields && whitepaper.fields.slug) {
          routes.push(`/whitepapers/${whitepaper.fields.slug}`);
        }
      });
    }
  } catch (error) {
    console.warn('Could not load whitepapers for SSG:', error.message);
  }

  // Load authors for dynamic routes
  try {
    const personsPath = path.join(__dirname, 'Api/contentfulPersons.json');
    const personsData = fs.readFileSync(personsPath, 'utf8');
    const persons = JSON.parse(personsData);

    if (Array.isArray(persons)) {
      persons.forEach((person) => {
        if (person.fields && person.fields.slug) {
          routes.push(`/author/${person.fields.slug}`);
        }
      });
    }
  } catch (error) {
    console.warn('Could not load authors for SSG:', error.message);
  }

  // Remove duplicates and sort
  const uniqueRoutes = [...new Set(routes)].sort();

  console.log(`[SSG] Generating ${uniqueRoutes.length} static pages`);

  return uniqueRoutes;
}

module.exports = { getRoutes };
