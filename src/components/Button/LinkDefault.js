import React from 'react';
import './LinkDefault.scss';
import arrowRight from '../../images/arrow-right-white.svg';

const LinkLoud = props => {
  return (
    <div className="arrow-link-default-container" onClick={props.onPress}>
      <div className="arrow-link-default-text">{props.text}</div>
      <img src={arrowRight} alt="arrow" className="arrow-link-arrow-style" />
    </div>
  );
};

export default LinkLoud;
