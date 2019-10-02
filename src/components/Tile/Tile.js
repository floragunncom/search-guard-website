import React from 'react';
import './Tile.scss';
import Button from '../Button/Button';

const Tile = ({
  leftIcon,
  leftDark,
  leftHeadline,
  leftText,
  leftLink,
  leftButtonTarget,
  rightIcon,
  rightHeadline,
  rightText,
  rightLink,
  rightButtonTarget,
}) => {
  return (
    <div
      className={
        leftDark
          ? 'tile-wrapper tile-background-dark'
          : 'tile-wrapper tile-background-light'
      }
    >
      <div className="row">
        <div className="col s12 l6 tile-content-left">
          <div className="tile-content-icon">
            <img
              src={leftIcon}
              alt="tile icon"
              className="tile-content-image"
            />
          </div>
          <div
            className={
              leftDark
                ? 'tile-content-headline tile-headline-light-colors'
                : 'tile-content-headline tile-headline-dark-colors'
            }
          >
            {leftHeadline}
          </div>
          <div
            className={
              leftDark
                ? 'tile-content-text tile-text-light-colors'
                : 'tile-content-text tile-text-dark-colors'
            }
          >
            {leftText}
          </div>
          <div className="tile-content-button">
            <Button
              text="find out more"
              style="loud-link"
              link={leftLink}
              target={leftButtonTarget}
            />
          </div>
        </div>
        <div className="col s12 l6 tile-content-right">
          <div className="tile-content-icon">
            <img
              src={rightIcon}
              alt="tile icon"
              className="tile-content-image"
            />
          </div>
          <div
            className={
              leftDark
                ? 'tile-content-headline tile-headline-dark-colors'
                : 'tile-content-headline tile-headline-light-colors'
            }
          >
            {rightHeadline}
          </div>
          <div
            className={
              leftDark
                ? 'tile-content-text tile-text-dark-colors'
                : 'tile-content-text tile-text-light-colors'
            }
          >
            {rightText}
          </div>
          <div className="tile-content-button">
            <Button
              text="find out more"
              style="loud-link"
              link={rightLink}
              target={rightButtonTarget}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tile;
