import React from 'react';
import { useTranslation } from 'react-i18next';
import { algoliasearch } from 'algoliasearch';
import { GlobalSearch } from '../GlobalSearch/GlobalSearch';
import logo from '../../images/sg_logo_white.svg';
import {ReactSVG} from "react-svg";
import 'font-awesome/css/font-awesome.min.css';
import { SEARCH_GUARD_ALGOLIA_APP_ID, SEARCH_GUARD_ALGOLIA_SEARCH_API_KEY } from '../GlobalSearch/SgAlgolia';
import { loadScriptOnce } from '../../utils/loadScriptOnce';
import { useLocalizedPath } from '../../i18n/useLocalizedPath';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

const algoliaSearchClient = algoliasearch(
  SEARCH_GUARD_ALGOLIA_APP_ID,
  SEARCH_GUARD_ALGOLIA_SEARCH_API_KEY
);

const Navbar = ({ background = 'white', landing }) => {
  const { t } = useTranslation('common');
  const lp = useLocalizedPath();
  const [searchEnabled, setSearchEnabled ] = React.useState(false);

  const handleToggleSearch = React.useCallback(() => {
    setSearchEnabled(enabled => !enabled);
  }, []);

  React.useEffect(() => {
    let cancelled = false;

    const initMaterializeNav = () => {
      if (cancelled || !window.M) {
        return;
      }

      const sidenavElements = document.querySelectorAll('.sidenav');
      if (sidenavElements.length > 0) {
        window.M.Sidenav.init(sidenavElements, { edge: 'right' });
      }

      const dropdownElements = document.querySelectorAll('.dropdown-trigger');
      if (dropdownElements.length > 0) {
        window.M.Dropdown.init(dropdownElements, {
          hover: true,
          coverTrigger: false,
        });
      }
    };

    loadScriptOnce('/assets/materialize.min.js')
      .then(() => {
        initMaterializeNav();
      })
      .catch(() => {
        // Keep navigation usable even if Materialize fails to load.
      });

    return () => {
      cancelled = true;
    };
  }, []);

    return (
      <>
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper">
              <a role="button" tabIndex={0} data-target="sg-sidenav" className="sidenav-trigger"><i className="material-icons burger">menu</i></a>
              <a href={lp('/')} className="brand-logo">
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
                <li><a href={lp('/security/')} data-target="nav-solutions" className="dropdown-trigger navbar__item" >{t('nav.solutions')}</a></li>
                <li><a className="navbar__item" href={lp('/search-guard-free-trial/')}>{t('nav.download')}</a></li>
                <li><a className="navbar__item" href={lp('/licensing/')}>{t('nav.pricing')}</a></li>
                <li><a className="navbar__item" href="/blog/">{t('nav.blog')}</a></li>
                <li><a href={lp('/resource/')} data-target="nav-resources" className="dropdown-trigger navbar__item" >{t('nav.resources')}</a></li>
                <li><a className="navbar__item" href={lp('/company/')}>{t('nav.about')}</a></li>
                <li><a className="navbar__item" href={lp('/contacts/')}>{t('nav.contact')}</a></li>
                <LanguageSwitcher />
                <li>
                  {searchEnabled === false ?
                    <button className='btn-search btn-search-open navbar__item' onClick={handleToggleSearch}><i className="fa fa-search" /></button>
                    :
                    <button className='btn-search btn-search-close navbar__item' onClick={handleToggleSearch}><i className="fa fa-times" /></button>
                  }
                </li>
              </ul>
            </div>
            <GlobalSearch searchClient={algoliaSearchClient} opened={searchEnabled} className="search-mobile"/>
          </nav>
        </div>
        <ul className="sidenav" id="sg-sidenav">
          <li>
            <a role="button" tabIndex={0} className="navbar__item" >{t('nav.solutions')}</a>
            <ul >
              <li><a href={lp('/security/')}>{t('nav.security')}</a></li>
              <li><a href={lp('/compliance/')}>{t('nav.compliance')}</a></li>
              <li><a href={lp('/alerting/')}>{t('nav.alerting')}</a></li>
              <li><a href={lp('/encryption-at-rest/')}>{t('nav.encryptionAtRest')}</a></li>
              <li><a href={lp('/tlstool/')}>{t('nav.tlsTool')}</a></li>
              <li className="nav-labs">
                <span className="nav-labs-header">{t('nav.fromTheLabs')}</span>
                <ul>
                  <li><a href={lp('/anomaly-detection/')}>{t('nav.anomalyDetection')}</a></li>
                  <li><a href={lp('/indexmanagement/')}>{t('nav.indexManagement')}</a></li>
                </ul>
              </li>
            </ul>
          </li>
          <li><a className="navbar__item" href={lp('/search-guard-free-trial/')}>{t('nav.download')}</a></li>
          <li><a className="navbar__item" href={lp('/licensing/')}>{t('nav.pricing')}</a></li>
          <li><a className="navbar__item" href="/blog/">{t('nav.blog')}</a></li>
          <li>
            <a href={lp('/resource/')} className="navbar__item" >{t('nav.resources')}</a>
            <ul >
              <li><a href="https://docs.search-guard.com" target="_blank" rel="noopener noreferrer">{t('nav.documentation')}</a></li>
              <li><a href="https://forum.search-guard.com" target="_blank" rel="noopener noreferrer">{t('nav.communityForum')}</a></li>
              <li><a href="https://git.floragunn.com/search-guard" target="_blank" rel="noopener noreferrer">{t('nav.sourceCode')}</a></li>
              <li><a href={lp('/resource/#videos')}>{t('nav.videos')}</a></li>
              <li><a href={lp('/faq/')}>{t('nav.faq')}</a></li>
              <li><a href={lp('/presentations/')}>{t('nav.presentations')}</a></li>
              <li><a href={lp('/webinars/')}>{t('nav.webinars')}</a></li>
              <li><a href="/whitepapers/">{t('nav.whitepapers')}</a></li>
            </ul>
          </li>
          <li><a className="navbar__item" href={lp('/company/')}>{t('nav.about')}</a></li>
          <li><a className="navbar__item" href={lp('/contacts/')}>{t('nav.contact')}</a></li>
          <li>

          </li>
        </ul>
        <ul id="nav-resources" className="dropdown-content">
          <li><a href="https://docs.search-guard.com" target="_blank" rel="noopener noreferrer">{t('nav.documentation')}</a></li>
          <li><a href="https://forum.search-guard.com" target="_blank" rel="noopener noreferrer">{t('nav.communityForum')}</a></li>
          <li><a href="https://git.floragunn.com/search-guard" target="_blank" rel="noopener noreferrer">{t('nav.sourceCode')}</a></li>
          <li><a href={lp('/resource/#videos')}>{t('nav.videos')}</a></li>
          <li><a href={lp('/faq/')}>{t('nav.faq')}</a></li>
          <li><a href={lp('/presentations/')}>{t('nav.presentations')}</a></li>
          <li><a href={lp('/webinars/')}>{t('nav.webinars')}</a></li>
          <li><a href="/whitepapers/">{t('nav.whitepapers')}</a></li>
        </ul>
        <ul id="nav-solutions" className="dropdown-content">
          <li><a href={lp('/security/')}>{t('nav.security')}</a></li>
          <li><a href={lp('/compliance/')}>{t('nav.compliance')}</a></li>
          <li><a href={lp('/alerting/')}>{t('nav.alerting')}</a></li>
          <li><a href={lp('/encryption-at-rest/')}>{t('nav.encryptionAtRest')}</a></li>
          <li><a href={lp('/tlstool/')}>{t('nav.tlsTool')}</a></li>
          <li className="divider" tabIndex={-1} />
          <li className="nav-labs-flyout">
            <a role="button" tabIndex={0}>
              {t('nav.fromTheLabs')}
              <i className="material-icons nav-labs-flyout__caret">arrow_right</i>
            </a>
            <ul className="nav-labs-flyout__menu">
              <li><a href={lp('/anomaly-detection/')}>{t('nav.anomalyDetection')}</a></li>
              <li><a href={lp('/indexmanagement/')}>{t('nav.indexManagement')}</a></li>
            </ul>
          </li>
        </ul>
      </>
    );
};

export default Navbar;
