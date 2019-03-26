import React from 'react';
import './Button.scss';
import arrowRight from '../images/arrow-right-dark-blue.svg';

const Button = props => {
  return (
    <div className="button-container">
      <div className="button-text">{props.text}</div>
      <img src={arrowRight} alt="arrow" className="arrow-style" />
    </div>
  );
}

export default Button;
