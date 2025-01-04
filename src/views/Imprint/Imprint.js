import React from 'react';
import {Helmet} from 'react-helmet';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import './Imprint.scss';

const breadcrumb = [
  { anchor: '/', name: 'Home' },
  { anchor: '/company/', name: 'Company' },
  { anchor: '/imprint/', name: 'Imprint' }
];

const Imprint = () => {
  return (
    <PageWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Impressum - Search Guard</title>
        <link
          rel="canonical"
          href="https://search-guard.com/datenschutz/impressum/"
        />
        <meta
          name="description"
          content="Search Guard company information, contact details and VAT ID."
        />
      </Helmet>
      <Title
        headline="Imprint"
        text="Company information, contact details and VAT ID."
        breadcrumb={breadcrumb}
      />
      <div className="row">
        <div className="col s12 l8 offset-l2">
          <div className="imprint-wrapper">
            <div className="imprint-headline">Angaben gemäß § 5 TMG</div>
            <div className="imprint-text">
              floragunn GmbH
              <br />
              Tempelhofer Ufer 16
              <br />
              10963 Berlin
            </div>
            <div className="imprint-headline">Vertreten durch</div>
            <div className="imprint-text">
              Geschäftsführung: Claudia Kressin, Jochen Kressin
            </div>
            <div className="imprint-headline">Kontakt</div>
            <div className="imprint-text">
              <a href="mailto:info@floragunn.com">info@floragunn.com</a>
            </div>
            <div className="imprint-headline">Registereintrag</div>
            <div className="imprint-text">
              Eintragung im Handelsregister.
              <br />
              Registergericht: Amtsgericht Charlottenburg
              <br />
              Registernummer: HRB 147010 B<br />
              USt-IdNr.: DE287373363
            </div>
            <div className="imprint-headline">Haftung für Inhalte</div>
            <div className="imprint-text">
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt.
              Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
              können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter
              sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG
              sind wir als Diensteanbieter jedoch nicht verpflichtet,
              übermittelte oder gespeicherte fremde Informationen zu überwachen
              oder nach Umständen zu forschen, die auf eine rechtswidrige
              Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung
              der Nutzung von Informationen nach den allgemeinen Gesetzen
              bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch
              erst ab dem Zeitpunkt der Kenntnis einer konkreten
              Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
              Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </div>
            <div className="imprint-headline">Haftung für Links</div>
            <div className="imprint-text">
              Unser Angebot enthält Links zu externen Webseiten Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
              diese fremden Inhalte auch keine Gewähr übernehmen. Für die
              Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
              wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße
              überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
              Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle
              der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer
              Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
              Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </div>
            <div className="imprint-headline">Urheberrecht</div>
            <div className="imprint-text">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht
              kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser
              Seite nicht vom Betreiber erstellt wurden, werden die
              Urheberrechte Dritter beachtet. Insbesondere werden Inhalte
              Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
              Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
              entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
              werden wir derartige Inhalte umgehend entfernen.
            </div>
            <div className="imprint-headline">Company information</div>
            <div className="imprint-text">
              floragunn GmbH
              <br />
              Tempelhofer Ufer 16
              <br />
              10963 Berlin
              <br />
              Germany
              <br />
              <br />
              Amtsgericht Charlottenburg
              <br />
              Registration number: HRB 147010
              <br />
              VAT ID.: DE287373363
              <br />
              <br />
              Search Guard is a trademark of floragunn GmbH, registered in the
              U.S. and in other countries. Elasticsearch, Kibana, Logstash, and
              Beats are trademarks of Elasticsearch BV, registered in the U.S.
              and in other countries.
              <br />
              floragunn GmbH is not affiliated with Elasticsearch BV.
            </div>
          </div>
        </div>
      </div>
      <PreFooter />
    </PageWrapper>
  );
};

export default Imprint;
