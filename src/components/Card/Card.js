import React from 'react';
import Button from '../Button/Button';
import './Card.scss';

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
          ${dark ? 'title-on-dark-bg' : 'title-on-light-bg'}
        `}
        >{title}</h3> : null}        
      <div className="card__row">
        <div className={`card__col card__col-left`}>
          <img
            className={
              `card__col-img
              ${
                dark ? 'image-on-dark-bg' : 'image-on-light-bg'
              }`
            }
            loading="lazy" src={iconLeft} alt="Card Icon" width="160px" height="160px"
          />
          <div className="card__col-content">
            <h5
              className={
                `card__col-content__headline
                ${
                  dark ? 'headline-on-dark-bg' : 'headline-on-light-bg'
                }`
              }
            >
              {headlineLeft}
            </h5>
            <div
              className={
                `body1 card__col-content__text
                ${
                  dark ? 'text-on-dark-bg' : 'text-on-light-bg'
                }`
              }
            >
              {textLeft}
            </div>
          </div>
          {linkLeft?
          <div className="card__col-button">
            <Button
              buttonStyle="light-green-button"
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
                dark ? 'image-on-dark-bg' : 'image-on-light-bg'
              }`
            }
            loading="lazy" src={iconRight} alt="Card Icon" width="160px" height="160px"
          />
          <div className="card__col-content">
            <h5
              className={
                `card__col-content__headline
                ${
                  dark ? 'headline-on-dark-bg' : 'headline-on-light-bg'
                }`
              }
            >
              {headlineRight}
            </h5>
            <div
              className={
                `body1 card__col-content__text
                ${
                  dark ? 'text-on-dark-bg' : 'text-on-light-bg'
                }`
              }
            >
              {textRight}
            </div>
          </div>
          {linkRight?
          <div className="card__col-button">
            <Button
              buttonStyle="light-green-button"            
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
