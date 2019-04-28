import React from 'react';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import Title from '../../components/Title/Title';
import Topic from '../../components/Topic/Topic';
import TileSimple from '../../components/TileSimple/TileSimple';
import Cta from '../../components/Cta/Cta';
import ctaIcon from '../../images/cta-banner-arrow.svg';
import fileCode from '../../images/file-code.svg';
import worldLock from '../../images/world-lock.svg';
import certificate from '../../images/certificate-big.svg';
import arrowDown from '../../images/arrow-down-green.svg';
import veracode from '../../images/veracode.svg';
import alliance from '../../images/alliance.svg';
import security from '../../images/security.svg';
import './Product.scss';

const Product = () => {
  return (
    <div>
      <NavBar />
      <Title text="search guard security plugin" />
      <div className="row">
        <div className="product-anchor-wrapper">
          <div className="product-anchor-item">
            <a href="" className="product-anchor-link">
              <img
                src={arrowDown}
                alt="arrow-down"
                className="product-anchor-img"
              />
              what it is
            </a>
          </div>
          <div className="product-anchor-item">
            <a href="" className="product-anchor-link">
              <img
                src={arrowDown}
                alt="arrow-down"
                className="product-anchor-img"
              />
              how it works
            </a>
          </div>
          <div className="product-anchor-item">
            <a href="#certified" className="product-anchor-link">
              <img
                src={arrowDown}
                alt="arrow-down"
                className="product-anchor-img"
              />
              certified
            </a>
          </div>
          <div className="product-anchor-item">
            <a href="" className="product-anchor-link">
              <img
                src={arrowDown}
                alt="arrow-down"
                className="product-anchor-img"
              />
              get a quote
            </a>
          </div>
        </div>
      </div>
      <Topic
        headline="Technology"
        text="As the pioneers in securing Elasticsearch clusters, all decisions about our technology have the same purpose, to make your Elasticsearch environment more secure."
      />
      <TileSimple
        icon={fileCode}
        iconPosition="left"
        backgroundColor="light"
        headline="Completely Open Source"
        text="Closed source security is no security, never leave the control of your data to a third party. Zero trust in networks, zero trust in closed source. We think that security software has to be Open Source by definition, so all of our code is available for you to download, inspect, evaluate and audit."
      />
      <TileSimple
        icon={certificate}
        iconPosition="right"
        backgroundColor="dark"
        headline="Compliance ready"
        text="Security compliance regulations like GDPR, HIPAA, PCI-DSS or SOX require a business to protect, track and control access to sensitive data. Search Guard offers an extensive range of features that will help you to meet the technical requirements of compliance regulations."
      />
      <TileSimple
        icon={worldLock}
        iconPosition="left"
        backgroundColor="light"
        headline="All industry sectors"
        text="Search Guard runs on high-scale mission-critical production clusters protecting sensitive data in the finance, healthcare, pharmaceutical, aviation, telecommunications, security, and data intelligence sectors."
      />
      <div className="certified-wrapper  scrollspy" id="certified">
        <div className="certified-headline">Certified</div>
        <div className="row">
          <div className="col s12 m4">
            <div className="certified-col-img">
              <img src={veracode} alt="icon" />
            </div>
            <div className="certified-col-headline">Veracode</div>
            <div className="certified-col-text">
              Mauris ullamcorper commodo eros a cursus. Mauris est sapien,
              lobortis ac orci non, mollis semper diam.
            </div>
          </div>
          <div className="col s12 m4">
            <div className="certified-col-img">
              <img src={alliance} alt="icon" />
            </div>
            <div className="certified-col-headline">
              Allianz für Cyber-Sicherheit
            </div>
            <div className="certified-col-text">
              Mauris ullamcorper commodo eros a cursus. Mauris est sapien,
              lobortis ac orci non, mollis semper diam.
            </div>
          </div>
          <div className="col s12 m4">
            <div className="certified-col-img">
              <img src={security} alt="icon" />
            </div>
            <div className="certified-col-headline">TeleTrusT</div>
            <div className="certified-col-text">
              Mauris ullamcorper commodo eros a cursus. Mauris est sapien,
              lobortis ac orci non, mollis semper diam.
            </div>
          </div>
        </div>
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

export default Product;
