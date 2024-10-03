import React from 'react';
import './ButtonLightAqua.scss';

const ButtonLightAqua = ({ link, target, text }) => {
  return (
      <a href={link} target={target} className="button-light-aqua-container">
      <div className="button-light-aqua-text">{text}</div>
    </a>
  );
};

export default ButtonLightAqua;
