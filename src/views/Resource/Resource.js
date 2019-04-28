import React from 'react';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import Title from '../../components/Title/Title';
import Cta from '../../components/Cta/Cta';
import envelope from '../../images/icon-envelope.svg';
import arrowDown from '../../images/arrow-down-green.svg';
import './Resource.scss';

const Resource = () => {
  return (
    <div>
      <NavBar />
      <Title text="resource hub" />
      <div className="row">
        <div className="product-anchor-wrapper">
          <div className="product-anchor-item">
            <a href="#test" className="product-anchor-link">
              <img
                src={arrowDown}
                alt="arrow-down"
                className="product-anchor-img"
              />
              documentation & github
            </a>
          </div>
          <div className="product-anchor-item">
            <a href="" className="product-anchor-link">
              <img
                src={arrowDown}
                alt="arrow-down"
                className="product-anchor-img"
              />
              faq
            </a>
          </div>
          <div className="product-anchor-item">
            <a href="" className="product-anchor-link">
              <img
                src={arrowDown}
                alt="arrow-down"
                className="product-anchor-img"
              />
              Forum & TLS certificates
            </a>
          </div>
          <div className="product-anchor-item">
            <a href="" className="product-anchor-link">
              <img
                src={arrowDown}
                alt="arrow-down"
                className="product-anchor-img"
              />
              blog
            </a>
          </div>
          <div className="product-anchor-item">
            <a href="" className="product-anchor-link">
              <img
                src={arrowDown}
                alt="arrow-down"
                className="product-anchor-img"
              />
              Presentations & white papers
            </a>
          </div>
          <div className="product-anchor-item">
            <a href="" className="product-anchor-link">
              <img
                src={arrowDown}
                alt="arrow-down"
                className="product-anchor-img"
              />
              videos
            </a>
          </div>
        </div>
      </div>
      <Cta
        headline="Can’t find what you’re looking for?"
        text="No worries, maybe we can help you find the answer."
        ctaText="contact us"
        icon={envelope}
      />
      <PreFooter />
      <Footer />
    </div>
  );
};

export default Resource;