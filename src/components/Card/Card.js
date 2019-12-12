import React from 'react';
import Button from '../Button/Button';
import './Card.scss';

const Card = ({
  bgLeftDark,
  iconLeft,
  iconRight,
  headlineLeft,
  headlineRight,
  textLeft,
  textRight,
  linkLeft,
  linkRight,
  buttonTargetLeft,
  buttonTargetRight,
}) => {
  return (
    <div
      className={
        bgLeftDark
          ? 'card__wrapper-blue-to-grey-bg'
          : 'card__wrapper-grey-to-blue-bg'
      }
    >
      <div className="card__row">
        <div className="card__col card__col-left">
          <img src={iconLeft} alt="Card Icon" className="card__col-img" />
          <div className="card__col-content">
            <div
              className={
                bgLeftDark
                  ? 'headline-left-dark card__col-content__headline'
                  : 'headline-left-light card__col-content__headline'
              }
            >
              {headlineLeft}
            </div>
            <div
              className={
                bgLeftDark
                  ? 'text-left-dark card__col-content__text'
                  : 'text-left-light card__col-content__text'
              }
            >
              {textLeft}
            </div>
          </div>
          <div className="card__col-button">
            <Button
              text="find out more"
              style="loud-link"
              link={linkLeft}
              target={buttonTargetLeft}
            />
          </div>
        </div>
        <div className="card__col card__col-right">
          <img src={iconRight} alt="Card Icon" className="card__col-img" />
          <div className="card__col-content">
            <div
              className={
                bgLeftDark
                  ? 'headline-right-dark card__col-content__headline'
                  : 'headline-right-light card__col-content__headline'
              }
            >
              {headlineRight}
            </div>
            <div
              className={
                bgLeftDark
                  ? 'text-right-dark card__col-content__text'
                  : 'text-right-light card__col-content__text'
              }
            >
              {textRight}
            </div>
          </div>
          <div className="card__col-button">
            <Button
              text="find out more"
              style="loud-link"
              link={linkRight}
              target={buttonTargetRight}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
