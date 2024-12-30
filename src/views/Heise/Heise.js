import React from 'react';
import { Helmet } from 'react-helmet';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import './Heise.scss';
import ContactFormSlimOnly from "../../components/ContactFormSuperSlimOnlyNoNL";
import certificate from "../../images/icon-certificate.svg";
import shieldWheel from "../../images/shield-wheel.svg";
import check from "../../images/icon-check.svg";
import scale from "../../images/scale_your_cluster.svg";
import LicensingModel from "../../components/LicensingModel/LicensingModel";

const Heise = () => {
    return (
        <PageWrapper>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Search Guard reduces your TCO of Elasticsearch and Kibana</title>
                <link rel="canonical" href="https://search-guard.com/elasticsearch-reduce-cost/" />
                <meta
                    name="description"
                    content="Use Search Guard to reduce your TCO of Elasticsearch and Kibana"
                />
            </Helmet>
            <Title
                headline="Scale your cluster,<br/> not your cost."
            />

            <div className="row heise-textbox">
                <div className="heise-tilesimple-headline">
                    Land and expand your Elasticsearch cluster on a fixed budget.
                </div>
                <div className="heise-tilesimple-text">
                    We have helped hundreds of customers to significantly lower their Elasticsearch TCO by switching to Search Guard, the
                    leading Security and Alerting plugin for the Elastic Stack. By leveraging our innovative per-cluster licensing model our customers
                    do not need to worry anymore about increasing their licensing cost when scaling out their clusters. Search Guard also provides an
                    Open Source, completely free of charge Community Edition.
                </div>
            </div>

            <img loading="lazy" alt="Phone Phreak"
                 src={scale}
                 className="heise-image-wrapper heise-image" />

            <div className="securityinfo-wrapper">
                <div className="row">
                    <div className="col s12 m4">
                        <div className="securityinfo-icon-wrapper">
                            <img loading="lazy" src={certificate} alt="certificate icon" />
                        </div>
                        <div className="securityinfo-text-wrapper">
                            <div className="securityinfo-headline">Protects all components of the Elastic stack</div>
                        </div>
                    </div>
                    <div className="col s12 m4">
                        <div className="securityinfo-icon-wrapper">
                            <img loading="lazy" src={shieldWheel} alt="shield icon" />
                        </div>
                        <div className="securityinfo-text-wrapper">
                            <div className="securityinfo-headline">Provides Security and Alerting on all levels</div>
                        </div>
                    </div>
                    <div className="col s12 m4">
                        <div className="securityinfo-icon-wrapper">
                            <img loading="lazy" src={check} alt="checkmark icon" />
                        </div>
                        <div className="securityinfo-text-wrapper">
                            <div className="securityinfo-headline">Supports all industry standards</div>
                        </div>
                    </div>
                </div>
            </div>



            <LicensingModel
                headline="Search Guard Editions"
                topButtons={false}
                plain
            />

            <div className="tco-wrapper" >
            </div>

            <div className="row free-trial">
                <div className="free-trial-headline">Interested? Drop us a line!</div>

                <div className="free-trial-section" >
                    <div className="free-trial-content">
                        <div className="free-trial-content-text">
                            <ContactFormSlimOnly/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="blog-box__postsyoulike">
                <div className="blog-box__headline">Other posts you may like</div>
                <div className="blog-box__container">
                    <a className="blog-box__box" href="/elasticsearch-cost-optimization/">
                        <div className="blog-box__box-image-container">
                            <img loading="lazy" alt="Elasticsearch Cost Optimizations"
                                 src="//images.ctfassets.net/95di84mqkkro/7ou9XscGVTXw0dTiXX25s5/a12456487832418a989af0340dbc4b00/elasticsearch-cost_optimization.jpg?fm=jpg&amp;fl=progressive&amp;w=500&amp;fit=scale"
                                 className="blog-box__box-image" /></div>
                        <div className="blog-box__box-content-headline">Elasticsearch Cost Optimization</div>
                        <div className="blog-box__box-content-info">Jochen Kressin || 2023-03-28</div>
                        <div className="blog-box__box-content-text">How to lower costs and TCO when running large
                            Elasticsearch clusters, while maintaining optimal performance and reliability. ...
                        </div>
                        <div className="blog-box-info-link"><span>read more</span><img
                            src="/static/media/blog-info-arrow-forward.ca770cd2.svg" className="blogpost-arrow"
                            alt="arrow icon" /></div>
                    </a>


                    <a className="blog-box__box" href="/signals-elasticsearch-alerting/">
                        <div className="blog-box__box-image-container">
                            <img loading="lazy" alt="Elasticsearch Cost Optimizations"
                                 src="//images.ctfassets.net/95di84mqkkro/1Lsxx3o8PTyEXsKPLv2GHX/4f6e51589c9da7e7e486955abadbd611/elasticsearch_alerting_search_guard.jpg?fm=jpg&amp;fl=progressive&amp;w=500&amp;fit=scale"
                                 className="blog-box__box-image" /></div>
                        <div className="blog-box__box-content-headline">Signals Alerting: First steps</div>
                        <div className="blog-box__box-content-info">cstaley || 2019-12-12</div>
                        <div className="blog-box__box-content-text">Signals provides free enterprise alerting features for
                            Elasticsearch and is fully compatible with all Search Guard security features. ...
                        </div>
                        <div className="blog-box-info-link"><span>read more</span><img
                            src="/static/media/blog-info-arrow-forward.ca770cd2.svg" className="blogpost-arrow"
                            alt="arrow icon" /></div>
                    </a>

                    <a className="blog-box__box" href="/elasticsearch-kibana-license-change/">
                    <div className="blog-box__box-image-container"><img loading="lazy" alt="Jackpotting"
                                                                        src="//images.ctfassets.net/95di84mqkkro/18qCWMmdDqlSBrfoXdwWec/cb956b670257f70f5f3968b418c646ba/elastic-license-change.jpg?fm=jpg&amp;fl=progressive&amp;w=500&amp;fit=scale"
                                                                        className="blog-box__box-image"/>
                    </div>
                    <div className="blog-box__box-content-headline">Licensing changes to Elasticsearch</div>
                    <div className="blog-box__box-content-info">Jochen Kressin || 2021-02-03</div>
                    <div className="blog-box__box-content-text">Elastic will change the license for Elasticsearch and Kibana
                        from Apache2 to the non Open Source SSPL license. ...
                    </div>
                    <div className="blog-box-info-link"><span>read more</span><img
                        src="/static/media/blog-info-arrow-forward.ca770cd2.svg" className="blogpost-arrow"
                        alt="arrow icon" /></div>
                </a>
                </div>
            </div>
            <PreFooter />
        </PageWrapper>
    );
};

export default Heise;
