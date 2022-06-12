import React, { useState } from 'react';
import Headroom from 'react-headroom';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo-white.svg';
import cross from '../../images/cross-white.svg';
import arrow from '../../images/arrow-right-dark-blue.svg';
import './Header.scss';


const Header = ({ background = '#246E94', landing }) => {
  const [showMenu, setShowMenu] = useState(false);

  const style = {
    active: {
      borderBottom: '2px solid #00FCE5',
      marginBottom: 0,
    },
    activeContact: {
      border: '2px solid #00FCE5',
    },
  };

  const navbarLinks = (
    <>
      <NavLink
        to="/security/"
        className="header__navbar--item"
        activeStyle={style.active}
      >
        {landing ? '' : 'security'}
      </NavLink>
        <NavLink
            to="/alerting/"
            className="header__navbar--item"
            activeStyle={style.active}
        >
            {landing ? '' : 'alerting'}
        </NavLink>
      <NavLink
        to="/licensing/"
        className="header__navbar--item"
        activeStyle={style.active}
      >
        {landing ? '' : 'licensing'}
      </NavLink>
      <NavLink
        to="/resource/"
        className="header__navbar--item"
        activeStyle={style.active}
      >
        {landing ? '' : 'resource hub'}
      </NavLink>
      <NavLink
        to="/company/"
        className="header__navbar--item"
        activeStyle={style.active}
      >
        {landing ? '' : 'company'}
      </NavLink>
      <NavLink
        to={landing ? '/search-guard-free-trial/' : '/contacts/'}
        className="header__navbar--item"
        activeStyle={style.activeContact}
      >
        {landing ? 'start free trial' : 'contact us'}
      </NavLink>
    </>
  );

  const menu = (
    <div
      style={{ backgroundColor: background }}
      className="header__mobile--active"
    >
      <div className="header__controls">
        <img src={logo} alt="logo" className="header__icon" />
        <div className="header__menu" onClick={() => setShowMenu(!showMenu)}>
          {showMenu ? <img src={cross} alt="logo" /> : <span>MENU</span>}
        </div>
      </div>
      <div className="header__mobile--navbar">{navbarLinks}</div>
    </div>
  );

  return (
    <>
      <Headroom disableInlineStyles={showMenu ? true : false}>
        <a href="/search-guard-flx/">
            <div className="header__announcement">
              Discover Search Guard FLX – Security Better Than Ever <img src={arrow} className="header__announcementArrow" />
            </div>
        </a>
        <div style={{ backgroundColor: background }}>
          <div className="row">
            {showMenu && menu}
            <div className="header__wrapper">
              <div className="header__controls">
                <NavLink to="/">
                  <img src={logo} alt="Search Guard" className="header__icon" />
                </NavLink>
                <div
                  className="header__menu"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  menu
                </div>
              </div>
              <div className="header__navbar">{navbarLinks}</div>
            </div>
          </div>
        </div>
      </Headroom>
    </>
  );
};

export default Header;
