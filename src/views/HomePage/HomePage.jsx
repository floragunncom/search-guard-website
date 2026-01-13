import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {initGA, PageView} from '../../components/Tracking/Tracking';
import PageWrapper from '../../components/PageWrapper/PageWrapper.jsx';
import Hero from '../../components/Hero/Hero.jsx';
import SimpleHero from '../../components/Hero/SimpleHero.jsx';
import ImageTextTile from '../../components/Tiles/ImageTextTile/ImageTextTile.jsx';
import Labels from '../../components/Labels/Labels.jsx';
import TrustedBy from '../../components/TrustedBy/TrustedBy.jsx';
import PreFooter from '../../components/PreFooter/PreFooter.jsx';
import Services from '../../components/Services/Services.jsx';
import Quotes from '../../components/Quotes/Quotes.jsx';
import LicensingModel from '../../components/LicensingModel/LicensingModel.jsx';
import cog_cog from '../../images/cog-cog.svg';
import server_lock from '../../images/server-lock.svg';
import objects_shield from '../../images/objects-shield.svg';
import FilledDivider from "../../components/FilledDivider/FilledDivider.jsx";
import CTAStartFreeTrial from "../../components/CTA/CTAStartFreeTrial.jsx";


const HomePage = () => {
    useEffect(() => {
        initGA();
        PageView();
    }, []);

    return (
        <PageWrapper background="#184962">
            <Helmet>
                <meta charSet="utf-8"/>
                <title>
                    Security and Alerting for Elasticsearch and Kibana | Search Guard
                </title>
                <link rel="canonical" href="https://search-guard.com/"/>
                <meta
                    name="description"
                    content="Search Guard is a security plugin for Elasticsearch and Kibana. Search Guard offers security, audit logging, compliance, alerting and anomaly detection."
                />
            </Helmet>
            <SimpleHero/>
            <ImageTextTile
                icon={server_lock}
                iconPosition="left"
                colorschema="dark"
                headline="Search Guard provides security on all levels"
                text="Search Guard provides an all-encompassing security solution to keep your most confidential data safe. Utilizing RBAC, Search Guard ensures the highest level of protection in your clusters, indices, and documents by adding encryption, authentication, authorization, audit logging, compliance as well as alerting and anomaly detection features."
            />
            <ImageTextTile
                icon={cog_cog}
                iconPosition="right"
                colorschema="dark"
                headline="Search Guard supports all industry standards"
                text="Search Guard supports all industry standards for authentication and authorization like LDAP, Active Directory, OpenID, SAML, Kerberos, JSON web tokens or client certificates. You can chose from a wide variety of modern and highly secure modern cipher suites."
            />
            <ImageTextTile
                icon={objects_shield}
                iconPosition="left"
                colorschema="dark"
                headline="Search Guard protects all components of the Elastic Stack"
                text="Search Guard implements full access control over your entire Elasticsearch environment. Protect all components of the Elastic stack, including Kibana, Logstash and Beats."
            />
            <TrustedBy/>
            <Labels/>
            <FilledDivider colorschema="light"/>
            <Services/>
            <LicensingModel
                topButtons
                headline="Licensing models"
                tableView={false}
            />
            <CTAStartFreeTrial colorschema="white" />
            <Quotes/>
            <PreFooter/>
        </PageWrapper>
    );
};

export default HomePage;
