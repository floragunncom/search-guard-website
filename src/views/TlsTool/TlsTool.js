import React from 'react';
import {Helmet} from 'react-helmet';
import './TlsTool.scss';
import PreFooter from '../../components/PreFooter/PreFooter';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import ImageTextTile from '../../components/Tiles/ImageTextTile/ImageTextTile';
import FilledDivider from '../../components/FilledDivider/FilledDivider';
import ColumnedTile from "../../components/Tiles/ColumnedTile/ColumnedTile";
import CTATLSTool from "../../components/CTA/CTATLSTool";
import lighting from "../../images/bolt-lightning-solid.svg";
import cert from "../../images/certificate-solid.svg";
import network from "../../images/network-wired-solid.svg";
import check from "../../images/check-solid.svg";

const TlsTool = () => {


    let eski = [
        {
            headline: "Elasticsearch",
            text: "Generate certificates to secure and encrypt the REST API and all traffic flowing inside your cluster.",
        },
        {
            headline: "Kibana",
            text: "Secure and encrypt the communication between Kibana and your Elasticsearch cluster. and only allow access to Kibana via HTTPS.",
        },
    ]

    let benefits = [
        {
            headline: "Free and Apache licensed",
            text: "The Search Guard TLS Tool is completely free and licensed under the Apache v2 license. You can use it for any project, commercial or other, and even bundle it with your own projects.",
            button: {
                text: "Visit our GitLab Repo",
                href: "https://git.floragunn.com/search-guard/search-guard-tlstool",
                target: "_blank"
            }
        },
        {
            headline: "Available for Linux, Mac and Windows",
            text: "Our TLS Tool is platform independant and works on Linux, Mac and Windows. Just download and run it.",
            button: {
                text: "Download now",
                href: "https://maven.search-guard.com/artifactory/webapp/#/artifacts/browse/tree/General/search-guard-tlstool/com/floragunn/search-guard-tlstool/3.0.3",
                target: "_blank"
            }
        },
        {
            headline: "Easy to install, setup and use",
            text: "TLS Tool makes it super easy to generate all certificates you need for Elasticsearch, Kibana and Search Guard. If your cluster grows, simply add more nodes and TLS Tool can generate new certificates for you.",
            button: {
                text: "Read the documenttion",
                href: "https://docs.search-guard.com/latest/offline-tls-tool",
                target: "_blank"
            }
        },

    ]
    const breadcrumb = [
        {id: 1, anchor: '/', name: 'Home'},
        {id: 1, anchor: '/tlstool/', name: 'TLS Tool'},
    ];

    return (
        <PageWrapper>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>
                    Create TLS Certificates for Elasticsearch and Kibana | Search Guard
                </title>
                <link rel="canonical" href="https://search-guard.com/tlstool/"/>
                <meta
                    name="description"
                    content="Search Guard TlsTool for Elasticsearch and Kibana makes it easy to generate all required TLS Certificates. Secure Your Elasticsearch Stack in Minutes."
                />
            </Helmet>
            <Title
                headline="Search Guard TlsTool for Elasticsearch and Kibana"
                text="Search Guard TlsTool for Elasticsearch and Kibana makes it easy to generate all required TLS Certificates. Secure Your Elasticsearch Stack in Minutes."
                breadcrumb={breadcrumb}
            />
            <div id="concept">
                <ImageTextTile
                    icon={lighting}
                    iconPosition="left"
                    colorschema="light"
                    headline="Lightning-Fast Setup"
                    text="
                    Skip the tedious manual certificate creation process. Generate all required certificates for your entire Elasticsearch stack with a single command. What used to take hours now takes minutes, getting you from development to production faster.
          "
                />
            </div>
            <ImageTextTile
                icon={cert}
                iconPosition="right"
                colorschema="dark"
                headline="Production-Ready Certificates"
                text="
                    Rest easy knowing your certificates follow security best practices. Our tool automatically applies industry-standard configurations and security parameters, eliminating common pitfalls and vulnerabilities in manual setups.
        "
            />
            <ImageTextTile
                icon={network}
                iconPosition="left"
                colorschema="light"
                headline="Seamless Integration"
                text="
                    Stop wrestling with configuration files. The tool automatically generates ready-to-use configuration snippets for your elasticsearch.yml. Just copy, paste, and you're good to go - no manual configuration required.
                "
            />
            <ImageTextTile
                icon={check}
                iconPosition="right"
                colorschema="dark"
                headline="Complete Flexibility"
                text="
                    Adapt the tool to your needs with extensive customization options. Whether you're setting up a single node or a complex cluster, our tool handles everything from basic setups to advanced configurations with intermediate CAs.

    "
            />
            <FilledDivider colorschema="white"/>


            <div id="escalationmodel">
                <ColumnedTile colorschema="dark" wrapperclass="default-padding-top-bottom" columns={eski} headline="TLS Support for Elastcsearch and Kibana" />
            </div>
            <div id="benefits">
                <ColumnedTile
                    colorschema="light"
                    wrapperclass="default-padding-top-bottom"
                    columns={benefits}
                />
            </div>
            <div id="tryit">
                <CTATLSTool colorschema="white"/>
            </div>
            <PreFooter/>
        </PageWrapper>
    );
};

export default TlsTool;
