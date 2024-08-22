import React from 'react';
import './Services.scss';
import Button from '../Button/Button';
import key from '../../images/icon-loud-key.svg';
import db from '../../images/icon-loud-db.svg';
import dblock from '../../images/icon-loud-dblock.svg';
import people from '../../images/icon-loud-people.svg';
import pc from '../../images/icon-loud-pc.svg';
import id from '../../images/icon-loud-id.svg';
import audit from '../../images/audit-icon.svg';
import keyshield from '../../images/icon-loud-keyshield.svg';

const Services = ({ landing }) => {
  return (
    <div
      className={
        !landing
          ? 'services-wrapper'
          : 'services-wrapper services-landing-background'
      }
    >
      <h2
        className="services-headline"
        style={landing ? { color: 'white' } : null}
      >
        Enterprise security on all levels
      </h2>
      <div className="row">
        <div className="col s6 m3 security-detail-dark">
          <div className="security-detail-icon">
            <img loading="lazy" src={keyshield} alt="key shield icon" width="100px" height="100px" />
          </div>
          <div className="security-detail-title">Encryption</div>
        </div>
        <div className="col s6 m3 security-detail-light">
          <div className="security-detail-icon">
            <img loading="lazy" src={dblock} alt="dblock icon" width="100px" height="100px" />
          </div>
          <div className="security-detail-title">Authentication</div>
        </div>
        <div className="col s6 m3 security-detail-dark-mobile">
          <div className="security-detail-icon">
            <img loading="lazy" src={key} alt="key icon" width="100px" height="100px" />
          </div>
          <div className="security-detail-title">Authorization</div>
        </div>
        <div className="col s6 m3 security-detail-light-mobile">
          <div className="security-detail-icon">
            <img loading="lazy" src={id} alt="identity icon" width="100px" height="100px" />
          </div>
          <div className="security-detail-title">Role-based access control</div>
        </div>
        <div className="col s6 m3 security-detail-light-mobile">
          <div className="security-detail-icon">
            <img loading="lazy" src={audit} alt="audit icon" width="100px" height="100px" />
          </div>
          <div className="security-detail-title">Audit logging</div>
        </div>
        <div className="col s6 m3 security-detail-dark-mobile">
          <div className="security-detail-icon">
            <img loading="lazy" src={people} alt="people icon" width="100px" height="100px" />
          </div>
          <div className="security-detail-title">Multitenancy</div>
        </div>
        <div className="col s6 m3 security-detail-light">
          <div className="security-detail-icon">
            <img loading="lazy" src={db} alt="db icon" width="100px" height="100px" />
          </div>
          <div className="security-detail-title">Elastic stack</div>
        </div>
        <div className="col s6 m3 security-detail-dark">
          <div className="security-detail-icon">
            <img loading="lazy" src={pc} alt="computer icon" width="100px" height="100px" />
          </div>
          <div className="security-detail-title">Compliance</div>
        </div>
      </div>
      <div className={!landing ? 'security-button' : 'hidden'}>
        <Button
          buttonStyle="default-link"
          text="see all features"
          link="/licensing/#feature"
        />
      </div>
    </div>
  );
};

export default Services;
