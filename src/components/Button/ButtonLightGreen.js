import React from 'react';
import './ButtonLightGreen.scss';

const ButtonLightGreen = ({ link, target, text, onPress }) => {
  return (
        <a href={link} target={target} className="button-light-green-container button" onClick={onPress}>
            <div className="button-large button-light-green-text">{text}</div>
        </a>
  );
};

export default ButtonLightGreen;
