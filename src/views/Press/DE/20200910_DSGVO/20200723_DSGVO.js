import React from 'react';
import {Helmet} from 'react-helmet';
import '../../PressArticle.scss';
import PageWrapper from '../../../../components/PageWrapper/PageWrapper';
import PreFooter from '../../../../components/PreFooter/PreFooter';
import Title from '../../../../components/Title/Title';
import dsgvo from "../../../../images/elasticsearch_dsgvo.jpeg";
import CTATrialLicense from "../../../../components/CTA/CTAStartFreeTrial";

const Alerting = () => {
    return (
        <PageWrapper>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>Effizientes Alert-Management für Big Data und IT-Infrastruktur</title>
                <link rel="canonical" href="https://search-guard.com/press/de/elasticsearch-dsgvo/"/>
                <meta
                    name="description"
                    content="Mit Search Guard sensible Daten in Elasticsearch-Clustern DSGVO-konform speichern"
                />
            </Helmet>
            <Title
                headline="Mit Search Guard sensible Daten in Elasticsearch-Clustern DSGVO-konform speichern"
                text="Berlin, 10.09.2020"
            />

            <div className="row pressarticle-wrapper">
                <div className="col l4 hide-on-med-and-down">
                    <a href={dsgvo} target="_blank" rel="noopener noreferrer"><img loading="lazy" src={dsgvo}
                                                                                   className="press-profile-pic"
                                                                                   alt="GDPR for Elasticsearch"/></a>
                    <div className="pressarticle-image-subline">
                        Mit der Compliance Edition des Security Plug-Ins Search Guard können
                        personenbezogene und sensible Kunden- und Mitarbeiterdaten gesetzeskonform in
                        Elasticsearch-Clustern gespeichert, bearbeitet
                        und verwaltet werden.
                    </div>
                </div>
                <div className="col s12 l8">
                    <div className="pressarticle-text">
                        <h2 className="pressarticle-headline2">Mit Search Guard sensible Daten in Elasticsearch-Clustern
                            DSGVO-konform speichern</h2>

                        <b>
                            Berlin, 10.09.2020. Datenpannen und Verstöße gegen die DSGVO sind immer häufiger miteinander
                            verknüpft und aufgrund der Menge und
                            Sensibilität der Informationen besonders kritisch. Mit der Compliance Edition des Security
                            Plug-Ins Search Guard können
                            personenbezogene und sensible Kunden- und Mitarbeiterdaten gesetzeskonform in
                            Elasticsearch-Clustern gespeichert, bearbeitet
                            und verwaltet werden. Durch rollenbasierte Zugriffsrechte, Write History und
                            Feldanonymisierung erfüllen Unternehmen
                            die Anforderungen der DSGVO und dokumentieren lückenlos die Einhaltung von
                            Compliance-Richtlinien.
                            Search Guard ist der einzige Anbieter, der DSGVO-Features für den Umgang mit sensiblen
                            sowie PII Daten in Elasticsearch-Clustern anbietet.
                        </b>


                        <br/><br/>

                        Personenbezogene Daten, die Rückschlüsse auf die Identifikation einer Person führen können (PII
                        Daten) sind auch zwei
                        Jahre nach Einführung der DSGVO vielerorts unzureichend vor unberechtigtem Zugriff geschützt.

                        <br/><br/>

                        Deren unzweckmäßiger Gebrauch führt in Deutschland und Österreich regelmäßig zu Geldstrafen in
                        sechs- und siebenstelliger Höhe.
                        Bisher bekannte Verstöße sind zum Beispiel die Verwendung von Kontaktdaten für Werbezwecke ohne
                        Erlaubnis,
                        nicht erfolgte Löschung persönlicher Daten oder die Weitergabe von Daten an Dritte.

                        <br/><br/>

                        „Die Masse sensibler Daten in unterschiedlichen Systemen und ein fehlendes Risikomanagement
                        stellen CIOs in der Umsetzung der DSGVO
                        immer noch vor enorme Herausforderungen“, sagt Jochen Kressin, Geschäftsführer der floragunn
                        GmbH, Hersteller von Search Guard.
                        „Doch jeder Regelverstoß bedeutet finanziellen Schaden und Vertrauensverlust. Die Compliance
                        Edition von Search Guard ist ein effizientes
                        und effektives Management Tool für PII Daten über die DSGVO hinaus.“

                        <br/><br/>

                        Mit der Search Guard Compliance Edition reduzieren Unternehmen die Risiken in der Verarbeitung
                        personenbezogener und sensibler Daten,
                        die sich in einem Elasticsearch-Cluster befinden. Der Schutz umfasst auch Logfiles, in denen oft
                        unbemerkt Emailadressen oder
                        IP-Adressen gespeichert sind.

                        <h3 className="pressarticle-headline3">Der Dokumentationspflicht über den Lebenszyklus von Daten
                            nachkommen</h3>

                        Wer hatte wann Zugriff auf welche Daten und wann wurde ein Dokument von wem verändert? Die DSGVO
                        verpflichtet Unternehmen,
                        Dateneigentümern wie Kunden und Mitarbeitern darüber Auskunft zu erteilen. Beispiele dafür sind
                        der Einsatz moderner,
                        cloudbasierter Marketingmethoden und Online-Bezahlsysteme. Beides führt dazu, dass Unternehmen
                        über einen langen Zeitraum
                        Kundendaten erhalten, auswerten und laufend bearbeiten.

                        <br/><br/>

                        Mit der Funktion Read History Audit Logging ist es möglich, den Zugriff bis auf die Feldebene
                        eines Dokuments nachzuverfolgen.
                        Dafür wird ein Audit-Trail aller Zugriffsaktivitäten erstellt. Der Audit-Trail enthält das Datum
                        des Zugriffs, den Benutzernamen,
                        die Dokument-ID und eine Liste der personenbezogenen Felder, die im Ergebnis enthalten waren.

                        <br/><br/>

                        Die Funktion Write History Audit Trail dokumentiert die Lebensdauer von sensiblen und PII Daten.
                        CIOs sind jederzeit auskunftsfähig darüber,
                        welcher Benutzer Dokumente erstellt, geändert oder gelöscht hat, was genau verändert wurde und
                        wann.

                        <br/><br/>

                        Darüber hinaus können veränderte Dokumente revisionssicher in einem unveränderbaren, dem
                        Immutable Elasticsearch Index oder in einem zentralen
                        Drittsystem gespeichert werden und gelten so als nicht manipulierbar.


                        <h3 className="pressarticle-headline3">Rollenbasierte Feldanonymisierung für mehr
                            Datensicherheit über die DSGVO hinaus</h3>

                        Rollenbasiertes Berechtigungsmanagement für den optimalen Schutz von Daten über die
                        Anforderungen der DSGVO hinaus erhalten
                        IT-Administratoren mit der Funktion Feldanonymisierung. Je nach zugewiesener Rolle werden Felder
                        mit PII oder sensiblen Daten
                        wie Klarnamen, Email-Adressen und Kreditkartendetails unberechtigten Benutzern nicht angezeigt,
                        wenn diese Dokumente aufgerufen werden.

                        <br/><br/>

                        Das ermöglicht reibungslose Abläufe im Unternehmensalltag, ohne gegen DSGVO und
                        Compliance-Richtlinien zu verstoßen.
                        Zum Beispiel hat ein HR-Manager weiterhin Zugriff auf eine Personalakte, kann aber Gehälter
                        nicht einsehen.
                        Marketing und Vertrieb können Auswertungen der letzten Email-Kampagne durchführen, ohne Zugriff
                        auf Email-Adressen zu bekommen.

                        <br/><br/>

                        Die Besonderheit daran ist, dass die Anonymisierung von Feldern zur Laufzeit vorgenommen kann,
                        auch nachdem Daten in einem
                        Elasticsearch Cluster abgelegt wurden. Das ist dann von Vorteil, wenn sich Rollen und
                        Berechtigungen im Laufe der Zeit verändern.

                        <br/><br/>

                        Configuration Change Tracking und System Change Tracking runden die Compliance Edition ab. Die
                        Features speichern und dokumentieren
                        alle Änderungen sowohl in der Search Guard als auch in der Elasticsearch Konfiguration. Kommt es
                        zu einem Datenverlust kann anhand
                        dessen leicht nachvollzogen werden, ob und wie Rollen vorher verändert wurden, um einen
                        unerlaubten Zugriff zu ermöglichen.

                        <br/><br/>

                        Die Search Guard Compliance Edition richtet sich an CIOs, die eine Fülle an Anwendungsfällen
                        abdecken müssen,
                        um den Anforderungen der DSGVO und weiterer Regelwerke wie Health Insurance Portability and
                        Accountability Act (HIPAA),
                        Payment Card Industry Data Security Standard (PCI) oder Sarbanes-Oxley Act (SOX) gerecht zu
                        werden.

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
                        href="https://search-guard.com/compliance/">search-guard.com/compliance/</a>.

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
