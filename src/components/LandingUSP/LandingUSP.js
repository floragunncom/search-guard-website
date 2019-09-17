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
                Mauris ullamcorper commodo eros a cursus. Mauris est sapien,
                lobortis ac orci non, mollis semper diam.
              </div>
            </div>
          </div>
          </div>
        <div className="col s12 m4">
          <div className="landing-usp-box">
            <img src={shield} alt="shield icon" />
            <div className="landing-usp-text-box">
              <div className="landing-usp-text-box-headline">
                Support industry standards
              </div>
              <div className="landing-usp-text-box-text">
                Mauris ullamcorper commodo eros a cursus. Mauris est sapien,
                lobortis ac orci non, mollis semper diam.
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
                Mauris ullamcorper commodo eros a cursus. Mauris est sapien,
                lobortis ac orci non, mollis semper diam.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingUSP;
