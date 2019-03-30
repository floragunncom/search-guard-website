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
    <div className="container">
      <div className="prefooter-wrapper row">
        <div className="prefooter-content-wrapper col s12 m6 l4">
          <div className="prefooter-headline">select your language</div>
          <div className="card-panel teal lighten-2">test</div>
          <div className="prefooter-content hr">
            <LanguagePicker />
          </div>
        </div>
        <div className="prefooter-content-wrapper col s12 m6 l4">
          <div className="prefooter-headline">follow us</div>
          <div className="prefooter-content hr">
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
          </div>
        </div>
        <div className="prefooter-content-wrapper col s12 m12 l4">
          <div className="prefooter-headline">stay updated</div>
          <div className="prefooter-content">
            <p>
              For the latest product developments, new versions and
              cybersecurity news, sign up to our newsletter.
            </p>
            <Email />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
