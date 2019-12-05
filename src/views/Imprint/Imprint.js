import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import './Imprint.scss';
import { Helmet } from 'react-helmet';

const Imprint = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Impressum - Search Guard</title>
        <meta
          name="description"
          content="Search Guard company information, contact details and VAT ID."
        />
      </Helmet>
      <NavBar />
      <Title
        headline="Imprint"
        text="Company information, contact details and VAT ID."
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
              <br />
              <br />
              Search Guard is a trademark of floragunn GmbH, registered in the
              U.S. and in other countries. Elasticsearch, Kibana, Logstash, and
              Beats are trademarks of Elasticsearch BV, registered in the U.S.
              and in other countries.
              <br />
              floragunn GmbH is not affiliated with Elasticsearch BV.
            </div>
            <div className="imprint-headline">Haftung für Inhalte</div>
            <div className="imprint-text">
              Eintragung im Handelsregister. Registergericht: Amtsgericht
              Charlottenburg Registernummer: HRB 147010 B USt-IdNr.: DE287373363
              Quelle: Impressumgenerator von{' '}
              <a
                href="http://www.e-recht24.de/"
                target="_blank"
                rel="noopener noreferrer"
              >
                http://www.e-recht24.de/
              </a>{' '}
              Search Guard is a trademark of floragunn GmbH, registered in the
              U.S. and in other countries. Elasticsearch, Kibana, Logstash, and
              Beats are trademarks of Elasticsearch BV, registered in the U.S.
              and in other countries. floragunn GmbH is not affiliated with
              Elasticsearch BV.
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
              HRB 147010
              <br />
              USt-IdNr.: DE287373363
              <br />
              <br />
              Search Guard is a trademark of floragunn GmbH, registered in the
              U.S. and in other countries. Elasticsearch, Kibana, Logstash, and
              Beats are trademarks of Elasticsearch BV, registered in the U.S.
              and in other countries.
            </div>
          </div>
        </div>
      </div>
      <PreFooter />
      <Footer />
    </div>
  );
};

export default Imprint;
