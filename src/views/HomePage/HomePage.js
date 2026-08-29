import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';
import {initGA, PageView} from '../../components/Tracking/Tracking';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import HomeHero from '../../components/Hero/HomeHero';
import WhySearchGuard from '../../components/WhySearchGuard/WhySearchGuard';
import ProductPillars from '../../components/ProductPillars/ProductPillars';
import TrustedBy from '../../components/TrustedBy/TrustedBy';
import TrustBar from '../../components/TrustBar/TrustBar';
import QuickstartStrip from '../../components/QuickstartStrip/QuickstartStrip';
import LicensingModel from '../../components/LicensingModel/LicensingModel';
import Quotes from '../../components/Quotes/Quotes';
import FinalCTA from '../../components/FinalCTA/FinalCTA';
import PreFooter from '../../components/PreFooter/PreFooter';
import { toAbsoluteSiteUrl } from '../../utils/urlUtils';

const HomePage = () => {
    const { t, i18n } = useTranslation('home');
    const locale = i18n?.resolvedLanguage || i18n?.language || 'en';

    useEffect(() => {
        initGA();
        PageView();
    }, []);

    return (
        <PageWrapper background="#184962">
            <Helmet>
                <meta charSet="utf-8"/>
                <title>{t('meta.title')}</title>
                <meta name="description" content={t('meta.description')}/>
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebSite',
                        name: 'Search Guard',
                        url: toAbsoluteSiteUrl('/', locale),
                        potentialAction: {
                            '@type': 'SearchAction',
                            target: `${toAbsoluteSiteUrl('/', locale)}?q={search_term_string}`,
                            'query-input': 'required name=search_term_string',
                        },
                    })}
                </script>
            </Helmet>
            {/* 1. Hero — rewritten, dual CTA (Task 1) */}
            <HomeHero/>
            {/* 2. Why Search Guard — replaces the three ImageTextTiles (Task 2) */}
            <WhySearchGuard colorschema="light"/>
            {/* 3. Product pillars — the suite story, replaces Services (Task 3) */}
            <ProductPillars colorschema="dark"/>
            {/* 4. Trust bar — logo wall + trust items; TrustBar replaces Labels (Task 4) */}
            <TrustedBy/>
            <TrustBar/>
            {/* 5. 60-second quickstart (Task 5) */}
            <QuickstartStrip/>
            {/* 6. Pricing teaser — new headline + intro via home.json (Task 6) */}
            <LicensingModel
                topButtons
                headline={t('licensing.headline')}
                subheadline={t('licensing.intro')}
                popularBadge
                quoteButton={{ text: t('licensing.quoteButton'), href: '/licensing/#quote' }}
                tableView={false}
            />
            {/* 7. Social proof — trim quotes content separately (Task 7) */}
            <Quotes/>
            {/* 8. Final CTA — replaces CTAStartFreeTrial (Task 8) */}
            <FinalCTA colorschema="white"/>
            <PreFooter/>
        </PageWrapper>
    );
};

export default HomePage;
