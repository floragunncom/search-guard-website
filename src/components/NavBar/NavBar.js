import React, { Component } from 'react';
import './NavBar.scss';
import logo from '../../images/logo-white.svg';
import cross from '../../images/cross-white.svg';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        width: 0,
      },
    };
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
  }

  openNav() {
    const style = { width: '100%' };
    this.setState({ style });
    document.addEventListener("click", this.closeNav);
  }
  
  closeNav() {
    document.removeEventListener("click", this.closeNav);
    const style = { width: 0 };
    this.setState({ style });
  }

  render() {
    return (
      <div className="navbar-navbar-container">
        <div className="navbar-navbar-wrapper">
          <a href="/">
            <img src={logo} alt="Logo" className="navbar-logo-style" />
          </a>
          {/* <div className="navbar-empty-container" /> */}
          <div href="/" className="navbar-nav-links-container">
            <a href="/" className="navbar-nav-link">product</a>
            <a href="/" className="navbar-nav-link">licensing</a>
            <a href="/" className="navbar-nav-link">resource hub</a>
            <a href="/" className="navbar-nav-link">company</a>
            <a href="/contact" className="navbar-nav-link">contact us</a>
          </div>
          <div className="navbar-menu-container">
            <span className="navbar-nav-link" onClick={this.openNav}>menu</span>
            <div ef="snav" className="navbar-overlay" style={this.state.style}>
              <div className="navbar-sidenav-container">
                <div className="navbar-overlay-header">
                  <div onClick={this.closeNav}>
                    <img src={logo} alt="logo" className="navbar-logo-style" />
                  </div>
                  <div onClick={this.closeNav}>
                    <img src={cross} alt="close" className="navbar-close-btn" />
                  </div>
                </div>
                <div href="/" className="navbar-nav-links-container-mobile">
                  <a href="/" className="navbar-nav-link" href="javascript:void(0)">product</a>
                  <a href="/" className="navbar-nav-link" href="javascript:void(0)">licensing</a>
                  <a href="/" className="navbar-nav-link" href="javascript:void(0)">resource hub</a>
                  <a href="/" className="navbar-nav-link" href="javascript:void(0)">company</a>
                  <a href="/contact" className="navbar-nav-link">contact us</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
