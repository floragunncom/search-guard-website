/**
 * Build-time-only module.
 * Maps route patterns to their minimal data needs so getStaticProps
 * can pass only what each page requires via PageDataContext.
 *
 * Uses in-memory caching so JSON is read once per build process.
 */
const fs = require('fs');
const path = require('path');

let postsCache = null;
let personsCache = null;
let whitepapersCache = null;
let presentationsCache = null;
let videosCache = null;

function readJSON(filename) {
  return JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'src/Api', filename), 'utf8'),
  );
}

function getPosts() {
  if (!postsCache) postsCache = readJSON('contentfulPosts.json');
  return postsCache;
}

function getPersons() {
  if (!personsCache) personsCache = readJSON('contentfulPersons.json');
  return personsCache;
}

function getWhitepapers() {
  if (!whitepapersCache) whitepapersCache = readJSON('contentfulWhitepapers.json');
  return whitepapersCache;
}

function getPresentations() {
  if (!presentationsCache) presentationsCache = readJSON('presentations.json');
  return presentationsCache;
}

function getVideos() {
  if (!videosCache) videosCache = readJSON('contentfulVideos.json');
  return videosCache;
}

/** Strip heavy fields from a post, keeping only what listing/card views need */
function toPostSummary(post) {
  const { postContent, audio, video, ...restFields } = post.fields;
  return {
    sys: post.sys,
    fields: restFields,
  };
}

/** Minimal fields for a BlogBox / PostCard display */
function toPostCard(post) {
  return {
    sys: { id: post.sys.id },
    fields: {
      slug: post.fields.slug,
      title: post.fields.title,
      htmlDescription: post.fields.htmlDescription,
      date: post.fields.date,
      author: post.fields.author,
      authorProfile: post.fields.authorProfile || null,
      tags: post.fields.tags,
      postImage: post.fields.postImage,
    },
  };
}

/**
 * Replace all undefined values with null recursively so
 * Next.js getStaticProps serialization does not fail.
 */
function sanitize(obj) {
  return JSON.parse(JSON.stringify(obj, (key, value) =>
    value === undefined ? null : value,
  ));
}

/**
 * Load page-specific data for a given route path.
 * Returns a plain JSON-serializable object (or null).
 */
function loadPageData(routePath) {
  // Blog post detail: /blog/:slug/
  const blogPostMatch = routePath.match(/^\/blog\/([^/]+)\/$/);
  if (blogPostMatch && blogPostMatch[1] !== 'page' && blogPostMatch[1] !== 'category') {
    const slug = blogPostMatch[1];
    const posts = getPosts();
    const post = posts.find(
      (p) => p.fields.slug.replace(/^\/+|\/+$/g, '') === slug,
    );
    if (!post) return { type: 'blogPost', post: null, relatedPosts: [] };

    // Find related posts by first tag, excluding current post
    const primaryTag = post.fields.tags && post.fields.tags[0];
    let related = [];
    if (primaryTag) {
      related = posts
        .filter((p) => p.sys.id !== post.sys.id && p.fields.tags.includes(primaryTag))
        .slice(0, 6)
        .map(toPostCard);
    }
    if (related.length === 0) {
      related = posts
        .filter((p) => p.sys.id !== post.sys.id)
        .slice(0, 6)
        .map(toPostCard);
    }

    return { type: 'blogPost', post, relatedPosts: related };
  }

  // Blog listing: /blog/ or /blog/page/:n/
  const blogPageMatch = routePath.match(/^\/blog\/(?:page\/(\d+)\/)?$/);
  if (blogPageMatch || routePath === '/blog/') {
    const posts = getPosts();
    const postsPerPage = 10;
    const pageNumber = blogPageMatch?.[1] ? parseInt(blogPageMatch[1], 10) : 1;
    const totalPosts = posts.length;
    const start = (pageNumber - 1) * postsPerPage;
    const pagePosts = posts.slice(start, start + postsPerPage).map(toPostSummary);

    // Precompute tag counts from ALL posts (needed for sidebar)
    const tagCounts = {};
    for (const post of posts) {
      for (const tag of post.fields.tags || []) {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      }
    }
    const tags = Object.entries(tagCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    return { type: 'blogListing', posts: pagePosts, totalPosts, tags };
  }

  // Blog category: /blog/category/:slug/
  const categoryMatch = routePath.match(/^\/blog\/category\/([^/]+)\/$/);
  if (categoryMatch) {
    const categorySlug = categoryMatch[1];
    const posts = getPosts();
    const categoryPosts = posts.filter((post) => {
      const tagSlugs = (post.fields.tags || []).map(
        (tag) => tag.toLowerCase().replace(/[ /]/g, '-'),
      );
      return tagSlugs.includes(categorySlug);
    });
    return { type: 'blogCategory', posts: categoryPosts.map(toPostSummary) };
  }

  // Author detail: /author/:slug/ or /author/:slug (without trailing slash)
  const authorMatch = routePath.match(/^\/author\/([^/]+)\/?$/);
  if (authorMatch) {
    const slug = authorMatch[1] + '/';
    const persons = getPersons();
    const person = persons.find((p) => p.fields.slug === slug);
    if (!person) return { type: 'author', person: null, authorPosts: [] };

    const posts = getPosts();
    const authorPosts = posts
      .filter(
        (post) =>
          post.fields.authorProfile &&
          post.fields.authorProfile.sys.id === person.sys.id,
      )
      .slice(0, 8)
      .map(toPostCard);

    return { type: 'author', person, authorPosts };
  }

  // Authors listing: /authors/
  if (routePath === '/authors/') {
    return { type: 'authors', persons: getPersons() };
  }

  // Whitepaper detail: /whitepapers/:slug/ or /whitepapers/:slug
  const wpMatch = routePath.match(/^\/whitepapers\/([^/]+)\/?$/);
  if (wpMatch) {
    const slug = wpMatch[1];
    const whitepapers = getWhitepapers();
    const wp = whitepapers.find(
      (w) => w.fields.slug.replace(/\/+$/g, '') === slug.replace(/\/+$/g, ''),
    );
    return { type: 'whitepaper', whitepaper: wp || null };
  }

  // Whitepapers listing: /whitepapers/
  if (routePath === '/whitepapers/') {
    return { type: 'whitepapers', whitepapers: getWhitepapers() };
  }

  // HTML Sitemap: /sitemap/
  if (routePath === '/sitemap/') {
    const posts = getPosts();
    const persons = getPersons();
    const whitepapers = getWhitepapers();
    const presentations = getPresentations();
    return {
      type: 'sitemap',
      posts: posts.map((p) => ({ slug: p.fields.slug, title: p.fields.title })),
      authors: persons.map((a) => ({
        slug: a.fields.slug,
        firstName: a.fields.firstName,
        lastName: a.fields.lastName,
      })),
      whitepapers: whitepapers.map((w) => ({ slug: w.fields.slug, title: w.fields.title })),
      presentations: presentations.map((p) => ({ headline: p.headline, link: p.link })),
    };
  }

  // Resource hub: /resource/
  if (routePath === '/resource/') {
    const posts = getPosts();
    const videos = getVideos();
    return {
      type: 'resource',
      recentPosts: posts.slice(0, 6).map(toPostCard),
      videos,
    };
  }

  // All other routes: no data needed
  return null;
}

/** Wrapper that sanitizes the result for Next.js serialization */
function loadPageDataSafe(routePath) {
  const data = loadPageData(routePath);
  return data != null ? sanitize(data) : null;
}

module.exports = { loadPageData: loadPageDataSafe };
