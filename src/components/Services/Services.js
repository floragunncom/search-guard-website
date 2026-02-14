import React from 'react';
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
        Enterprise security on all levels
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
          <div className="security-detail-title">Encryption</div>
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
          <div className="security-detail-title">Authentication</div>
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
          <div className="security-detail-title">Authorization</div>
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
          <div className="security-detail-title">Role-based access control</div>
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
          <div className="security-detail-title">Audit logging</div>
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
          <div className="security-detail-title">Multitenancy</div>
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
          <div className="security-detail-title">Elastic Stack Support</div>
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
          <div className="security-detail-title">Compliance</div>
        </div>
      </div>
      <div className={!landing ? 'security-button' : 'hidden'}>
        <Button
          
          text="see all features"
          link="/licensing/#feature"
        />
      </div>
    </div>
  );
};

export default Services;
