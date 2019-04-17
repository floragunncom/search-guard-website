import React from 'react';
import './Title.scss';

const Title = props => {
  return (
    <div className="title-container">
      <div className="title-wrapper">
        <div className="title-text">{props.text}</div>
      </div>
    </div>
  );
};

export default Title;
