import React from 'react';
import './PreFooter.scss';
import Email from '../Email/Email';
import sg_helmet_logo from '../../images/SG_Helmet_LOGO 1.svg';

const Info = () => {
  return (
    <div className="prefooter-container">
      <div className="prefooter-row">
        <div className="row">
          <div className="prefooter-content-wrapper col s12 m12 l6">
            <div className="prefooter-col-content">
              <div className="subtitle prefooter-headline">Sign up for Search Guard Newsletter</div>
              {/* <div className="prefooter-content">
                <div className="prefooter-content-text">
                  For the latest product developments, new versions and
                  cybersecurity news, sign up to our newsletter.
                </div>
              </div> */}
              <Email />
            </div>
          </div>
          <div className="prefooter-content-wrapper col s12 m12 l6 prefooter-logo">          
            <img loading="lazy" src={sg_helmet_logo} alt="search guard logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
