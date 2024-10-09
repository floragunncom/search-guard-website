import React from 'react';
import Button from '../Button/Button';
import './Card.scss';
import ButtonLightGreen from '../Button/ButtonLightGreen';

const Card = ({
  title,
  dark,
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
        dark
          ? 'card__wrapper-dark'
          : 'card__wrapper-light'
      }
    >
      {title ? 
        <h3 className={
          `card__title
          ${dark ? 'title-in-dark-mode' : 'title-in-light-mode'}
        `}
        >{title}</h3> : null}        
      <div className="card__row">
        <div className={`card__col card__col-left`}>
          <img
            className={
              `card__col-img
              ${
                dark ? 'icon-in-dark-mode' : 'icon-in-light-mode'
              }`
            }
            loading="lazy" src={iconLeft} alt="Card Icon" width="160px" height="160px"
          />
          <div className="card__col-content">
            <h5
              className={
                `card__col-content__headline
                ${
                  dark ? 'headline-in-dark-mode' : 'headline-in-light-mode'
                }`
              }
            >
              {headlineLeft}
            </h5>
            <div
              className={
                `body1 card__col-content__text
                ${
                  dark ? 'text-in-dark-mode' : 'text-in-light-mode'
                }`
              }
            >
              {textLeft}
            </div>
          </div>
          {linkLeft?
          <div className="card__col-button">
            <ButtonLightGreen
                text="find out more"
                link={linkLeft}
                target={buttonTargetLeft}
            />
          </div>
              : ""
          }
        </div>
        <div className={`card__col card__col-right`}>
          <img 
            className={
              `card__col-img
              ${
                dark ? 'icon-in-dark-mode' : 'icon-in-light-mode'
              }`
            }
            loading="lazy" src={iconRight} alt="Card Icon" width="160px" height="160px"
          />
          <div className="card__col-content">
            <h5
              className={
                `card__col-content__headline
                ${
                  dark ? 'headline-in-dark-mode' : 'headline-in-light-mode'
                }`
              }
            >
              {headlineRight}
            </h5>
            <div
              className={
                `body1 card__col-content__text
                ${
                  dark ? 'text-in-dark-mode' : 'text-in-light-mode'
                }`
              }
            >
              {textRight}
            </div>
          </div>
          {linkRight?
          <div className="card__col-button">
            <ButtonLightGreen
              text="find out more"
              link={linkRight}
              target={buttonTargetRight}
            />
          </div>
              : ""
          }
        </div>
      </div>
    </div>
  );
};

export default Card;
