import React from 'react';
import './LandingUSP.scss';
import shield from '../../images/icon-wheel-shield.svg';
import multilayer from '../../images/icon-multilayer-security.svg';
import disc from '../../images/disk.svg';

const LandingUSP = () => {
  return (
    <div className="landing-ups-wrapper">
      <div className="row">
        <div className="col s12 m4">
          <div className="landing-usp-box">
            <img src={multilayer} alt="multilayer icon" />
            <div className="landing-usp-text-box">
              <div className="landing-usp-text-box-headline">
                Multilevel security
              </div>
              <div className="landing-usp-text-box-text">
                Protect your sensitive data on all levels by using role-based access control to your clusters, indices, documents and fields.
                Search Guard covers it all and adds encryption, authentication, authorization, audit logging, multi tenancy and compliance features.
              </div>
            </div>
          </div>
          </div>
        <div className="col s12 m4">
          <div className="landing-usp-box">
            <img src={shield} alt="shield icon" />
            <div className="landing-usp-text-box">
              <div className="landing-usp-text-box-headline">
                Industry standards
              </div>
              <div className="landing-usp-text-box-text">
                Search Guard supports all industry standards for authentication and authorization like LDAP, Active Directory, OpenID, SAML, Kerberos, JSON web tokens or client certificates.
              </div>
            </div>
          </div>
          </div>
        <div className="col s12 m4">
          <div className="landing-usp-box">
            <img src={disc} alt="disc icon" />
            <div className="landing-usp-text-box">
              <div className="landing-usp-text-box-headline">Elastic Stack</div>
              <div className="landing-usp-text-box-text">
                Search Guard gives you full security control over your entire Elastisearch environment. Protect the complete Elastic stack, including Kibana, Logstash and Beats.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingUSP;
