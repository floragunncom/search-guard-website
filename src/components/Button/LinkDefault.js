import React from 'react';
import './LinkDefault.scss';
import arrowRight from '../../images/arrow-right-white.svg';

const LinkDefault = ({ link, target, text }) => {
  if (target === '_blank') {
    return (
      <a href={link} target={target} className="arrow-link-default-container">
        <div className="arrow-link-default-text">{text}</div>
        <img
          target={target}
          src={arrowRight}
          alt="arrow icon"
          className="arrow-link-arrow-style"
          width="16px" height="16px"
        />
      </a>
    );
  }
  return (
    <a href={`${link}`} className="arrow-link-default-container">
      <div className="arrow-link-default-text">{text}</div>
      <img
        src={arrowRight}
        alt="arrow icon"
        className="arrow-link-arrow-style"
        width="16px" height="16px"
      />
    </a>
  );
};

export default LinkDefault;
