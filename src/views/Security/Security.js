import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import {initGA, PageView} from '../../components/Tracking/Tracking';
import PreFooter from '../../components/PreFooter/PreFooter';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import ColumnedTile from '../../components/Tiles/ColumnedTile/ColumnedTile';
import Button from '../../components/Button/Button';
import DiagramFigure from '../../components/DiagramFigure/DiagramFigure';
import { docLink } from '../../components/DocLink/DocLink';
import FinalCTA from '../../components/FinalCTA/FinalCTA';
import Certified from '../../components/Certified/Certified';
import Integrators from '../../components/Integrators/Integrators';
import { useLocalizedPath } from '../../i18n/useLocalizedPath';
import { toAbsoluteSiteUrl, toLocalePath } from '../../utils/urlUtils';
// FA6 Free icons for the capability grid
import iconFingerprint from '../../images/fingerprint-solid.svg';
import iconUsersGear from '../../images/users-gear-solid.svg';
import iconTableLock from '../../images/table-cells-column-lock-solid.svg';
import iconLayerGroup from '../../images/layer-group-solid.svg';
import iconClockRotate from '../../images/clock-rotate-left-solid.svg';
import iconLock from '../../images/lock-solid.svg';

// Visual asset slots — see redesign/security-page-implementation-instructions-v2.md §2.
// While a file does not exist in src/images/, its slot stays null and
// DiagramFigure renders the AssetPlaceholder with the final alt text.
// To activate a slot: import the file (inline via ReactSVG, like the
// Compliance diagrams) and put the import here. Filenames and order are
// stable so WebP screenshots can replace the illustrations 1:1 later.
//   import architectureDiagram from '../../images/security-architecture-overview.svg';
const ASSETS = {
    architecture: null, // TODO src/images/security-architecture-overview.svg (§3.3)
    requestFlow: null, // TODO src/images/security-request-flow.svg (§3.4, dark section)
    illuRoles: null, // TODO src/images/illustration-config-gui-roles.svg (§3.5 A)
    illuDls: null, // TODO src/images/illustration-dls-editor.svg (§3.5 B)
    illuTenants: null, // TODO src/images/illustration-multitenancy.svg (§3.5 C)
};

// All URLs verified HTTP 200 on 2026-10-26 — do not guess new ones.
const DOCS = {
    authentication: 'https://docs.search-guard.com/latest/authentication-methods',
    ldap: 'https://docs.search-guard.com/latest/active-directory-ldap',
    dls: 'https://docs.search-guard.com/latest/document-level-security',
    multiTenancy: 'https://docs.search-guard.com/latest/kibana-multi-tenancy',
    auditLogging: 'https://docs.search-guard.com/latest/audit-logging-compliance',
    configuringTls: 'https://docs.search-guard.com/latest/configuring-tls',
    configTools: 'https://docs.search-guard.com/latest/search-guard-configuration-tools',
};

