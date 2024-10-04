import React from 'react';
import Button from '../Button/Button';
import './Cta.scss';

const Cta = ({ icon, ctaText, headline, link, text }) => {
  return (
    <div className="cta-container">
      {/* {/* <div className="row cta-row-wrapper"> */}
        <div className="cta-row col s12 m12 l7">
          <div className="cta-text-container">
            <h2 className="cta-headline">{headline}</h2>
            {/* Neue DIN should be used here new font */}
            <div className="cta-text">{text}</div>
            {link && link.length > 0 && ctaText && ctaText.length > 0 &&
             <Button text={ctaText} buttonStyle="light-aqua-button" link={link} />
            }
          </div>
           {/* </div> */}
        </div>
    </div>
  );
};

export default Cta;
