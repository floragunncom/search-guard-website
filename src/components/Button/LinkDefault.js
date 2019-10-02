import React from 'react';
import { NavLink } from 'react-router-dom';
import './LinkDefault.scss';
import arrowRight from '../../images/arrow-right-white.svg';

const LinkLoud = ({ link, target, text }) => {
  if (target === '_blank') {
    return (
      <a href={link} target={target} className="arrow-link-default-container">
        <div className="arrow-link-default-text">{text}</div>
        <img
          target={target}
          src={arrowRight}
          alt="arrow icon"
          className="arrow-link-arrow-style"
        />
      </a>
    );
  }
  return (
    <NavLink to={`/${link}/`}>
      <div className="arrow-link-default-text">{text}</div>
      <img
        src={arrowRight}
        alt="arrow icon"
        className="arrow-link-arrow-style"
      />
    </NavLink>
  );
};

export default LinkLoud;
