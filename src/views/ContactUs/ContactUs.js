import React from 'react';
import {Helmet} from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import ContactForm from '../../components/ContactForm';
import CTAContactUs from "../../components/CTA/CTAContactUs";

const ContactUs = () => {
    const { t } = useTranslation('contactUs');

    const breadcrumb = [
        {anchor: '/', name: t('breadcrumb.home')},
        {anchor: '/contacts/', name: t('breadcrumb.contactUs')},
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
            <ContactForm/>
            <CTAContactUs colorschema="white"/>
            <PreFooter/>
        </PageWrapper>
    );
};

export default ContactUs;
