import React from 'react';
import './DataProtection.scss';
import Navbar from '../../components/NavBar/NavBar';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import { Helmet } from 'react-helmet';

const DataProtection = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Datenschutz - Search Guard</title>
        <link rel="canonical" href="http://search-guard.com/datenschutz/" />
        <meta
          name="description"
          content="Our policy regarding the collection and usage of personal data in accordance with GDPR."
        />
      </Helmet>
      <Navbar />
      <Title
        headline="Data Protection"
        text="Our policy regarding the collection and usage of personal data in accordance with GDPR."
      />
      <div className="row">
        <div className="col s12 l8 offset-l2">
          <div className="imprint-wrapper">
            <div className="imprint-headline">
              1. Name und Kontaktdaten des für die Verarbeitung Verantwortlichen
              sowie des betrieblichen Datenschutzbeauftragten
            </div>
            <div className="imprint-text">
              Diese Datenschutz-Information gilt für die Datenverarbeitung
              durch: <br />
              <br />
              Verantwortlicher:
              <br />
              floragunn GmbH
              <br />
              Tempelhofer Ufer 16
              <br />
              10963 Berlin
              <br />
              Tel.: 030 – 89379249
              <br />
              E-Mail: info@floragunn.com
            </div>
            <div className="imprint-headline">
              2. Erhebung und Speicherung personenbezogener Daten sowie Art und
              Zweck von deren Verwendung
            </div>
            <div className="imprint-text">
              a) Beim Besuch der Website <br />
              <br />
              Beim Aufrufen unserer Website{' '}
              <a
                href="https://search-guard.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://search-guard.com
              </a>{' '}
              werden durch den auf Ihrem Endgerät zum Einsatz kommenden Browser
              automatisch Informationen an den Server unserer Website gesendet.
              Diese Informationen werden temporär in einem sog. Logfile
              gespeichert. Folgende Informationen werden dabei ohne Ihr Zutun
              erfasst und bis zur automatisierten Löschung gespeichert:
              <br />
              <br />
              <ul className="imprint-listitem">
                <li>IP-Adresse des anfragenden Rechners,</li>
                <li>Datum und Uhrzeit des Zugriffs,</li>
                <li>Name und URL der abgerufenen Datei,</li>
                <li>
                  Website, von der aus der Zugriff erfolgt (Referrer-URL),
                </li>
                <li>
                  verwendeter Browser und ggf. das Betriebssystem Ihres Rechners
                  sowie der Name Ihres Access-Providers.
                </li>
              </ul>
              Die genannten Daten werden durch uns zu folgenden Zwecken
              verarbeitet:
              <ul className="imprint-listitem">
                <li>
                  Gewährleistung eines reibungslosen Verbindungsaufbaus der
                  Website,
                </li>
                <li>
                  Gewährleistung einer komfortablen Nutzung unserer Website,
                </li>
                <li>Auswertung der Systemsicherheit und -stabilität sowie</li>
                <li>zu weiteren administrativen Zwecken.</li>
              </ul>
              Die Rechtsgrundlage für die Datenverarbeitung ist Art. 6 Abs. 1 S.
              1 lit. f DSGVO. Unser berechtigtes Interesse folgt aus oben
              aufgelisteten Zwecken zur Datenerhebung. In keinem Fall verwenden
              wir die erhobenen Daten zu dem Zweck, Rückschlüsse auf Ihre Person
              zu ziehen.
              <br />
              <br />
              Darüber hinaus setzen wir beim Besuch unserer Website Cookies
              sowie Analysedienste ein. Nähere Erläuterungen dazu erhalten Sie
              unter den Ziff. 4 und 5 dieser Datenschutzerklärung.
              <br />
              <br />
              b) Bei Anmeldung für unseren Newsletter
              <br />
              <br />
              Sofern Sie nach Art. 6 Abs. 1 S. 1 lit. a DSGVO ausdrücklich
              eingewilligt haben, verwenden wir Ihre E-Mail-Adresse dafür, Ihnen
              regelmäßig unseren Newsletter zu übersenden. Für den Empfang des
              Newsletters ist die Angabe einer E-Mail-Adresse ausreichend.
              <br />
              <br />
              Die Abmeldung ist jederzeit möglich, zum Beispiel über einen Link
              am Ende eines jeden Newsletters. Alternativ können Sie Ihren
              Abmeldewunsch gerne auch jederzeit an info@floragunn.com per
              E-Mail senden.
              <br />
              <br />
              c) Bei Nutzung unseres Kontaktformulars
              <br />
              <br />
              Bei Fragen jeglicher Art bieten wir Ihnen die Möglichkeit, mit uns
              über ein auf der Website bereitgestelltes Formular Kontakt
              aufzunehmen. Dabei ist die Angabe einer gültigen E-Mail-Adresse
              erforderlich, damit wir wissen, von wem die Anfrage stammt und um
              diese beantworten zu können. Weitere Angaben können freiwillig
              getätigt werden.
              <br />
              <br />
              Die Datenverarbeitung zum Zwecke der Kontaktaufnahme mit uns
              erfolgt nach Art. 6 Abs. 1 S. 1 lit. a DSGVO auf Grundlage Ihrer
              freiwillig erteilten Einwilligung.
              <br />
              <br />
              Die für die Benutzung des Kontaktformulars von uns erhobenen
              personenbezogenen Daten werden nach Erledigung der von Ihnen
              gestellten Anfrage automatisch gelöscht.
            </div>
            <div className="imprint-headline">Weitergabe von Daten</div>
            <div className="imprint-text">
              Eine Übermittlung Ihrer persönlichen Daten an Dritte zu anderen
              als den im Folgenden aufgeführten Zwecken findet nicht statt.{' '}
              <br />
              <br />
              Wir geben Ihre persönlichen Daten nur an Dritte weiter, wenn:
              <ul className="imprint-listitem">
                <li>
                  Sie Ihre nach Art. 6 Abs. 1 S. 1 lit. a DSGVO ausdrückliche
                  Einwilligung dazu erteilt haben,
                </li>
                <li>
                  Sie Ihre nach Art. 6 Abs. 1 S. 1 lit. a DSGVO ausdrückliche
                  Einwilligung dazu erteilt haben,
                </li>
                <li>
                  die Weitergabe nach Art. 6 Abs. 1 S. 1 lit. f DSGVO zur
                  Geltendmachung, Ausübung oder Verteidigung von
                  Rechtsansprüchen erforderlich ist und kein Grund zur Annahme
                  besteht, dass Sie ein überwiegendes schutzwürdiges Interesse
                  an der Nichtweitergabe Ihrer Daten haben,
                </li>
                <li>
                  für den Fall, dass für die Weitergabe nach Art. 6 Abs. 1 S. 1
                  lit. c DSGVO eine gesetzliche Verpflichtung besteht, sowie •
                  dies gesetzlich zulässig und nach Art. 6 Abs. 1 S. 1 lit. b
                  DSGVO für die Abwicklung von Vertragsverhältnissen mit Ihnen
                  erforderlich ist.
                </li>
              </ul>
            </div>
            <div className="imprint-headline">4. Cookies</div>
            <div className="imprint-text">
              Wir setzen auf unserer Seite Cookies ein. Hierbei handelt es sich
              um kleine Dateien, die Ihr Browser automatisch erstellt und die
              auf Ihrem Endgerät (Laptop, Tablet, Smartphone o.ä.) gespeichert
              werden, wenn Sie unsere Seite besuchen. Cookies richten auf Ihrem
              Endgerät keinen Schaden an, enthalten keine Viren, Trojaner oder
              sonstige Schadsoftware. <br />
              <br />
              In dem Cookie werden Informationen abgelegt, die sich jeweils im
              Zusammenhang mit dem spezifisch eingesetzten Endgerät ergeben.
              Dies bedeutet jedoch nicht, dass wir dadurch unmittelbar Kenntnis
              von Ihrer Identität erhalten. <br />
              <br />
              Der Einsatz von Cookies dient einerseits dazu, die Nutzung unseres
              Angebots für Sie angenehmer zu gestalten. So setzen wir sogenannte
              Session-Cookies ein, um zu erkennen, dass Sie einzelne Seiten
              unserer Website bereits besucht haben. Diese werden nach Verlassen
              unserer Seite automatisch gelöscht. <br />
              <br />
              Darüber hinaus setzen wir ebenfalls zur Optimierung der
              Benutzerfreundlichkeit temporäre Cookies ein, die für einen
              bestimmten festgelegten Zeitraum auf Ihrem Endgerät gespeichert
              werden. Besuchen Sie unsere Seite erneut, um unsere Dienste in
              Anspruch zu nehmen, wird automatisch erkannt, dass Sie bereits bei
              uns waren und welche Eingaben und Einstellungen sie getätigt
              haben, um diese nicht noch einmal eingeben zu müssen. <br />
              <br />
              Zum anderen setzten wir Cookies ein, um die Nutzung unserer
              Website statistisch zu erfassen und zum Zwecke der Optimierung
              unseres Angebotes für Sie auszuwerten (siehe Ziff. 5). Diese
              Cookies ermöglichen es uns, bei einem erneuten Besuch unserer
              Seite automatisch zu erkennen, dass Sie bereits bei uns waren.
              Diese Cookies werden nach einer jeweils definierten Zeit
              automatisch gelöscht. <br />
              <br />
              Die durch Cookies verarbeiteten Daten sind für die genannten
              Zwecke zur Wahrung unserer berechtigten Interessen sowie der
              Dritter nach Art. 6 Abs. 1 S. 1 lit. f DSGVO erforderlich. <br />
              <br />
              Die meisten Browser akzeptieren Cookies automatisch. Sie können
              Ihren Browser jedoch so konfigurieren, dass keine Cookies auf
              Ihrem Computer gespeichert werden oder stets ein Hinweis
              erscheint, bevor ein neuer Cookie angelegt wird. Die vollständige
              Deaktivierung von Cookies kann jedoch dazu führen, dass Sie nicht
              alle Funktionen unserer Website nutzen können.
            </div>
            <div className="imprint-headline">5. Analyse-Tools</div>
            <div className="imprint-text">
              Tracking-Tools <br />
              <br />
              Das Tracking wird auf Grundlage des Art. 6 Abs. 1 S. 1 lit. f
              DSGVO durchgeführt. Mit den zum Einsatz kommenden
              Tracking-Maßnahmen wollen wir eine bedarfsgerechte Gestaltung und
              die fortlaufende Optimierung unserer Webseite sicherstellen. Zum
              anderen setzen wir die Tracking-Maßnahmen ein, um die Nutzung
              unserer Webseite statistisch zu erfassen und zum Zwecke der
              Optimierung unseres Angebotes für Sie auszuwerten. Diese
              Interessen sind als berechtigt im Sinne der vorgenannten
              Vorschrift anzusehen. <br />
              <br />
              Die jeweiligen Datenverarbeitungszwecke und Datenkategorien sind
              aus den entsprechenden Tracking-Tools zu entnehmen.
            </div>
            <div className="imprint-headline">6. Social Media Plug-ins</div>
            <div className="imprint-text">
              Wir setzen auf unserer Website auf Grundlage des Art. 6 Abs. 1 S.
              1 lit. f DSGVO Social Plug-ins der sozialen Netzwerke Facebook,
              Twitter und Instagram ein, um unser Unternehmen hierüber bekannter
              zu machen. Der dahinterstehende werbliche Zweck ist als
              berechtigtes Interesse im Sinne der DSGVO anzusehen. Die
              Verantwortung für den datenschutzkonformen Betrieb ist durch deren
              jeweiligen Anbieter zu gewährleisten. <br />
              <br />
              Die Einbindung dieser Plug-ins durch uns erfolgt im Wege der
              sogenannten Zwei-Klick-Methode um Besucher <br />
              <br />
              unserer Webseite bestmöglich zu schützen. <br />
              <br />
              a) Facebook <br />
              <br />
              Auf unserer Website kommen Social-Media Plugins von Facebook zum
              Einsatz, um deren Nutzung persönlicher zu gestalten. Hierfür
              nutzen wir den „LIKE“ oder „TEILEN“-Button. Es handelt sich dabei
              um ein Angebot von Facebook. Wenn Sie eine Seite unseres
              Webauftritts aufrufen, die ein solches Plugin enthält, baut Ihr
              Browser eine direkte Verbindung mit den Servern von Facebook auf.
              Der Inhalt des Plugins wird von Facebook direkt an Ihren Browser
              übermittelt und von diesem in die Webseite eingebunden. <br />
              <br />
              Durch die Einbindung der Plugins erhält Facebook die Information,
              dass Ihr Browser die entsprechende Seite unseres Webauftritts
              aufgerufen hat, auch wenn Sie kein Facebook-Konto besitzen oder
              gerade nicht bei Facebook eingeloggt sind. Diese Information
              (einschließlich Ihrer IP-Adresse) wird von Ihrem Browser direkt an
              einen Server von Facebook in den USA übermittelt und dort
              gespeichert. Sind Sie bei Facebook eingeloggt, kann Facebook den
              Besuch unserer Website Ihrem Facebook-Konto direkt zuordnen. Wenn
              Sie mit den Plugins interagieren, zum Beispiel den „LIKE“ oder
              „TEILEN“-Button betätigen, wird die entsprechende Information
              ebenfalls direkt an einen Server von Facebook übermittelt und dort
              gespeichert. Die Informationen werden zudem auf Facebook
              veröffentlicht und Ihren Facebook-Freunden angezeigt. Facebook
              kann diese Informationen zum Zwecke der Werbung, Marktforschung
              und bedarfsgerechten Gestaltung der Facebook-Seiten benutzen.
              Hierzu werden von Facebook Nutzungs-, Interessen- und
              Beziehungsprofile erstellt, z.B. <br />
              <br />
              um Ihre Nutzung unserer Website im Hinblick auf die Ihnen bei
              Facebook eingeblendeten Werbeanzeigen auszuwerten, andere
              Facebook-Nutzer über Ihre Aktivitäten auf unserer Website zu
              informieren und um weitere mit der Nutzung von Facebook verbundene
              Dienstleistungen zu erbringen. Wenn Sie nicht möchten, dass
              Facebook die über unseren Webauftritt gesammelten Daten Ihrem
              Facebook-Konto zuordnet, müssen Sie sich vor Ihrem Besuch unserer
              Website bei Facebook ausloggen. Zweck und Umfang der Datenerhebung
              und die weitere Verarbeitung und Nutzung der Daten durch Facebook
              sowie Ihre diesbezüglichen Rechte und Einstellungsmöglichkeiten
              zum Schutz Ihrer Privatsphäre entnehmen Sie bitte den <br />
              <br />
              Datenschutzhinweisen{' '}
              <a
                href="https://www.facebook.com/about/privacy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                (https://www.facebook.com/about/privacy/)
              </a>{' '}
              von Facebook. <br />
              <br />
              b) Twitter <br />
              <br />
              Auf unseren Internetseiten sind Plugins des
              Kurznachrichtennetzwerks der Twitter Inc. (Twitter) integriert.
              Die Twitter-Plugins (tweet-Button) erkennen Sie an dem
              Twitter-Logo auf unserer Seite. Eine Übersicht über tweet-Buttons
              finden Sie hier{' '}
              <a
                href="https://about.twitter.com/resources/buttons"
                target="_blank"
                rel="noopener noreferrer"
              >
                (https://about.twitter.com/resources/buttons)
              </a>
              . Wenn Sie eine Seite unseres Webauftritts aufrufen, die ein
              solches Plugin enthält, wird eine direkte Verbindung zwischen
              Ihrem Browser und dem Twitter-Server hergestellt. Twitter erhält
              dadurch die Information, dass Sie mit Ihrer IP-Adresse unsere
              Seite besucht haben. Wenn Sie den Twitter „tweet-Button“
              anklicken, während Sie in Ihrem Twitter-Account eingeloggt sind,
              können Sie die Inhalte unserer Seiten auf Ihrem Twitter-Profil
              verlinken. Dadurch kann Twitter den Besuch unserer Seiten Ihrem
              Benutzerkonto zuordnen. Wir weisen darauf hin, dass wir als
              Anbieter der Seiten keine Kenntnis vom Inhalt der übermittelten
              Daten sowie deren Nutzung durch Twitter erhalten. Wenn Sie nicht
              wünschen, dass Twitter den Besuch unserer Seiten zuordnen kann,
              loggen Sie sich bitte aus Ihrem Twitter-Benutzerkonto aus. Weitere
              Informationen hierzu finden Sie in der Datenschutzerklärung von
              Twitter{' '}
              <a
                href="https://about.twitter.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                (https://about.twitter.com/privacy)
              </a>
              .<br />
              <br />
              c) Instagram <br />
              <br />
              Auf unserer Website werden auch sogenannte Social Plugins
              („Plugins“) von Instagram verwendet, das von der Instagram LLC.,
              1601 Willow Road, Menlo Park, CA 94025, USA („Instagram“)
              betrieben wird. Die Plugins sind mit einem Instagram-Logo
              beispielsweise in Form einer „Instagram-Kamera“ gekennzeichnet.
              Wenn Sie eine Seite unseres Webauftritts aufrufen, die ein solches
              Plugin enthält, stellt Ihr Browser eine direkte Verbindung <br />
              <br />
              zu den Servern von Instagram her. Der Inhalt des Plugins wird von
              Instagram direkt an Ihren Browser übermittelt und in die Seite
              eingebunden. Durch diese Einbindung erhält Instagram die
              Information, dass Ihr Browser die entsprechende Seite unseres
              Webauftritts aufgerufen hat, auch wenn Sie kein Instagram-Profil
              besitzen oder gerade nicht bei Instagram eingeloggt sind. Diese
              Information (einschließlich Ihrer IP-Adresse) wird von Ihrem
              Browser direkt an einen Server von Instagram in die USA
              übermittelt und dort gespeichert. Sind Sie bei Instagram
              eingeloggt, kann Instagram den Besuch unserer Website Ihrem
              Instagram-Account unmittelbar zuordnen. Wenn Sie mit den Plugins
              interagieren, zum Beispiel das „Instagram“- Button betätigen, wird
              diese Information ebenfalls direkt an einen Server von Instagram
              übermittelt und dort gespeichert. <br />
              <br />
              Die Informationen werden außerdem auf Ihrem Instagram- Account
              veröffentlicht und dort Ihren Kontakten angezeigt. Wenn Sie nicht
              möchten, dass Instagram die über unseren Webauftritt gesammelten
              Daten unmittelbar Ihrem Instagram- Account zuordnet, müssen Sie
              sich vor Ihrem Besuch unserer Website bei Instagram ausloggen.
              Weitere Informationen hierzu Sie in der Datenschutzerklärung{' '}
              <a
                href="https://help.instagram.com/155833707900388"
                target="_blank"
                rel="noopener noreferrer"
              >
                (https://help.instagram.com/155833707900388)
              </a>{' '}
              von Instagram.
            </div>
            <div className="imprint-headline">7. Betroffenenrechte</div>
            <div className="imprint-text">
              Sie haben das Recht:
              <br />
              <br />
              <ul className="imprint-listitem">
                <li>
                  gemäß Art. 15 DSGVO Auskunft über Ihre von uns verarbeiteten
                  personenbezogenen Daten zu verlangen. Insbesondere können Sie
                  Auskunft über die Verarbeitungszwecke, die Kategorie der
                  personenbezogenen Daten, die Kategorien von Empfängern,
                  gegenüber denen Ihre Daten offengelegt wurden oder werden, die
                  geplante Speicherdauer, das Bestehen eines Rechts auf
                  Berichtigung, Löschung, Einschränkung der Verarbeitung oder
                  Widerspruch, das Bestehen eines Beschwerderechts, die Herkunft
                  ihrer Daten, sofern diese nicht bei uns erhoben wurden, sowie
                  über das Bestehen einer automatisierten Entscheidungsfindung
                  einschließlich Profiling und ggf. aussagekräftigen
                  Informationen zu deren Einzelheiten verlangen;
                </li>
                <li>
                  gemäß Art. 16 DSGVO unverzüglich die Berichtigung unrichtiger
                  oder Vervollständigung Ihrer bei uns gespeicherten
                  personenbezogenen Daten zu verlangen;
                </li>
                <li>
                  gemäß Art. 17 DSGVO die Löschung Ihrer bei uns gespeicherten
                  personenbezogenen Daten zu verlangen, soweit nicht die
                  Verarbeitung zur Ausübung des Rechts auf freie
                  Meinungsäußerung und Information, zur Erfüllung einer
                  rechtlichen Verpflichtung, aus Gründen des öffentlichen
                  Interesses oder zur Geltendmachung, Ausübung oder Verteidigung
                  von Rechtsansprüchen erforderlich ist;
                </li>
                <li>
                  gemäß Art. 18 DSGVO die Einschränkung der Verarbeitung Ihrer
                  personenbezogenen Daten zu verlangen, soweit die Richtigkeit
                  der Daten von Ihnen bestritten wird, die Verarbeitung
                  unrechtmäßig ist, Sie aber deren Löschung ablehnen und wir die
                  Daten nicht mehr benötigen, Sie jedoch diese zur
                  Geltendmachung, Ausübung oder Verteidigung von
                  Rechtsansprüchen benötigen oder Sie gemäß Art. 21 DSGVO
                  Widerspruch gegen die Verarbeitung eingelegt haben;
                </li>
                <li>
                  gemäß Art. 20 DSGVO Ihre personenbezogenen Daten, die Sie uns
                  bereitgestellt haben, in einem strukturierten, gängigen und
                  maschinenlesebaren Format zu erhalten oder die Übermittlung an
                  einen anderen Verantwortlichen zu verlangen;
                </li>
                <li>
                  gemäß Art. 7 Abs. 3 DSGVO Ihre einmal erteilte Einwilligung
                  jederzeit gegenüber uns zu widerrufen. Dies hat zur Folge,
                  dass wir die Datenverarbeitung, die auf dieser Einwilligung
                  beruhte, für die Zukunft nicht mehr fortführen dürfen und
                </li>
                <li>
                  gemäß Art. 77 DSGVO sich bei einer Aufsichtsbehörde zu
                  beschweren. In der Regel können Sie sich hierfür an die
                  Aufsichtsbehörde Ihres üblichen Aufenthaltsortes oder
                  Arbeitsplatzes oder unseres Unternehmensitzes wenden.
                </li>
              </ul>
            </div>
            <div className="imprint-headline">8. Widerspruchsrecht</div>
            <div className="imprint-text">
              Sofern Ihre personenbezogenen Daten auf Grundlage von berechtigten
              Interessen gemäß Art. 6 Abs. 1 S. 1 lit. f DSGVO verarbeitet
              werden, haben Sie das Recht, gemäß Art. 21 DSGVO Widerspruch gegen
              die Verarbeitung Ihrer personenbezogenen Daten einzulegen, soweit
              dafür Gründe vorliegen, die sich aus Ihrer besonderen Situation
              ergeben oder sich der Widerspruch gegen Direktwerbung richtet. Im
              letzteren Fall haben Sie ein generelles Widerspruchsrecht, das
              ohne Angabe einer besonderen Situation von uns umgesetzt wird.
              <br />
              <br />
              Möchten Sie von Ihrem Widerrufs- oder Widerspruchsrecht Gebrauch
              machen, genügt eine E-Mail an info@floragunn.com
            </div>
            <div className="imprint-headline">9. Datensicherheit</div>
            <div className="imprint-text">
              Wir verwenden innerhalb des Website-Besuchs das verbreitete
              SSL-Verfahren (Secure Socket Layer) in Verbindung mit der jeweils
              höchsten Verschlüsselungsstufe, die von Ihrem Browser unterstützt
              wird. In der Regel handelt es sich dabei um eine 256 Bit
              Verschlüsselung. Falls Ihr Browser keine 256-Bit Verschlüsselung
              unterstützt, greifen wir stattdessen auf 128-Bit v3 Technologie
              zurück. Ob eine einzelne Seite unseres Internetauftrittes
              verschlüsselt übertragen wird, erkennen Sie an der geschlossenen
              Darstellung des Schüssel- beziehungsweise Schloss-Symbols in der
              unteren Statusleiste Ihres Browsers. <br />
              <br />
              Wir bedienen uns im Übrigen geeigneter technischer und
              organisatorischer Sicherheitsmaßnahmen, um Ihre Daten gegen
              zufällige oder vorsätzliche Manipulationen, teilweisen oder
              vollständigen Verlust, Zerstörung oder gegen den unbefugten
              Zugriff Dritter zu schützen. Unsere Sicherheitsmaßnahmen werden
              entsprechend der technologischen Entwicklung fortlaufend
              verbessert.
            </div>
            <div className="imprint-headline">
              10. Aktualität und Änderung dieser Datenschutzerklärung
            </div>
            <div className="imprint-text">
              Diese Datenschutzerklärung ist aktuell gültig und hat den Stand
              Mai 2018. <br />
              <br />
              Durch die Weiterentwicklung unserer Website und Angebote darüber
              oder aufgrund geänderter gesetzlicher beziehungsweise behördlicher
              Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu
              ändern. Die jeweils aktuelle Datenschutzerklärung kann jederzeit
              auf unserer Website abgerufen und/oder ausgedruckt werden.
            </div>
          </div>
        </div>
      </div>
      <PreFooter />
      <Footer />
    </div>
  );
};

export default DataProtection;
