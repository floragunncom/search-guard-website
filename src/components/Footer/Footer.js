import React from 'react';
import { useTranslation } from 'react-i18next';
import {ReactSVG} from "react-svg";
import x_twitter from '../../images/x-twitter.svg';
import linkedIn from '../../images/linkedin.svg';
import youtube from '../../images/youtube.svg';
import facebook from '../../images/facebook.svg';
import RichSnippetCompany from '../RichSnippets/RichSnippetCompany';
import { useLocalizedPath } from '../../i18n/useLocalizedPath';


const Footer = ({landing}) => {
    const { t } = useTranslation('common');
    const lp = useLocalizedPath();
    const currentYear = new Date().getFullYear();

    return (
        <div className="footer-container">
            <div className="footer-wrapper">

                {!landing ? (
                    <div className="footer-links-container">
                        <div className="row footer-row">
                            <div className="footer-links-column-container col s12 m3 l3">

                                <div className="footer-list-headline">
                                    <a href={lp('/security/')}>{t('footer.security')}</a>
                                </div>
                                <div className="footer-list-items">
                                    <div className="footer-list-item">
                                        <a href={lp('/security/#concept')} className="footer-links">
                                            {t('footer.whatItIs')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href={lp('/resource/#videos')} className="footer-links">
                                            {t('footer.howItWorks')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href={lp('/certificates/')} className="footer-links">
                                            {t('footer.certifications')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href={lp('/compliance/')} className="footer-links">
                                            {t('footer.compliance')}
                                        </a>
                                    </div>
                                </div>
                                <div className="filler-class"/>
                                <div className="footer-list-headline">
                                    <a href={lp('/alerting/')}>{t('footer.alerting')}</a>
                                </div>
                                <div className="footer-list-items">
                                    <div className="footer-list-item">
                                        <a href={lp('/alerting/#concept')} className="footer-links">
                                            {t('footer.whatItIs')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href={lp('/alerting/#connectors')} className="footer-links">
                                            {t('footer.connectors')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href={lp('/alerting/#escalationmodel')} className="footer-links">
                                            {t('footer.escalationModel')}
                                        </a>
                                    </div>
                                </div>
                                <div className="footer-list-headline">
                                    <a href={lp('/encryption-at-rest/')}>{t('footer.encryptionAtRest')}</a>
                                </div>
                                <div className="footer-list-headline">
                                    <a href={lp('/indexmanagement/')}>{t('footer.indexManagement')}</a>
                                </div>

                                <div className="footer-list-headline">
                                    <a href={lp('/tlstool/')}>{t('footer.tlsTool')}</a>
                                </div>
                            </div>
                            <div className="footer-links-column-container col s12 m3 l3">
                                <div className="footer-list-headline">
                                    <a href={lp('/licensing/')}>{t('footer.license')}</a>
                                </div>
                                <div className="footer-list-items">
                                    <div className="footer-list-item">
                                        <a href={lp('/licensing/#standard')} className="footer-links">
                                            {t('footer.standardEditions')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href={lp('/licensing/#feature')} className="footer-links">
                                            {t('footer.featureBreakdown')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href={lp('/licensing/#academic')} className="footer-links">
                                            {t('footer.academicEdition')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href={lp('/licensing/#academic')} className="footer-links">
                                            {t('footer.customEdition')}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="footer-links-column-container col s12 m3 l3">
                                <div className="footer-list-headline">
                                    <a href={lp('/resource/')}>{t('footer.resources')}</a>
                                </div>
                                <div className="footer-list-items">
                                    <div className="footer-list-item">
                                        <a
                                            href="https://docs.search-guard.com/latest/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="footer-links"
                                        >
                                            {t('footer.documentation')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a
                                            href="https://git.floragunn.com/public/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="footer-links"
                                        >
                                            {t('footer.sourceCode')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href={lp('/faq/')} className="footer-links">
                                            {t('footer.faq')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a
                                            href="https://forum.search-guard.com/latest/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="footer-links"
                                        >
                                            {t('footer.communityForum')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href="/blog/" className="footer-links">
                                            {t('footer.blog')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href={lp('/presentations/')} className="footer-links">
                                            {t('footer.presentations')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href="/whitepapers/" className="footer-links">
                                            {t('footer.whitePapers')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href={lp('/compliance/')} className="footer-links">
                                            {t('footer.compliance')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href={lp('/newsletter/')} className="footer-links">
                                            {t('footer.newsletter')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href={lp('/sitemap/')} className="footer-links">
                                            {t('footer.sitemap')}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="footer-links-column-container col s12 m3 l3">
                                <div className="footer-list-headline">
                                    <a href={lp('/company/')}>{t('footer.company')}</a>
                                </div>
                                <div className="footer-list-items">
                                    <div className="footer-list-item">
                                        <a href={lp('/company/#team')} className="footer-links">
                                            {t('footer.whoWeAre')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href={lp('/company/#partners')} className="footer-links">
                                            {t('footer.partners')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href={lp('/security/#integrators')} className="footer-links">
                                            {t('footer.integrators')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href="/authors/" className="footer-links">
                                            {t('footer.ourAuthors')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href={lp('/dataprotection/')} className="footer-links">
                                            {t('footer.dataProtection')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href={lp('/impressum/')} className="footer-links">
                                            {t('footer.imprint')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href={lp('/security-information/')} className="footer-links">
                                            {t('footer.publicKeySecurity')}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
                <div className="row footer-row">
                    <div className="footer-content-wrapper col s12 subtitle">
                        <div className="footer-col-content">
                            <div className="footer-headline">{t('footer.followUs')}</div>
                            <div className="footer-content footer-content-icons">
                                <a
                                    href="https://twitter.com/searchguard?lang=en"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <ReactSVG src={x_twitter} alt="Join Search Guard on X/Twitter"/>
                                </a>
                                <a
                                    href="https://www.facebook.com/searchguard/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <ReactSVG src={facebook} alt="Join Search Guard on facebook"/>
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/search-guard/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <ReactSVG src={linkedIn} alt="Join Search Guard on LinkedIn"/>
                                </a>
                                <a
                                    href="https://www.youtube.com/channel/UCUw93I0DHMvoA8HNQ31AeJw"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <ReactSVG src={youtube} alt="Visit Search Guard on YouTube"/>
                                </a>
                                <hr className="footer-hr"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="row footer-row subtitle footer-text"
                    style={landing ? {paddingTop: '64px'} : null}
                >
                    <div className="footer-content-wrapper col subtitle">
                        <div className="footer-col-content">
                            <p>&copy; {currentYear} {t('footer.copyright')}</p>
                            <p className='body2'>
                                {t('footer.trademarks')}
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <RichSnippetCompany/>
        </div>
    );
};

export default Footer;
