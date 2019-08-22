import React from 'react';
import './AnchorNavBar.scss';
import arrowDown from '../../images/arrow-down-green.svg';

const AnchorNavBar = props => {
  return (
    <div className="product-anchor-container">
      <div className="row">
        <div className="product-anchor-wrapper">
          {props.anchors.map(item => {
            return (
              <div className="product-anchor-item">
                <a href={`#${item.anchor}`} className="product-anchor-link">
                  <img
                    src={arrowDown}
                    alt="arrow-down"
                    className="product-anchor-img"
                  />
                  {item.name}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnchorNavBar;
