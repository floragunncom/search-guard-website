import React from 'react';
import './ButtonDefault.scss';

const ButtonLoud = props => {
  return (
    <div className="arrow-button-default-container" onClick={props.onPress}>
      <div className="arrow-button-default-text">{props.text}</div>
    </div>
  );
};

export default ButtonLoud;
