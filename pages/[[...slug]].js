import React from 'react';
import fs from 'fs/promises';
import path from 'path';
import NextRoutesApp from '../src/NextRoutesApp';

const CatchAllPage = ({ routePath }) => {
  return <NextRoutesApp location={routePath} />;
};

export const getStaticPaths = async () => {
  const excludedRoutes = new Set(['/404/', '/500/']);

  const toRoute = (value) => {
    if (!value) {
      return '/';
    }

    const prefixed = value.startsWith('/') ? value : `/${value}`;
    return prefixed.endsWith('/') ? prefixed : `${prefixed}/`;
  };

  const routesSource = await fs.readFile(path.join(process.cwd(), 'src/Routes.js'), 'utf8');
  const posts = JSON.parse(
    await fs.readFile(path.join(process.cwd(), 'src/Api/contentfulPosts.json'), 'utf8'),
  );
  const authors = JSON.parse(
    await fs.readFile(path.join(process.cwd(), 'src/Api/contentfulPersons.json'), 'utf8'),
  );
  const whitepapers = JSON.parse(
    await fs.readFile(path.join(process.cwd(), 'src/Api/contentfulWhitepapers.json'), 'utf8'),
  );

  const pathMatches = [...routesSource.matchAll(/\bpath\s*=\s*["']([^"']+)["']/g)];
  const staticRoutes = pathMatches
    .map((match) => match[1])
    .filter((routePath) => !routePath.includes(':'))
    .map((routePath) => toRoute(routePath));

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
  const routes = [
    ...new Set([
      ...staticRoutes,
      ...postRoutes,
      ...paginatedBlogRoutes,
      ...categoryRoutes,
      ...authorRoutes,
      ...whitepaperRoutes,
    ]),
  ]
    .filter((routePath) => !excludedRoutes.has(routePath))
    .sort();

  return {
    paths: routes,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const segments = Array.isArray(params?.slug)
    ? params.slug
    : typeof params?.slug === 'string'
      ? [params.slug]
      : [];

  const routePath = segments.length > 0 ? `/${segments.join('/')}/` : '/';

  return {
    props: {
      routePath,
    },
  };
};

export default CatchAllPage;
