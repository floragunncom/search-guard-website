import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {ReactSVG} from 'react-svg';
import { useTranslation } from 'react-i18next';
import {initGA, PageView} from '../../components/Tracking/Tracking';
import PreFooter from '../../components/PreFooter/PreFooter';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import ColumnedTile from '../../components/Tiles/ColumnedTile/ColumnedTile';
import { Badge } from '../../components/Badge/Badge';
import Button from '../../components/Button/Button';
import FaqAccordion from '../../components/FaqAccordion/FaqAccordion';
import FinalCTA from '../../components/FinalCTA/FinalCTA';
import ContactFormSlimOnly from '../../components/ContactFormSuperSlimOnly';
import { useLocalizedPath } from '../../i18n/useLocalizedPath';
// FA6 Free icons for the auditor-questions grid
import iconUserLock from '../../images/user-lock-solid.svg';
import iconEye from '../../images/eye-solid.svg';
import iconPen from '../../images/pen-to-square-solid.svg';
import iconFileShield from '../../images/file-shield-solid.svg';
import iconLock from '../../images/lock-solid.svg';
import iconBell from '../../images/bell-solid.svg';
// §3.3 diagram — must render INLINE (ReactSVG) so its text picks up the
// site's loaded fonts (Parafina, Inter-Regular, Material Icons ligatures).
import auditFlowDiagram from '../../images/compliance-audit-flow.svg';

import fieldAnonDiagram from '../../images/compliance-field-anonymization.svg';
// §3.5 gallery illustrations — same slots the real screenshots (WebP) will
// take over later; filenames and order are deliberately stable.
import illuAuditDashboard from '../../images/illustration-audit-dashboard.svg';
import illuReadHistory from '../../images/illustration-read-history-event.svg';
import illuWriteDiff from '../../images/illustration-write-history-diff.svg';

// Legacy asset imports resolve to {src}/{default} shapes; the _app patch
// normalizes component props (ReactSVG's src) but not a plain <a href>.
const assetUrl = (asset) =>
    typeof asset === 'string' ? asset : asset?.src || asset?.default || '';

const DOCS = {
    fieldAnonymization: 'https://docs.search-guard.com/latest/field-anonymization',
    fieldLevelSecurity: 'https://docs.search-guard.com/latest/field-level-security',
    readHistory: 'https://docs.search-guard.com/latest/compliance-read-history',
    writeHistory: 'https://docs.search-guard.com/latest/compliance-write-history',
    complianceFeatures: 'https://docs.search-guard.com/latest/compliance-features',
    immutableIndices: 'https://docs.search-guard.com/latest/immutable-indices',
    eventRouting: 'https://docs.search-guard.com/latest/compliance-event-routing',
    auditLogging: 'https://docs.search-guard.com/latest/audit-logging-compliance',
    auditStorage: 'https://docs.search-guard.com/latest/audit-logging-storage',
};

// Diagram/screenshot slots ship as neutral placeholder boxes until the
// assets exist; the real <img> is prepared next to each placeholder with a
// TODO comment and final alt text.
const AssetPlaceholder = ({ alt, ratio }) => (
    <div className={`compliance-asset-placeholder${ratio === 'wide' ? ' compliance-asset-placeholder--wide' : ''}`} role="img" aria-label={alt}>
        <span>Image slot: {alt}</span>
    </div>
);

const docLink = (href, label) => (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
        {label}
    </a>
);

