import React from 'react';
import './NavBar.scss';
import logo from '../images/logo-white.svg';

const NavBar = () => {
  function buttonPress() {
    // const classStyle = document.getElementById('links');
    // classStyle.style.display = 'flex';
  }
  // document.getElementById('menu').addEventListener('click', buttonPress());

  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <a href="/">
          <img src={logo} alt="Logo" className="logo-style" />
        </a>
        {/* <div className="empty-container" /> */}
        <div href="/" className="nav-links-container" id="links">
          <a href="/" className="nav-link">product</a>
          <a href="/" className="nav-link">licensing</a>
          <a href="/" className="nav-link">resource hub</a>
          <a href="/" className="nav-link">company</a>
          <a href="/" className="nav-link">contact us</a>
        </div>
        <div className="menu-container" id="menu">
          <a href="/" className="nav-link">menu</a>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
