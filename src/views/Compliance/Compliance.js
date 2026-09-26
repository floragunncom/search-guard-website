import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
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
                <p className="compliance-question-features">
                    <strong>{t('auditor.featuresLabel')}</strong> {t(`auditor.${key}.features`)}
                </p>
                <p className="compliance-question-links">
                    {links.map(([href, labelKey], i) => (
                        <React.Fragment key={labelKey}>
                            {i > 0 && <span className="compliance-link-sep"> · </span>}
                            {docLink(href, t(`auditor.${key}.${labelKey}`))}
                        </React.Fragment>
                    ))}
                </p>
            </div>
        ),
        image: { src: icon, width: 64, height: 64 },
    }));

    // §3.6 Regulation overview table rows.
    const regulations = [
        { key: 'gdpr', name: 'GDPR' },
        { key: 'hipaa', name: 'HIPAA' },
        { key: 'pcidss', name: 'PCI DSS' },
        { key: 'sox', name: 'SOX' },
        { key: 'iso27001', name: 'ISO 27001' },
        // REVIEW: confirm NIS2/DORA rows with marketing/legal before release
        { key: 'nis2', name: 'NIS2' },
        { key: 'dora', name: 'DORA' },
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

            {/* §3.3 Audit trail architecture */}
            <div className="color-schema-white default-padding-top-bottom compliance-architecture">
                <div className="row">
                    <div className="col s12">
                        <h2 className="compliance-section-headline">{t('architecture.headline')}</h2>
                    </div>
                    <div className="col s12 l6">
                        <div className="compliance-architecture-text">
                            <p>{t('architecture.text')}</p>
                            <p className="compliance-question-links">
                                {docLink(DOCS.auditLogging, t('architecture.link1'))}
                                <span className="compliance-link-sep"> · </span>
                                {docLink(DOCS.auditStorage, t('architecture.link2'))}
                            </p>
                        </div>
                    </div>
                    <div className="col s12 l6">
                        {/* TODO(asset): compliance-audit-flow.svg — uncomment when the diagram exists.
                        <img
                            src={auditFlowDiagram}
                            alt="Search Guard audit events flow from the Elasticsearch cluster to multiple storage endpoints: an internal or immutable audit index, an external cluster, a SIEM via webhook, and log4j appenders"
                            className="responsive-img"
                            loading="lazy"
                        /> */}
                        <AssetPlaceholder
                            ratio="wide"
                            alt="Search Guard audit events flow from the Elasticsearch cluster to multiple storage endpoints: an internal or immutable audit index, an external cluster, a SIEM via webhook, and log4j appenders"
                        />
                    </div>
                </div>
            </div>

            {/* §3.4 Field anonymization illustration */}
            <div className="color-schema-dark default-padding-top-bottom compliance-anon-views">
                <div className="row">
                    <div className="col s12 l6">
                        <h2 className="compliance-section-headline compliance-section-headline--left">{t('anonViews.headline')}</h2>
                        <p>{t('anonViews.text')}</p>
                    </div>
                    <div className="col s12 l6">
                        {/* TODO(asset): compliance-field-anonymization.svg — uncomment when the diagram exists.
                        <img
                            src={fieldAnonDiagram}
                            alt="The same document shown to two roles: one sees clear-text personal data, the other sees anonymized values"
                            className="responsive-img"
                            loading="lazy"
                        /> */}
                        <AssetPlaceholder
                            ratio="wide"
                            alt="The same document shown to two roles: one sees clear-text personal data, the other sees anonymized values"
                        />
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
                    {/* TODO(asset): three screenshots — uncomment each <img> when the file exists. */}
                    <div className="col s12 m4">
                        {/* <img src={screenshotAuditDashboard} alt="The pre-built Search Guard audit log dashboard in Kibana" className="responsive-img" loading="lazy" /> */}
                        <AssetPlaceholder alt="The pre-built Search Guard audit log dashboard in Kibana"/>
                    </div>
                    <div className="col s12 m4">
                        {/* <img src={screenshotReadHistory} alt="A read history audit event showing user, document and accessed sensitive fields" className="responsive-img" loading="lazy" /> */}
                        <AssetPlaceholder alt="A read history audit event showing user, document and accessed sensitive fields"/>
                    </div>
                    <div className="col s12 m4">
                        {/* <img src={screenshotWriteHistoryDiff} alt="A write history audit event showing the field-level change as a JSON patch" className="responsive-img" loading="lazy" /> */}
                        <AssetPlaceholder alt="A write history audit event showing the field-level change as a JSON patch"/>
                    </div>
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
                                    {regulations.map(({ key, name }) => (
                                        <tr key={key}>
                                            <th scope="row">{name}</th>
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
                                <Badge text={t('editions.compliance.badge')}/>
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
