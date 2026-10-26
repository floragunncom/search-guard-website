import React from 'react';
import { useTranslation } from 'react-i18next';
import {ReactSVG} from "react-svg";
import alliance from '../../images/alliance.svg';
import security from '../../images/security.svg';
import cve from '../../images/ove.svg';


const Certified = () => {
  const { t } = useTranslation('security');

  return (
    <div className="certified-wrapper" id="certified">
      {/* h2 so the outline stays sequential under the page's h2 sections;
          the class pins the former h3 size so the look does not change. */}
      <h2 className="certified-headline">{t('certified.headline')}</h2>
      <div className="row">
        <div className="col s12 m4">
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
        <div className="col s12 m4">
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
        <div className="col s12 m4">
          {/* ove.svg is the CVE® program logo (embedded PNG); floragunn is
              listed as a CNA partner at cve.org. */}
          <a
            href="https://www.cve.org/PartnerInformation/ListofPartners/partner/floragunn"
            target="_blank"
            rel="noopener noreferrer"
            className="certified-col-img"
            aria-label={t('certified.cve.alt')}
          >
            <ReactSVG src={cve} alt={t('certified.cve.alt')}/>
          </a>
          <h5 className="certified-col-headline">{t('certified.cve.headline')}</h5>
          <div className="body1 certified-col-text">
            {t('certified.cve.text')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certified;
