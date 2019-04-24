import React, { Component } from 'react';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import Title from '../../components/Title/Title';
import TileSimple from '../../components/TileSimple/TileSimple';
import lock from '../../images/tile-icon-wheel.svg';
import './Product.scss';

class Product extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Title text="search guard security plugin" />
        <TileSimple
          icon={lock}
          iconPosition="left"
          backgroundColor="light"
          headline="Completely Open Source"
          text="Closed source security is no security, never leave the control of your data to a third party. Zero trust in networks, zero trust in closed source. We think that security software has to be Open Source by definition, so all of our code is available for you to download, inspect, evaluate and audit."
        />
        <TileSimple
          icon={lock}
          iconPosition="right"
          backgroundColor="dark"
          headline="Compliance ready"
          text="Security compliance regulations like GDPR, HIPAA, PCI-DSS or SOX require a business to protect, track and control access to sensitive data. Search Guard offers an extensive range of features that will help you to meet the technical requirements of compliance regulations."
        />
        <TileSimple
          icon={lock}
          iconPosition="left"
          backgroundColor="light"
          headline="All industry sectors"
          text="Search Guard runs on high-scale mission-critical production clusters protecting sensitive data in the finance, healthcare, pharmaceutical, aviation, telecommunications, security, and data intelligence sectors."
        />
        <PreFooter />
        <Footer />
      </div>
    );
  }
}

export default Product;