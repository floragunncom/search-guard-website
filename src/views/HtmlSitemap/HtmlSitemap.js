import React from 'react';
import {Helmet} from 'react-helmet-async';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import { ensureTrailingSlash, toLocalePath } from '../../utils/urlUtils';
import { isLocalizableRoute } from '../../i18n/locales';
import { useLocale } from '../../i18n/LocaleContext';
import { usePageData } from '../../context/PageDataContext';

// The static page list for this HTML sitemap. Every path here must exist as a
// `<Route path="...">` in src/Routes.js, or the link lands on the catch-all 404.
//
// Deliberately NOT listed:
//   - /security-for-elasticsearch/, /elasticsearch-kibana-security/,
//     /tls-certificate-generator/  -> LegacyRedirect aliases, and blacklisted in
//     scripts/sitemap.js. Linking them from here would contradict the XML sitemap.
//   - /10-years-terms/             -> noindex, deliberately sitemap-excluded.
//   - /heise/, /thanks/, /error/, /404/, /preview/*  -> utility pages.
//   - /sitemap/                    -> this page itself.
//   - /press/*                     -> listed in its own section below.
//
// Paths that appear in LOCALIZABLE_ROUTES (src/i18n/locales.js) are rendered with
// a locale prefix, so /de/sitemap/ links to /de/security/ rather than /security/.
// Everything else (blog, authors, whitepapers, press, legal, /10-years/) exists
// in English only and is always linked at its unprefixed path.
const PAGE_LINKS = [
    { path: '/', label: 'Home' },
    { path: '/search-guard-flx/', label: 'Search Guard FLX' },
    { path: '/security/', label: 'Security' },
    { path: '/alerting/', label: 'Alerting' },
    { path: '/anomaly-detection/', label: 'Anomaly Detection' },
    { path: '/encryption-at-rest/', label: 'Encryption at Rest' },
    { path: '/indexmanagement/', label: 'Index Management' },
    { path: '/tlstool/', label: 'TLS Tool' },
    { path: '/compliance/', label: 'Compliance' },
    { path: '/licensing/', label: 'Licensing' },
    { path: '/search-guard-free-trial/', label: 'Search Guard Free Trial' },
    { path: '/certificates/', label: 'Certificates' },
    { path: '/company/', label: 'About us' },
    { path: '/contacts/', label: 'Contact' },
    { path: '/resource/', label: 'Resource hub' },
    { path: '/blog/', label: 'Blog' },
    { path: '/webinars/', label: 'Webinars' },
    { path: '/presentations/', label: 'Presentations' },
    { path: '/whitepapers/', label: 'Whitepapers' },
    { path: '/authors/', label: 'Authors' },
    { path: '/faq/', label: 'FAQ' },
    { path: '/newsletter/', label: 'Newsletter' },
    { path: '/10-years/', label: '10 Years of Search Guard' },
    { path: '/outdated-elasticsearch-versions-suppport/', label: 'Support for old Elasticsearch Versions' },
    { path: '/security-information/', label: 'Security Information' },
    { path: '/cve-advisory/', label: 'CVE Advisory' },
    { path: '/disclosure-policy/', label: 'Disclosure Policy' },
    { path: '/impressum/', label: 'Imprint' },
    { path: '/datenschutz/', label: 'Datenschutzerklärung (German)' },
    { path: '/dataprotection/', label: 'Data Protection (English)' },
];

const HtmlSitemap = () => {
    const locale = useLocale();
    const pageData = usePageData();
    const posts = pageData?.posts || [];
    const authors = pageData?.authors || [];
    const whitepapers = pageData?.whitepapers || [];
    const presentations = pageData?.presentations || [];

    // Localizable routes follow the visitor's locale; everything else stays on
    // its English path so the link does not 404 on /de/, /es/ or /fr/.
    const hrefFor = (path) => (isLocalizableRoute(path) ? toLocalePath(path, locale) : path);

    return (
        <PageWrapper>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Sitemap | Search Guard</title>
                <link rel="canonical" href={`https://search-guard.com${toLocalePath('/sitemap/', locale)}`} />
                <meta
                    name="description"
                    content="Full index of Search Guard pages: product and security features, licensing, documentation resources, blog posts, whitepapers, presentations and company information."
                />
            </Helmet>
            <Title
                headline="Sitemap"
            />

            <div className="row textbox" style={{marginTop:  '30px'}}>
                <div className="tilesimple-headline">
                    <h2>Pages</h2>
                </div>
                <div className="tilesimple-text default-margin-bottom">
                    {PAGE_LINKS.map(({ path, label }) => (
                        <React.Fragment key={path}>
                            <a href={hrefFor(path)}>{label}</a><br />
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div className="row textbox">
                <div className="tilesimple-headline">
                    <h2>Blog</h2>
                </div>
                <div className="tilesimple-text default-margin-bottom">
                    {posts.map(post => {
                        return (
                            <React.Fragment key={post.slug}>
                                <a href={`/blog/${ensureTrailingSlash(post.slug)}`}>{post.title}</a><br />
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            <div className="row textbox">
                <div className="tilesimple-headline">
                    <h2>Authors</h2>
                </div>
                <div className="tilesimple-text default-margin-bottom">
                    {authors.map(author => {
                        return (
                            <React.Fragment key={author.slug}>
                                <a href={`/author/${author.slug}` } rel="author">{author.firstName} {author.lastName}</a><br />
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            <div className="row textbox">
                <div className="tilesimple-headline" >
                    <h2>Press</h2>
                </div>
                <div className="tilesimple-text default-margin-bottom">
                    <a href="/press/de/search-guard-vertrieb-dach/">Search Guard Sales (DE)</a><br />
                    <a href="/press/en/search-guard-sales-dach/">Search Guard Sales (EN)</a><br />
                    <a href="/press/de/search-guard-alerting/">Search Guard Alerting (DE)</a><br />
                    <a href="/press/en/search-guard-alerting/">Search Guard Alerting (EN)</a><br />
                    <a href="/press/de/elasticsearch-dsgvo/">Search Guard DSGVO (DE)</a><br />
                </div>
            </div>

            <div className="row textbox">
                <div className="tilesimple-headline">
                    <h2>Presentations</h2>
                </div>
                <div className="tilesimple-text default-margin-bottom">
                    {presentations.map(presentation => {
                        return (
                            <React.Fragment key={presentation.link}>
                                <a href={presentation.link}>{presentation.headline}</a><br />
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            <div className="row textbox">
                <div className="tilesimple-headline">
                    <h2>Whitepapers</h2>
                </div>
                <div className="tilesimple-text default-margin-bottom">
                    {whitepapers.map(whitepaper => {
                        return (
                            <React.Fragment key={whitepaper.slug}>
                                <a href={`/whitepapers/${whitepaper.slug}` }>{whitepaper.title}</a><br />
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
            <div className="default-margin-top-bottom" />
            <PreFooter />
        </PageWrapper>
    );
};

export default HtmlSitemap;
