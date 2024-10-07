import React from 'react';
import './Services.scss';
import Button from '../Button/Button';
import key from '../../images/key-solid.svg';
import db from '../../images/database-solid.svg';
import user_check from '../../images/user-check-solid.svg';
import people from '../../images/people-arrows-solid.svg';
import check from '../../images/list-check-solid.svg';
import id from '../../images/id-card-regular.svg';
import audit from '../../images/pen-to-square-regular.svg';
import shield from '../../images/file-shield-solid.svg';

const Services = ({ landing }) => {
  return (
    <div
      className={
        !landing
          ? 'services-wrapper'
          : 'services-wrapper services-landing-background'
      }
    >
      <h3
        className="services-headline"
        style={landing ? { color: 'white' } : null}
      >
        Enterprise security on all levels
      </h3>
      <div className="row services-icons">
        <div className="col s6 m3 security-detail-dark">
          <div className="security-detail-icon">
            <img class="filter-icons-color" loading="lazy" src={shield} alt="key shield icon" width="100px" height="100px" />
          </div>
          <div className="security-detail-title">Encryption</div>
        </div>
        <div className="col s6 m3 security-detail-light">
          <div className="security-detail-icon">
            <img class="filter-icons-color" loading="lazy" src={user_check} alt="dblock icon" width="100px" height="100px" />
          </div>
          <div className="security-detail-title">Authentication</div>
        </div>
        <div className="col s6 m3 security-detail-dark-mobile">
          <div className="security-detail-icon">
            <img class="filter-icons-color" loading="lazy" src={key} alt="key icon" width="100px" height="100px" />
          </div>
          <div className="security-detail-title">Authorization</div>
        </div>
        <div className="col s6 m3 security-detail-light-mobile">
          <div className="security-detail-icon">
            <img class="filter-icons-color" loading="lazy" src={id} alt="identity icon" width="100px" height="100px" />
          </div>
          <div className="security-detail-title">Role-based access control</div>
        </div>
        <div className="col s6 m3 security-detail-light-mobile">
          <div className="security-detail-icon">
            <img class="filter-icons-color" loading="lazy" src={audit} alt="audit icon" width="100px" height="100px" />
          </div>
          <div className="security-detail-title">Audit logging</div>
        </div>
        <div className="col s6 m3 security-detail-dark-mobile">
          <div className="security-detail-icon">
            <img class="filter-icons-color" loading="lazy" src={people} alt="people icon" width="100px" height="100px" />
          </div>
          <div className="security-detail-title">Multitenancy</div>
        </div>
        <div className="col s6 m3 security-detail-light">
          <div className="security-detail-icon">
            <img class="filter-icons-color" loading="lazy" src={db} alt="db icon" width="100px" height="100px" />
          </div>
          <div className="security-detail-title">Elastic stack</div>
        </div>
        <div className="col s6 m3 security-detail-dark">
          <div className="security-detail-icon">
            <img class="filter-icons-color" loading="lazy" src={check} alt="computer icon" width="100px" height="100px" />
          </div>
          <div className="security-detail-title">Compliance</div>
        </div>
      </div>
      <div className={!landing ? 'security-button' : 'hidden'}>
        <Button
          buttonStyle="light-aqua-button"
          text="see all features"
          link="/licensing/#feature"
        />
      </div>
    </div>
  );
};

export default Services;
