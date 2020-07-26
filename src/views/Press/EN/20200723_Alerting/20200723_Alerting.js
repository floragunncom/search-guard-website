import React from 'react';
import { Helmet } from 'react-helmet';
import { v4 } from 'uuid';
import '../../PressArticle.scss';
import PageWrapper from '../../../../components/PageWrapper/PageWrapper';
import PreFooter from '../../../../components/PreFooter/PreFooter';
import Cta from '../../../../components/Cta/Cta';
import ctaIcon from '../../../../images/icon-sg.svg';
import Title from '../../../../components/Title/Title';
import watches from "../../../../images/Alerting_Watches.png";
import watches_small from "../../../../images/Alerting_Watches_Small.png";
import graph from "../../../../images/Alerting_Graph.png";
import graph_small from "../../../../images/Alerting_Graph_Small.png";
import infoArrowBack from "../../../../images/info-arrow-back.svg";

const Alerting = () => {
    return (
        <PageWrapper>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Efficient alert management for Big Data and IT infrastructures</title>
                <link rel="canonical" href="https://search-guard.com/press/en/search-guard-alerting/" />
                <meta
                    name="description"
                    content="Efficient alert management for Elasticsearch and IT infrastructures"
                />
            </Helmet>
            <Title
                headline="Efficient alert management for Big Data and IT infrastructures"
                text="Berlin, 07/23/2020"
            />

            <div className="row pressarticle-wrapper">
                <div className="col l4 hide-on-med-and-down">
                    <a href={watches} target="_blank"><img src={watches_small} className="profile-pic"/></a>
                    <div className="pressarticle-image-subline">
                        Watches are the essential component in Signals. They consist of three parts:
                        Triggers that determine when a watch is performed. Checks, which monitor and analyze the defined situation.
                        Actions that are executed when all previous conditions are met.
                    </div>
                    <a href={graph} target="_blank"><img src={graph_small} className="profile-pic"/></a>
                    <div className="pressarticle-image-subline">
                        Der Grafikmodus in Signals zeigt, wie sich Daten einer definierten Bedingung im Vergleich zum Schwellwert verhalten
                        und wie sich diese im Zeitverlauf ändern. Die Definition des Schwellenwertes ist der Ausgangspunkt für die Alerting-Strategie.
                    </div>
                </div>
                <div className="col s12 l8">
                    <div className="pressarticle-text">
                        <h2 className="pressarticle-headline2">Current release of Search Guard with new standard "Signals" function</h2>

                        <b>
                            Berlin, 23.07.2020. With the current release version 7.x-42.0.0, Search Guard provides the new standard function "Signals".
                            The alerting and monitoring feature helps IT administrators detect deviations and conspicuous changes in data stored in
                            Elasticsearch clusters. This can be customer or payment data, production values, key figures for the company and much more.
                            Search Guard is an independent open source plug-in for the protection of Elasticsearch clusters. The alerting feature is now
                            standard and it is available for free in the Community Edition.
                        </b>

                        <br /><br />

                        Attacks and data theft are often preceded by undiscovered abnormalities in a data cluster which may come from multiple
                        failed online payment, fraudulent financial transactions or frequent incorrect password entries. The more sensitive the
                        data stored in the cluster, the more important it is to quickly detect abnormalities and prioritize them correctly.
                        To do this, IT management needs an alerting strategy. Alerting management is not only useful in cases of fraud,
                        but also in price-sensitive industries that are subject to high dynamics due to currency fluctuations, such as
                        securities trading or airline tickets.

                        <h3  className="pressarticle-headline3">Remain capable of acting at all times</h3>

                        With the new Signals feature in Search Guard, IT administrators can implement an alerting strategy that delivers
                        warning signals to various notification channels based on a multi-level escalation model. This ensures that IT departments
                        remain capable of action both in the operational business and in the event of an attack. Signals controls monitoring and
                        notification management in the event of data abnormalities in Elasticsearch clusters. The feature can be combined with
                        all common IT systems that have a REST interface. Thus Signals is also used for monitoring the entire IT infrastructure.

                        <br /><br />

                        The core of Signals from the administrator's point of view is the graphical user interface.
                        This allows all settings to be made intuitively and user-friendly without additional programming effort.
                        Different severity levels are defined via the user interface, as well as the notification channels and notification rules.

                        <br /><br />

                        "To provide IT administrators with even better protection for their cluster and to offer high added value,
                        we have expanded Search Guard to include the Alerting Feature Signals," says Jochen Kressin, Managing Director of floragunn GmbH,
                        the manufacturer of Search Guard. "Signals enable the right people to know what to do at the right time and can take action".

                        <h3  className="pressarticle-headline3">Signals at a glance</h3>

                        <p><b>Multiple sources of data input</b></p>
                        The most important data source that Signals can access is Elasticsearch in version 7.4.0 and higher.
                        In addition, data from other endpoints can also be processed, which significantly expands the scope of application for
                        IT administrators. Signals ships with an HTTP adapter so that data from any HTTP REST endpoint can be included.
                        Signals also supports authentication (HTTP Basic, JWT and client certificates) and TLS.

                        <br /><br />

                        <p><b>Dynamic conditions and severity levels</b></p>
                        Signals provides alerting both commonly on severity and with fully dynamic conditions to trigger alerts.
                        Dynamic conditions are available, for example, if you want to monitor data that is fed from different data sources.

                        <br /><br />

                        <p><b>Versatile output channels for notifications</b></p>

                        Output channels for alerting notifications are currently e-mail, Slack, Webhooks, PagerDuty and JIRA. Support for
                        Microsoft Teams as an output channel is planned. Depending on the severity, it is possible to define which alert is
                        sent to which recipient via which channel. The number of notifications can be controlled and for example reduced to
                        one notification per defined interval. It is also possible to set the alerts at preset times, for example every
                        30min or exponentially after two minutes, four minutes and so on.

                        <br /><br />

                        <p><b>Outlook</b></p>
                        Signals is available for free in the Community Edition and can be installed and tested without any effort.
                        Instructions and downloads for developers can be found ​<a href="https://docs.search-guard.com/latest/elasticsearch-alerting-getting-started" target="_blank">in the documentation</a>.
                        All questions and requests around the feature are answered in ​<a href="https://forum.search-guard.com/c/alerting-signals/12" target="_blank">Signals Community Forum​</a>.

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

                        Further information is available at <a href="https://search-guard.com/alerting/">search-guard.com/alerting/</a>.

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

export default Alerting;
