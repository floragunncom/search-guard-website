import React from 'react';
import { HashLink } from 'react-router-hash-link';
import './AnchorNavBar.scss';
import arrowDown from '../../images/arrow-down-green.svg';

const AnchorNavBar = ({ anchors }) => {
  return (
    <div className="product-anchor-container">
      <div className="row">
        <div className="product-anchor-wrapper">
          {anchors.map(item => {
            return (
              <div className="product-anchor-item" key={item.id}>
                <HashLink
                  to={`#${item.anchor}`}
                  className="product-anchor-link"
                >
                  <img
                    src={arrowDown}
                    alt="arrow-down"
                    className="product-anchor-img"
                  />
                  {item.name}
                </HashLink>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnchorNavBar;
