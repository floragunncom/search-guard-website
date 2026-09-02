import React, {useState} from 'react';
import {Helmet} from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import Button from "../../components/Button/Button";
import ColumnedTile from '../../components/Tiles/ColumnedTile/ColumnedTile';
import FinalCTA from '../../components/FinalCTA/FinalCTA';
import ContactFormSlimOnly from "../../components/ContactFormSuperSlimOnly";
import { useLocalizedPath } from '../../i18n/useLocalizedPath';
import one from '../../images/1.svg';
import two from '../../images/2.svg';
import three from '../../images/3.svg';
import four from '../../images/4.svg';
import checkmark from '../../images/checkmark-green.svg';

const VERSION_MATRIX_URL = 'https://docs.search-guard.com/latest/search-guard-versions';
const LICENSE_DOCS_URL = 'https://docs.search-guard.com/latest/search-guard-enterprise-edition';
const HELM_CHARTS_URL = 'https://git.floragunn.com/search-guard/search-guard-flx-helm-charts';

const INCLUDED_ITEMS = [1, 2, 3, 4, 5, 6, 7, 8];

const FreeTrial = () => {
    // The docker command lives once, in home:quickstart.command (EN only,
    // other locales resolve it via fallback) — single place to change it.
    const { t } = useTranslation(['freeTrial', 'home']);
    const lp = useLocalizedPath();
    const [activeTab, setActiveTab] = useState('docker');
    const [copied, setCopied] = useState(false);
    const command = t('quickstart.command', { ns: 'home' });

    const copy = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(command).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    const breadcrumb = [
        { anchor: '/', name: t('breadcrumb.home') },
        { anchor: '/search-guard-free-trial/', name: t('breadcrumb.freeTrial') }
    ];

    // §3.2 How the trial works — three numbered cards on the tile grid.
    const howItWorks = [
        { icon: one, key: 'download' },
        { icon: two, key: 'install' },
        { icon: three, key: 'active' },
    ].map(({icon, key}) => ({
        headline: t(`howItWorks.${key}.headline`),
        text: t(`howItWorks.${key}.text`),
        image: {
            src: icon,
            width: 100,
            height: 100,
            raw: true,
        },
    }));

    const installSteps = [
        { icon: one, key: 'step1' },
        { icon: two, key: 'step2' },
        { icon: three, key: 'step3' },
        { icon: four, key: 'step4' },
    ];

    return (
        <PageWrapper>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{t('meta.title')}</title>
                <meta
                    name="description"
                    content={t('meta.description')}
                />
            </Helmet>

            {/* §3.1 Header */}
            <Title
                headline={t('title.headline')}
                text={t('title.text')}
                breadcrumb={breadcrumb}
            />

            {/* §3.2 How the trial works */}
            <div className="trial-how">
                <ColumnedTile
                    colorschema="light"
                    wrapperclass="default-padding-top-bottom"
                    alignedHeadlines
                    columns={howItWorks}
                />
                <div className="color-schema-light trial-how-note-wrapper">
                    <p className="trial-how-note">
                        {t('howItWorks.note')}{' '}
                        <a href={lp('/licensing/')}>{t('howItWorks.pricingLink')}</a>
                    </p>
                </div>
            </div>

            {/* §3.3 Choose your path */}
            <div className="color-schema-white default-padding-top-bottom trial-paths">
                <div className="row">
                    <div className="col s12">
                        <h2 className="trial-section-headline">{t('paths.headline')}</h2>
                        <div className="licensing-buttons button-large trial-paths-tabbar" role="tablist">
                            {['docker', 'cluster'].map((tab) => (
                                <button
                                    type="button"
                                    key={tab}
                                    role="tab"
                                    id={`trial-tab-${tab}`}
                                    aria-selected={activeTab === tab}
                                    aria-controls={`trial-tabpanel-${tab}`}
                                    className={activeTab === tab ? 'licensing-button-active' : 'licensing-button'}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {t(tab === 'docker' ? 'paths.tabDocker' : 'paths.tabCluster')}
                                </button>
                            ))}
                        </div>

                        {/* Tab 1 — Docker */}
                        <div
                            role="tabpanel"
                            id="trial-tabpanel-docker"
                            aria-labelledby="trial-tab-docker"
                            hidden={activeTab !== 'docker'}
                            className="trial-tabpanel"
                        >
                            <p>
                                {t('docker.text1_plain')}
                                <a href="https://docs.search-guard.com/latest/" target="_blank" rel="noopener noreferrer">{t('docker.text1_link')}</a>
                                {t('docker.text1_after')}
                            </p>
                            <div className="quickstart-codebox">
                                <code>{command}</code>
                                <button type="button" onClick={copy} className="quickstart-copy" aria-label={t('quickstart.copy', { ns: 'home' })}>
                                    {copied ? t('quickstart.copied', { ns: 'home' }) : t('quickstart.copy', { ns: 'home' })}
                                </button>
                            </div>
                            <p>{t('docker.kibanaText')}</p>
                            <pre className="free-trial-pre">http://localhost:5601</pre>
                            <p>{t('docker.esText')}</p>
                            <pre className="free-trial-pre">https://localhost:9200</pre>
                            <p>{t('docker.usersText')}</p>
                            <p className="trial-paths-closing">{t('paths.dockerClosing')}</p>
                        </div>

                        {/* Tab 2 — own cluster, the existing four steps */}
                        <div
                            role="tabpanel"
                            id="trial-tabpanel-cluster"
                            aria-labelledby="trial-tab-cluster"
                            hidden={activeTab !== 'cluster'}
                            className="trial-tabpanel"
                        >
                            {installSteps.map(({icon, key}) => (
                                <div className="row free-trial" key={key}>
                                    <div className="free-trial-section">
                                        <div className="free-trial-pic">
                                            <img loading="lazy" src={icon} alt="" aria-hidden="true" />
                                        </div>
                                        <div className="free-trial-content">
                                            <div className="subtitle free-trial-content-headline">
                                                {t(`${key}.headline`)}
                                            </div>
                                            <div className="free-trial-content-text">
                                                {t(`${key}.text`)}
                                                {key === 'step1' && (
                                                    <div className="free-trial-content-button">
                                                        <Button
                                                            text={t('step1.button')}
                                                            link={VERSION_MATRIX_URL}
                                                            target="_blank"
                                                        />
                                                    </div>
                                                )}
                                                {key === 'step2' && (
                                                    <pre className="free-trial-pre">
                                                        bin/elasticsearch-plugin install file:///path/to/search-guard-plugin.zip
                                                    </pre>
                                                )}
                                                {key === 'step3' && (
                                                    <>
                                                        <pre className="free-trial-pre">cd plugins/search-guard/tools</pre>
                                                        <pre className="free-trial-pre">./install_demo_configuration.sh</pre>
                                                    </>
                                                )}
                                                {key === 'step4' && (
                                                    <pre className="free-trial-pre">bin/elasticsearch</pre>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            ))}
                            <p className="trial-paths-closing">
                                {t('paths.stepsClosing_plain')}
                                <a href={LICENSE_DOCS_URL} target="_blank" rel="noopener noreferrer">{t('paths.stepsClosing_link')}</a>
                                {t('paths.stepsClosing_after')}
                            </p>
                        </div>

                        {/* Kubernetes — one line below the tabs */}
                        <p className="trial-kubernetes">
                            <strong>{t('kubernetes.headline')}:</strong>{' '}
                            {t('kubernetes.text1_plain')}
                            <a href={HELM_CHARTS_URL} target="_blank" rel="noopener noreferrer">{t('kubernetes.text1_link')}</a>
                            {t('kubernetes.text1_after')}
                        </p>
                    </div>
                </div>
            </div>

            {/* §3.4 What's in your trial */}
            <div className="color-schema-dark default-padding-top-bottom trial-included">
                <div className="row">
                    <div className="col s12">
                        <h2 className="trial-section-headline">{t('included.headline')}</h2>
                        <ul className="trial-included-grid">
                            {INCLUDED_ITEMS.map((i) => (
                                <li key={i}>
                                    <img src={checkmark} alt="" aria-hidden="true" width="14px" height="14px" loading="lazy" />
                                    <span>{t(`included.item${i}`)}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="trial-included-link">
                            <a href={lp('/licensing/#feature')}>{t('included.link')}</a>
                        </p>
                    </div>
                </div>
            </div>

            {/* §3.5 Optional lead capture — nothing on this page is gated by it */}
            <div className="color-schema-light default-padding-top-bottom trial-evalhelp">
                <div className="row">
                    <div className="col s12 l8 offset-l2">
                        <h2 className="trial-section-headline">{t('evalHelp.headline')}</h2>
                        <p className="trial-evalhelp-text">{t('evalHelp.text')}</p>
                        <div className="quote-form-card">
                            <ContactFormSlimOnly/>
                        </div>
                        <p className="trial-evalhelp-demo">
                            {t('evalHelp.demoText')}{' '}
                            <a href={lp('/contacts/')}>{t('evalHelp.demoLink')}</a>
                        </p>
                    </div>
                </div>
            </div>

            {/* §3.6 Other resources */}
            <div className="color-schema-white default-padding-top-bottom">
                <div className="row free-trial">
                    <h3 className="free-trial-headline">{t('otherResources.headline')}</h3>
                    <div className="free-trial-section">
                        <div className="free-trial-content">
                            <div className="free-trial-content-text">
                                <a href="https://docs.search-guard.com/" target="_blank" rel="noopener noreferrer">{t('otherResources.documentation')}</a>
                                <br />
                                <a href="https://forum.search-guard.com/" target="_blank" rel="noopener noreferrer">{t('otherResources.forum')}</a>
                                <br />
                                <a href="https://git.floragunn.com/" target="_blank" rel="noopener noreferrer">{t('otherResources.gitlab')}</a>
                                <br />
                                <a href="/blog/">{t('otherResources.blog')}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* §3.7 Final CTA — sitewide try/see/buy paths */}
            <FinalCTA colorschema="white"/>

            <PreFooter />
        </PageWrapper>
    );
};

export default FreeTrial;
