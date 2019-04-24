import React from 'react';
import './TileSimple.scss';

const TileSimple = props => {
  let tilePosition;
  let wrapperStyle;
  let iconStyle;
  let contentStyle;

  if (props.backgroundColor === 'dark') {
    if (props.iconPosition === 'left') {
      wrapperStyle = 'tilesimple-container-dark-left';
      contentStyle = 'tilesimple-content-wrapper-left';
      iconStyle = 'tilesimple-icon-style-left';
    } else {
      wrapperStyle = 'tilesimple-container-dark-right';
      contentStyle = 'tilesimple-content-wrapper-right';
      iconStyle = 'tilesimple-icon-style-right';
    }
  } else {
    if (props.iconPosition === 'left') {
      wrapperStyle = 'tilesimple-container-light-left';
      contentStyle = 'tilesimple-content-wrapper-left';
      iconStyle = 'tilesimple-icon-style-left';
    } else {
      wrapperStyle = 'tilesimple-container-light-right';
      contentStyle = 'tilesimple-content-wrapper-right';
      iconStyle = 'tilesimple-icon-style-right';
    }
  }

  if (props.iconPosition === 'left') {
    tilePosition = (
      <div className={wrapperStyle}>
        <div className="row">
          <div className="col s12 l6 tilesimple-icon-wrapper-left">
            <img src={props.icon} className={iconStyle} />
          </div>
          <div className="col s12 l6">
            <div className={contentStyle}>
              <div className="tilesimple-headline">{props.headline}</div>
              <div className="tilesimple-text">{props.text}</div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    tilePosition = (
      <div className={wrapperStyle}>
        <div className="row">
          <div className="col s12 l6">
            <div className={contentStyle}>
              <div className="tilesimple-headline">{props.headline}</div>
              <div className="tilesimple-text">{props.text}</div>
            </div>
          </div>
          <div className="col s12 l6 tilesimple-icon-wrapper-right">
            <img src={props.icon} className={iconStyle} />
          </div>
        </div>
      </div>
    );
  }

  return <div>{tilePosition}</div>;
};

export default TileSimple;
