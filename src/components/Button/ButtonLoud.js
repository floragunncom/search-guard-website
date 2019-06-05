import React from 'react';
import './ButtonLoud.scss';

const ButtonLoud = props => {
  return (
    <div className="arrow-button-loud-container" onClick={props.onPress}>
      <div className="arrow-button-loud-text">{props.text}</div>
    </div>
  );
};

export default ButtonLoud;
