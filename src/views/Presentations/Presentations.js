import React from 'react';
import { Helmet } from 'react-helmet';
import './Presentations.scss';
import Navbar from '../../components/NavBar/NavBar';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import pdf from '../../images/pdf-download.svg';

const Presentations = () => {
  const presentations = [
    {
      image:
        'https://docs.search-guard.com/latest/search_guard_installation.png',
      headline: 'Quickstart and first steps',
      text:
        'How to use the Demo Installer to quickly set up a Search Guard PoC for Elasticsearch and Kibana. Use the Kibana config GUI to add users, roles and permissions.',
      link:
        'https://docs.search-guard.com/resources/presentations/01_SG_Documents_installation.pdf',
    },
    {
      image:
        'https://docs.search-guard.com/latest/search_guard_architecture_request_flow.png',
      headline: 'Architecture and Request Flow',
      text:
        'A high-level view on the Search Guard architecture and the request flow. This presentation describes the main concepts of Search Guard and how security is implemented.',
      link:
        'https://docs.search-guard.com/resources/presentations/02_SG_Documents_architecture_request_flow.pdf',
    },
    {
      image:
        'https://docs.search-guard.com/latest/search_guard_configuration_basics.png',
      headline: 'Configuration Basics',
      text:
        'This deck describes how the Search Guard configuration for users, roles and permissions is structured, and explains how to apply configuration changes.',
      link:
        'https://docs.search-guard.com/resources/presentations/03_SG_Documents_configuration_basics.pdf',
    },
    {
      image:
        'https://docs.search-guard.com/latest/elasticsearch_active_directory_ldap.png',
      headline: 'Active Directory & LDAP',
      text:
        'How to connect Search Guard to an Active Directory or LDAP server, and how to configure authentication and authorization.',
      link:
        'https://docs.search-guard.com/resources/presentations/04_SG_Documents_active_directory_ldap.pdf',
    },
    {
      image:
        'https://docs.search-guard.com/latest/elasticsearch_json_web_tokens.png',
      headline: 'JSON web tokens',
      text:
        'How to use JSON web tokens for Elasticsearch single sign on authentication.',
      link:
        'https://docs.search-guard.com/resources/presentations/05_SG_Documents_json_web_tokens.pdf',
    },
    {
      image:
        'https://docs.search-guard.com/latest/elasticsearch_auditlogging.png',
      headline: 'Audit logging',
      text:
       'Use Search Guard audit logging to track access to your cluster and to stay compliant with regulations like PCI, HIPAA, SOX, GDPR and ISO.',
      link:
        'https://docs.search-guard.com/resources/presentations/06_SG_Documents_auditlogging.pdf',
    },
    {
      image:
        'https://docs.search-guard.com/latest/elasticsearch_search_guard_document_field_level_security.png',
      headline: 'Document- and Field-Level Security',
      text:
        'How to apply fine-grained access control to documents and fields in indices. Filter documents and filter or anonymize fields based on the users roles.',
      link:
        'https://docs.search-guard.com/resources/presentations/07_SG_Documents_document_and_field_level_security.pdf',
    },
    {
      image: 'https://docs.search-guard.com/latest/zero_trusted_networks.png',
      headline: 'Zero-trusted network',
      text:
        'VPNs and firewalls are the norms, but perimeter security is not enough anymore. The Zero Trust Security model moves access control mechanisms from the network perimeter to the actual users, devices, and systems.',
      link:
        'https://docs.search-guard.com/resources/presentations/Zero_Trusted_Networks.pdf',
    },
  ];

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Search Guard Security and Alerting Slide Decks for Elasticsearch
        </title>
        <link rel="canonical" href="https://search-guard.com/presentations/" />
        <meta
          name="description"
          content="Search Guard slide decks regarding various topics around security and alerting for Elasticsearch"
        />
      </Helmet>
      <Navbar />
      <Title
        headline="Presentations"
        text="Search Guard slide decks regarding various topics around security and alerting for Elasticsearch"
      />
      <div className="row presentations-wrapper">
        {presentations.map(item => {
          return (
            <div className="col m6 s12">
              <img
                src={item.image}
                className="presentations-image"
                alt="preview imaginery"
              />
              <div className="presentations-headline">{item.headline}</div>
              <div className="presentations-text">{item.text}</div>
              <div className="presenations-download">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="presentations-button"
                >
                  <img
                    src={pdf}
                    alt="download icon"
                    className="presentations-button-icon"
                  />
                  <div className="presentations-button-text">download pdf</div>
                </a>
              </div>
            </div>
          );
        })}
      </div>
      <PreFooter />
      <Footer />
    </div>
  );
};

export default Presentations;
