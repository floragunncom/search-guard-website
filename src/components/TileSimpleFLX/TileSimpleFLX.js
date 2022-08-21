import React from 'react';
import './TileSimpleFLX.scss';
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

  if (iconPosition === 'left') {
    wrapperStyle = 'tilesimple-flx-container-left-' + backgroundColor;
    contentStyle = 'tilesimple-flx-content-wrapper-left';
    iconStyle = 'tilesimple-icon-style-left';
  } else {
    wrapperStyle = 'tilesimple-flx-container-right-' + backgroundColor;
    contentStyle = 'tilesimple-flx-content-wrapper-right';
    iconStyle = 'tilesimple-icon-style-right';
  }

  if (iconPosition === 'left') {
    tilePosition = (
      <div className={wrapperStyle}  >
        <div className="row tilesimple-flx-row">
          <div className="col s12 l6 center">

            <LazyLoadImage
                src={icon} className={iconStyle} alt="tile icon"
            />

          </div>
          <div className="col s12 l6">
            <div className={contentStyle}>
              <h2 className="tilesimple-headline">{headline}</h2>
              <div className="tilesimple-text">{text}</div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    tilePosition = (
      <div className={wrapperStyle}>
        <div className="row tilesimple-flx-row">
          <div className="col s12 push-l6 l6 center">
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
