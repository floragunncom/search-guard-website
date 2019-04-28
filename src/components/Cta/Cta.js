import React from 'react';
import './Cta.scss';
import Button from '../Button/Button';

const Cta = props => {
  return (
    <div className="cta-container">
      <div className="row cta-row-wrapper">
        <div className="cta-row col xs12 m4 l5">
          <div className="cta-image-wrapper">
            <img src={props.icon} alt="cta-icon" className="cta-image-container" />
          </div>
        </div>
        <div className="cta-row col s12 m8 l7">
          <div className="cta-text-container">
            <div className="cta-headline">{props.headline}</div>
            <div className="cta-text">{props.text}</div>
            <Button text={props.ctaText} style="loud-link" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cta;
