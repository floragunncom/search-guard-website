import React, { Component } from 'react';
import './NavBar.scss';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo-white.svg';
import cross from '../../images/cross-white.svg';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        width: 0,
        visible: true,
      },
      prevScrollpos: 0,
    };
    this.navBar = React.createRef();
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
  }

  componentDidMount() {
    const navBarRef = this.navBar.current;
    let prevScrollpos = window.pageYOffset;
    window.onscroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        navBarRef.style.top = '0';
      } else {
        navBarRef.style.top = '-120px';
      }
      prevScrollpos = currentScrollPos;
    };

    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const prevScrollpos = window.pageYOffset;
    this.setState({ prevScrollpos });
  }

  openNav() {
    const style = { width: '100%' };
    this.setState({ style });
    document.addEventListener('click', this.closeNav);
  }

  closeNav() {
    document.removeEventListener('click', this.closeNav);
    const style = { width: 0 };
    this.setState({ style });
  }

  render() {
    const style = {
      active: {
        borderBottom: '2px solid #00FCE5',
        marginBottom: 0,
      },
      activeContact: {
        border: '2px solid #00FCE5',
      },
    };

    const navBar = (
      <div
        className="navbar-navbar-container"
        id="navbar"
        style={{ backgroundColor: this.props.background }}
      >
        <div className="navbar-navbar-wrapper">
          <NavLink to="/">
            <img
              src={logo}
              alt="Search Guard logo"
              className="navbar-logo-style"
            />
          </NavLink>
          <div className="navbar-nav-links-container">
            <NavLink
              to="/product/"
              className="navbar-nav-link"
              activeStyle={style.active}
            >
              {this.props.landing ? '' : 'product'}
            </NavLink>
            <NavLink
              to="/licensing/"
              className="navbar-nav-link"
              activeStyle={style.active}
            >
              {this.props.landing ? '' : 'licensing'}
            </NavLink>
            <NavLink
              to="/resource/"
              className="navbar-nav-link"
              activeStyle={style.active}
            >
              {this.props.landing ? '' : 'resource hub'}
            </NavLink>
            <NavLink
              to="/company/"
              className="navbar-nav-link"
              activeStyle={style.active}
            >
              {this.props.landing ? '' : 'company'}
            </NavLink>
            <NavLink
              to="/contacts/"
              className="navbar-nav-link"
              activeStyle={style.activeContact}
            >
              {this.props.landing ? 'start free trial' : 'contact us'}
            </NavLink>
          </div>
          <div className="navbar-menu-container">
            <div className="navbar-nav-link" onClick={this.openNav}>
              menu
            </div>
            <div ef="snav" className="navbar-overlay" style={this.state.style}>
              <div className="navbar-sidenav-container">
                <div className="navbar-overlay-header">
                  <div onClick={this.closeNav}>
                    <img
                      src={logo}
                      alt="Search Guard logo"
                      className="navbar-logo-style"
                    />
                  </div>
                  <div onClick={this.closeNav}>
                    <img
                      src={cross}
                      alt="close icon"
                      className="navbar-close-btn"
                    />
                  </div>
                </div>
                <div className="navbar-nav-links-container-mobile">
                  <NavLink
                    to="/product/"
                    className="navbar-nav-link"
                    activeStyle={style.active}
                  >
                    {this.props.landing ? '' : 'product'}
                  </NavLink>
                  <NavLink
                    to="/licensing/"
                    className="navbar-nav-link"
                    activeStyle={style.active}
                  >
                    {this.props.landing ? '' : 'licensing'}
                  </NavLink>
                  <NavLink
                    to="/resource/"
                    className="navbar-nav-link"
                    activeStyle={style.active}
                  >
                    {this.props.landing ? '' : 'resource hub'}
                  </NavLink>
                  <NavLink
                    to="/company/"
                    className="navbar-nav-link"
                    activeStyle={style.active}
                  >
                    {this.props.landing ? '' : 'company'}
                  </NavLink>
                  <NavLink
                    to="/contacts/"
                    className="navbar-nav-link"
                    activeStyle={style.actives}
                  >
                    {this.props.landing ? 'start free trial' : 'contact us'}
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    let visibleNavBar = null;
    if (this.state.prevScrollpos > window.innerHeight) {
      visibleNavBar = (
        <div className="navbar" ref={this.navBar}>
          {navBar}
        </div>
      );
    } else {
      visibleNavBar = <div ref={this.navBar}>{navBar}</div>;
    }

    return <div>{visibleNavBar}</div>;
  }
}
