import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import {initGA, PageView} from '../../components/Tracking/Tracking';
import PreFooter from '../../components/PreFooter/PreFooter';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import ComplianceFeatures from '../../components/Compliance/ComplianceFeatures';
import ImageTextTile from '../../components/Tiles/ImageTextTile/ImageTextTile';
import complianceDataChanges from '../../images/compliance_change_tracking.svg';
import complianceAnon from '../../images/compliance_anon.svg';
import complianceForgotten from '../../images/compliance_forgotten.svg';
import multilevel from '../../images/multilevel-security.svg';
import lock from '../../images/tile-icon-wheel.svg';
import ContactFormSlimOnly from "../../components/ContactFormSuperSlimOnly";
import CTACompliance from "../../components/CTA/CTACompliance";

const Compliance = () => {
    const { t } = useTranslation('compliance');

    useEffect(() => {
        initGA();
        PageView();
    }, []);

    const breadcrumb = [
        {anchor: '/', name: t('breadcrumb.home')},
        {anchor: '/compliance/', name: t('breadcrumb.compliance')}
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
            </Helmet>
            <Title
                headline={t('title.headline')}
                text={t('title.text')}
                breadcrumb={breadcrumb}
            />

            <div className="compliance-wrapper" id="concept">

                <div className="row compliance">
                    <h3 className="compliance-headline">{t('edition.headline')}</h3>

                    <div className="subtitle compliance-content-headline">
                        {t('edition.challenges.title')}
                    </div>
                    <div className="compliance-content-text">
                        {t('edition.challenges.text')}
                    </div>

                    <div className="subtitle compliance-content-headline">
                        {t('edition.solution.title')}
                    </div>
                    <div className="compliance-content-text">
                        {t('edition.solution.text')}
                    </div>
                </div>
            </div>

            <div id="features">
                <ImageTextTile
                    icon={lock}
                    iconPosition="right"
                    colorschema="light"
                    headline={t('encryption.headline')}
                    text={t('encryption.text')}
                />
            </div>

            <div id="concept">
                <ImageTextTile
                    icon={multilevel}
                    iconPosition="left"
                    colorschema="dark"
                    headline={t('accessControl.headline')}
                    text={t('accessControl.text')}
                />
            </div>
            <ImageTextTile
                icon={complianceDataChanges}
                iconPosition="right"
                colorschema="light"
                headline={t('tracking.headline')}
                text={t('tracking.text')}
            />
            <ImageTextTile
                icon={complianceAnon}
                iconPosition="left"
                colorschema="dark"
                headline={t('anonymization.headline')}
                text={t('anonymization.text')}
            />
            <ImageTextTile
                icon={complianceForgotten}
                iconPosition="right"
                colorschema="light"
                headline={t('forgotten.headline')}
                text={t('forgotten.text')}
            />

            <div className="securityinfo-wrapper" id="highlights">
                <ComplianceFeatures/>
            </div>

            <div className="row free-trial">
                <div className="subtitle compliance-headline-form" id="contact">
                    {t('contactForm.headline')}
                </div>

                <div className="free-trial-section">
                    <div className="free-trial-content">
                        <div className="free-trial-content-text">
                            <ContactFormSlimOnly/>
                        </div>
                    </div>
                </div>
            </div>

            <div id="tryit">
                <CTACompliance colorschema="white"/>
            </div>
            <PreFooter/>
        </PageWrapper>
    );
};

export default Compliance;
