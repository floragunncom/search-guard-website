import React from 'react';
import './Cta.scss';
import logo from '../images/cloud-big.svg';
import Button from './Button';

const Cta = props => {
  return (
    <div className="cta-container">
      <div className="cta-wrapper">
        <div className="cta-image-container">
          <div className="cta-image-wrapper">
            <img src={logo} alt="cloud" className="cta-image-style" />
          </div>
        </div>
        <div className="cta-text-container">
          <div className="cta-headline">{props.headline}</div>
          <div className="cta-text">{props.text}</div>
          <Button text={props.ctaText} />
        </div>
      </div>
    </div>
  );
};

export default Cta;
