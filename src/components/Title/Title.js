import React from 'react';
import './Title.scss';

const Title = ({ headline, text }) => {
  return (
    <div className="title-wrapper-style">
      <div className="row">
        <h1 className="title-headline-style">{headline}</h1>
        <h2 className="title-text-style">{text}</h2>
      </div>
    </div>
  );
};

export default Title;
