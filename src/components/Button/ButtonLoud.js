import React from 'react';
import './ButtonLoud.scss';

const ButtonLoud = props => {
  return (
    <a
      href={props.link}
      target={props.target || '_self'}
      className="arrow-button-loud-container"
    >
      <div className="arrow-button-loud-text">{props.text}</div>
    </a>
  );
};

export default ButtonLoud;
