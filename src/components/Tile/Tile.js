import React from 'react';
import './Tile.scss';
import Button from '../../components/Button/Button';

const Tile = props => {
  return (
    <div className={props.leftDark ? 'tile-wrapper tile-background-dark' : 'tile-wrapper tile-background-light'}>
      <div className="row">
        <div className="col s12 l6 tile-content-left">
          <div className="tile-content-icon">
            <img src={props.leftIcon} alt="tile icon" className="tile-content-image" />
          </div>
          <div className={props.leftDark ? "tile-content-headline tile-headline-light-colors" : "tile-content-headline tile-headline-dark-colors"}>{props.leftHeadline}</div>
          <div className={props.leftDark ? "tile-content-text tile-text-light-colors" : "tile-content-text tile-text-dark-colors"}>{props.leftText}</div>
          <div className="tile-content-button">
            <Button text="find out more" style="loud-link" link={props.leftLink} target={props.leftButtonTarget} />
          </div>
        </div>
        <div className="col s12 l6 tile-content-right">
          <div className="tile-content-icon">
            <img src={props.rightIcon} alt="tile icon" className="tile-content-image" />
          </div>
          <div className={props.leftDark ? "tile-content-headline tile-headline-dark-colors" : "tile-content-headline tile-headline-light-colors"}>{props.rightHeadline}</div>
          <div className={props.leftDark ? "tile-content-text tile-text-dark-colors" : "tile-content-text tile-text-light-colors"}>{props.rightText}</div>
          <div className="tile-content-button">
            <Button text="find out more" style="loud-link" link={props.rightLink} target={props.rightButtonTarget} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tile;
