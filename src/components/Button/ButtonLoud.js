import React from 'react';
import './ButtonLoud.scss';

const ButtonLoud = ({ onPress, text }) => {
  return (
    <div className="arrow-button-loud-container" onClick={onPress}>
      <div className="arrow-button-loud-text">{text}</div>
    </div>
  );
};

export default ButtonLoud;
