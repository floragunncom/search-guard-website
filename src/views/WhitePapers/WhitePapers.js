import React from 'react';
import {Helmet} from 'react-helmet';
import './WhitePapers.scss';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import whitepaperarticles from '../../Api/contentfulWhitepapers.json';
import Button from "../../components/Button/Button";

const whitepapers = [
    {
        image: require("../../images/20200831_HIPAA_Elastic_Stack.jpg"),
        download: require("../../downloads/20200831_HIPAA_Elastic_Stack.pdf"),
        slug: 'hipaa-compliance-elastic-slack/'
    }
];

const breadcrumb = [
    {anchor: '/', name: 'Home'},
    {anchor: '/resource/', name: 'Resources'},
    {anchor: '/whitepapers/', name: 'Whitepapers'},
];

const Whitepapers = () => {
    return (
        <PageWrapper>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>
                    Search Guard Whitepapers for Elasticsearch
                </title>
                <link rel="canonical" href="https://search-guard.com/whitepapers/"/>
                <meta
                    name="description"
                    content="Search Guard whitepapers about security and alerting for Elasticsearch and Kibana"
                />
            </Helmet>
            <Title
                headline="whitepapers"
                text="Search Guard whitepapers about Security and Alerting for Elasticsearch and Kibana"
                breadcrumb={breadcrumb}
            />
            <div className="color-schema-light default-padding-top-bottom">
                <div className="row whitepapers-wrapper">
                    {whitepapers.map(item => {

                        const whitepaperContent = whitepaperarticles.find(
                            entry => entry.fields.slug === item.slug
                        );

                        return (
                            <div className="col m6 s12 center-align">
                              <a
                                    href={item.download}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className=""
                                >
                                    <img
                                        src={item.image}
                                        className="whitepapers-image "
                                        alt="preview imaginery"
                                    />
                                </a>
                                <div className="subtitle whitepapers-headline">{whitepaperContent.fields.title}</div>
                                <div className="whitepapers-text">{whitepaperContent.fields.description}</div>
                                <div className="col m6 s12 center-align">
                                    <div className="whitepapers-download ">
                                        <Button
                                            buttonStyle="light-green-button"
                                            text="Download PDF"
                                            link={item.download}
                                            target="_blank"

                                        />
                                    </div>
                                </div>
                                <div className="col m6 s12 ">
                                    <div className="whitepapers-download ">
                                        <Button
                                            buttonStyle="light-green-button"
                                            text="Read Online"
                                            link={`/whitepapers/${whitepaperContent.fields.slug}`}
                                            target="_blank"

                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <PreFooter/>
            </PageWrapper>
    );
};

export default Whitepapers;
