import React from 'react';
import LanguagePicker from '../LanguagePicker/LanguagePicker';
import './PreFooter.scss';
import Email from '../Email/Email';
import twitter from '../../images/tw-dark.svg';
import linkedIn from '../../images/li-dark.svg';
import youtube from '../../images/yt-dark.svg';
import facebook from '../../images/fb-dark.svg';

const Info = () => {
  return (
    <div className="prefooter-container">
      <div className="prefooter-row">
        <div className="row">
          <div className="prefooter-content-wrapper col s12 m6 l3">
            <div className="prefooter-col-content">
              <div className="prefooter-headline">select your language</div>
              <div className="prefooter-content">
                <LanguagePicker />
                <hr className="prefooter-hr" />
              </div>
            </div>
          </div>
          <div className="prefooter-content-wrapper col s12 m6 l3">
            <div className="prefooter-col-content">
              <div className="prefooter-headline">follow us</div>
              <div className="prefooter-content icons">
                <a href="/">
                  <img src={twitter} alt="twitter" />
                </a>
                <a href="/">
                  <img src={facebook} alt="facebook" />
                </a>
                <a href="/">
                  <img src={linkedIn} alt="linkedIn" />
                </a>
                <a href="/">
                  <img src={youtube} alt="youtube" />
                </a>
                <hr className="prefooter-hr" />
              </div>
            </div>
          </div>
          <div className="prefooter-content-wrapper col s12 m12 l6">
            <div className="prefooter-col-content">
              <div className="prefooter-headline">stay updated</div>
              <div className="prefooter-content">
                <div className="prefooter-content-text">
                  For the latest product developments, new versions and
                  cybersecurity news, sign up to our newsletter.
                </div>
              </div>
              <Email />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
