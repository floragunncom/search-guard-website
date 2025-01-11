import React from 'react';
import {Helmet} from 'react-helmet';
import '../../PressArticle.scss';
import PageWrapper from '../../../../components/PageWrapper/PageWrapper';
import PreFooter from '../../../../components/PreFooter/PreFooter';
import Title from '../../../../components/Title/Title';
import watches from "../../../../images/Alerting_Watches.png";
import watches_small from "../../../../images/Alerting_Watches_Small.png";
import graph from "../../../../images/Alerting_Graph.png";
import graph_small from "../../../../images/Alerting_Graph_Small.png";
import CTATrialLicense from "../../../../components/CTA/CTAStartFreeTrial";

const Alerting = () => {
    return (
        <PageWrapper>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>Effizientes Alert-Management für Big Data und IT-Infrastruktur</title>
                <link rel="canonical" href="https://search-guard.com/press/de/search-guard-alerting/"/>
                <meta
                    name="description"
                    content="Effizientes Alert-Management für Elasticsearch und IT-Infrastruktur"
                />
            </Helmet>
            <Title
                headline="Effizientes Alert-Management für Big Data und IT-Infrastruktur"
                text="Berlin, 23.07.2020"
            />

            <div className="row pressarticle-wrapper">
                <div className="col l4 hide-on-med-and-down">
                    <a href={watches} target="_blank" rel="noopener noreferrer">

                        <img loading="lazy" src={watches_small}
                                                                                     className="press-profile-pic"
                                                                                     alt="Free Alerting for Elasticsearch"/></a>
                    <div className="pressarticle-image-subline">
                        Watches sind der wesentliche Bestandteil in Signals. Sie bestehen aus drei Bausteinen:
                        Trigger, die festlegen, wann ein Watch durchgeführt wird.
                        Checks, die die definierte Situation überwachen und analysieren.
                        Aktionen, die ausgeführt werden, wenn alle vorangegangenen Bedingungen erfüllt sind.
                    </div>
                    <a href={graph} target="_blank" rel="noopener noreferrer"><img loading="lazy" src={graph_small}
                                                                                   className="press-profile-pic"
                                                                                   alt="Free Alerting for Elasticsearch"/></a>
                    <div className="pressarticle-image-subline">
                        Der Grafikmodus in Signals zeigt, wie sich Daten einer definierten Bedingung im Vergleich zum
                        Schwellwert verhalten
                        und wie sich diese im Zeitverlauf ändern. Die Definition des Schwellenwertes ist der
                        Ausgangspunkt für die flx-Strategie.
                    </div>
                </div>
                <div className="col s12 l8">
                    <div className="pressarticle-text">
                        <h2 className="pressarticle-headline2">Aktuelles Release von Search Guard mit neuer
                            Standardfunktion "Signals"</h2>

                        <b>
                            Berlin, 23.07.2020. Ab dem aktuellen Release Version 7.x-42.0.0 enthält Search Guard die
                            neue Standardfunktion "Signals". Mit
                            dem Alerting und Monitoring Feature erkennen IT-Administratoren Abweichungen und auffällige
                            Veränderungen von Daten,
                            die in Elasticsearch-Clustern und in der IT-Infrastruktur gespeichert sind. Das können
                            Kunden- oder Zahlungsdaten sein,
                            Produktionswerte, Unternehmenskennzahlen und vieles mehr. Search Guard ist ein unabhängiges
                            Open-Source-Plug-In für den
                            Schutz von Elasticsearch-Clustern. Das Alerting Feature ist ab sofort bereits standardmäßig
                            inkludiert. Es steht in der Community Edition kostenlos zur Verfügung.
                        </b>


                        <br/><br/>

                        Mehrfach fehlgeschlagene Online-Zahlungen, Betrugserkennung bei Finanztransaktionen oder einfach
                        auffällig häufige falsche Passworteingaben:
                        Angriffen und Datendiebstahl gehen oft unentdeckte Anomalien in einem Datencluster voraus. Je
                        sensibler die im Cluster gespeicherten Daten,
                        desto wichtiger ist die schnelle Erkennung von Abweichungen und deren richtige Priorisierung.
                        Dafür braucht das IT-Management eine
                        flx-Strategie. Benachrichtigungs-Management ist nicht nur im Betrugsfall sinnvoll, sondern auch
                        in preissensitiven Branchen, die aufgrund von Währungsschwankungen einer hohen Dynamik
                        unterliegen, wie im Handel mit Wertpapieren oder mit
                        Flugtickets.

                        <h3 className="pressarticle-headline3">Jederzeit handlungsfähig bleiben</h3>

                        Mit dem neuen Feature Signals in Search Guard können IT-Administratoren eine flx-Strategie
                        umsetzen,
                        die Warnsignale auf Basis eines mehrstufigen Eskalationsmodells an verschiedene
                        Benachrichtigungskanäle ausliefert.
                        Auf diese Weise wird sichergestellt, dass IT-Abteilungen sowohl im operativen Geschäft als auch
                        bei einem Angriff handlungsfähig bleiben.
                        Signals steuert die Überwachung und das Benachrichtigungs-Management im Fall von Datenanomalien
                        in Elasticsearch-Clustern.
                        Das Feature kann mit allen gängigen IT-Systemen, die über eine REST- Schnittstelle verfügen,
                        kombiniert werden.
                        Damit wird Signals auch zum Monitoring der gesamten IT- Infrastruktur eingesetzt.

                        <br/><br/>

                        Kernstück von Signals aus Administratorensicht ist die grafische Benutzeroberfläche. Hierüber
                        lassen
                        sich alle Einstellungen intuitiv und nutzerfreundlich vornehmen, ohne dass zusätzlicher
                        Programmieraufwand entsteht.
                        Über das User-Interface werden unterschiedliche Schweregrade definiert, sowie die
                        Benachrichtigungskanäle und Benachrichtigungsregeln pro Schweregrad.

                        <br/><br/>

                        "Um IT-Administratoren einen noch besseren Schutz ihres Clusters zu ermöglichen und hohen
                        Mehrwert zu bieten,
                        haben wir Search Guard um das Alerting Feature Signals erweitert“, sagt Jochen Kressin,
                        Geschäftsführer der floragunn GmbH,
                        Hersteller von Search Guard. „Signals schafft die Voraussetzung, dass die richtigen Personen zum
                        richtigen Zeitpunkt wissen,
                        was zu tun ist und Maßnahmen treffen können."

                        <h3 className="pressarticle-headline3">Signals im Überblick</h3>

                        <p><b>Multiple Dateneingabequellen</b></p>
                        Die wichtigste Datenquelle, auf die Signals zurückgreifen kann, ist Elasticsearch in der Version
                        7.4.0
                        und höher. Darüber hinaus können aber auch Daten von anderen Endpunkten verarbeitet werden,
                        was den Anwendungsbereich für IT-Administratoren deutlich erweitert. Signals wird mit einem
                        HTTP-
                        Adapter ausgeliefert, so dass Daten von jedem HTTP REST-Endpunkt einbezogen werden können.
                        Signals unterstützt auch Authentifizierung (HTTP Basic, JWT und Client-Zertifikate) und TLS.

                        <br/><br/>

                        <p><b>Dynamische Konditionen und Schweregrade</b></p>
                        Signals bietet Alerting sowohl klassisch basierend auf Schweregrad als auch mit vollständig
                        dynamischen Bedingungen zum Auslösen von Benachrichtigungen. Dynamische Bedingungen liegen
                        zum Beispiel vor, wenn Daten überwacht werden sollen, die sich aus unterschiedlichen
                        Datenquellen
                        speisen.

                        <br/><br/>

                        <p><b>Vielseitige Ausgabekanäle für Benachrichtigungen</b></p>

                        Ausgabekanäle für flx-Benachrichtigungen sind derzeit E-Mail, Slack, Webhooks, PagerDuty und
                        JIRA. In Planung ist die Unterstützung von Microsoft Teams als Ausgabekanal. Je nach Schweregrad
                        kann definiert werden, welcher Alert über welchen Kanal an welchen Empfänger gesendet wird. Die
                        Anzahl der Benachrichtigungen kann gesteuert und zum Beispiel auf eine Benachrichtigung pro
                        definiertem Intervall reduziert werden. Ebenso ist es möglich, die Warnmeldungen zu
                        voreingestellten Zeiten, zum Beispiel alle 30min oder exponentiell nach zwei Minuten, vier
                        Minuten
                        und so weiter einzustellen.

                        <br/><br/>

                        <p><b>Ausblick</b></p>
                        Signals ist kostenlos in der Community Edition verfügbar und kann ohne Aufwand installiert und
                        getestet werden. Download und Anleitung für Developer finden sich hier. Im Signals Community
                        Forum werden alle Fragen und Requests rund um das Feature beantwortet.

                        <br/><br/>

                        <u>Über floragunn GmbH</u>

                        <br/><br/>

                        Exponentiell steigende Datenmengen (Big Data) benötigen zu jeder Zeit Schutz vor unbefugtem
                        Zugriff oder Manipulation.
                        Seit seiner Gründung im Jahr 2013 verfolgt floragunn die Vision, jedes Elasticsearch-Cluster zu
                        schützen.
                        Mit der Version Search Guard®2.3, veröffentlicht am 17. Juni 2016, ist Search Guard® das erste
                        Sicherheits-Plug-In,
                        das wesentliche Security-Funktionen kostenlos zur Verfügung stellt. Hohe Kundenorientierung,
                        schnelle Prozesse
                        und ein anwenderfreundliches Lizenzmodell zeichnen das Unternehmen aus.
                        Search Guard® ist ein Open-Source basiertes Plug-In Made in Germany und verifiziert nach
                        Veracode und CVE Numbering Authority.
                        Die floragunn GmbH ist Mitglied in der Allianz für Cyber-Sicherheit vom Bundesamt für Sicherheit
                        in der Informationstechnik (BSI)
                        sowie im TeleTrusT, dem Bundesverband für IT Sicherheit e.V.. Fortune 500 Unternehmen,
                        Bildungsträger und Behörden
                        weltweit setzen Search Guard® zum Schutz ihrer Cluster ein. Search Guard® ist erhältlich in der
                        kostenlosen
                        Community Edition sowie in den Lizenz-Versionen Enterprise und Compliance Edition.
                        Das Plug-In kann 60 Tage kostenlos getestet werden. Weitere Informationen unter <a
                        href="https://search-guard.com/alerting/">search-guard.com/alerting/</a>.

                        <br/><br/>

                        <b>Ansprechpartner für die Redaktion:</b><br/>
                        Eskimos mit Kühlschränken<br/>
                        Simone Brett-Murati<br/>
                        Tel: 0171/ 53 80 275<br/>
                        E-Mail: <a
                        href="mailto:sbm@eskimos-mit-kuehlschraenken.de">sbm@eskimos-mit-kuehlschraenken.de</a>

                        <br/><br/>

                        floragunn GmbH<br/>
                        Thomas Mahler<br/>
                        Tel: 01522/ 1950326<br/>
                        Email: <a href="mailto:tmahler@search-guard.com">tmahler@search-guard.com</a>

                    </div>
                </div>
            </div>
            <CTATrialLicense colorschema="light"/>
            <PreFooter/>
        </PageWrapper>
    );
};

export default Alerting;
