import React from 'react';
import { GlobalSearch } from '../GlobalSearch/GlobalSearch.jsx';
import logo from '../../images/sg_logo_white.svg';
import './Navbar.scss';
import {ReactSVG} from "react-svg";
import 'font-awesome/css/font-awesome.min.css';
import { SEARCH_GUARD_ALGOLIA_APP_ID, SEARCH_GUARD_ALGOLIA_SEARCH_API_KEY } from '../GlobalSearch/SgAlgolia';

const Navbar = ({ background = 'white', landing }) => {
  const [searchEnabled, setSearchEnabled ] = React.useState(false);

  const handleToggleSearch = React.useCallback(() => {
    setSearchEnabled(enabled => !enabled);
  }, []);

  // Initialize Materialize dropdowns and sidenav
  React.useEffect(() => {
    // Wait for Materialize to be available
    const initMaterialize = () => {
      if (typeof window !== 'undefined' && window.M) {
        // Initialize dropdowns
        const dropdowns = document.querySelectorAll('.dropdown-trigger');
        if (dropdowns && dropdowns.length > 0) {
          window.M.Dropdown.init(dropdowns, {
            hover: true,
            coverTrigger: false
          });
        }

        // Initialize sidenav
        const sidenavs = document.querySelectorAll('.sidenav');
        if (sidenavs && sidenavs.length > 0) {
          window.M.Sidenav.init(sidenavs, {
            edge: "right"
          });
        }
      }
    };

    // Try to initialize immediately
    initMaterialize();

    // Also try after a short delay to ensure Materialize is loaded
    const timer = setTimeout(initMaterialize, 100);

    return () => {
      clearTimeout(timer);
      // Cleanup Materialize instances on unmount
      if (typeof window !== 'undefined' && window.M) {
        const dropdowns = document.querySelectorAll('.dropdown-trigger');
        dropdowns.forEach(elem => {
          const instance = window.M.Dropdown.getInstance(elem);
          if (instance) instance.destroy();
        });

        const sidenavs = document.querySelectorAll('.sidenav');
        sidenavs.forEach(elem => {
          const instance = window.M.Sidenav.getInstance(elem);
          if (instance) instance.destroy();
        });
      }
    };
  }, []);

  const algoliasearchClient = React.useMemo(
    () => { return window['@algolia/client-search'] ? window['@algolia/client-search'].searchClient(
      SEARCH_GUARD_ALGOLIA_APP_ID,
      SEARCH_GUARD_ALGOLIA_SEARCH_API_KEY
    ) : null},
    [window['@algolia/client-search']]
  );

    return (
      <>
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper">               
              <a href="#!" data-target="sg-sidenav" className="sidenav-trigger"><i className="material-icons burger">menu</i></a>
              <a href="/" className="brand-logo">
              <ReactSVG
                src={logo}
                title="Title"
                beforeInjection={(svg) => {
                    svg.querySelectorAll('*').forEach((element) => {
                      element.removeAttribute('fill');
                      element.removeAttribute('stroke');
                      element.removeAttribute('filter');
                      element.removeAttribute('mask');
                      element.removeAttribute('style');
                      element.removeAttribute('class');
                    });
                    svg.setAttribute('width', "200px");
                    svg.setAttribute('height', "100%");
                    svg.setAttribute('preserveAspectRatio', "xMidYMid meet");
                    svg.setAttribute('title', "Search Guard Logo");
                    svg.setAttribute('class', "navbar__icon");
                    svg.setAttribute('fill', "white");
                    svg.setAttribute('stroke', "white");
                  }}
                />
              </a>
              {
                searchEnabled === false ?  
                <button className='btn-search-mobile btn-search-open' onClick={handleToggleSearch}><i className="fa fa-search" /></button>
                :
                <button className='btn-search-mobile btn-search-close' onClick={handleToggleSearch}><i className="fa fa-times" /></button>
              }               
              <ul className="right hide-on-med-and-down">
                <li><a href="/security/" data-target="nav-solutions" className="dropdown-trigger navbar__item" >Solutions</a></li>
                <li><a className="navbar__item" href="/search-guard-free-trial/">Download</a></li>
                <li><a className="navbar__item" href="/licensing/">Pricing</a></li>
                <li><a className="navbar__item" href="/blog/">Blog</a></li>
                <li><a href="/resource/" data-target="nav-resources" className="dropdown-trigger navbar__item" >Resources</a></li>
                <li><a className="navbar__item" href="/company/">About</a></li>
                <li><a className="navbar__item" href="/contacts/">Contact</a></li>
                <li>
                  {searchEnabled === false ? 
                    <button className='btn-search btn-search-open navbar__item' onClick={handleToggleSearch}><i className="fa fa-search" /></button>
                    :
                    <button className='btn-search btn-search-close navbar__item' onClick={handleToggleSearch}><i className="fa fa-times" /></button>
                  }
                </li>                        
              </ul>
            </div>
            {algoliasearchClient ? <GlobalSearch searchClient={algoliasearchClient} opened={searchEnabled} className="search-mobile"/> : null}   
          </nav>
        </div>
        <ul className="sidenav" id="sg-sidenav">
          <li>
            <a href="#!" className="navbar__item" >Solutions</a>
            <ul >
              <li><a href="/security/">Security</a></li>
              <li><a href="/alerting/">Alerting</a></li>
              <li><a href="/encryption-at-rest/">Encryption at Rest (Beta)</a></li>
              <li><a href="/indexmanagement/">Index Management (Beta)</a></li>
              <li><a href="/tlstool/">TLS Tool</a></li>
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
              <li><a href="/resource/#videos">Videos</a></li>
              <li><a href="/faq/">FAQ</a></li>
              <li><a href="/presentations/">Presentations</a></li>
              <li><a href="/whitepapers/">Whitepapers</a></li>
            </ul>
          </li>
          <li><a className="navbar__item" href="/company/">About</a></li>
          <li><a className="navbar__item" href="/contacts/">Contact</a></li>
          <li>

          </li>                 
        </ul>
        <ul id="nav-resources" className="dropdown-content">
          <li><a href="https://docs.search-guard.com" target="_blank" rel="noopener noreferrer">Documentation</a></li>
          <li><a href="https://forum.search-guard.com" target="_blank" rel="noopener noreferrer">Community Forum</a></li>
          <li><a href="https://git.floragunn.com/search-guard" target="_blank" rel="noopener noreferrer">Source Code</a></li>
          <li><a href="/resource/#videos">Videos</a></li>
          <li><a href="/faq/">FAQ</a></li>
          <li><a href="/presentations/">Presentations</a></li>
          <li><a href="/whitepapers/">Whitepapers</a></li>
        </ul>
        <ul id="nav-solutions" className="dropdown-content">
          <li><a href="/security/">Security</a></li>
          <li><a href="/alerting/">Alerting</a></li>
          <li><a href="/encryption-at-rest/">Encryption at Rest (Beta)</a></li>
          <li><a href="/indexmanagement/">Index Management (Beta)</a></li>
          <li><a href="/tlstool/">TLS Tool</a></li>
        </ul>
      </>
    );
};

export default Navbar;
