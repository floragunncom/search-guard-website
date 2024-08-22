import React from 'react';
import quote from '../../images/quote-up.svg';

const Blockquote = props => {
  return (
    <div className="blogpostarticle-quote-wrapper">
      <img loading="lazy" src={quote} className="blogpostarticle-quote-image" alt="quotes icon" width="58px" height="51px"/>
      <div className="blogpostarticle-quote-text">{props.children}</div>
    </div>
  )
};

export default Blockquote;
