import React from 'react';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import Title from '../../components/Title/Title';
import arrowDown from '../../images/arrow-down-green.svg';
import './Company.scss';

const Company = () => {
  return (
    <div>
      <NavBar />
      <Title text="company" />
      <div className="row">
        <div className="product-anchor-wrapper">
          <div className="product-anchor-item">
            <a href="#test" className="product-anchor-link">
              <img
                src={arrowDown}
                alt="arrow-down"
                className="product-anchor-img"
              />
              mission
            </a>
          </div>
          <div className="product-anchor-item">
            <a href="" className="product-anchor-link">
              <img
                src={arrowDown}
                alt="arrow-down"
                className="product-anchor-img"
              />
              management team
            </a>
          </div>
          <div className="product-anchor-item">
            <a href="" className="product-anchor-link">
              <img
                src={arrowDown}
                alt="arrow-down"
                className="product-anchor-img"
              />
              partners
            </a>
          </div>
          <div className="product-anchor-item">
            <a href="" className="product-anchor-link">
              <img
                src={arrowDown}
                alt="arrow-down"
                className="product-anchor-img"
              />
              integrators
            </a>
          </div>
        </div>
      </div>
      <PreFooter />
      <Footer />
    </div>
  );
};

export default Company;