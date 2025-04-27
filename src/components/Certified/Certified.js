import React from 'react';
import {ReactSVG} from "react-svg";
import veracode from '../../images/veracode.svg';
import alliance from '../../images/alliance.svg';
import security from '../../images/security.svg';
import cve from '../../images/ove.svg';
import './Certified.scss';


const Certified = () => {
  return (
    <div className="certified-wrapper" id="certified">
      <h3 className="certified-headline">Certified</h3>
      <div className="row certified-row-wrapper">
        <div className="col s12 m6">
          <a
            href="https://www.bsi.bund.de/EN/"
            target="_blank"
            rel="noopener noreferrer"
            className="certified-col-img"
          >
            <ReactSVG src={alliance} alt="Search Guard is member of the Alliance for Cybersecurity"/>
          </a>
          <h5 className="certified-col-headline">
            Allianz for Cyber-Sicherheit
          </h5>
          <div className="body1 certified-col-text">
            Floragunn is member of the "Alliance for Cybersecurity", a body of
            the Federal Office for Information Security in Germany.
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col s12 m6">
          <a
            href="https://cve.mitre.org/cve/request_id.html#cna_participants"
            target="_blank"
            rel="noopener noreferrer"
            className="certified-col-img"
          >
            <ReactSVG src={cve} alt="Floragunn GmbH is the official CVE numbering authority for Search Guard."/>
          </a>
          <h5 className="certified-col-headline">CVE</h5>
          <div className="body1 certified-col-text">
            Floragunn GmbH is the official CVE numbering authority for Search
            Guard.
          </div>
        </div>
        <div className="col s12 m6">
          <a
            href="https://www.teletrust.de/en/"
            target="_blank"
            rel="noopener noreferrer"
            className="certified-col-img"
          >
            <ReactSVG src={security} alt="Search Guard is member of TeleTrust"/>
          </a>
          <h5 className="certified-col-headline">TeleTrusT</h5>
          <div className="body1 certified-col-text">
            floragunn is member of TeleTrust, a German federal association for
            IT security.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certified;
