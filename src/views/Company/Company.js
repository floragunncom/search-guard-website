import React from 'react';
import {Helmet} from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import PreFooter from '../../components/PreFooter/PreFooter';
import Journey from '../../components/Journey/Journey';
import Partners from '../../components/Partners/Partners';
import Title from '../../components/Title/Title';
import Team from '../../components/Team/Team';
import CTAStartFreeTrial from "../../components/CTA/CTAStartFreeTrial";

const Company = () => {
    const { t } = useTranslation('company');

    const breadcrumb = [
        {id: 1, anchor: '/', name: t('breadcrumb.home')},
        {id: 1, anchor: '/company/', name: t('breadcrumb.company')},
    ];

    return (
        <PageWrapper>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>{t('meta.title')}</title>
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
            <Team/>
            <Partners/>
            <CTAStartFreeTrial colorschema="dark"/>
            <Journey/>
            <PreFooter/>
        </PageWrapper>
    );
};

export default Company;
