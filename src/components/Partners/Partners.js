import React from 'react';
import eliatra from '../../images/eliatra.svg';
import eliatraMobile from '../../images/eliatra-mobile.svg';
import excelerate from '../../images/ref2.svg';
import excelerateMobile from '../../images/excelerate-mobile.svg';
import sirenPartnerMobile from '../../images/siren-mobile.svg';
import sirenPartner from '../../images/ref3.svg';
import './Partners.scss';

const Partners = () => {
  return (
    <div className="company-partners-wrapper" id="partners">
      <div className="row">
        <div className="company-partners-headline">Partners</div>
        <div className="company-partners-pic-wrapper">
          <div className="col s12 m4 company-partners-pic hide-on-small-only">
            <a href="https://eliatra.com/">
              <img
                  src={eliatra}
                  alt="Eliatra - The OpenSearch Experts"
              />{' '}
            </a>
          </div>
          <div className="col s12 m4 company-partners-pic-mobile hide-on-med-and-up">
            <a href="https://eliatra.com/">
              <img
                  src={eliatraMobile}
                  alt="Eliatra - The OpenSearch Experts"
              />{' '}
            </a>
          </div>
          <div className="col s12 m4 company-partners-pic hide-on-small-only">
            <a href="https://www.exceleratesystems.com/">
              <img
                src={excelerate}
                alt="Search Guard Partner Excelerate Systems"
              />{' '}
            </a>
          </div>
          <div className="col s12 m4 company-partners-pic-mobile hide-on-med-and-up">
            <a href="https://www.exceleratesystems.com/">
              <img
                src={excelerateMobile}
                alt="Search Guard Partner Excelerate Systems"
              />{' '}
            </a>
          </div>
          <div className="col s12 m4 company-partners-pic hide-on-small-only">
            <a href="https://siren.io/">
              <img
                src={sirenPartner}
                alt="Search Guard Partner Siren Solutions"
              />{' '}
            </a>
          </div>
          <div className="col s12 m4 company-partners-pic-mobile hide-on-med-and-up">
            <a href="https://siren.io/">
              <img
                src={sirenPartnerMobile}
                alt="Search Guard Partner Siren Solutions"
              />{' '}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
