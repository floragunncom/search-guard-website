import React from 'react';
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
          {/* <div className="prefooter-content-wrapper col s12 m6 l3">
            <div className="prefooter-col-content">
              <div className="prefooter-headline">select your language</div>
              <div className="prefooter-content">
                <LanguagePicker />
                <hr className="prefooter-hr" />
              </div>
            </div>
          </div> */}
          <div className="prefooter-content-wrapper col s12 m6 l6">
            <div className="prefooter-col-content">
              <div className="prefooter-headline">follow us</div>
              <div className="prefooter-content icons">
                <a
                  href="https://twitter.com/searchguard?lang=en"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img loading="lazy" src={twitter} alt="twitter icon" />
                </a>
                <a
                  href="https://www.facebook.com/searchguard/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img loading="lazy" src={facebook} alt="facebook icon" />
                </a>
                <a
                  href="https://www.linkedin.com/company/search-guard/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img loading="lazy" src={linkedIn} alt="linkedIn icon" />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCUw93I0DHMvoA8HNQ31AeJw"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img loading="lazy" src={youtube} alt="youtube icon"  />
                </a>
                <hr className="prefooter-hr" />
              </div>
            </div>
          </div>
          <div className="prefooter-content-wrapper col s12 m12 l6">
            <div className="prefooter-col-content">
              <div className="prefooter-headline">Search Guard Newsletter</div>
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
