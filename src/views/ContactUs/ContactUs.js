import React from 'react';
import {Helmet} from 'react-helmet';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import ContactForm from '../../components/ContactForm';
import './contactUs.scss';
import CTAContactUs from "../../components/CTA/CTAContactUs";

const breadcrumb = [
    {anchor: '/', name: 'Home'},
    {anchor: '/contacts/', name: 'Contact Us'},
];

const ContactUs = () => {
    return (
        <PageWrapper>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>Contact the Search Guard team - get in touch with us</title>
                <link rel="canonical" href="https://search-guard.com/contacts/"/>
                <meta
                    name="description"
                    content="Any questions regarding Search Guard licensing or pricing? Do you need OEM licenses or want to partner with us? Please fill out the contact form and we will get back to you as soon as possible."
                />
            </Helmet>
            <Title
                headline="Get in touch"
                text="Any questions regarding Search Guard licensing or pricing? Do you need OEM licenses or want to partner with us? Please fill out the contact form and we will get back to you as soon as possible."
                breadcrumb={breadcrumb}
            />
            <ContactForm/>
            <CTAContactUs colorschema="white"/>
            <PreFooter/>
        </PageWrapper>
    );
};

export default ContactUs;
