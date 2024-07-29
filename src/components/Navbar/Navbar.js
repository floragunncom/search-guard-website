import React from 'react';
import Headroom from "react-headroom";
import logo from '../../images/logo-white.svg';
import M from "materialize-css";
import './Navbar.scss';


const Navbar = ({ background = 'white', landing }) => {

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems, {});
    });

    return (
        <>

            <nav>
                <div className="nav-wrapper">
                    <a href="/" className="brand-logo">
                        <img src={logo} alt="Search Guard" className="navbar__icon" />
                    </a>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        <li><a className="navbar__item" href="sass.html">Sass</a></li>
                        <li><a className="navbar__item" href="badges.html">Components</a></li>
                        <li><a className="navbar__item" href="collapsible.html">Javascript</a></li>
                        <li><a className="navbar__item" href="mobile.html">Mobile</a></li>
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
                <li><a href="sass.html">Sass</a></li>
                <li><a href="badges.html">Components</a></li>
                <li><a href="collapsible.html">Javascript</a></li>
                <li><a href="mobile.html">Mobile</a></li>
            </ul>

        </>
    );
};

export default Navbar;
