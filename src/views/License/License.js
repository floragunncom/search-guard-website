import React from 'react';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import Title from '../../components/Title/Title';
import Tile from '../../components/Tile/Tile';
import LicensingModel from '../../components/LicensingModel/LicensingModel';
import References from '../../components/References/References';
import Cta from '../../components/Cta/Cta';
import ctaIcon from '../../images/cta-banner-arrow.svg';
import arrowDown from '../../images/arrow-down-green.svg';
import iconBook from '../../images/icon-book.svg';
import iconWheels from '../../images/icon-wheels.svg';

const License = () => {
  return (
    <div id="top">
      <NavBar />
      <Title
        headline="licensing model"
        text="Non-productive systems are included in the license free of charge."
      />
      <div className="product-anchor-container">
        <div className="row">
          <div className="product-anchor-wrapper">
            <div className="product-anchor-item">
              <a href="#standard" className="product-anchor-link">
                <img
                  src={arrowDown}
                  alt="arrow-down"
                  className="product-anchor-img"
                />
                standard editions
              </a>
            </div>
            <div className="product-anchor-item">
              <a href="#feature" className="product-anchor-link">
                <img
                  src={arrowDown}
                  alt="arrow-down"
                  className="product-anchor-img"
                />
                feature breakdown
              </a>
            </div>
            <div className="product-anchor-item">
              <a href="#academic" className="product-anchor-link">
                <img
                  src={arrowDown}
                  alt="arrow-down"
                  className="product-anchor-img"
                />
                Academic and Custom editions
              </a>
            </div>
          </div>
        </div>
      </div>
      <LicensingModel
        headline="Standard editions"
        topButtons={false}
        tableView={true}
      />
      <div id="academic">
        <Tile
          leftDark={false}
          leftIcon={iconBook}
          rightIcon={iconWheels}
          leftHeadline="Academic & Scientific edition"
          rightHeadline="OEM, integrators & resellers"
          leftText="Because we love to support education and science, we offer a special license model for non-profit academic and scientific purposes. If you think your project/institution is eligible for this program, please contact us."
          rightText="We provide tailor made custom licenses for system integrators, OEM partners and resellers."
          leftLink="/"
          rightLink="/"
        />
      </div>
      <References />
      <Cta
        headline="Interested?"
        text="Then you can either get in touch to find out more or start a 60-day trial with our Compliance edition."
        ctaText="primary cta"
        icon={ctaIcon}
      />
      <PreFooter />
      <Footer />
    </div>
  );
};

export default License;
