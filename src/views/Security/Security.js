import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
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
import { toAbsoluteSiteUrl, toLocalePath } from '../../utils/urlUtils';

const Security = () => {
    const { t, i18n } = useTranslation('security');
    const locale = i18n?.resolvedLanguage || i18n?.language || 'en';

    useEffect(() => {
        initGA();
        PageView();
    }, []);

    const breadcrumb = [
        {id: 1, anchor: toLocalePath('/', locale), name: t('breadcrumb.home')},
        {id: 2, anchor: toLocalePath('/security/', locale), name: t('breadcrumb.security')},
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
                        name: 'Search Guard Security',
                        applicationCategory: 'SecurityApplication',
                        operatingSystem: 'Linux, Windows, macOS',
                        url: toAbsoluteSiteUrl('/security/', locale),
                        description: 'Security suite for Elasticsearch and Kibana with access control, encryption, audit logging and compliance features.',
                        offers: {
                            '@type': 'Offer',
                            priceCurrency: 'USD',
                            availability: 'https://schema.org/InStock',
                            url: toAbsoluteSiteUrl('/search-guard-free-trial/', locale),
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
                    icon={handsHolding}
                    iconPosition="left"
                    colorschema="dark"
                    headline={t('section1.headline')}
                    text={t('section1.text')}
                />
            </div>
            <ImageTextTile
                icon={tableCellsLock}
                iconPosition="right"
                colorschema="light"
                headline={t('section2.headline')}
                text={t('section2.text')}
            />
            <ImageTextTile
                icon={umbrella}
                iconPosition="left"
                colorschema="dark"
                headline={t('section3.headline')}
                text={t('section3.text')}
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
