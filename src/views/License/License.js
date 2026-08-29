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
import FaqAccordion from '../../components/FaqAccordion/FaqAccordion';
import ColumnedTile from '../../components/Tiles/ColumnedTile/ColumnedTile';
import ContactFormSuperSlimOnlyNoNL from '../../components/ContactFormSuperSlimOnlyNoNL';
import Button from '../../components/Button/Button';
import { useLocalizedPath } from '../../i18n/useLocalizedPath';
import { toAbsoluteSiteUrl, toLocalePath } from '../../utils/urlUtils';
// FA6 Free SVGs (How pricing works strip)
import iconServer from '../../images/server-solid.svg';
import iconGrowth from '../../images/arrow-up-right-dots-solid.svg';
import iconBranch from '../../images/code-branch-solid.svg';
import iconRocket from '../../images/rocket-solid.svg';

const License = () => {
    const { t, i18n } = useTranslation('license');
    const lp = useLocalizedPath();
    const locale = i18n?.resolvedLanguage || i18n?.language || 'en';

    useEffect(() => {
        initGA();
        PageView();
    }, []);

    const breadcrumb = [
        {id: 1, anchor: toLocalePath('/', locale), name: t('breadcrumb.home')},
        {id: 2, anchor: toLocalePath('/licensing/', locale), name: t('breadcrumb.licensing')},
    ];

    // §4.2 "How pricing works" strip — four items on the ColumnedTile grid.
    const howItWorks = [
        { icon: iconServer, key: 'perCluster' },
        { icon: iconGrowth, key: 'unlimitedNodes' },
        { icon: iconBranch, key: 'devStaging' },
        { icon: iconRocket, key: 'trial' },
    ].map(({icon, key}) => ({
        headline: t(`howItWorks.${key}.headline`),
        text: t(`howItWorks.${key}.text`),
        image: {
            src: icon,
            width: 100,
            height: 100,
        },
    }));

    // §4.8 Licensing FAQ — six items, also emitted as FAQPage JSON-LD.
    const pricingFaq = [1, 2, 3, 4, 5, 6].map((i) => ({
        question: t(`pricingFaq.q${i}`),
        answer: t(`pricingFaq.a${i}`),
    }));

    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: pricingFaq.map((entry) => ({
            '@type': 'Question',
            name: entry.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: entry.answer,
            },
        })),
    };

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
                <script type="application/ld+json">
                    {JSON.stringify(faqJsonLd)}
                </script>
            </Helmet>

            {/* §4.1 Page header */}
            <Title
                headline={t('title.headline')}
                text={t('title.text')}
                breadcrumb={breadcrumb}
            />

            {/* §4.2 How pricing works — the model in ten seconds */}
            <div className="how-pricing-works">
                <ColumnedTile
                    colorschema="light"
                    wrapperclass="default-padding-top-bottom"
                    headline={t('howItWorks.headline')}
                    columns={howItWorks}
                    alignedHeadlines
                />
                <div className="color-schema-light how-pricing-works-note-wrapper">
                    <p className="how-pricing-works-note">{t('howItWorks.note')}</p>
                </div>
            </div>

            {/* §4.3 Edition cards with tabs, badge, and quote links */}
            <LicensingModel
                headline={t('editions.headline')}
                headlineTag="h2"
                colorschema="white"
                topButtons
                tableView={false}
                popularBadge
                quoteButton={{ text: t('editions.quoteButton'), href: '#quote' }}
            />

            {/* §4.4 + §4.5 Feature comparison (anchor preserved) */}
            <div id="feature" className="row default-padding-top-bottom">
                <div className="col s12">
                    <h2>{t('featureBreakdown.heading')}</h2>
                    <p className="licensing-table-intro">{t('tableIntro')}</p>
                </div>
                <div className="col s12">
                    <FeatureBreakdown/>
                </div>
                <div className="col s12">
                    <p className="licensing-table-cta">
                        {t('tableCta.text')}{' '}
                        <a href={lp('/contacts/')}>{t('tableCta.link')}</a>
                    </p>
                </div>
            </div>

            {/* §4.6 Academic & OEM — buttons lead to the on-page quote form */}
            <div id="academic">
                <CustomizeLicense colorschema="light" buttonHref="#quote"/>
            </div>

            {/* §4.7 Quote section with embedded form */}
            <div id="quote" className="color-schema-dark default-padding-top-bottom quote-section">
                <div className="row">
                    <div className="col s12 l5">
                        <div className="quote-section-text">
                            <h2 className="quote-section-headline">{t('quote.headline')}</h2>
                            <p>{t('quote.text')}</p>
                            <ul className="quote-section-trust">
                                <li>{t('quote.bullet1')}</li>
                                <li>{t('quote.bullet2')}</li>
                                <li>{t('quote.bullet3')}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col s12 l7">
                        <div className="quote-form-card">
                            <ContactFormSuperSlimOnlyNoNL/>
                        </div>
                        <p className="quote-section-alt">
                            {t('quote.altText')}{' '}
                            <a href={lp('/contacts/')}>{t('quote.altLink')}</a>
                        </p>
                    </div>
                </div>
            </div>

            {/* §4.8 Licensing FAQ */}
            <div className="color-schema-white default-padding-top-bottom pricing-faq">
                <div className="row">
                    <div className="col s12">
                        <h2 className="pricing-faq-headline">{t('pricingFaq.headline')}</h2>
                    </div>
                    <div className="col s12 l8 offset-l2">
                        <FaqAccordion items={pricingFaq}/>
                        <p className="pricing-faq-more">
                            {t('pricingFaq.moreText')}{' '}
                            <a href={lp('/faq/')}>{t('pricingFaq.moreLink')}</a>
                        </p>
                    </div>
                </div>
            </div>

            {/* §4.9 Customer logos */}
            <FilledDivider colorschema="white"/>
            <References/>

            {/* §4.10 Final CTA — trial primary, quote secondary */}
            <div className="color-schema-white default-padding-top-bottom licensing-final-cta">
                <div className="row">
                    <div className="col s12">
                        <div className="licensing-final-cta-buttons">
                            <Button text={t('finalCta.trial')} link={lp('/search-guard-free-trial/')}/>
                            <a className="licensing-quote-link" href="#quote">{t('finalCta.quote')}</a>
                        </div>
                    </div>
                </div>
            </div>

            <PreFooter/>
        </PageWrapper>
    );
};

export default License;
