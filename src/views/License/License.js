import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import {initGA, PageView} from '../../components/Tracking/Tracking';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import PreFooter from '../../components/PreFooter/PreFooter';
import Title from '../../components/Title/Title';
import LicensingModel from '../../components/LicensingModel/LicensingModel';
import References from '../../components/References/References';
import CustomizeLicense from '../../components/LicensingModel/CustomizeLicense';
import FilledDivider from '../../components/FilledDivider/FilledDivider';
import FeatureBreakdown from "../../components/FeatureBreakdown/FeatureBreakdown";
import CTAStartFreeTrial from "../../components/CTA/CTAStartFreeTrial";
import { toAbsoluteSiteUrl, toLocalePath } from '../../utils/urlUtils';

const License = () => {
    const { t, i18n } = useTranslation('license');
    const locale = i18n?.resolvedLanguage || i18n?.language || 'en';

    useEffect(() => {
        initGA();
        PageView();
    }, []);

    const breadcrumb = [
        {id: 1, anchor: toLocalePath('/', locale), name: t('breadcrumb.home')},
        {id: 1, anchor: toLocalePath('/licensing/', locale), name: t('breadcrumb.licensing')},
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
                        name: 'Search Guard',
                        applicationCategory: 'SecurityApplication',
                        operatingSystem: 'Linux, Windows, macOS',
                        url: toAbsoluteSiteUrl('/licensing/', locale),
                        description: 'Pricing and editions for Search Guard Security and Alerting for Elasticsearch and Kibana.',
                        offers: [
                            {
                                '@type': 'Offer',
                                name: 'Community Edition',
                                price: '0',
                                priceCurrency: 'USD',
                                availability: 'https://schema.org/InStock',
                            },
                            {
                                '@type': 'Offer',
                                name: 'Enterprise Edition',
                                priceCurrency: 'USD',
                                availability: 'https://schema.org/InStock',
                                url: toAbsoluteSiteUrl('/contacts/', locale),
                            },
                            {
                                '@type': 'Offer',
                                name: 'Compliance Edition',
                                priceCurrency: 'USD',
                                availability: 'https://schema.org/InStock',
                                url: toAbsoluteSiteUrl('/contacts/', locale),
                            },
                        ],
                    })}
                </script>
            </Helmet>
            <Title
                headline={t('title.headline')}
                text={t('title.text')}
                breadcrumb={breadcrumb}
            />
            <LicensingModel
                headline={t('editions.headline')}
                topButtons={false}
                tableView
            />

            <div className="row default-padding-top-bottom">
                <div className="col s12">
                    <h2>{t('featureBreakdown.heading')}</h2>
                </div>
                <div className="col s12">
                    <FeatureBreakdown/>
                </div>
            </div>


            <div id="academic">
                <CustomizeLicense/>
            </div>
            <FilledDivider colorschema="white"/>
            <References/>
            <CTAStartFreeTrial colorschema="white"/>
            <PreFooter/>
        </PageWrapper>
    );
};

export default License;
