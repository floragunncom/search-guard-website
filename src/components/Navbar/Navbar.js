import React from 'react';
import logo from '../../images/logo-white.svg';
import M from "materialize-css";
import './Navbar.scss';


const Navbar = ({ background = 'white', landing }) => {

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems, {
            edge: "right"
        });

        elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, {
            hover: true,
            coverTrigger: false
        });
    });

    return (
        <>
            <div className="navbar-fixed">
            <nav>
                <div className="nav-wrapper">
                    <a href="/" className="brand-logo">
                        <img src={logo} alt="Search Guard" className="navbar__icon" />
                    </a>
                    <a href="#!" data-target="sg-sidenav" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        <li><a href="/security/" data-target="nav-solutions" className="dropdown-trigger navbar__item" >Solutions</a></li>
                        <li><a className="navbar__item" href="/search-guard-free-trial/">Download</a></li>
                        <li><a className="navbar__item" href="/licensing/">Pricing</a></li>
                        <li><a className="navbar__item" href="/blog/">Blog</a></li>
                        <li><a href="/resource/" data-target="nav-resources" className="dropdown-trigger navbar__item" >Resources</a></li>
                        <li><a className="navbar__item" href="/company/">About</a></li>
                        <li><a className="navbar__item" href="/contacts/">Contact</a></li>
                    </ul>
                </div>
            </nav>
            </div>

            <ul className="sidenav" id="sg-sidenav">
                <li>
                    <a href="#!" className="navbar__item" >Solutions</a>
                    <ul >
                        <li><a href="/security/">Security</a></li>
                        <li><a href="/alerting/">Alerting</a></li>
                    </ul>
                </li>
                <li><a className="navbar__item" href="/search-guard-free-trial/">Download</a></li>
                <li><a className="navbar__item" href="/licensing/">Pricing</a></li>
                <li><a className="navbar__item" href="/blog/">Blog</a></li>
                <li>
                    <a href="/resource/" className="navbar__item" >Resources</a>
                    <ul >
                        <li><a href="https://docs.search-guard.com" target="_blank" rel="noopener noreferrer">Documentation</a></li>
                        <li><a href="https://forum.search-guard.com" target="_blank" rel="noopener noreferrer">Community Forum</a></li>
                        <li><a href="https://git.floragunn.com/search-guard" target="_blank" rel="noopener noreferrer">Source Code</a></li>
                        <li><a href="/resource#videos">Videos</a></li>
                        <li><a href="/faq/">FAQ</a></li>
                        <li><a href="/presentations/">Presentations</a></li>
                        <li><a href="/whitepapers/">Whitepapers</a></li>
                    </ul>
                </li>
                <li><a className="navbar__item" href="/company/">About</a></li>
                <li><a className="navbar__item" href="/contacts/">Contact</a></li>
            </ul>

            <ul id="nav-resources" className="dropdown-content">
                <li><a href="https://docs.search-guard.com" target="_blank" rel="noopener noreferrer">Documentation</a></li>
                <li><a href="https://forum.search-guard.com" target="_blank" rel="noopener noreferrer">Community Forum</a></li>
                <li><a href="https://git.floragunn.com/search-guard" target="_blank" rel="noopener noreferrer">Source Code</a></li>
                <li><a href="/resource#videos">Videos</a></li>
                <li><a href="/faq/">FAQ</a></li>
                <li><a href="/presentations/">Presentations</a></li>
                <li><a href="/whitepapers/">Whitepapers</a></li>
            </ul>

            <ul id="nav-solutions" className="dropdown-content">
                <li><a href="/security/">Security</a></li>
                <li><a href="/alerting/">Alerting</a></li>
            </ul>
        </>
    );
};

export default Navbar;
