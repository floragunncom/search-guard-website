import React from 'react';
import {Helmet} from 'react-helmet-async';
import PageWrapper from '../../components/PageWrapper/PageWrapper.jsx';
import PreFooter from '../../components/PreFooter/PreFooter.jsx';
import Journey from '../../components/Journey/Journey.jsx';
import Partners from '../../components/Partners/Partners.jsx';
import Title from '../../components/Title/Title.jsx';
import Team from '../../components/Team/Team.jsx';
import CTAStartFreeTrial from "../../components/CTA/CTAStartFreeTrial.jsx";

const Company = () => {

    const breadcrumb = [
        {id: 1, anchor: '/', name: 'Home'},
        {id: 1, anchor: '/company/', name: 'Company'},
    ];

    return (
        <PageWrapper>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>Team | Get to know the minds behind Search Guard</title>
                <link rel="canonical" href="https://search-guard.com/company/"/>
                <meta
                    name="description"
                    content="Our mission is to shape IT security and Open Source business models. From day 1 until today, we follow our principles of putting security first and providing no-nonsense IT."
                />
            </Helmet>
            <Title
                headline="company"
                text="We shape IT security and Open Source business models since 2013."
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
