import React from 'react';
import './LinkGhost.scss';
import arrowRight from '../../images/arrow-right-dark-blue.svg';

const ButtonGhost = props => {
  return (
    <a
      href={props.link}
      target={props.target || '_self'}
      className="arrow-link-ghost-container"
      style={{ borderColor: `${props.color || '#00FCE5'}` }}
    >
      <div className="arrow-button-text">{props.text}</div>
      <img src={arrowRight} alt="arrow icon" className="arrow-link-arrow-style" />
    </a>
  );
};

export default ButtonGhost;
