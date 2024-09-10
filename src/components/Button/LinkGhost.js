import React from 'react';
import './LinkGhost.scss';
import arrowRight from '../../images/arrow-right-dark-blue.svg';

const ButtonGhost = ({ link, color, text }) => {
  if (text !== 'get a quote' || text !== 'find out more') {
    return (
      <a
        href={link}
        className="arrow-link-ghost-container"
        rel="noopener noreferrer"
        style={{ borderColor: `${color || '#00FCE5'}` }}
      >
        <div className="arrow-button-text">{text}</div>
        <img
          src={arrowRight}
          alt="arrow icon"
          className="arrow-link-arrow-style"
          width="16px" height="16px"
        />
      </a>
    );
  }
  return (
    <a
      href={link}
      className="arrow-link-ghost-container"
      style={{ borderColor: `${color || '#00FCE5'}` }}
    >
      <div className="arrow-button-text">{text}</div>
      <img
        src={arrowRight}
        alt="arrow icon"
        className="arrow-link-arrow-style"
        width="16px" height="16px"
      />
    </a>
  );
};

export default ButtonGhost;
