import React from 'react';
import { Helmet } from 'react-helmet';
import { v4 } from 'uuid';
import '../../Press.scss';
import PageWrapper from '../../../../components/PageWrapper/PageWrapper';
import PreFooter from '../../../../components/PreFooter/PreFooter';
import Cta from '../../../../components/Cta/Cta';
import ctaIcon from '../../../../images/icon-sg.svg';
import Title from '../../../../components/Title/Title';



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
                <title>Search Guard weitet Vertriebsaktivitäten in DACH aus</title>
                <link rel="canonical" href="https://search-guard.com/press/de/search-guard-vertrieb-dach/" />
                <meta
                    name="description"
                    content="Die floragunn GmbH, Hersteller des Sicherheits-Plug-Ins Search Guard mit Sitz in Berlin, stärkt ihre Geschäftsaktivitäten auf dem deutschsprachigen Markt. "
                />
            </Helmet>
            <Title
                headline="Search Guard weitet Vertriebsaktivitäten in DACH aus"
                text="Berlin, 17.06.2020"
            />

            <div className="row pressarticle-wrapper">
                <div className="col s12 offset-l2 l8">
                    <div className="pressarticle-text">
                        <b>Berlin, 17.06.2020. Die floragunn GmbH, Hersteller des Sicherheits-Plug-Ins Search Guard mit Sitz in Berlin, stärkt ihre Geschäftsaktivitäten auf
                            dem deutschsprachigen Markt. Software-Reseller und Distributoren in Deutschland, Österreich und der Schweiz,
                            die ihr Portfolio im Bereich Big Data Security um eine anwenderfreundliche Lösung Made in Germany erweitern wollen,
                            haben nun einen direkten Ansprechpartner. Search Guard ist ein Open-Source-Plug-In zum Einsatz in der Enterprise Search für den Schutz von Elasticsearch-Clustern.</b>

                        <br /><br />
                        floragunn, Hersteller des Security-Plug-Ins Search Guard, intensiviert seine Aktivitäten auf dem europäischen Heimatmarkt DACH.
                        Mit Thomas Mahler, Diplom-Ingenieur für Elektrotechnik, hat das Unternehmen einen neuen vertrieblichen Ansprechpartner für
                        Software-Reseller, Distributoren und Geschäftskunden. Das Wachstum mit weiteren internationalen Vertriebs- und OEM-Partnern wird parallel vorangetrieben.
                        <br /><br />
                        Mit über 20 Jahren Berufserfahrung in leitenden Führungspositionen unter anderem bei Gemalto, heute Teil der Thales Group,
                        Canon, Océ und TA Triumph-Adler weiß Thomas Mahler, wie Software- Reseller und Distributionen von dem Vertrieb mit
                        Search Guard profitieren: “Exponentiell wachsende Datenmengen treiben die Kosten für Management und Sicherheit schnell
                        in die Höhe. Mit Search Guard erhalten Anwender ein umfangreich ausgestattetes Security-Plug-In für
                        Elasticsearch-Cluster, das sie in die Lage versetzt, Angriffen und Manipulationen einen Schritt voraus zu sein.
                        Das Lizenzmodell ist clusterbasiert, so dass Kosten von Beginn an stabil und kalkulierbar sind. Reseller haben es damit leicht,
                        die Datensicherheit bei ihren Kunden zu erhöhen und viele Mehrwerte zu schaffen.“

                        <h2 className="pressarticle-headline2">Besonderheiten des Lizenzmodells zugunsten der Anwender</h2>
                        Um Nutzern das Lizenzmanagement zu erleichtern, wird die Lizenzgebühr im Regelfall anhand der zu schützenden Cluster
                        und nicht aufgrund der Anzahl von Knoten in den Clustern kalkuliert. Sowohl in der Enterprise als auch in der
                        Compliance Edition verzichtet der Hersteller zudem auf das gängige auto-renewal-Modell. Kunden haben damit die Möglichkeit,
                        die Laufzeit ihrer Lizenz selbst zu bestimmen. „Die Search Guard Vertriebsstruktur basiert auf dem Resellerkonzept.
                        Entscheidet sich der Kunde für die Verlängerung der Lizenz, partizipieren unsere Vertriebspartner genauso,“ sagt Thomas Mahler.
                        Search Guard ist neben der kostenlosen Community Edition in den Lizenz-Versionen Enterprise Edition und Compliance Edition
                        als Premium-Version erhältlich. Die Enterprise Edition enthält zusätzliche, für den Anwender signifikante Features,
                        wie die Integration von Active Directory/LDAP, JSON webtokens, SAML und Single Sign On. Die Compliance Edition unterstützt dabei,
                        die Vorgaben der DSGVO zu erfüllen und ermöglicht unter anderem den Schutz von Daten bis auf die Formularfeldebene eines Dokuments.

                        <br /><br />

                        Optional bietet Search Guard kostenpflichtigen Support auf Jahresbasis an, um eine schnelle, umfassende und individuelle
                        Hilfestellung zu leisten. Darüber hinaus unterstützen sich Search Guard Nutzer aktiv untereinander mit Fragen und Antworten
                        im Search Guard Forum, das kostenfrei zur Verfügung steht.

                        <br /><br />

                        <u>Über floragunn GmbH</u>

                        <br /><br />

                        Exponentiell steigende Datenmengen (Big Data) benötigen zu jeder Zeit Schutz vor unbefugtem Zugriff oder Manipulation.
                        Seit seiner Gründung im Jahr 2013 verfolgt floragunn die Vision, jedes Elasticsearch-Cluster zu schützen.
                        Mit der Version Search Guard®2.3, veröffentlicht am 17. Juni 2016, ist Search Guard® das erste Sicherheits-Plug-In,
                        das wesentliche Security-Funktionen kostenlos zur Verfügung stellt. Hohe Kundenorientierung, schnelle Prozesse
                        und ein anwenderfreundliches Lizenzmodell zeichnen das Unternehmen aus.
                        Search Guard® ist ein Open-Source basiertes Plug-In Made in Germany und verifiziert nach Veracode und CVE Numbering Authority.
                        Die floragunn GmbH ist Mitglied in der Allianz für Cyber-Sicherheit vom Bundesamt für Sicherheit in der Informationstechnik (BSI)
                        sowie im TeleTrusT, dem Bundesverband für IT Sicherheit e.V.. Fortune 500 Unternehmen, Bildungsträger und Behörden
                        weltweit setzen Search Guard® zum Schutz ihrer Cluster ein. Search Guard® ist erhältlich in der kostenlosen
                        Community Edition sowie in den Lizenz-Versionen Enterprise und Compliance Edition.
                        Das Plug-In kann 60 Tage kostenlos getestet werden. Weitere Informationen unter <a href="https://search-guard.com">search-guard.com</a>.

                        <br /><br />

                        <b>Ansprechpartner für die Redaktion:</b><br />
                        Eskimos mit Kühlschränken<br />
                        Simone Brett-Murati<br />
                        Tel: 0171/ 53 80 275<br />
                        E-Mail: <a href="mailto:sbm@eskimos-mit-kuehlschraenken.de">sbm@eskimos-mit-kuehlschraenken.de</a>

                        <br /><br />

                        floragunn GmbH<br />
                        Thomas Mahler<br />
                        Tel: 01522/ 1950326<br />
                        Email: <a href="mailto:tmahler@search-guard.com">tmahler@search-guard.com</a>
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
