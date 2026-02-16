import React from 'react';
import {useTranslation} from 'react-i18next';
import Button from '../Button/Button';
import key from '../../images/key-solid.svg';
import db from '../../images/database-solid.svg';
import user_check from '../../images/user-check-solid.svg';
import people from '../../images/people-arrows-solid.svg';
import check from '../../images/list-check-solid.svg';
import id from '../../images/id-card-regular.svg';
import audit from '../../images/pen-to-square-regular.svg';
import shield from '../../images/file-shield-solid.svg';
import {ReactSVG} from "react-svg";

const Services = ({ landing }) => {
  const { t } = useTranslation('home');

  return (
    <div
      className={
        !landing
          ? 'color-schema-dark default-padding-top-bottom'
          : 'services-wrapper services-landing-background'
      }
    >
      <h3
        className="services-headline"
        style={landing ? { color: 'white' } : null}
      >
        {t('services.headline')}
      </h3>
      <div className="row services-icons">
        <div className="col s6 m3 security-detail-dark">
          <div className="security-detail-icon">
            <ReactSVG src={shield} alt="Search Guard Encryption" className="color-schema-svg-dark"
                beforeInjection={(svg) => {
                  svg.setAttribute('width', "100");
                  svg.setAttribute('height', "100");
                }}
            />
          </div>
          <div className="security-detail-title">{t('services.encryption')}</div>
        </div>
        <div className="col s6 m3 security-detail-light">
          <div className="security-detail-icon">
            <ReactSVG src={user_check} alt="Search Guard Authentication" className="color-schema-svg-dark"
                      beforeInjection={(svg) => {
                        svg.setAttribute('width', "100");
                        svg.setAttribute('height', "100");
                      }}
            />
          </div>
          <div className="security-detail-title">{t('services.authentication')}</div>
        </div>
        <div className="col s6 m3 security-detail-dark-mobile">
          <div className="security-detail-icon">
            <ReactSVG src={key} alt="Search Guard Authorization" className="color-schema-svg-dark"
                      beforeInjection={(svg) => {
                        svg.setAttribute('width', "100");
                        svg.setAttribute('height', "100");
                      }}
            />
          </div>
          <div className="security-detail-title">{t('services.authorization')}</div>
        </div>
        <div className="col s6 m3 security-detail-light-mobile">
          <div className="security-detail-icon">
            <ReactSVG src={id} alt="Search Guard Role Based Access Control" className="color-schema-svg-dark"
                      beforeInjection={(svg) => {
                        svg.setAttribute('width', "100");
                        svg.setAttribute('height', "100");
                      }}
            />
          </div>
          <div className="security-detail-title">{t('services.rbac')}</div>
        </div>
        <div className="col s6 m3 security-detail-light-mobile">
          <div className="security-detail-icon">
            <ReactSVG src={audit} alt="Search Guard Audit Logging" className="color-schema-svg-dark"
                      beforeInjection={(svg) => {
                        svg.setAttribute('width', "100");
                        svg.setAttribute('height', "100");
                      }}
            />
          </div>
          <div className="security-detail-title">{t('services.auditLogging')}</div>
        </div>
        <div className="col s6 m3 security-detail-dark-mobile">
          <div className="security-detail-icon">
            <ReactSVG src={people} alt="Search Guard Multi Tenancy" className="color-schema-svg-dark"
                      beforeInjection={(svg) => {
                        svg.setAttribute('width', "100");
                        svg.setAttribute('height', "100");
                      }}
            />
          </div>
          <div className="security-detail-title">{t('services.multitenancy')}</div>
        </div>
        <div className="col s6 m3 security-detail-light">
          <div className="security-detail-icon">
            <ReactSVG src={db} alt="Search Guard Elastic Stack Support" className="color-schema-svg-dark"
                      beforeInjection={(svg) => {
                        svg.setAttribute('width', "100");
                        svg.setAttribute('height', "100");
                      }}
            />
          </div>
          <div className="security-detail-title">{t('services.elasticStackSupport')}</div>
        </div>
        <div className="col s6 m3 security-detail-dark">
          <div className="security-detail-icon">
            <ReactSVG src={check} alt="Search Guard Compliance" className="color-schema-svg-dark"
                      beforeInjection={(svg) => {
                        svg.setAttribute('width', "100");
                        svg.setAttribute('height', "100");
                      }}
            />
          </div>
          <div className="security-detail-title">{t('services.compliance')}</div>
        </div>
      </div>
      <div className={!landing ? 'security-button' : 'hidden'}>
        <Button

          text={t('services.button')}
          link="/licensing/#feature"
        />
      </div>
    </div>
  );
};

export default Services;
