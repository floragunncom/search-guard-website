import React from 'react';
import './Services.scss';
import Button from '../Button/Button';
import key from '../../images/icon-loud-key.svg';
import db from '../../images/icon-loud-db.svg';
import dblock from '../../images/icon-loud-dblock.svg';
import people from '../../images/icon-loud-people.svg';
import pc from '../../images/icon-loud-pc.svg';
import id from '../../images/icon-loud-id.svg';
import callcenter from '../../images/icon-loud-callcenter.svg';
import keyshield from '../../images/icon-loud-keyshield.svg';

const Services = () => {
  return (
    <div className="services-wrapper">
      <div className="services-headline">Enterprise security on all levels</div>
      <div className="row">
        <div className="col s6 m3 security-detail-dark">
          <div className="security-detail-icon">
            <img src={keyshield} alt="icon"/>
          </div>
          <div className="security-detail-title">Encryption</div>
        </div>
        <div className="col s6 m3 security-detail-light">
          <div className="security-detail-icon">
            <img src={dblock} alt="icon"/>
          </div>
          <div className="security-detail-title">Authentication</div>
        </div>
        <div className="col s6 m3 security-detail-dark-mobile">
          <div className="security-detail-icon">
            <img src={key} alt="icon"/>
          </div>
          <div className="security-detail-title">Authorisation</div>
        </div>
        <div className="col s6 m3 security-detail-light-mobile">
          <div className="security-detail-icon">
            <img src={id} alt="icon"/>
          </div>
          <div className="security-detail-title">Role-based access control</div>
        </div>
        <div className="col s6 m3 security-detail-light-mobile">
          <div className="security-detail-icon">
            <img src={db} alt="icon"/>
          </div>
          <div className="security-detail-title">Elastic stack</div>
        </div>
        <div className="col s6 m3 security-detail-dark-mobile">
          <div className="security-detail-icon">
            <img src={people} alt="icon"/>
          </div>
          <div className="security-detail-title">Multitenancy</div>
        </div>
        <div className="col s6 m3 security-detail-light">
          <div className="security-detail-icon">
            <img src={pc} alt="icon"/>
          </div>
          <div className="security-detail-title">Compliance</div>
        </div>
        <div className="col s6 m3 security-detail-dark">
          <div className="security-detail-icon">
            <img src={callcenter} alt="icon"/>
          </div>
          <div className="security-detail-title">Enterpreise support</div>
        </div>
      </div>
      <div className="security-button">
        <Button style="default-link" text="see all features" />
      </div>
    </div>
  );
};

export default Services;