const Compliance = () => {
    const { t } = useTranslation('compliance');
    const lp = useLocalizedPath();

    useEffect(() => {
        initGA();
        PageView();
    }, []);

    const breadcrumb = [
        {anchor: '/', name: t('breadcrumb.home')},
        {anchor: '/compliance/', name: t('breadcrumb.compliance')}
    ];

    // §3.2 The questions an auditor asks: 6 cards, 2 rows of 3.
    const auditorQuestions = [
        { key: 'q1', icon: iconUserLock, links: [[DOCS.fieldAnonymization, 'link1'], [DOCS.fieldLevelSecurity, 'link2']] },
        { key: 'q2', icon: iconEye, links: [[DOCS.readHistory, 'link1']] },
        { key: 'q3', icon: iconPen, links: [[DOCS.writeHistory, 'link1'], [DOCS.complianceFeatures, 'link2']] },
        { key: 'q4', icon: iconFileShield, links: [[DOCS.immutableIndices, 'link1'], [DOCS.eventRouting, 'link2']] },
        { key: 'q5', icon: iconLock, links: [[lp('/encryption-at-rest/'), 'link1']] },
        { key: 'q6', icon: iconBell, links: [[lp('/alerting/'), 'link1']] },
    ].map(({ key, icon, links }) => ({
        headline: t(`auditor.${key}.question`),
        text: (
            <div className="compliance-question-card">
                <p>{t(`auditor.${key}.answer`)}</p>
                <ul className="compliance-question-links">
                    {links.map(([href, labelKey]) => (
                        <li key={labelKey}>{docLink(href, t(`auditor.${key}.${labelKey}`))}</li>
                    ))}
                </ul>
            </div>
        ),
        image: { src: icon, width: 64, height: 64 },
    }));

    // §3.6 Regulation overview table rows.
    // Names come from the locale file: German says DSGVO, Spanish and
    // French say RGPD.
    const regulations = [
        'gdpr', 'hipaa', 'pcidss', 'sox', 'iso27001',
        // REVIEW: confirm NIS2/DORA rows with marketing/legal before release
        'nis2', 'dora',
    ];

    // §3.10 Mini FAQ + FAQPage JSON-LD.
    const faqItems = [1, 2, 3, 4].map((i) => ({
        question: t(`faq.q${i}.question`),
        answer: t(`faq.q${i}.answer`),
    }));

    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((entry) => ({
            '@type': 'Question',
            name: entry.question,
            acceptedAnswer: { '@type': 'Answer', text: entry.answer },
        })),
    };

    // §3.9 Resources: whole card text is the link — no invented button copy.
    const resourceCards = [
        { key: 'webinar', href: lp('/webinars/') },
        { key: 'whitepaper', href: lp('/whitepapers/') },
        { key: 'docs', href: DOCS.complianceFeatures },
    ].map(({ key, href }) => ({
        headline: t(`resources.${key}.type`),
        text: (
            <p className="compliance-resource-link">
                {docLink(href, t(`resources.${key}.text`))}
            </p>
        ),
    }));

    return (
        <PageWrapper>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>{t('meta.title')}</title>
                <meta name="description" content={t('meta.description')}/>
                <script type="application/ld+json">
                    {JSON.stringify(faqJsonLd)}
                </script>
            </Helmet>

            {/* §3.1 Header */}
            <Title
                headline={t('title.headline')}
                text={t('title.text')}
                breadcrumb={breadcrumb}
                buttontext={t('title.buttonTrial')}
                buttonlink={lp('/search-guard-free-trial/')}
                button2text={t('title.buttonAudit')}
                button2link="#compliance-contact"
            />

            {/* §3.2 The questions your auditor will ask */}
            <ColumnedTile
                colorschema="light"
                wrapperclass="default-padding-top-bottom compliance-auditor"
                headline={t('auditor.headline')}
                subheadline={t('auditor.intro')}
                columns={auditorQuestions}
                columnsPerRow={3}
                columnHeadlineTag="h3"
                alignedHeadlines
            />

            {/* §3.3 Audit trail architecture — text on top, diagram full width */}
            <div className="color-schema-white default-padding-top-bottom compliance-architecture">
                <div className="row">
                    <div className="col s12">
                        <h2 className="compliance-section-headline">{t('architecture.headline')}</h2>
                        <div className="compliance-architecture-text">
                            <p>{t('architecture.text')}</p>
                            <div className="compliance-architecture-links">
                                <ul className="compliance-question-links">
                                    <li>{docLink(DOCS.auditLogging, t('architecture.link1'))}</li>
                                    <li>{docLink(DOCS.auditStorage, t('architecture.link2'))}</li>
                                </ul>
                            </div>
                        </div>
                        {/* Diagram keeps its own brand colors — no beforeInjection
                            recoloring. Accessible name comes from the SVG's own
                            <title>/<desc>. The wrapping link is active on mobile
                            only (see SCSS) and opens the raw SVG for zooming. */}
                        <h3 className="compliance-diagram-headline">{t('architecture.diagramHeadline')}</h3>
                        <a
                            className="compliance-audit-flow-link"
                            href={assetUrl(auditFlowDiagram)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ReactSVG
                                src={auditFlowDiagram}
                                className="compliance-audit-flow"
                            />
                        </a>
                        <p className="compliance-diagram-enlarge" aria-hidden="true">{t('architecture.tapToEnlarge')}</p>
                    </div>
                </div>
            </div>

            {/* §3.4 Field anonymization illustration — text on top, diagram full width */}
            <div className="color-schema-dark default-padding-top-bottom compliance-anon-views">
                <div className="row">
                    <div className="col s12">
                        <h2 className="compliance-section-headline">{t('anonViews.headline')}</h2>
                        <p className="compliance-section-intro">{t('anonViews.text')}</p>
                        {/* Inline like the audit-flow diagram: own brand colors,
                            fonts from the document; the SVG's dark background
                            matches this section's colorschema. */}
                        <a
                            className="compliance-audit-flow-link"
                            href={assetUrl(fieldAnonDiagram)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ReactSVG
                                src={fieldAnonDiagram}
                                className="compliance-audit-flow"
                            />
                        </a>
                        <p className="compliance-diagram-enlarge" aria-hidden="true">{t('architecture.tapToEnlarge')}</p>
                    </div>
                </div>
            </div>

            {/* §3.5 Screenshot gallery */}
            <div className="color-schema-white default-padding-top-bottom compliance-gallery">
                <div className="row">
                    <div className="col s12">
                        <h2 className="compliance-section-headline">{t('gallery.headline')}</h2>
                        <p className="compliance-section-intro">{t('gallery.intro')}</p>
                    </div>
                    {/* Full-width stacked illustrations (dense UI content needs
                        the width to stay legible). Slots and order are stable —
                        real screenshots (WebP) will replace them 1:1 later. */}
                    {[
                        // writeDiff's headline was the caption formerly baked into
                        // the artwork; the other two follow the same cadence.
                        { key: 'dashboard', asset: illuAuditDashboard, headline: t('gallery.dashboardHeadline') },
                        { key: 'readEvent', asset: illuReadHistory, headline: t('gallery.readEventHeadline') },
                        { key: 'writeDiff', asset: illuWriteDiff, headline: t('gallery.writeDiffHeadline') },
                    ].map(({ key, asset, headline }) => (
                        <div className="col s12 compliance-gallery-item" key={key}>
                            <h3 className="compliance-diagram-headline">{headline}</h3>
                            <a
                                className="compliance-audit-flow-link"
                                href={assetUrl(asset)}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ReactSVG src={asset} className="compliance-audit-flow"/>
                            </a>
                            <p className="compliance-diagram-enlarge" aria-hidden="true">{t('architecture.tapToEnlarge')}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* §3.6 Regulation overview */}
            <div className="color-schema-light default-padding-top-bottom compliance-regulations">
                <div className="row">
                    <div className="col s12">
                        <h2 className="compliance-section-headline">{t('regulations.headline')}</h2>
                        <p className="compliance-section-intro">{t('regulations.intro')}</p>
                        <div className="compliance-regulations-tablewrap">
                            <table className="compliance-regulations-table">
                                <caption className="visually-hidden">{t('regulations.headline')}</caption>
                                <thead>
                                    <tr>
                                        <th scope="col">{t('regulations.colRegulation')}</th>
                                        <th scope="col">{t('regulations.colRequirements')}</th>
                                        <th scope="col">{t('regulations.colCapabilities')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {regulations.map((key) => (
                                        <tr key={key}>
                                            <th scope="row">{t(`regulations.${key}.name`)}</th>
                                            <td data-label={t('regulations.colRequirements')}>{t(`regulations.${key}.req`)}</td>
                                            <td data-label={t('regulations.colCapabilities')}>{t(`regulations.${key}.cap`)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="compliance-regulations-disclaimer">{t('regulations.disclaimer')}</p>
                    </div>
                </div>
            </div>

            {/* §3.7 Editions */}
            <div className="color-schema-white default-padding-top-bottom compliance-editions">
                <div className="row">
                    <div className="col s12">
                        <h2 className="compliance-section-headline">{t('editions.headline')}</h2>
                    </div>
                    <div className="col s12 m6">
                        <div className="compliance-edition-card">
                            <div className="compliance-edition-badge-slot"/>
                            <h3 className="compliance-edition-name">{t('editions.enterprise.name')}</h3>
                            <p>{t('editions.enterprise.text')}</p>
                        </div>
                    </div>
                    <div className="col s12 m6">
                        <div className="compliance-edition-card compliance-edition-card--highlight">
                            <div className="compliance-edition-badge-slot">
                                {/* Same brand colors as the "Most popular" badge on the
                                    pricing edition cards (Badge's own default is an
                                    off-palette Bootstrap blue). */}
                                <Badge text={t('editions.compliance.badge')} bgColor="#02F0DD" textColor="#184962"/>
                            </div>
                            <h3 className="compliance-edition-name">{t('editions.compliance.name')}</h3>
                            <p>{t('editions.compliance.text')}</p>
                        </div>
                    </div>
                    <div className="col s12">
                        <p className="compliance-editions-note">{t('editions.note')}</p>
                        <div className="compliance-editions-buttons">
                            <Button text={t('editions.buttonCompare')} link={lp('/licensing/#feature')}/>
                            <a className="licensing-quote-link" href={lp('/licensing/')}>{t('editions.buttonPricing')}</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* §3.8 Contact form — kept, reframed */}
            <div id="compliance-contact" className="color-schema-dark default-padding-top-bottom compliance-contact">
                <div className="row">
                    <div className="col s12 l8 offset-l2">
                        <h2 className="compliance-section-headline">{t('contactForm.headline')}</h2>
                        <p className="compliance-section-intro">{t('contactForm.text')}</p>
                        <div className="quote-form-card">
                            <ContactFormSlimOnly/>
                        </div>
                    </div>
                </div>
            </div>

            {/* §3.9 Resources */}
            <ColumnedTile
                colorschema="light"
                wrapperclass="default-padding-top-bottom compliance-resources"
                headline={t('resources.headline')}
                columns={resourceCards}
                columnHeadlineTag="h3"
            />

            {/* §3.10 Mini FAQ */}
            <div className="color-schema-white default-padding-top-bottom compliance-faq">
                <div className="row">
                    <div className="col s12">
                        <h2 className="compliance-section-headline">{t('faq.headline')}</h2>
                    </div>
                    <div className="col s12 l8 offset-l2">
                        <FaqAccordion items={faqItems}/>
                    </div>
                </div>
            </div>

            {/* §3.11 Final CTA */}
            <FinalCTA colorschema="white"/>

            <PreFooter/>
        </PageWrapper>
    );
};

export default Compliance;