const Security = () => {
    const { t, i18n } = useTranslation('security');
    const locale = i18n?.resolvedLanguage || i18n?.language || 'en';
    const lp = useLocalizedPath();

    useEffect(() => {
        initGA();
        PageView();
    }, []);

    const breadcrumb = [
        {id: 1, anchor: toLocalePath('/', locale), name: t('breadcrumb.home')},
        {id: 2, anchor: toLocalePath('/security/', locale), name: t('breadcrumb.security')},
    ];

    // §3.2 Capability grid: 6 cards, 2 rows of 3, one docs link per card
    // (TLS has two: docs + the internal TLS Tool page).
    const capabilities = [
        { key: 'authn', icon: iconFingerprint, links: [[DOCS.authentication, 'link1']] },
        { key: 'rbac', icon: iconUsersGear, links: [[DOCS.ldap, 'link1']] },
        { key: 'dls', icon: iconTableLock, links: [[DOCS.dls, 'link1']] },
        { key: 'multitenancy', icon: iconLayerGroup, links: [[DOCS.multiTenancy, 'link1']] },
        { key: 'audit', icon: iconClockRotate, links: [[DOCS.auditLogging, 'link1']] },
        { key: 'tls', icon: iconLock, links: [[DOCS.configuringTls, 'link1'], [lp('/tlstool/'), 'link2']] },
    ].map(({ key, icon, links }) => ({
        headline: t(`capabilities.${key}.headline`),
        text: (
            <div className="security-capability-card">
                <p>{t(`capabilities.${key}.text`)}</p>
                <ul className="security-doc-links">
                    {links.map(([href, labelKey]) => (
                        <li key={labelKey}>{docLink(href, t(`capabilities.${key}.${labelKey}`))}</li>
                    ))}
                </ul>
            </div>
        ),
        image: { src: icon, width: 64, height: 64 },
    }));

    // §3.5 UI gallery — same slots the real screenshots (WebP) will take over.
    const gallery = [
        { key: 'roles', asset: ASSETS.illuRoles },
        { key: 'dls', asset: ASSETS.illuDls },
        { key: 'tenants', asset: ASSETS.illuTenants },
    ];

    const softwareJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Search Guard Security',
        applicationCategory: 'SecurityApplication',
        operatingSystem: 'Linux, Windows, macOS',
        url: toAbsoluteSiteUrl('/security/', locale),
        description: t('meta.description'),
        offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: toAbsoluteSiteUrl('/search-guard-free-trial/', locale),
        },
    };

    return (
        <PageWrapper>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>{t('meta.title')}</title>
                <meta name="description" content={t('meta.description')}/>
                <script type="application/ld+json">
                    {JSON.stringify(softwareJsonLd)}
                </script>
            </Helmet>

            {/* §3.1 Header */}
            <Title
                headline={t('title.headline')}
                text={t('title.text')}
                breadcrumb={breadcrumb}
                buttontext={t('title.buttonTrial')}
                buttonlink={lp('/search-guard-free-trial/')}
                button2text={t('title.buttonDemo')}
                button2link={lp('/contacts/')}
            />

            {/* §3.2 Capability grid */}
            <ColumnedTile
                colorschema="light"
                wrapperclass="default-padding-top-bottom security-capabilities"
                headline={t('capabilities.headline')}
                columns={capabilities}
                columnsPerRow={3}
                columnHeadlineTag="h3"
                alignedHeadlines
            />

            {/* §3.3 Architecture — text on top, diagram full width, config note below */}
            <div className="color-schema-white default-padding-top-bottom security-architecture">
                <div className="row">
                    <div className="col s12">
                        <h2 className="security-section-headline">{t('architecture.headline')}</h2>
                        <div className="security-architecture-text">
                            <p>{t('architecture.text')}</p>
                        </div>
                        <DiagramFigure
                            src={ASSETS.architecture}
                            placeholderAlt={t('architecture.alt')}
                        />
                        <div className="security-architecture-config">
                            <p>{t('architecture.configText')}</p>
                            <p className="security-inline-link">{docLink(DOCS.configTools, t('architecture.configLink'))}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* §3.4 Request lifecycle — dark section */}
            <div className="color-schema-dark default-padding-top-bottom security-lifecycle">
                <div className="row">
                    <div className="col s12">
                        <h2 className="security-section-headline">{t('lifecycle.headline')}</h2>
                        <p className="security-section-intro">{t('lifecycle.text')}</p>
                        <DiagramFigure
                            src={ASSETS.requestFlow}
                            placeholderAlt={t('lifecycle.alt')}
                            dark
                        />
                    </div>
                </div>
            </div>

            {/* §3.5 UI gallery */}
            <div className="color-schema-white default-padding-top-bottom security-gallery">
                <div className="row">
                    <div className="col s12">
                        <h2 className="security-section-headline">{t('gallery.headline')}</h2>
                        <p className="security-section-intro">{t('gallery.intro')}</p>
                    </div>
                    {gallery.map(({ key, asset }) => (
                        <div className="col s12 security-gallery-item" key={key}>
                            <DiagramFigure
                                src={asset}
                                headline={t(`gallery.${key}Headline`)}
                                placeholderAlt={t(`gallery.${key}Alt`)}
                                mat
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* §3.6 Editions */}
            <div className="color-schema-light default-padding-top-bottom security-editions">
                <div className="row">
                    <div className="col s12">
                        <h2 className="security-section-headline">{t('editions.headline')}</h2>
                        <p className="security-editions-text">{t('editions.text')}</p>
                        <div className="security-editions-buttons">
                            <Button text={t('editions.buttonCompare')} link={lp('/licensing/#feature')}/>
                            <a className="licensing-quote-link" href={lp('/licensing/')}>{t('editions.buttonPricing')}</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* §3.7 Compliance teaser — slim band */}
            <div className="color-schema-white security-compliance-teaser">
                <div className="row">
                    <div className="col s12">
                        <p>{t('complianceTeaser.text')}</p>
                        <p className="security-inline-link">{docLink(lp('/compliance/'), t('complianceTeaser.link'))}</p>
                    </div>
                </div>
            </div>

            {/* §3.8 Certifications */}
            <Certified/>

            {/* §3.9 Integrators */}
            <Integrators/>

            {/* §3.10 Final CTA */}
            <FinalCTA colorschema="light"/>

            <PreFooter/>
        </PageWrapper>
    );
};

export default Security;
