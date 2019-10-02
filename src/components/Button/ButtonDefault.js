import React from 'react';
import './ButtonDefault.scss';

const ButtonLoud = ({ onPress, text }) => {
  return (
    <button
      className="arrow-button-default-container"
      onClick={onPress}
      type="submit"
    >
      <div className="arrow-button-default-text">{text}</div>
    </button>
  );
};

export default ButtonLoud;
