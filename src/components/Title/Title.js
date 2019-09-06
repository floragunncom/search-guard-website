import React from 'react';
import './Title.scss';

const Title = props => {
  return (
    <div className="title-wrapper-style">
      <div className="row">
        <h1 className="title-headline-style">{props.headline}</h1>
        <h2 className="title-text-style">{props.text}</h2>
      </div>
    </div>
  );
};

export default Title;
