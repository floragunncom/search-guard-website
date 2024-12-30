import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet';
import {initGA, PageView} from '../../components/Tracking/Tracking';
import PreFooter from '../../components/PreFooter/PreFooter';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import ImageTextTile from '../../components/Tiles/ImageTextTile/ImageTextTile';
import Cta from '../../components/Cta/Cta';
import Certified from '../../components/Certified/Certified';
import Integrators from '../../components/Integrators/Integrators';
import ctaIcon from '../../images/icon-sg.svg';
import fileCode from '../../images/file-code.svg';
import worldLock from '../../images/world-lock.svg';
import certificate from '../../images/certificate-big.svg';
import handsHolding from '../../images/hands-holding-circle-solid.svg';
import umbrella from '../../images/umbrella-solid.svg';
import tableCellsLock from '../../images/table-cells-column-lock-solid.svg';
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
                    Search Guard Security | Securing your Elasticsearch cluster with Search Guard
                </title>
                <link rel="canonical" href="https://search-guard.com/security/"/>
                <meta
                    name="description"
                    content="Find out more about Search Guard features for Elasticsearch like LDAP, Active Directory, Kerberos/SPNEGO, JSON web token, audit logging, Kibana SSO, Kibana multitenancy, field-level security, document-level security, read histroy, write history, audit log event routing and many more."
                />
            </Helmet>
            <Title
                headline="search guard security"
                text="Pioneering the way forward in security, our technology is engineered to ensure a safe environment around your Elastic Stack - safeguarding data and granting peace of mind."
                breadcrumb={breadcrumb}
            />

            <div id="concept">
                <ImageTextTile
                    icon={handsHolding}
                    iconClass={'filter-icons-color'}
                    iconPosition="left"
                    backgroundColor="dark"
                    headline="Protect Your Data with Confidence"
                    text="Search Guard's battle-proven security features ensure that your Elasticsearch cluster is safeguarded from unauthorized access, data breaches, and cyber threats. With advanced authentication, role-based access control, and document-level security, you can rest assured that your sensitive data is protected."
                />
            </div>
            <ImageTextTile
                icon={tableCellsLock}
                iconClass={'filter-icons-color'}
                iconPosition="right"
                backgroundColor="dark"
                headline="Lock Down Your Elasticsearch Cluster"
                text="Search Guard's comprehensive security suite provides end-to-end protection for your Elasticsearch data. From encryption to audit logging, our features ensure that your data is secure in transit and at rest. Don't leave your cluster vulnerable - secure it with Search Guard today!"
            />
            <ImageTextTile
                icon={umbrella}
                iconClass={'filter-icons-color'}
                iconPosition="left"
                backgroundColor="dark"
                headline="Advanced Security Made Simple"
                text="Search Guard simplifies advanced security for your Elasticsearch cluster. With easy-to-implement features and seamless integration, you can secure your data without compromising on performance or usability."
            />
            <Integrators/>
            <Certified/>
            <div id="quote">
                <Cta
                    headline="Free 60-day Trial"
                    text="Want to see how your company can benefit from Search Guard? Give our 60-day trial a spin, free of charge, no credit card required."
                    ctaText="start free trial"
                    icon={ctaIcon}
                    link="/search-guard-free-trial/"
                />
            </div>
            <PreFooter/>
        </PageWrapper>
    );
};

export default Security;
