import React from 'react';
import {Helmet} from 'react-helmet';
import './EncryptionAtRest.scss';
import PreFooter from '../../components/PreFooter/PreFooter';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import ImageTextTile from '../../components/Tiles/ImageTextTile/ImageTextTile';
import FilledDivider from '../../components/FilledDivider/FilledDivider';
import ColumnedTile from "../../components/Tiles/ColumnedTile/ColumnedTile";
import lock from "../../images/lock-solid.svg";
import key from "../../images/key-solid.svg";
import shield from "../../images/shield-halved.svg";
import contract from "../../images/file-contract-solid.svg";
import CTAEncryptionAtRest from "../../components/CTA/CTAEncryptionAtRest";

const EncryptionAtRest = () => {


    let eski = [
        {
            headline: "European Cyber Resilience Act Compliance",
            text: "Get ahead of the curve with Encryption at Rest's EU Cyber Resilience Act-ready design. Our cutting-edge encryption and authenticated data structures position you for seamless compliance with European regulations – no last-minute scrambling required!",
        },
        {
            headline: "NIST Framework Alignment",
            text: "Encryption at Rest delivers NIST-aligned protection that security professionals trust. Our encryption technology checks all the right boxes for NIST SP 800-171 compliance, strengthening your security posture with minimal operational overhead.",
        },
    ]

    let benefits = [
        {
            headline: "Container-Ready Security",
            text: "Encryption at Rest installs seamlessly within Docker containers, Kubernetes or on-premise environments, securing your Elasticsearch data with minimal configuration changes to your existing deployment.",
            button: {
                text: "Read the documentation",
                href: "https://docs.search-guard.com/latest/cloud-lock",
                target: "_blank"
            }
        },
        {
            headline: "Regulatory Compliance Made Simple",
            text: "Supercharge your compliance posture with our military-grade encryption. Even if physical storage is compromised, your data remains locked down tight – giving you confidence and peace of mind.",
            button: {
                text: "Read the documentation",
                href: "https://docs.search-guard.com/latest/cloud-lock",
                target: "_blank"
            }
        },
        {
            headline: "Available for Linux, Mac and Windows",
            text: "Encryption at Rest is platform independent and works on Linux, Mac and Windows. Just download and run it.",
            button: {
                text: "Read the documentation",
                href: "https://docs.search-guard.com/latest/cloud-lock",
                target: "_blank"
            }
        },

    ]
    const breadcrumb = [
        {id: 1, anchor: '/', name: 'Home'},
        {id: 1, anchor: '/encryption-at-rest/', name: 'Encryption at Rest'},
    ];

    return (
        <PageWrapper>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>
                    Take full control of your data with Encryption at Rest for Elasticsearch
                </title>
                <link rel="canonical" href="https://search-guard.com/tlstool/"/>
                <meta
                    name="description"
                    content="We provide military-grade Encryption at Rest for Elasticsearch, ensuring complete data sovereignty and compliance with PCI, ISO, SOX and EU regulations. The only standalone plugin that encrypts all Lucene data at its core."
                />
            </Helmet>
            <Title
                headline="Encryption at Rest for Elasticsearch"
                text="Take full control of your data with Encryption at Rest for Elasticsearch indices and snapshots."
                breadcrumb={breadcrumb}
            />
            <div id="concept">
                <ImageTextTile
                    icon={lock}
                    iconPosition="left"
                    colorschema="light"
                    headline="Full Data Protection at Rest"
                    text="Encryption at Rest encrypts all Lucene data files, snapshots, and Elasticsearch translog, ensuring your sensitive information remains secure even when stored on disk in public cloud environments."
                />
            </div>
            <ImageTextTile
                icon={key}
                iconPosition="right"
                colorschema="dark"
                headline="Your Keys, Your Control"
                text="
                    With Encryption at Rest, encryption keys are held exclusively in secure memory on cluster nodes and never stored on disk, giving you complete authority over data access and enabling secure data destruction through simple key removal. Encryption operates at the core Lucene level of Elasticsearch, making it impossible to circumvent - your data is protected from the inside out
        "
            />
            <ImageTextTile
                icon={shield}
                iconPosition="left"
                colorschema="light"
                headline="Security Without Compromise"
                text="
                    Encryption at Rest integrates effortlessly with OpenSearch while maintaining full compatibility with critical features like vector search and k-NN, providing robust security without sacrificing functionality. As a standalone plugin, Encryption at Rest operates independently of any other plugins, giving you maximum flexibility in your security architecture.
                "
            />
            <ImageTextTile
                icon={contract}
                iconPosition="right"
                colorschema="dark"
                headline="Stay Compliant with Confidence"
                text="
                    Meet the stringent requirements of PCI, ISO, SOX, and similar regulations with Encryption at Rest's advanced encryption capabilities, providing the essential documentation and security controls needed for compliance audits.

    "
            />

            <FilledDivider colorschema="white"/>

            <div id="escalationmodel">
                <ColumnedTile colorschema="dark"
                              wrapperclass="default-padding-top-bottom"
                              columns={eski}
                              headline="Meeting Global Security Standards"/>
            </div>
            <div id="benefits">
                <ColumnedTile
                    colorschema="light"
                    wrapperclass="default-padding-top-bottom"
                    columns={benefits}
                    headline="Easy Implementation for Any Environment"
                />
            </div>
            <div id="tryit">
                <CTAEncryptionAtRest colorschema="white"/>
            </div>
            <PreFooter/>
        </PageWrapper>
    );
};

export default EncryptionAtRest;
