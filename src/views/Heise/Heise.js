import React from 'react';
import { Helmet } from 'react-helmet';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import './Heise.scss';
import ContactFormSlimOnly from "../../components/ContactFormSuperSlimOnly";

const breadcrumb = [
    { anchor: '/', name: 'Home' },
    { anchor: '/search-guard-free-trial/', name: 'Start free trial' }
];

const Heise = () => {
    return (
        <PageWrapper>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Start your free Search Guard Trial now</title>
                <link rel="canonical" href="https://search-guard.com/elasticsearch-reduce-cost/" />
                <meta
                    name="description"
                    content="Use Search Guard to reduce your TCO of Elasticsearch and Kibana"
                />
            </Helmet>
            <Title
                headline="Scale your cluster, not your cost"
                text="Use Search Guard to reduce your TCO of Elasticsearch and Kibana"

            />


            <div className="tco-wrapper" >
            </div>

            <div className="row free-trial">
                <div className="free-trial-headline">Any Questions? Drop us a line!</div>

                <div className="free-trial-section" >
                    <div className="free-trial-content">
                        <div className="free-trial-content-text">
                            <ContactFormSlimOnly/>
                        </div>
                    </div>
                </div>

            </div>

            <PreFooter />
        </PageWrapper>
    );
};

export default Heise;
