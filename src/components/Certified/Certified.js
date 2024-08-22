import React from 'react';
import veracode from '../../images/veracode.svg';
import alliance from '../../images/alliance.svg';
import security from '../../images/security.svg';
import cve from '../../images/ove.svg';
import './Certified.scss';

const Certified = () => {
  return (
    <div className="certified-wrapper" id="certified">
      <h4 className="certified-headline">Certified</h4>
      <div className="row certified-row-wrapper">
        <div className="col s12 m6">
          <a
            href="https://www.veracode.com/verified/directory/floragunn-gmbh"
            target="_blank"
            rel="noopener noreferrer"
            className="certified-col-img"
          >
            <img loading="lazy" src={veracode} alt="veracode logo" />
          </a>
          <div className="subtitle certified-col-headline">Veracode</div>
          <div className="certified-col-text">
            All Search Guard versions and all third-party libraries are verified
            and scanned for vulnerabilities by Veracode. CA Veracode Verified
            empowers us to demonstrate our commitment to creating secure
            software.
          </div>
        </div>
        <div className="col s12 m6">
          <a
            href="https://www.bsi.bund.de/EN/"
            target="_blank"
            rel="noopener noreferrer"
            className="certified-col-img"
          >
            <img loading="lazy" src={alliance} alt="alliance logo" />
          </a>
          <div className="subtitle certified-col-headline">
            Allianz for Cyber-Sicherheit
          </div>
          <div className="certified-col-text">
            floragunn is member of the "Alliance for Cybersecurity", a body of
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
            <img loading="lazy" src={cve} alt="ove logo" />
          </a>
          <div className="subtitle certified-col-headline">CVE</div>
          <div className="certified-col-text">
            floragunn GmbH is the official CVE numbering authority for Search
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
            <img loading="lazy" src={security} alt="security icon" />
          </a>
          <div className="subtitle certified-col-headline">TeleTrusT</div>
          <div className="certified-col-text">
            floragunn is member of TeleTrust, a German federal association for
            IT security.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certified;
