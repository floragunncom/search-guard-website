import React, { useState } from 'react';
import Headroom from 'react-headroom';
import { NavLink } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import {useLocation} from "react-router-dom";
import logo from '../../images/sg_dlic_small.png';
import cross from '../../images/cross-white.svg';
import pagesections from '../../Api/pagecontent/sections.json';
import './Header.scss';



const Header = ({ background = 'white', landing }) => {
  const [showMenu, setShowMenu] = useState(false);

    const location = useLocation();

    const style = {
    active: {
      borderBottom: '2px solid #184962',
      marginBottom: 0,
    },
    activeContact: {
      border: '2px solid #184962',
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
            {landing ? '' : 'pricing'}
        </NavLink>
        <NavLink
            to="/search-guard-free-trial/"
            className="header__navbar--item"
            activeStyle={style.active}
        >
            {landing ? '' : 'download'}
        </NavLink>
        <NavLink
            to="/blog/"
            className="header__navbar--item"
            activeStyle={style.active}
        >
            {landing ? '' : 'blog'}
        </NavLink>
      <NavLink
        to="/resource/"
        className="header__navbar--item"
        activeStyle={style.active}
      >
        {landing ? '' : 'resources'}
      </NavLink>
        <NavLink
            to="/company/"
            className="header__navbar--item"
            activeStyle={style.active}
        >
            {landing ? '' : 'about'}
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

  let renderBanner;
  let banner = pagesections.filter(section => section.sys.contentType.sys.id === "topBanner");

  if (
      banner && banner.length > 0 && banner[0].fields.enabled
  ) {

    if (banner[0].fields.showOnAllPages || location.pathname === "/") {
      renderBanner = (
          <>
            <div className="header__announcement">
              <Markdown>
                {banner[0].fields.text}
              </Markdown>
            </div>
          </>
      );
    }
  };

  return (
    <>
      <Headroom disableInlineStyles={showMenu ? true : false}>
        {renderBanner}
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
