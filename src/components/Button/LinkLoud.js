import React from 'react';
import './LinkLoud.scss';
import arrowRight from '../../images/arrow-right-dark-blue.svg';

const LinkLoud = props => {
  return (
    <div className="arrow-link-loud-container">
      <div className="arrow-link-text">{props.text}</div>
      <img src={arrowRight} alt="arrow" className="arrow-link-arrow-style" />
    </div>
  );
};

export default LinkLoud;
