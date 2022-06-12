import React from 'react';
import './ButtonSand.scss';

const ButtonLoud = ({ link, target, text }) => {
  return (
      <a href={link} target={target} className="button-sand-container">
      <div className="button-sand-text">{text}</div>
    </a>
  );
};

export default ButtonLoud;
