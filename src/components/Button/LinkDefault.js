import React from 'react';
import './LinkDefault.scss';
import arrowRight from '../../images/arrow-right-white.svg';

const LinkLoud = props => {
  return (
    <a
      href={props.link}
      target={props.target || '_self'}
      className="arrow-link-default-container"
    >
      <div className="arrow-link-default-text">{props.text}</div>
      <img src={arrowRight} alt="arrow" className="arrow-link-arrow-style" />
    </a>
  );
};

export default LinkLoud;
