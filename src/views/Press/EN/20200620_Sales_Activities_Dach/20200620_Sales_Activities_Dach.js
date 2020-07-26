import React from 'react';
import { Helmet } from 'react-helmet';
import { v4 } from 'uuid';
import '../../PressArticle.scss';
import PageWrapper from '../../../../components/PageWrapper/PageWrapper';
import PreFooter from '../../../../components/PreFooter/PreFooter';
import Cta from '../../../../components/Cta/Cta';
import ctaIcon from '../../../../images/icon-sg.svg';
import Title from '../../../../components/Title/Title';
import tmahler from '../../../../images/tmahler_press.jpg';
import infoArrowBack from "../../../../images/info-arrow-back.svg";


const Company = () => {
    const anchors = [
        { id: v4(), anchor: 'news', name: 'News & Events' },
        { id: v4(), anchor: 'team', name: 'management team' },
        { id: v4(), anchor: 'partners', name: 'partners' },
        { id: v4(), anchor: 'journey', name: 'journey' },
    ];

    return (
        <PageWrapper>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Search Guard expands sales activities in DACH</title>
                <link rel="canonical" href="https://search-guard.com/press/de/search-guard-vertrieb-dach/" />
                <meta
                    name="description"
                    content="floragunn GmbH, manufacturer of the security plug-in Search Guard, based in Berlin, is strengthening its business activities in the German-speaking market"
                />
            </Helmet>
            <Title
                headline="Search Guard expands sales activities in DACH"
                text="Berlin, 06/29/2020"
            />

            <div className="row pressarticle-wrapper">
                <div className="col l4 hide-on-med-and-down">
                    <img src={tmahler} className="profile-pic"/>
                    <div className="pressarticle-text">
                    floragunn GmbH<br />
                    Thomas Mahler<br />
                    Tel: 01522/ 1950326<br />
                    Email: <a href="mailto:tmahler@search-guard.com">tmahler@search-guard.com</a>
                    </div>
                </div>
                <div className="col s12 l8">
                    <div className="pressarticle-text">
                        <b>Berlin, 06/29/2020. floragunn GmbH, manufacturer of the security plug-in Search Guard, based in Berlin, is strengthening
                            its business activities in the German-speaking market. Software resellers and distributors in Germany, Austria and Switzerland
                            who want to expand their portfolio in the area of Big Data Security with a user-friendly solution now have a direct person to contact.
                            Search Guard is an open source plug-in for use in ​enterprise search for the protection of Elasticsearch clusters.
                        </b>
                        <br /><br />


                            floragunn, manufacturer of the security plug-in Search Guard, is intensifying its activities on the European home market DACH.
                            Thomas Mahler,a graduate engineer for electrical engineering, is the companies new sales contact for software resellers,
                            distributors and business customers. Moving forward there will be additional growth in international sales and OEM partners.

                        <br /><br />
                            With over 20 years of professional experience in senior management positions at Gemalto, the Thales Group, Canon, Océ,
                            TA Triumph-Adler and many others, Thomas Mahler knows how software resellers and distributors benefit from sales
                            with Search Guard: "Exponentially growing data volumes are rapidly driving up management and security costs.
                            With Search Guard, users receive a comprehensively equipped security plug-in for Elasticsearch clusters which allows
                            them to stay one step ahead of attacks and unauthorised control​. ​The licensing model is cluster-based so that
                            costs are stable and calculable from the outset. This creates many added values and makes it easier for resellers
                            to increase the data security of their customers”.

                        <h2 className="pressarticle-headline2">Special features of the licensing model in favour of the users</h2>

                            To make license management easier for users, the fee is usually calculated based on the clusters to be protected
                            and not on the number of nodes in the clusters. In both the Enterprise and the Compliance Edition, the manufacturer
                            provides the common auto-renewal model. Customers thus have the option of deciding the term of their license themselves.
                            "The Search Guard sales structure is based on the reseller concept. If the customer decides to extend the license,
                            our sales partners participate in the same way," says Thomas Mahler.

                            In addition to the free Community Edition, Search Guard is also available as a premium liscence version in the
                            Enterprise Edition and Compliance Edition. The Enterprise Edition contains additional features that are significant
                            for the user, such as integration of Active Directory/LDAP, JSON webtokens, SAML and Single Sign On.
                            The Compliance Edition helps to meet the requirements of the DSGVO and enables, among other things,
                            the protection of data down to the form field level of a document.

                        <br /><br />

                            Search Guard offers the option of paid support on an annual basis to provide fast,
                            comprehensive and individual assistance. In addition, Search Guard users actively support each
                            other with questions and answers in the Search Guard Forum, which is available free of charge.

                        <br /><br />

                        <u>About floragunn GmbH</u>

                        <br /><br />

                        Exponentially increasing amounts of data (Big Data) require protection against unauthorized access or control at all times.
                            Since its foundation in 2013, floragunn pursues the vision to protect every Elasticsearch cluster.
                            With the Search Guard® 2.3 version, released on June 17, 2016, Search Guard® is the first security plug-in that
                            provides essential security functions free of charge. High customer orientation, fast processes and a user-friendly
                            licensing model are the company's hallmarks. Search Guard® is an open source based plug-in Made in Germany and
                            verified according to Veracode and CVE Numbering Authority. floragunn GmbH is a member of the Alliance for
                            Cyber Security of the German Federal Office for Information Security (BSI), TeleTrusT and the
                            German Federal Association for IT Security. Fortune 500 companies, educational institutions and
                            authorities worldwide use Search Guard® to protect their clusters. Search Guard® is available in the free
                            Community Edition and in the Enterprise and Compliance Edition license versions.
                            The plug-in can be tested free of charge for 60 days.

                            Further information is available at <a href="https://search-guard.com">search-guard.com</a>.

                        <br /><br />

                        <b>Contact person for the editorial office:</b>
                        <br />
                        Eskimos mit Kühlschränken<br />
                        Simone Brett-Murati<br />
                        Tel: 0171/ 53 80 275<br />
                        E-Mail: <a href="mailto:sbm@eskimos-mit-kuehlschraenken.de">sbm@eskimos-mit-kuehlschraenken.de</a>

                        <br /><br />

                        floragunn GmbH<br />
                        Thomas Mahler<br />
                        Tel: 01522/ 1950326<br />
                        Email: <a href="mailto:tmahler@search-guard.com">tmahler@search-guard.com</a>

                        <div className="col s12 blogpostarticle-link">
                            <a href="/resource/#press" className="blog-back">
                                <img
                                    src={infoArrowBack}
                                    className="blog-arrow-back"
                                    alt="arrow icon"
                                />
                                <span>back</span>
                            </a>
                        </div>

                    </div>
                </div>
            </div>

            <Cta
                headline="60-day PoC License"
                text="Want to see how your company can benefit from our Compliance edition? Sign up to our 60-day trial, completely free of charge."
                ctaText="start free trial"
                icon={ctaIcon}
                link="/contacts/"
            />
            <PreFooter />
        </PageWrapper>
    );
};

export default Company;
