import React from 'react';
import './Topic.scss';

const Topic = (props) => {
  return (
    <div className="topic-wrapper">
      <div className="row">
        <div className="topic-headline">{props.headline}</div>
        <div className="topic-text">{props.text}</div>
      </div>
    </div>
  );
};

export default Topic;