import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {initGA, PageView} from '../../components/Tracking/Tracking';
import PreFooter from '../../components/PreFooter/PreFooter';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import ImageTextTile from '../../components/Tiles/ImageTextTile/ImageTextTile';
import Certified from '../../components/Certified/Certified';
import Integrators from '../../components/Integrators/Integrators';
import handsHolding from '../../images/hands-holding-circle-solid.svg';
import umbrella from '../../images/umbrella-solid.svg';
import tableCellsLock from '../../images/table-cells-column-lock-solid.svg';
import CTAStartFreeTrial from "../../components/CTA/CTAStartFreeTrial";

const Security = () => {
    useEffect(() => {
        initGA();
        PageView();
    }, []);

    const breadcrumb = [
        {id: 1, anchor: '/', name: 'Home'},
        {id: 1, anchor: '/security/', name: 'Security'},
    ];

    return (
        <PageWrapper>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>
                    Secure Elasticsearch and Kibana with Search Guard
                </title>
                <link rel="canonical" href="https://search-guard.com/security/"/>
                <meta
                    name="description"
                    content="Secure your Elasticsearch and Kibana installation with Search Guard and add access control, encryption, audit logging and alerting."
                />
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'SoftwareApplication',
                        name: 'Search Guard Security',
                        applicationCategory: 'SecurityApplication',
                        operatingSystem: 'Linux, Windows, macOS',
                        url: 'https://search-guard.com/security/',
                        description: 'Security suite for Elasticsearch and Kibana with access control, encryption, audit logging and compliance features.',
                        offers: {
                            '@type': 'Offer',
                            priceCurrency: 'USD',
                            availability: 'https://schema.org/InStock',
                            url: 'https://search-guard.com/search-guard-free-trial/',
                        },
                    })}
                </script>
            </Helmet>
            <Title
                headline="Security for Elasticsearch and Kibana"
                text="Pioneering the way forward in security, our technology is engineered to ensure a safe environment around your Elastic Stack - safeguarding data and granting peace of mind."
                breadcrumb={breadcrumb}
            />

            <div id="concept">
                <ImageTextTile
                    icon={handsHolding}
                    iconPosition="left"
                    colorschema="dark"
                    headline="Protect Your Data with Confidence"
                    text="Search Guard's battle-proven security features ensure that your Elasticsearch cluster is safeguarded from unauthorized access, data breaches, and cyber threats. With advanced authentication, role-based access control, and document-level security, you can rest assured that your sensitive data is protected."
                />
            </div>
            <ImageTextTile
                icon={tableCellsLock}
                iconPosition="right"
                colorschema="light"
                headline="Lock Down Your Elasticsearch Cluster"
                text="Search Guard's comprehensive security suite provides end-to-end protection for your Elasticsearch data. From encryption to audit logging, our features ensure that your data is secure in transit and at rest. Don't leave your cluster vulnerable - secure it with Search Guard today!"
            />
            <ImageTextTile
                icon={umbrella}
                iconPosition="left"
                colorschema="dark"
                headline="Advanced Security Made Simple"
                text="Search Guard simplifies advanced security for your Elasticsearch cluster. With easy-to-implement features and seamless integration, you can secure your data without compromising on performance or usability."
            />
            <Integrators/>
            <Certified/>
            <div id="quote">
                <CTAStartFreeTrial colorschema="white"/>
            </div>
            <PreFooter/>
        </PageWrapper>
    );
};

export default Security;
