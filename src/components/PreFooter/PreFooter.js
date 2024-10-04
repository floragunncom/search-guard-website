import React from 'react';
import './PreFooter.scss';
import Email from '../Email/Email';

const Info = () => {
  return (
    <div className="prefooter-container">
      <div className="prefooter-row">
        <div className="row">
          <div className="prefooter-content-wrapper col s12 m12 l6">
            <div className="prefooter-col-content">
              <div className="prefooter-headline subtitle">Search Guard Newsletter</div>
              {/* <div className="prefooter-content">
                <div className="prefooter-content-text">
                  For the latest product developments, new versions and
                  cybersecurity news, sign up to our newsletter.
                </div>
              </div> */}
              <Email />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
