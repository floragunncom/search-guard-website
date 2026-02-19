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

const normalizeWhitespace = (value) => String(value || '').replace(/\s+/g, ' ').trim();

const truncateAtWord = (value, maxLength) => {
  const text = normalizeWhitespace(value);
  if (!text || text.length <= maxLength) {
    return text;
  }
  const hardCut = text.slice(0, maxLength);
  const lastSpace = hardCut.lastIndexOf(' ');
  return (lastSpace > Math.floor(maxLength * 0.6) ? hardCut.slice(0, lastSpace) : hardCut).trim();
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
    const pageProps = this.props?.__NEXT_DATA__?.props?.pageProps;
    const routePath = typeof pageProps?.routePath === 'string' ? pageProps.routePath : '/';

    // Inherently German routes override the default locale
    const germanRoutes = new Set([
      '/datenschutz/',
      '/impressum/',
      '/press/de/elasticsearch-dsgvo/',
      '/press/de/search-guard-alerting/',
      '/press/de/search-guard-vertrieb-dach/',
    ]);

    if (germanRoutes.has(routePath)) {
      return 'de';
    }

    // Use locale from i18n routing if set
    if (pageProps?.locale) {
      return pageProps.locale;
    }

    return 'en';
  }

  render() {
    const helmet = this.props.helmet;
    const htmlLang = this.getHtmlLang();
    const titleComponents = toArray(helmet?.title?.toComponent());
    const metaComponents = toArray(helmet?.meta?.toComponent());
    const linkComponents = toArray(helmet?.link?.toComponent());
    const scriptComponents = toArray(helmet?.script?.toComponent());

    const titleText = getTextContent(titleComponents).trim();
    const normalizedTitleText = truncateAtWord(titleText, 58);
    const descriptionText = getMetaContent(
      metaComponents,
      (props) => typeof props.name === 'string' && props.name.toLowerCase() === 'description'
    );

    const normalizedMetaComponents = metaComponents.map((meta, index) => {
      if (!React.isValidElement(meta)) {
        return meta;
      }

      const props = meta.props || {};
      const lowerName = typeof props.name === 'string' ? props.name.toLowerCase() : '';
      const lowerProperty = typeof props.property === 'string' ? props.property.toLowerCase() : '';
      const isDescriptionTag =
        lowerName === 'description' || lowerName === 'twitter:description' || lowerProperty === 'og:description';
      const isTitleTag =
        lowerName === 'twitter:title' || lowerProperty === 'og:title';

      if (!isDescriptionTag && !isTitleTag) {
        return meta;
      }

      const content = typeof props.content === 'string' ? props.content : '';
      const normalizedContent = isDescriptionTag
        ? truncateAtWord(content, 150)
        : truncateAtWord(content, 58);

      if (content === normalizedContent) {
        return meta;
      }

      return React.cloneElement(meta, {
        ...props,
        content: normalizedContent,
        key: props.key || `normalized-meta-${index}`,
      });
    });

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
          {normalizedTitleText ? <title>{normalizedTitleText}</title> : titleComponents}
          {normalizedMetaComponents}
          {linkComponents}
          {scriptComponents}

          <link rel="icon" type="image/x-icon" href="/assets/favicon.ico" />
          <link rel="icon" type="image/png" href="/assets/favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
          <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" sizes="180x180" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#000000" />
          <meta name="apple-mobile-web-app-title" content="Search Guard" />

          <link rel="preload" href="/assets/fonts/Inter-Regular.ttf" as="font" type="font/ttf" crossOrigin="" />
          <link rel="preload" href="/assets/fonts/Parafina-BoldS.otf" as="font" type="font/otf" crossOrigin="" />
          <link rel="preload" href="/assets/fonts/Parafina-BlackS.otf" as="font" type="font/otf" crossOrigin="" />
          <link rel="preload" href="/assets/fonts/Material-Icons.woff2" as="font" type="font/woff2" crossOrigin="" />
          <link rel="preload" as="style" href="/assets/materialize.min.css" />
          <link rel="preload" as="style" href="/assets/fonts/fonts.css" />
          <link
            rel="preload"
            href="https://cdn.cookie-script.com/s/a521e590130162749ba95a6c3ffc0462.js"
            as="script"
          />

          <link rel="stylesheet" href="/assets/materialize.min.css" />
          <link rel="stylesheet" href="/assets/fonts/fonts.css" />
          <script
            type="text/javascript"
            src="https://cdn.cookie-script.com/s/a521e590130162749ba95a6c3ffc0462.js"
            async
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
