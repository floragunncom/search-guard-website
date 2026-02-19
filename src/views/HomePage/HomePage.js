import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';
import {initGA, PageView} from '../../components/Tracking/Tracking';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Hero from '../../components/Hero/Hero';
import SimpleHero from '../../components/Hero/SimpleHero';
import ImageTextTile from '../../components/Tiles/ImageTextTile/ImageTextTile';
import Labels from '../../components/Labels/Labels';
import TrustedBy from '../../components/TrustedBy/TrustedBy';
import PreFooter from '../../components/PreFooter/PreFooter';
import Services from '../../components/Services/Services';
import Quotes from '../../components/Quotes/Quotes';
import LicensingModel from '../../components/LicensingModel/LicensingModel';
import cog_cog from '../../images/cog-cog.svg';
import server_lock from '../../images/server-lock.svg';
import objects_shield from '../../images/objects-shield.svg';
import FilledDivider from "../../components/FilledDivider/FilledDivider";
import CTAStartFreeTrial from "../../components/CTA/CTAStartFreeTrial";
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
                <title>
                    {t('meta.title')}
                </title>
                <meta
                    name="description"
                    content={t('meta.description')}
                />
                <script
                    type="application/ld+json"
                >
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
            <SimpleHero/>
            <ImageTextTile
                icon={server_lock}
                iconPosition="left"
                colorschema="dark"
                headline={t('tile1.headline')}
                text={t('tile1.text')}
            />
            <ImageTextTile
                icon={cog_cog}
                iconPosition="right"
                colorschema="dark"
                headline={t('tile2.headline')}
                text={t('tile2.text')}
            />
            <ImageTextTile
                icon={objects_shield}
                iconPosition="left"
                colorschema="dark"
                headline={t('tile3.headline')}
                text={t('tile3.text')}
            />
            <TrustedBy/>
            <Labels/>
            <FilledDivider colorschema="light"/>
            <Services/>
            <LicensingModel
                topButtons
                headline={t('licensing.headline')}
                tableView={false}
            />
            <CTAStartFreeTrial colorschema="white" />
            <Quotes/>
            <PreFooter/>
        </PageWrapper>
    );
};

export default HomePage;
