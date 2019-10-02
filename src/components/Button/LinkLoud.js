import React from 'react';
import './LinkLoud.scss';
import arrowRight from '../../images/arrow-right-dark-blue.svg';

const LinkLoud = ({ link, target, text }) => {
  return (
    <a
      href={link}
      target={target || '_self'}
      className="arrow-link-loud-container"
    >
      <div className="arrow-link-text">{text}</div>
      <img
        src={arrowRight}
        alt="arrow icon"
        className="arrow-link-arrow-style"
      />
    </a>
  );
};

export default LinkLoud;
