import React from 'react';
import './Presentations.scss';
import Navbar from '../../components/NavBar/NavBar';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import cheffo from '../../images/cheffo.jpeg';
import pdf from '../../images/pdf-download.svg';

const Presentations = () => {
  const presentations = [
    {
      image: cheffo,
      headline: 'Quickstart and first steps',
      text:
        'How to use the Demo Installer to quickly set up a Search Guard PoC for Elasticsearch and Kibana. Use the Kibana config GUI to add users, roles and permissions.',
      link: '/',
    },
    {
      image: cheffo,
      headline: 'Architecture and Request Flow',
      text:
        'A high-level view on the Search Guard architecture and the request flow. This presentation describes the main concepts of Search Guard and how security is implemented.',
      link: '/',
    },
    {
      image: cheffo,
      headline: 'Configuration Basics',
      text:
        'This deck describes how the Search Guard configuration for users, roles and permissions is structured, and explains how to apply configuration changes.',
      link: '/',
    },
    {
      image: cheffo,
      headline: 'Active Directory & LDAP',
      text:
        'How to connect Search Guard to an Active Directory or LDAP server, and how to configure authentication and authorization.',
      link: '/',
    },
    {
      image: cheffo,
      headline: 'JSON web tokens',
      text:
        'How to use JSON web tokens for Elasticsearch single sign on authentication.',
      link: '/',
    },
  ];

  return (
    <div>
      <Navbar />
      <Title
        headline="Presentations"
        text="As the pioneers in securing Elasticsearch clusters, all decisions about our technology have the same purpose, to make your Elasticsearch environment more secure."
      />
      <div className="row presentations-wrapper">
        {presentations.map(item => {
          return (
            <div className="col m6 s12">
              <img
                src={item.image}
                className="presentations-image"
                alt="preview image"
              />
              <div className="presentations-headline">{item.headline}</div>
              <div className="presentations-text">{item.text}</div>
              <div className="presenations-download">
                <div
                  className="presentations-button"
                  onClick={console.log('works')}
                >
                  <img
                    src={pdf}
                    alt="download icon"
                    className="presentations-button-icon"
                  />
                  <div className="presentations-button-text">download pdf</div>
                </div>
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
