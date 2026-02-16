import React from 'react';
import fs from 'fs/promises';
import path from 'path';
import NextRoutesApp from '../src/NextRoutesApp';
import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  LOCALIZABLE_ROUTES,
} from '../src/i18n/locales';

const CatchAllPage = ({ routePath, locale }) => {
  return <NextRoutesApp location={routePath} locale={locale} />;
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

  // Build the localizable routes set for quick lookup
  const localizableSet = new Set(LOCALIZABLE_ROUTES);

  // Generate locale-prefixed paths for localizable routes
  const nonDefaultLocales = SUPPORTED_LOCALES.filter((l) => l !== DEFAULT_LOCALE);
  const localizedRoutes = [];
  for (const route of routes) {
    if (localizableSet.has(route)) {
      for (const locale of nonDefaultLocales) {
        // /alerting/ → /de/alerting/, / → /de/
        const localizedPath = route === '/' ? `/${locale}/` : `/${locale}${route}`;
        localizedRoutes.push(localizedPath);
      }
    }
  }

  return {
    paths: [...routes, ...localizedRoutes],
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const segments = Array.isArray(params?.slug)
    ? params.slug
    : typeof params?.slug === 'string'
      ? [params.slug]
      : [];

  // Check if first segment is a supported non-default locale
  const nonDefaultLocales = new Set(SUPPORTED_LOCALES.filter((l) => l !== DEFAULT_LOCALE));
  let locale = DEFAULT_LOCALE;
  let routeSegments = segments;

  if (segments.length > 0 && nonDefaultLocales.has(segments[0])) {
    locale = segments[0];
    routeSegments = segments.slice(1);
  }

  const routePath = routeSegments.length > 0 ? `/${routeSegments.join('/')}/` : '/';

  return {
    props: {
      routePath,
      locale,
    },
  };
};

export default CatchAllPage;
