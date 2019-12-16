import React from 'react';
import Button from '../Button/Button';
import './Cta.scss';

const Cta = ({ icon, ctaText, headline, link, text }) => {
  return (
    <div className="cta-container">
      <div className="row cta-row-wrapper">
        <div className="cta-row col xs12 m4 l5">
          <div className="cta-image-wrapper">
            <img src={icon} alt="ct icon" className="cta-image-container" />
          </div>
        </div>
        <div className="cta-row col s12 m8 l7">
          <div className="cta-text-container">
            <div className="cta-headline">{headline}</div>
            <div className="cta-text">{text}</div>
            <Button text={ctaText} buttonStyle="loud-link" link={link} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cta;
