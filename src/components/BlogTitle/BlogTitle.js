import React from 'react';
import './BlogTitle.scss';

const Title = props => {
  return (
    <div>
      <div className="blogtitle-container">
        <div className="blogtitle-wrapper">
          <div className="blogtitle-text">{props.text}</div>
        </div>
      </div>
      <div className="blogtitle-subtext-container">
        <div className="blogtitle-sub-text">{props.subText}</div>
        {props.tags === undefined ? '' : <div className="blogtitle-sub-text">Tags: {props.tags}</div>}
      </div>
    </div>
  );
};

export default Title;
