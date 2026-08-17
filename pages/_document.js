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

          <link rel="icon" type="image/x-icon" href="/assets/favicon.ico?v=2" />
          <link rel="icon" type="image/png" href="/assets/favicon-96x96.png?v=2" sizes="96x96" />
          <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg?v=2" />
          <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png?v=2" sizes="180x180" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#000000" />
          <meta name="apple-mobile-web-app-title" content="Search Guard" />

          <link rel="preconnect" href="https://images.ctfassets.net" crossOrigin="" />

          <link rel="preload" href="/assets/fonts/Inter-Regular.woff2" as="font" type="font/woff2" crossOrigin="" />
          <link rel="preload" href="/assets/fonts/Parafina-BoldS.woff2" as="font" type="font/woff2" crossOrigin="" />
          <link rel="preload" href="/assets/fonts/Parafina-BlackS.woff2" as="font" type="font/woff2" crossOrigin="" />
          <link rel="preload" href="/assets/fonts/Material-Icons.woff2" as="font" type="font/woff2" crossOrigin="" />
          <link rel="preload" as="style" href="/assets/materialize.min.css" />
          {/* fonts.css is not content-hashed and the origin serves /assets/* with
              max-age=2592000, so returning visitors would keep the 30-day-old copy
              (and its .ttf/.otf sources) after a font change. Bump ?v= whenever
              fonts.css changes — same cache-busting pattern as the favicon above. */}
          <link rel="preload" as="style" href="/assets/fonts/fonts.css?v=2" />
          <link
            rel="preload"
            href="https://cdn.cookie-script.com/s/a521e590130162749ba95a6c3ffc0462.js"
            as="script"
          />

          <link rel="stylesheet" href="/assets/materialize.min.css" />
          <link rel="stylesheet" href="/assets/fonts/fonts.css?v=2" />
          <script
            type="text/javascript"
            src="https://cdn.cookie-script.com/s/a521e590130162749ba95a6c3ffc0462.js"
            async
          />

          {/* Plausible Analytics — cookieless, no consent required */}
          <script
            defer
            data-domain="search-guard.com"
            src="https://plausible.search-guard.com/js/script.file-downloads.outbound-links.js"
          />
          <script
            dangerouslySetInnerHTML={{
              __html:
                'window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}',
            }}
          />

          {/* Google Tag Manager (GTM-TDLZ33C) — gated behind Cookie-Script "performance" consent.
              type="text/plain" keeps it inert until the visitor accepts; Cookie-Script then
              rewrites it to an executable script. */}
          <script
            type="text/plain"
            data-cookiecategory="performance"
            dangerouslySetInnerHTML={{
              __html:
                "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TDLZ33C');",
            }}
          />
          {/* Microsoft Clarity — gated behind Cookie-Script "performance" consent. */}
          <script
            type="text/plain"
            data-cookiecategory="performance"
            dangerouslySetInnerHTML={{
              __html:
                "(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,'clarity','script','y281cr4x0u');",
            }}
          />
        </Head>
        <body>
          {/* Google Tag Manager (noscript fallback) */}
          <noscript>
            <iframe
              title="gtm"
              src="https://www.googletagmanager.com/ns.html?id=GTM-TDLZ33C"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
