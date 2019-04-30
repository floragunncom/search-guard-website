import React from 'react';
import './Topic.scss';

const Topic = (props) => {
  let icon = undefined;
  if (props.icon) {
    icon = (
      <div className="topic-icon">
        <img src={props.icon} alt="icon"/>
      </div>
    );
  }

  return (
    <div className={props.icon ? "topic-wrapper topic-wrapper-icon" : "topic-wrapper"}>
      <div className="row">
        {icon}
        <div className="topic-headline">{props.headline}</div>
        <div className="topic-text">{props.text}</div>
      </div>
    </div>
  );
};

export default Topic;