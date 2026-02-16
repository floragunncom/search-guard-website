import React from 'react';
import { useTranslation } from 'react-i18next';
import {ReactSVG} from "react-svg";
import Email from '../Email/Email';
import sg_helmet_logo from '../../images/SG_Helmet_LOGO 1.svg';

const Info = () => {
  const { t } = useTranslation('common');

  return (
    <div className="prefooter-container">
      <div className="prefooter-row">
        <div className="row">
          <div className="prefooter-content-wrapper col s12 m8 l6">
            <div className="prefooter-col-content">
              <div className="subtitle prefooter-headline">{t('prefooter.headline')}</div>
              <Email />
            </div>
          </div>
          <div className="prefooter-content-wrapper col s12 m4 l6 prefooter-logo">
            <ReactSVG src={sg_helmet_logo} alt="Search Guard Logo"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
