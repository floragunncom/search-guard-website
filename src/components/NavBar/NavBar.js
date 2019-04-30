import React, { Component } from 'react';
import './NavBar.scss';
import { Link } from 'react-router-dom';
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
      <div className="navbar-navbar-container" style={{backgroundColor: this.props.background}}>
        <div className="navbar-navbar-wrapper">
          <a href="/">
            <img src={logo} alt="Logo" className="navbar-logo-style" />
          </a>
          <div href="/" className="navbar-nav-links-container">
            <Link to="/contact" className="navbar-nav-link">contact us</Link>
            <Link to="/product" className="navbar-nav-link" href="javascript:void(0)">product</Link>
            <Link to="/license" className="navbar-nav-link" href="javascript:void(0)">licensing</Link>
            <Link to="/resource" className="navbar-nav-link" href="javascript:void(0)">resource hub</Link>
            <Link to="/company" className="navbar-nav-link" href="javascript:void(0)">company</Link>
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
                  <Link to="/contact" className="navbar-nav-link">contact us</Link>
                  <Link to="/product" className="navbar-nav-link" href="javascript:void(0)">product</Link>
                  <Link to="/license" className="navbar-nav-link" href="javascript:void(0)">licensing</Link>
                  <Link to="/resource" className="navbar-nav-link" href="javascript:void(0)">resource hub</Link>
                  <Link to="/company" className="navbar-nav-link" href="javascript:void(0)">company</Link>
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
