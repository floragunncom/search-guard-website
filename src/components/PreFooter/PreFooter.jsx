import React from 'react';
import {ReactSVG} from "react-svg";
import './PreFooter.scss';
import Email from '../Email/Email.jsx';
import sg_helmet_logo from '../../images/SG_Helmet_LOGO 1.svg';

const Info = () => {
  return (
    <div className="prefooter-container">
      <div className="prefooter-row">
        <div className="row">
          <div className="prefooter-content-wrapper col s12 m8 l6">
            <div className="prefooter-col-content">
              <div className="subtitle prefooter-headline">Sign up for Search Guard Newsletter</div>
              <Email />
            </div>
          </div>
          <div className="prefooter-content-wrapper col s12 m4 l6 prefooter-logo">
            <ReactSVG src={sg_helmet_logo} alt="Search Guard Logo"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
