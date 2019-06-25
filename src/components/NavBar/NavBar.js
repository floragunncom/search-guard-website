import React, { Component } from 'react';
import './NavBar.scss';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo-white.svg';
import cross from '../../images/cross-white.svg';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        width: 0,
        prevScrollpos: window.pageYOffset,
        visible: true
      },
    };
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
  }
  
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if (window.pageYOffset > window.innerHeight) {
      const { prevScrollpos } = this.state;
      const currentScrollPos = window.pageYOffset;
      const visible = prevScrollpos > currentScrollPos;
  
      this.setState({
        prevScrollpos: currentScrollPos,
        visible
      });
    }
    if (window.pageYOffset < window.innerHeight) {
      this.setState({ visible: false });
    }
  };

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
    const style = {
      active: {
        borderBottom: '2px solid #00FCE5',
        marginBottom: 0,
      },
      activeContact: {
        border: '2px solid #00FCE5',
      }
    }

    return (
      <div className={this.state.visible ? "navbar" : null}>
        <div className="navbar-navbar-container" id="navbar" style={{backgroundColor: this.props.background}}>
          <div className="navbar-navbar-wrapper">
            <a href="/">
              <img src={logo} alt="Logo" className="navbar-logo-style" />
            </a>
            <div href="/" className="navbar-nav-links-container">
              <NavLink to="/product" className="navbar-nav-link" activeStyle={style.active}>product</NavLink>
              <NavLink to="/license" className="navbar-nav-link" activeStyle={style.active}>licensing</NavLink>
              <NavLink to="/resource" className="navbar-nav-link" activeStyle={style.active}>resource hub</NavLink>
              <NavLink to="/company" className="navbar-nav-link" activeStyle={style.active}>company</NavLink>
              <NavLink to="/contact" className="navbar-nav-link" activeStyle={style.activeContact}>contact us</NavLink>
            </div>
            <div className="navbar-menu-container">
              <div className="navbar-nav-link" onClick={this.openNav}>menu</div>
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
                    <NavLink to="/product" className="navbar-nav-link" activeStyle={style.active}>product</NavLink>
                    <NavLink to="/license" className="navbar-nav-link" activeStyle={style.active}>licensing</NavLink>
                    <NavLink to="/resource" className="navbar-nav-link" activeStyle={style.active}>resource hub</NavLink>
                    <NavLink to="/company" className="navbar-nav-link" activeStyle={style.active}>company</NavLink>
                    <NavLink to="/contact" className="navbar-nav-link" activeStyle={style.activeContact}>contact us</NavLink>
                  </div>
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
