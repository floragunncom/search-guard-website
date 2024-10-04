import React from 'react';
import './ButtonLightAqua.scss';

const ButtonLightAqua = ({ link, target, text, onPress }) => {
  return (
      <a href={link} target={target} className="button-light-aqua-container" onClick={onPress}>
      <div className="button-large button-light-aqua-text">{text}</div>
    </a>
  );
};

export default ButtonLightAqua;
