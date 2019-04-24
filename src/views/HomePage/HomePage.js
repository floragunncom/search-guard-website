import React from 'react';
import './HomePage.scss';
import NavBar from '../../components/NavBar/NavBar';
import TileSimple from '../../components/TileSimple/TileSimple';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import lock from '../../images/tile-icon-wheel.svg';
import certificate from '../../images/icon-certificate.svg';
import check from '../../images/icon-check.svg';
import Services from '../../components/Services/Services';
import Cta from '../../components/Cta/Cta';
import Quotes from '../../components/Quotes/Quotes';
import LicensingModel from '../../components/LicensingModel/LicensingModel';

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <TileSimple
        icon={lock}
        iconPosition="left"
        backgroundColor="dark"
        headline="Multilevel security"
        text="Securing an Elasticsearch cluster can be a very complex task, as your cluster may contain various layers of components, from the nodes itself to Logstash and Kibana instances or even Beats. Search Guard covers it all, from top to bottom, you get encryption, authentication, authorization, audit logging, multitenancy and compliance features."
      />
      <TileSimple
        icon={lock}
        iconPosition="right"
        backgroundColor="light"
        headline="Support industry standards"
        text="Search Guard can be used to secure your Elasticsearch cluster by working with different industry standard authentication techniques, like Kerberos, LDAP / Active Directory, JSON web tokens, TLS certificates and Proxy authentication / SSO."
      />
      <TileSimple
        icon={lock}
        iconPosition="left"
        backgroundColor="dark"
        headline="Elastic Stack"
        text="Search Guard gives you full security control over your entire Elasticsearch environment. Whether you just want to encrypt data in transit, authenticate users against Active Directory, use Kerberos or JSON web tokens for Single Sign On or need to monitor and log malicious access attempts."
      />
      <div className="securityinfo-wrapper">
        <div className="row">
          <div className="col s12 m4">
            <div className="securityinfo-icon-wrapper">
              <img src={certificate} />
            </div>
            <div className="securityinfo-text-wrapper">
              <div className="securityinfo-headline">Certified</div>
              <div className="securityinfo-content">
                Search Guard puts “Security First”, your data is too valuable
                and sensitive to take any shortcut. Our code is being verified
                and certified from some of the industry leaders, like CA
                Veracode or NCC, which empowers us to demonstrate our commitment
                to creating truely secure software.
              </div>
            </div>
          </div>
          <div className="col s12 m4">
            <div className="securityinfo-icon-wrapper">
              <img src={check} />
            </div>
            <div className="securityinfo-text-wrapper">
              <div className="securityinfo-headline">Priority support</div>
              <div className="securityinfo-content">
                Besides our community forum, where our technical team is very
                active, helping to solve any issue. We also offer first hand
                support to our costumers with a 48h response time, guaranteed.
              </div>
            </div>
          </div>
          <div className="col s12 m4">
            <div className="securityinfo-icon-wrapper">
              <img src={certificate} />
            </div>
            <div className="securityinfo-text-wrapper">
              <div className="securityinfo-headline">Trusted by</div>
              <div className="securityinfo-content">
                A wide variety of enterprises, from Fortune 500 companies to the
                most innovative start-ups around the world, are trusting in
                Search Guard to secure their environments, and for good reason.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Services />
      <LicensingModel />
      <Cta
        headline="Free 60-day trial"
        text="Want to see how your company can benefit from our Compliance edition? Sign up to our 60-day trial, completely free of charge."
        ctaText="start free trial"
      />
      <Quotes />
      <PreFooter />
      <Footer />
    </div>
  );
};

export default HomePage;
