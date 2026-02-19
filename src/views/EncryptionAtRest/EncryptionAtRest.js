import React from 'react';
import {Helmet} from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
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
import { toAbsoluteSiteUrl, toLocalePath } from '../../utils/urlUtils';

const EncryptionAtRest = () => {
    const { t, i18n } = useTranslation('encryptionAtRest');
    const locale = i18n?.resolvedLanguage || i18n?.language || 'en';

    let eski = [
        {
            headline: t('standards.cyberResilience.headline'),
            text: t('standards.cyberResilience.text'),
        },
        {
            headline: t('standards.nist.headline'),
            text: t('standards.nist.text'),
        },
    ]

    let benefits = [
        {
            headline: t('benefits.container.headline'),
            text: t('benefits.container.text'),
            button: {
                text: t('benefits.container.button'),
                href: "https://docs.search-guard.com/latest/encryption-at-rest-introduction",
                target: "_blank"
            }
        },
        {
            headline: t('benefits.regulatory.headline'),
            text: t('benefits.regulatory.text'),
            button: {
                text: t('benefits.regulatory.button'),
                href: "https://docs.search-guard.com/latest/encryption-at-rest-introduction",
                target: "_blank"
            }
        },
        {
            headline: t('benefits.platform.headline'),
            text: t('benefits.platform.text'),
            button: {
                text: t('benefits.platform.button'),
                href: "https://docs.search-guard.com/latest/encryption-at-rest-introduction",
                target: "_blank"
            }
        },
    ]

    const breadcrumb = [
        {id: 1, anchor: toLocalePath('/', locale), name: t('breadcrumb.home')},
        {id: 1, anchor: toLocalePath('/encryption-at-rest/', locale), name: t('breadcrumb.encryptionAtRest')},
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
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'SoftwareApplication',
                        name: 'Search Guard Encryption at Rest',
                        applicationCategory: 'SecurityApplication',
                        operatingSystem: 'Linux, Windows, macOS',
                        url: toAbsoluteSiteUrl('/encryption-at-rest/', locale),
                        description: 'Encryption at Rest for Elasticsearch indices and snapshots with compliance-focused data protection.',
                        offers: {
                            '@type': 'Offer',
                            priceCurrency: 'USD',
                            availability: 'https://schema.org/InStock',
                            url: toAbsoluteSiteUrl('/contacts/', locale),
                        },
                    })}
                </script>
            </Helmet>
            <Title
                headline={t('title.headline')}
                text={t('title.text')}
                breadcrumb={breadcrumb}
            />
            <div id="concept">
                <ImageTextTile
                    icon={lock}
                    iconPosition="left"
                    colorschema="light"
                    headline={t('concept.headline')}
                    text={t('concept.text')}
                />
            </div>
            <ImageTextTile
                icon={key}
                iconPosition="right"
                colorschema="dark"
                headline={t('keys.headline')}
                text={t('keys.text')}
            />
            <ImageTextTile
                icon={shield}
                iconPosition="left"
                colorschema="light"
                headline={t('security.headline')}
                text={t('security.text')}
            />
            <ImageTextTile
                icon={contract}
                iconPosition="right"
                colorschema="dark"
                headline={t('compliance.headline')}
                text={t('compliance.text')}
            />

            <FilledDivider colorschema="white"/>

            <div id="escalationmodel">
                <ColumnedTile colorschema="dark"
                              wrapperclass="default-padding-top-bottom"
                              columns={eski}
                              headline={t('standards.headline')}/>
            </div>
            <div id="benefits">
                <ColumnedTile
                    colorschema="light"
                    wrapperclass="default-padding-top-bottom"
                    columns={benefits}
                    headline={t('benefits.headline')}
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
