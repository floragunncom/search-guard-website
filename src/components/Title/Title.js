import React from 'react';
import './Title.scss';

const Title = props => {
  return (
    <div className="title-wrapper-style">
      <div className="row">
        <div className="title-headline-style">{props.headline}</div>
        <div className="title-text-style">{props.text}</div>
      </div>
    </div>
  );
};

export default Title;
