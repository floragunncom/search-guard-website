import React from 'react';
import { useTranslation } from 'react-i18next';
import {ReactSVG} from "react-svg";
import veracode from '../../images/veracode.svg';
import alliance from '../../images/alliance.svg';
import security from '../../images/security.svg';
import cve from '../../images/ove.svg';


const Certified = () => {
  const { t } = useTranslation('security');

  return (
    <div className="certified-wrapper" id="certified">
      <h3 className="certified-headline">{t('certified.headline')}</h3>
      <div className="row">
        <div className="col s12 m6">
          <a
              href="https://www.bsi.bund.de/EN/"
              target="_blank"
              rel="noopener noreferrer"
              className="certified-col-img"
          >
            <ReactSVG src={alliance} alt={t('certified.alliance.alt')}/>
          </a>
          <h5 className="certified-col-headline">
            {t('certified.alliance.headline')}
          </h5>
          <div className="body1 certified-col-text">
            {t('certified.alliance.text')}
          </div>
        </div>
        <div className="col s12 m6">
          <a
            href="https://www.teletrust.de/en/"
            target="_blank"
            rel="noopener noreferrer"
            className="certified-col-img"
          >
            <ReactSVG src={security} alt={t('certified.teletrust.alt')}/>
          </a>
          <h5 className="certified-col-headline">{t('certified.teletrust.headline')}</h5>
          <div className="body1 certified-col-text">
            {t('certified.teletrust.text')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certified;
