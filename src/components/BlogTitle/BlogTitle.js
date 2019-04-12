import React from 'react';
import './BlogTitle.scss';

const Title = props => {
  return (
    <div className="blogtitle-container">
      <div className="blogtitle-wrapper">
        <div className="blogtitle-text">{props.text}</div>
        <div className="blogtitle-sub-text">{props.subText}</div>
        <div className="blogtitle-sub-text">{props.tags}</div>
      </div>
    </div>
  );
};

export default Title;
