import React from 'react';
import quote from '../../images/quote-up.svg';

const Blockquote = props => {
  return (
    <div className="blogpost-quote-wrapper">
      <img src={quote} className="blogpost-quote-image" />
      <div className="blogpost-quote-text">{props.children}</div>
    </div>
  )
};

export default Blockquote;
