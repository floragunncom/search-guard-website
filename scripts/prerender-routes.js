const fs = require('fs/promises');
const path = require('path');
const posts = require('../src/Api/contentfulPosts.json');
const authors = require('../src/Api/contentfulPersons.json');
const whitepapers = require('../src/Api/contentfulWhitepapers.json');

const toRoute = (value) => {
  if (!value) {
    return '/';
  }

  const prefixed = value.startsWith('/') ? value : `/${value}`;
  return prefixed.endsWith('/') ? prefixed : `${prefixed}/`;
};

const ROUTES_FILE = path.resolve(__dirname, '../src/Routes.js');

const getStaticRoutes = async () => {
  const routesSource = await fs.readFile(ROUTES_FILE, 'utf8');
  const pathMatches = [...routesSource.matchAll(/\bpath\s*=\s*["']([^"']+)["']/g)];

  const staticRoutes = pathMatches
    .map((match) => match[1])
    .filter((routePath) => !routePath.includes(':'))
    .map((routePath) => toRoute(routePath));

  return [...new Set(staticRoutes)];
};

const getDynamicRoutes = () => {
  const postRoutes = posts.map((post) => toRoute(`/blog/${post.fields.slug}`));

  const totalBlogPages = Math.ceil(posts.length / 10);
  const paginatedBlogRoutes = [];
  for (let i = 2; i <= totalBlogPages; i += 1) {
    paginatedBlogRoutes.push(`/blog/page/${i}/`);
  }

  const categoryRoutes = [
    ...new Set(
      posts
        .flatMap((post) => post.fields.tags || [])
        .map((tag) => tag.toLowerCase().replace(/[ /]/g, '-'))
        .map((slug) => `/blog/category/${slug}/`),
    ),
  ];

  const authorRoutes = authors.map((author) => toRoute(`/author/${author.fields.slug}`));
  const whitepaperRoutes = whitepapers.map((paper) => toRoute(`/whitepapers/${paper.fields.slug}`));

  return [
    ...postRoutes,
    ...paginatedBlogRoutes,
    ...categoryRoutes,
    ...authorRoutes,
    ...whitepaperRoutes,
  ];
};

const getPrerenderRoutes = async () => {
  const staticRoutes = await getStaticRoutes();
  return [...new Set([...staticRoutes, ...getDynamicRoutes()])].sort();
};

module.exports = {
  getStaticRoutes,
  getPrerenderRoutes,
};
