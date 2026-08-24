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
                                    <span>{t('footer.solutions')}</span>
                                </div>
                                <div className="footer-list-items">
                                    <div className="footer-list-item">
                                        <a href={lp('/security/')} className="footer-links">
                                            {t('footer.security')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href={lp('/compliance/')} className="footer-links">
                                            {t('footer.compliance')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href={lp('/alerting/')} className="footer-links">
                                            {t('footer.alerting')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href={lp('/encryption-at-rest/')} className="footer-links">
                                            {t('footer.encryptionAtRest')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href={lp('/tlstool/')} className="footer-links">
                                            {t('footer.tlsTool')}
                                        </a>
                                    </div>
                                    <div className="footer-list-subheadline">
                                        <span>{t('footer.fromTheLabs')}</span>
                                    </div>
                                    <div className="footer-list-item footer-list-item--sub">
                                        <a href={lp('/anomaly-detection/')} className="footer-links">
                                            {t('footer.anomalyDetection')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item footer-list-item--sub">
                                        <a href={lp('/indexmanagement/')} className="footer-links">
                                            {t('footer.indexManagement')}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="footer-links-column-container col s12 m3 l3">
                                <div className="footer-list-headline">
                                    <span>{t('footer.getStarted')}</span>
                                </div>
                                <div className="footer-list-items">
                                    <div className="footer-list-item">
                                        <a href={lp('/search-guard-free-trial/')} className="footer-links">
                                            {t('footer.freeTrial')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href={lp('/licensing/')} className="footer-links">
                                            {t('footer.license')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href={lp('/certificates/')} className="footer-links">
                                            {t('footer.certifications')}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="footer-links-column-container col s12 m3 l3">
                                <div className="footer-list-headline">
                                    <span>{t('footer.resources')}</span>
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
                                            href="https://forum.search-guard.com/latest/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="footer-links"
                                        >
                                            {t('footer.communityForum')}
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
                                        <a href="/blog/" className="footer-links">
                                            {t('footer.blog')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href={lp('/faq/')} className="footer-links">
                                            {t('footer.faq')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href={lp('/webinars/')} className="footer-links">
                                            {t('footer.webinars')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href="/whitepapers/" className="footer-links">
                                            {t('footer.whitePapers')}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="footer-links-column-container col s12 m3 l3">
                                <div className="footer-list-headline">
                                    <span>{t('footer.companyLegal')}</span>
                                </div>
                                <div className="footer-list-items">
                                    <div className="footer-list-item">
                                        <a href={lp('/company/')} className="footer-links">
                                            {t('footer.aboutUs')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href={lp('/contacts/')} className="footer-links">
                                            {t('footer.contact')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href={lp('/impressum/')} className="footer-links">
                                            {t('footer.imprint')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href={lp('/dataprotection/')} className="footer-links">
                                            {t('footer.dataProtection')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href={lp('/security-information/')} className="footer-links">
                                            {t('footer.publicKeySecurity')}
                                        </a>
                                    </div>
                                    <div className="footer-list-item">
                                        <a href={lp('/sitemap/')} className="footer-links">
                                            {t('footer.sitemap')}
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
