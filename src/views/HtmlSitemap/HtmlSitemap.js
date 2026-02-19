import React from 'react';
import {Helmet} from 'react-helmet-async';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import { ensureTrailingSlash } from '../../utils/urlUtils';
import posts from '../../Api/contentfulPosts.json';
import presentations from '../../Api/presentations.json';
import whitepapers from '../../Api/contentfulWhitepapers.json';
import authors from '../../Api/contentfulPersons.json';

const HtmlSitemap = () => {
    return (
        <PageWrapper>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Search Guard - Security and Alerting for Elasticsearch and Kibana</title>
                <link rel="canonical" href="https://search-guard.com/sitemap/" />
                <meta
                    name="description"
                    content="Search Guard is an Open Source security plugin for Elasticsearch, Kibana and the entire ELK stack. Search Guard offers encryption, authentication, authorization, audit logging, compliance as well as alerting and anomaly detection features."
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
                    <a href="/search-guard-flx/">Search Guard FLX</a><br />
                    <a href="/contacts/">Contact</a><br />
                    <a href="/security/">Security</a><br />
                    <a href="/alerting/">Alerting</a><br />
                    <a href="/anomaly-detection/">Anomaly Detection</a><br />
                    <a href="/whitepapers/">Whitepapers</a><br />
                    <a href="/compliance/">Compliance</a><br />
                    <a href="/company/">About us</a><br />
                    <a href="/resource/">Resource hub</a><br />
                    <a href="/licensing/">Licensing</a><br />
                    <a href="/faq/">FAQ</a><br />
                    <a href="/impressum/">Imprint</a><br />
                    <a href="/presentations/">Presentations</a><br />
                    <a href="/datenschutz/">Data Protection</a><br />
                    <a href="/education-program/">Scientific and Educational License Programme</a><br />
                    <a href="/outdated-elasticsearch-versions-suppport/">Support for old Elasticsearch Versions</a><br />
                    <a href="/security-for-elasticsearch/">Security for Elasticsearch Overview</a><br />
                    <a href="/elasticsearch-kibana-security/">Security for Kibana Overview</a><br />
                    <a href="/search-guard-free-trial/">Search Guard Free Trial</a><br />
                    <a href="/security-information/">Security Information</a><br />
                    <a href="/cve-advisory/">CVE Advisory</a><br />
                    <a href="/disclosure-policy/">Disclosure Policy</a><br />
                </div>
            </div>

            <div className="row textbox">
                <div className="tilesimple-headline">
                    <h2>Blog</h2>
                </div>
                <div className="tilesimple-text default-margin-bottom">
                    {posts.map(post => {
                        return (
                            <>
                                <a href={`/blog/${ensureTrailingSlash(post.fields.slug)}`}>{post.fields.title}</a><br />
                            </>
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
                            <>
                                <a href={`/author/${author.fields.slug}` } rel="author">{author.fields.firstName} {author.fields.lastName}</a><br />
                            </>
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
                            <>
                                <a href={presentation.link}>{presentation.headline}</a><br />
                            </>
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
                            <>
                                <a href={`/whitepapers/${whitepaper.fields.slug}` }>{whitepaper.fields.title}</a><br />
                            </>
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
