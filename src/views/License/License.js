import React from 'react';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import Title from '../../components/Title/Title';
import Topic from '../../components/Topic/Topic';
import LicensingModel from '../../components/LicensingModel/LicensingModel';
import Cta from '../../components/Cta/Cta';
import ctaIcon from '../../images/cta-banner-arrow.svg';
import arrowDown from '../../images/arrow-down-green.svg';
import './License.scss';

const License = () => {
  return (
    <div>
      <NavBar />
      <Title text="licensing model" />
      <div className="row">
        <div className="product-anchor-wrapper">
          <div className="product-anchor-item">
            <a href="#test" className="product-anchor-link">
              <img
                src={arrowDown}
                alt="arrow-down"
                className="product-anchor-img"
              />
              standard editions
            </a>
          </div>
          <div className="product-anchor-item">
            <a href="" className="product-anchor-link">
              <img
                src={arrowDown}
                alt="arrow-down"
                className="product-anchor-img"
              />
              feature breakdown
            </a>
          </div>
          <div className="product-anchor-item">
            <a href="" className="product-anchor-link">
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
      <Topic
        headline="Unlimited nodes licensing"
        text="The regular license has no limits regarding the number of nodes, so you have the freedom to scale your cluster indefinitely without additional costs or managerial overhead, without additional costs. Our fully flexible approach also apply to the non-production systems, like DEV, SNG, AUT which are included in the license, free of charge."
      />
      <LicensingModel />
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
