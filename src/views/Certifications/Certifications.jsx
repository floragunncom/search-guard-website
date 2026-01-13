import React from 'react';
import {Helmet} from 'react-helmet-async';
import './Certifications.scss';
import PageWrapper from '../../components/PageWrapper/PageWrapper.jsx';
import Title from '../../components/Title/Title.jsx';
import PreFooter from '../../components/PreFooter/PreFooter.jsx';
import veracode from '../../images/veracode.svg';
import alliance from '../../images/alliance.svg';
import security from '../../images/security.svg';
import CTAStartFreeTrial from "../../components/CTA/CTAStartFreeTrial.jsx";

const certificates = [
    {
        headline: 'Allianz for Cyber-Sicherheit',
        image: alliance,
        text: (
            <p>
                floragunn GmbH is member of the Alliance for Cyber Security, a body of
                the Federal Office for Information Security in Germany.
                <br/>
                <br/>
                With the Alliance for Cyber Security founded in 2012, the Federal
                Office for Information Security (BSI) is pursuing the goal of
                strengthening Germany's resistance to cyber attacks. Currently, 3791
                companies and institutions are members of the initiative.
                <br/>
                <br/>
                IT service and consulting companies and IT manufacturers are equally
                represented in the network as are user companies of all sizes and
                industries. This diversity is an important guarantee for a rich
                exchange of IT expertise and application experience from which all
                participants benefit.
                <br/>
                <br/>
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
                <br/>
                <br/>
                The Federal Association for IT Security e.V. (TeleTrusT) is a
                competence network comprising of domestic and foreign members from
                industry, administration, consulting and science as well as
                thematically related partner organisations. Through its broad
                membership and partner organizations, TeleTrusT embodies the largest
                competence network for IT security in Germany and Europe. TeleTrusT
                offers forums for experts, organizes events and participations in
                events and expresses its views on current IT security issues.
                <br/>
                <br/>
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
            {name: 'Download Report 23.09.19', link: '/'},
            {name: 'Download Report 23.09.19', link: '/'},
        ],
        homepage: 'https://www.teletrust.de/en/',
    },
];

const Certifications = () => {
    return (
        <PageWrapper>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>Certificates - Search Guard</title>
                <link rel="canonical" href="https://search-guard.com/certificates/"/>
                <meta
                    name="description"
                    content="Search Guard is security certified and we are actively participating in various IT security associations."
                />
            </Helmet>
            <Title
                headline="Certifications"
            />
            <div className="row certifications-wrapper">
                {certificates.map(certificate => {
                    return (
                        <div>
                            <div className="certifications-item-wrapper">
                                <h3 className="col s12 certifications-headline">
                                    {certificate.headline}
                                </h3>
                                <a
                                    href={certificate.homepage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="col s12 m3 certifications-image"
                                >
                                    <img loading="lazy" src={certificate.image} alt={certificate.image}/>
                                </a>
                                <div className="col s12 m8 certifications-context">
                                    <div className="col s12 certifications-text">
                                        {certificate.text}
                                    </div>
                                </div>
                            </div>
                            <div className="col s12 certifications-bottom-line"/>
                        </div>
                    );
                })}
            </div>
            <CTAStartFreeTrial colorschema="white"/>
            <PreFooter/>
        </PageWrapper>
    );
};

export default Certifications;
