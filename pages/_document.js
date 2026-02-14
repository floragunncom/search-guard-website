import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { HelmetProvider } from 'react-helmet-async';

const toArray = (value) => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

const getTextContent = (value) => {
  if (value == null) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (Array.isArray(value)) return value.map((entry) => getTextContent(entry)).join('');
  if (React.isValidElement(value)) return getTextContent(value.props?.children);
  return '';
};

const hasMetaTag = (metaComponents, matcher) =>
  metaComponents.some((meta) => React.isValidElement(meta) && matcher(meta.props || {}));

const getMetaContent = (metaComponents, matcher) => {
  const found = metaComponents.find((meta) => React.isValidElement(meta) && matcher(meta.props || {}));
  return found?.props?.content || '';
};

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const helmetContext = {};
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) =>
          function EnhanceApp(props) {
            return (
              <HelmetProvider context={helmetContext}>
                <App {...props} />
              </HelmetProvider>
            );
          },
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      helmet: helmetContext.helmet,
    };
  }

  getHtmlLang() {
    const routePath = this.props?.__NEXT_DATA__?.props?.pageProps?.routePath;
    const normalizedRoute = typeof routePath === 'string' ? routePath : '/';

    const germanRoutes = new Set([
      '/datenschutz/',
      '/impressum/',
      '/press/de/elasticsearch-dsgvo/',
      '/press/de/search-guard-alerting/',
      '/press/de/search-guard-vertrieb-dach/',
    ]);

    return germanRoutes.has(normalizedRoute) ? 'de' : 'en';
  }

  render() {
    const helmet = this.props.helmet;
    const htmlLang = this.getHtmlLang();
    const titleComponents = toArray(helmet?.title?.toComponent());
    const metaComponents = toArray(helmet?.meta?.toComponent());
    const linkComponents = toArray(helmet?.link?.toComponent());
    const scriptComponents = toArray(helmet?.script?.toComponent());

    const titleText = getTextContent(titleComponents).trim();
    const descriptionText = getMetaContent(
      metaComponents,
      (props) => typeof props.name === 'string' && props.name.toLowerCase() === 'description'
    );

    const normalizedMetaComponents = [...metaComponents];

    if (
      titleText &&
      !hasMetaTag(
        normalizedMetaComponents,
        (props) => typeof props.property === 'string' && props.property.toLowerCase() === 'og:title'
      )
    ) {
      normalizedMetaComponents.push(<meta key="derived-og-title" property="og:title" content={titleText} />);
    }

    if (
      descriptionText &&
      !hasMetaTag(
        normalizedMetaComponents,
        (props) => typeof props.property === 'string' && props.property.toLowerCase() === 'og:description'
      )
    ) {
      normalizedMetaComponents.push(
        <meta key="derived-og-description" property="og:description" content={descriptionText} />
      );
    }

    if (
      titleText &&
      !hasMetaTag(
        normalizedMetaComponents,
        (props) => typeof props.name === 'string' && props.name.toLowerCase() === 'twitter:title'
      )
    ) {
      normalizedMetaComponents.push(<meta key="derived-twitter-title" name="twitter:title" content={titleText} />);
    }

    if (
      descriptionText &&
      !hasMetaTag(
        normalizedMetaComponents,
        (props) => typeof props.name === 'string' && props.name.toLowerCase() === 'twitter:description'
      )
    ) {
      normalizedMetaComponents.push(
        <meta key="derived-twitter-description" name="twitter:description" content={descriptionText} />
      );
    }

    return (
      <Html lang={htmlLang}>
        <Head>
          {titleComponents}
          {normalizedMetaComponents}
          {linkComponents}
          {scriptComponents}

          <link rel="preload" href="/assets/fonts/Inter-Regular.ttf" as="font" type="font/ttf" crossOrigin="" />
          <link rel="preload" href="/assets/fonts/Parafina-BoldS.otf" as="font" type="font/otf" crossOrigin="" />
          <link rel="preload" href="/assets/fonts/Parafina-BlackS.otf" as="font" type="font/otf" crossOrigin="" />
          <link rel="preload" href="/assets/fonts/Material-Icons.woff2" as="font" type="font/woff2" crossOrigin="" />
          <link rel="preload" as="style" href="/assets/materialize.min.css" />
          <link rel="preload" as="style" href="/assets/fonts/fonts.css" />
          <link rel="preload" as="style" href="/assets/legacy.css" />
          <link
            rel="preload"
            href="https://cdn.cookie-script.com/s/a521e590130162749ba95a6c3ffc0462.js"
            as="script"
          />

          <link rel="stylesheet" href="/assets/materialize.min.css" />
          <link rel="stylesheet" href="/assets/fonts/fonts.css" />
          <link rel="stylesheet" href="/assets/legacy.css" />
          <script
            type="text/javascript"
            src="https://cdn.cookie-script.com/s/a521e590130162749ba95a6c3ffc0462.js"
            async
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="/assets/materialize.min.js" defer />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
