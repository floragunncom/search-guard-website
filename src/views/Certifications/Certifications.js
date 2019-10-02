import React from 'react';
import './Certifications.scss';
import NavBar from '../../components/NavBar/NavBar';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import Cta from '../../components/Cta/Cta';
import ctaIcon from '../../images/icon-sg.svg';
import veracode from '../../images/veracode.svg';
import alliance from '../../images/alliance.svg';
import security from '../../images/security.svg';
// import pdf from '../../images/pdf-download.svg';
import { Helmet } from 'react-helmet';

const Certifications = () => {
  const certificates = [
    {
      headline: 'Veracode',
      image: veracode,
      text: (
        <p>
          All Search Guard versions and all used third-party libraries are
          tested for security vulnerabilities automatically prior to release.
          The Search Guard community, our customers and partners can always rely
          on our mission to provide the highest level of security possible.{' '}
          <br />
          <br />
          We use Veracode's patented static binary analysis technology that
          inspects software executables (compiled binaries or bytecode) for
          security flaws. Through advanced modeling, Veracode’s static engine
          detects flaws in the software's inputs and outputs that cannot be seen
          through penetration testing alone. Unlike source code review tools,
          this approach accurately detects issues in the core application and
          extends coverage to vulnerabilities found in 3rd party libraries,
          pre-packaged components, and code introduced by compiler or
          platform-specific interpretations.
          <br />
          <br />
          Through automated analysis, Veracode tests to determine the presence
          of common application vulnerabilities, such as those defined by the
          current SANS Top 25 and OWASP Top 10.
        </p>
      ),
      links: [
        { name: 'Download Report 23.09.19', link: '/' },
        { name: 'Download Report 23.09.19', link: '/' },
        { name: 'Download Report 23.09.19', link: '/' },
        { name: 'Download Report 23.09.19', link: '/' },
      ],
      homepage: 'https://www.veracode.com/verified/directory/floragunn-gmbh',
    },
    {
      headline: 'Allianz for Cyber-Sicherheit',
      image: alliance,
      text: (
        <p>
          floragunn GmbH is member of the Alliance for Cyber Security, a body of
          the Federal Office for Information Security in Germany.
          <br />
          <br />
          With the Alliance for Cyber Security founded in 2012, the Federal
          Office for Information Security (BSI) is pursuing the goal of
          strengthening Germany's resistance to cyber attacks. Currently, 3791
          companies and institutions are members of the initiative.
          <br />
          <br />
          IT service and consulting companies and IT manufacturers are equally
          represented in the network as are user companies of all sizes and
          industries. This diversity is an important guarantee for a rich
          exchange of IT expertise and application experience from which all
          participants benefit.
          <br />
          <br />
          110 partners and 91 multipliers are involved in the initiative and
          thus make a valuable contribution to more cyber security in Germany as
          a business location.
        </p>
      ),
      links: [],
      homepage: 'https://www.bsi.bund.de/EN',
    },
    {
      headline: 'Federal Association for IT Security',
      image: security,
      text: (
        <p>
          floragunn GmbH is member of the Federal Association for IT Security.
          <br />
          <br />
          The Federal Association for IT Security e.V. (TeleTrusT) is a
          competence network comprising of domestic and foreign members from
          industry, administration, consulting and science as well as
          thematically related partner organisations. Through its broad
          membership and partner organizations, TeleTrusT embodies the largest
          competence network for IT security in Germany and Europe. TeleTrusT
          offers forums for experts, organizes events and participations in
          events and expresses its views on current IT security issues.
          <br />
          <br />
          TeleTrusT is the sponsor of the "TeleTrusT European Bridge CA" (EBCA;
          PKI Trust Association), the expert certificates "TeleTrusT Information
          Security Professional" (T.I.S.P.) and "TeleTrusT Professional for
          Secure Software Engineering" (T.P.S.S.E.) as well as the trust mark
          "IT Security made in Germany". TeleTrusT is a member of the European
          Telecommunications Standards Institute (ETSI). The association is
          headquartered in Berlin.
        </p>
      ),
      links: [
        { name: 'Download Report 23.09.19', link: '/' },
        { name: 'Download Report 23.09.19', link: '/' },
      ],
      homepage: 'https://www.teletrust.de/en/',
    },
  ];

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>certificates Archives - Search Guard</title>
        <meta
          name="description"
          // content="Search Guard is an Open Source security plugin for Elasticsearch and the entire ELK stack. Search Guard offers encryption, authentification, authorization, audit logging, multitenancy and compliance features (for regulations like GDPR, HIPAA, PCI DSS or SOX)."
        />
      </Helmet>
      <NavBar />
      <Title
        headline="Certifications"
        text="Search Guard is security certified by CA Veracode and we are actively participating in various IT security associations."
      />
      <div className="row certifications-wrapper">
        {certificates.map(certificate => {
          return (
            <div>
              <div className="certifications-item-wrapper">
                <div className="col s12 certifications-headline">
                  {certificate.headline}
                </div>
                <a
                  href={certificate.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="col s12 m3 certifications-image"
                >
                  <img src={certificate.image} alt={certificate.image} />
                </a>
                <div className="col s12 m8 certifications-context">
                  <div className="col s12 certifications-text">
                    {certificate.text}
                  </div>
                  {/* <div className="col s12 certifications-button-wrapper">
                    {certificate.links.map(link => {
                      return (
                        <div className="col s12 l6 certifications-button">
                          <div className="certifications-button-text">
                            {link.name}
                          </div>
                          <img src={pdf} alt={pdf} />
                        </div>
                      );
                    })}
                  </div> */}
                </div>
              </div>
              <div className="col s12 certifications-bottom-line" />
            </div>
          );
        })}
      </div>
      <Cta
        headline="Free 60-day trial"
        text="Want to see how your company can benefit from our Compliance edition? Sign up to our 60-day trial, completely free of charge."
        ctaText="start free trial"
        icon={ctaIcon}
      />
      <PreFooter />
      <Footer />
    </div>
  );
};

export default Certifications;
