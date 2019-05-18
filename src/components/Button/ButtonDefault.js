import React from 'react';
import './ButtonDefault.scss';

const ButtonLoud = props => {
  return (
    <a
      href={props.link}
      target={props.target || '_self'}
      className="arrow-button-default-container"
    >
      <div className="arrow-button-default-text">{props.text}</div>
    </a>
  );
};

export default ButtonLoud;
