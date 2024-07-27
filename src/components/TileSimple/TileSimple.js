import React from 'react';
import './TileSimple.scss';
import {LazyLoadImage} from "react-lazy-load-image-component";

const TileSimple = ({
  backgroundColor,
  iconPosition,
  icon,
  headline,
  text,
}) => {
  let tilePosition;
  let wrapperStyle;
  let iconStyle;
  let contentStyle;

  if (backgroundColor === 'dark') {
    if (iconPosition === 'left') {
      wrapperStyle = 'tilesimple-container-dark-left';
      contentStyle = 'tilesimple-content-wrapper-left';
      iconStyle = 'tilesimple-icon-style-left';
    } else {
      wrapperStyle = 'tilesimple-container-dark-right';
      contentStyle = 'tilesimple-content-wrapper-right';
      iconStyle = 'tilesimple-icon-style-right';
    }
  } else if (iconPosition === 'left') {
    wrapperStyle = 'tilesimple-container-light-left';
    contentStyle = 'tilesimple-content-wrapper-left';
    iconStyle = 'tilesimple-icon-style-left';
  } else {
    wrapperStyle = 'tilesimple-container-light-right';
    contentStyle = 'tilesimple-content-wrapper-right';
    iconStyle = 'tilesimple-icon-style-right';
  }

  if (iconPosition === 'left') {
    tilePosition = (
      <div className={wrapperStyle}>
        <div className="row">
          <div className="col s12 l6 tilesimple-icon-wrapper-left">

            <LazyLoadImage
                src={icon} className={iconStyle} alt="tile icon"
            />

          </div>
          <div className="col s12 l6">
            <div className={contentStyle}>
              <h3 className="tilesimple-headline">{headline}</h3>
              <div className="tilesimple-text">{text}</div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    tilePosition = (
      <div className={wrapperStyle}>
        <div className="row tilesimple-change-order">
          <div className="col s12 push-l6 l6 tilesimple-icon-wrapper-right">
            <LazyLoadImage
                src={icon} className={iconStyle} alt="tile icon"
            />
          </div>
          <div className="col s12 pull-l6 l6">
            <div className={contentStyle}>
              <h2 className="tilesimple-headline">{headline}</h2>
              <div className="tilesimple-text">{text}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>{tilePosition}</div>;
};

export default TileSimple;
