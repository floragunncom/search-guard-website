import React from 'react';
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
          <div className="col s12 m4 offset-m2 company-partners-pic hide-on-small-only">
            <img src={excelerate} alt="excelerate logo" />{' '}
          </div>
          <div className="col s12 m4 offset-m2 company-partners-pic-mobile hide-on-med-and-up">
            <img src={excelerateMobile} alt="excelerate logo" />{' '}
          </div>
          <div className="col s12 m4 company-partners-pic hide-on-small-only">
            <img src={sirenPartner} alt="siren logo" />{' '}
          </div>
          <div className="col s12 m4 company-partners-pic-mobile hide-on-med-and-up">
            <img src={sirenPartnerMobile} alt="siren logo" />{' '}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
