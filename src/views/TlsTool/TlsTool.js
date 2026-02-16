import React from 'react';
import {Helmet} from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation('tlsTool');

    let eski = [
        {
            headline: t('support.elasticsearch.headline'),
            text: t('support.elasticsearch.text'),
        },
        {
            headline: t('support.kibana.headline'),
            text: t('support.kibana.text'),
        },
    ]

    let benefits = [
        {
            headline: t('benefits.free.headline'),
            text: t('benefits.free.text'),
            button: {
                text: t('benefits.free.button'),
                href: "https://git.floragunn.com/search-guard/search-guard-tlstool",
                target: "_blank"
            }
        },
        {
            headline: t('benefits.platform.headline'),
            text: t('benefits.platform.text'),
            button: {
                text: t('benefits.platform.button'),
                href: "https://maven.search-guard.com/artifactory/webapp/#/artifacts/browse/tree/General/search-guard-tlstool/com/floragunn/search-guard-tlstool/3.0.3",
                target: "_blank"
            }
        },
        {
            headline: t('benefits.easy.headline'),
            text: t('benefits.easy.text'),
            button: {
                text: t('benefits.easy.button'),
                href: "https://docs.search-guard.com/latest/offline-tls-tool",
                target: "_blank"
            }
        },
    ]

    const breadcrumb = [
        {id: 1, anchor: '/', name: t('breadcrumb.home')},
        {id: 1, anchor: '/tlstool/', name: t('breadcrumb.tlsTool')},
    ];

    return (
        <PageWrapper>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>
                    {t('meta.title')}
                </title>
                <meta
                    name="description"
                    content={t('meta.description')}
                />
            </Helmet>
            <Title
                headline={t('title.headline')}
                text={t('title.text')}
                breadcrumb={breadcrumb}
            />
            <div id="concept">
                <ImageTextTile
                    icon={lighting}
                    iconPosition="left"
                    colorschema="light"
                    headline={t('setup.headline')}
                    text={t('setup.text')}
                />
            </div>
            <ImageTextTile
                icon={cert}
                iconPosition="right"
                colorschema="dark"
                headline={t('certificates.headline')}
                text={t('certificates.text')}
            />
            <ImageTextTile
                icon={network}
                iconPosition="left"
                colorschema="light"
                headline={t('integration.headline')}
                text={t('integration.text')}
            />
            <ImageTextTile
                icon={check}
                iconPosition="right"
                colorschema="dark"
                headline={t('flexibility.headline')}
                text={t('flexibility.text')}
            />

            <FilledDivider colorschema="white"/>

            <div className="row center">
                <div className="col s12">
                    <div className="video-container video-margin-bottom">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/sq87TJBMlLM?si=P-_pFI2k7tlBBDCP"
                                title="Search Guard TLS Tool"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen>
                        </iframe>
                    </div>
                </div>
            </div>

            <div id="escalationmodel">
                <ColumnedTile colorschema="dark" wrapperclass="default-padding-top-bottom" columns={eski}
                              headline={t('support.headline')}/>
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
