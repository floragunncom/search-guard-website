import React, { useState } from 'react';
import './LicensingModel.scss';
import TableEditions from '../TableEditions/TableEditions';
import iconSearchGuard from '../../images/icon-search-guard.svg';
import enterprise from '../../images/icon-enterprise.svg';
import compliance from '../../images/icon-compliance.svg';
import community from '../../images/icon-community.svg';
import academic from '../../images/icon-academic.svg';
import custom from '../../images/icon-custom.svg';
import Button from '../Button/Button';

const LicensingModel = ({ tableView, plain, topButtons, headline, subheadline }) => {
  const [standardButton, setStandardButton] = useState(true);
  const [tableVisible, setTableVisible] = useState(false);

  const onButtonPress = () => {
    setStandardButton(!standardButton);
  };

  const ontableViewPress = () => {
    setTableVisible(tableVisible);
  };

  let infoButton;
  if (topButtons) {
    infoButton = (
      <div className="licensing-info-wrapper">
        <div className="licensing-info-text">
          We offer an{' '}
          <div style={{ fontWeight: 'bold', display: 'inline' }}>
            Academic & Scientific License
          </div>
          , as well as{' '}
          <div style={{ fontWeight: 'bold', display: 'inline' }}>
            Custom Licenses
          </div>{' '}
          for your personal needs.
        </div>
        <div className="liccensing-info-button">
          <Button buttonStyle="light-green-button" text="see all license models" link="/licensing/" />
        </div>
      </div>
    );
  }
  let renderContent;

  if (standardButton) {
    renderContent = (
      <div className="licensing-editions-wrapper">
        <div className="row">
          <div className="col s12 l4 licensing-right-border">
            <div className="licensing-edition">
              <div className="licensing-editions-icon">
                <img
                  src={iconSearchGuard}
                  alt="community icon"
                  className="licensing-icon"
                  width="145px" height="145px"
                />
              </div>
              <h5 className="licensing-editions-headline">
                Search Guard Community Edition
              </h5>
              <ul className="licensing-editions-text-wrapper">
                <li className="licensing-editions-text">
                  Covers all your basic Security and Alerting needs
                </li>
                <li className="licensing-editions-text">Free of charge</li>
                <li className="licensing-editions-text">
                  Integrated with the entire Elastic Stack
                </li>
              </ul>
              <div className="licensing-editions-button">
                <Button
                  text="install community edition"
                  buttonStyle="light-green-button"
                  link="/search-guard-free-trial/"
                />
              </div>
            </div>
          </div>
          <div className="col s12 l4 licensing-right-border">
            <div className="licensing-edition">
              <div className="licensing-editions-icon">
                <img
                  src={iconSearchGuard}
                  alt="enterprise icon"
                  className="licensing-icon"
                  width="145px" height="145px"
                />
              </div>
              <h5 className="licensing-editions-headline">
                Search Guard Enterprise Edition
              </h5>
              <ul className="licensing-editions-text-wrapper">
                <li className="licensing-editions-text">
                  Integrates with major security standards e.g. Active Directory
                </li>
                <li className="licensing-editions-text">
                  Field and Document-level Security and access control
                </li>
                <li className="licensing-editions-text">
                  Professional management API and Kibana multitenancy
                </li>
              </ul>
              <div className="licensing-editions-button">
                <Button
                  text="start free trial"
                  buttonStyle="light-green-button"
                  link="/search-guard-free-trial/"
                />
              </div>
            </div>
          </div>
          <div className="col s12 l4 licensing-right-border">
            <div className="licensing-edition">
              <div className="licensing-editions-icon">
                <img
                  src={iconSearchGuard}
                  alt="compliance icon"
                  className="licensing-icon"
                  width="145px" height="145px"
                />
              </div>
              <h5 className="licensing-editions-headline">
                Search Guard Compliance Edition
              </h5>
              <ul className="licensing-editions-text-wrapper">
                <li className="licensing-editions-text">
                  Designed for meeting compliance regulations e.g. GDPR
                </li>
                <li className="licensing-editions-text">
                  Record all read-and-write access to data
                </li>
                <li className="licensing-editions-text">
                  Monitor integrity of Elasticsearch installation
                </li>
              </ul>
              <div className="licensing-editions-button">
                <Button
                  text="start free trial"
                  buttonStyle="light-green-button"
                  link="/search-guard-free-trial/"
                />
              </div>
            </div>
            {infoButton}
          </div>
        </div>
      </div>
    );
  } else {
    renderContent = (
      <div className="licensing-editions-wrapper">
        <div className="row">
          <div className="col s12 l6 licensing-right-border">
            <div className="licensing-edition" id="custom-edition">
              <div className="licensing-editions-icon">
                <img
                  src={iconSearchGuard}
                  alt="academic icon"
                  className="licensing-icon"
                  width="145px" height="145px"
                />
              </div>
              <h5 className="licensing-editions-headline">
                Academic & Scientific edition
              </h5>
              <ul className="licensing-editions-text-wrapper">
                <li className="licensing-editions-text">
                  Search Guard Enterprise and Compliance licenses free of charge
                </li>
                <li className="licensing-editions-text">
                  For all non-profit academic and scientific projects
                </li>
                <li className="licensing-editions-text">
                  Unlimited clusters, unlimited nodes.
                </li>
              </ul>
              <div className="licensing-editions-button">
                <Button
                  text="Contact us"
                  buttonStyle="light-green-button"
                  link="/contacts/"
                />
              </div>
            </div>
          </div>
          <div className="col s12 l6 licensing-right-border">
            <div className="licensing-edition">
              <div className="licensing-editions-icon">
                <img
                  src={iconSearchGuard}
                  alt="custom icon"
                  className="licensing-icon"
                  width="145px" height="145px"
                />
              </div>
              <h5 className="licensing-editions-headline">
                Custom edition
              </h5>
              <ul className="licensing-editions-text-wrapper">
                <li className="licensing-editions-text">
                  For OEM partners and system integrators
                </li>
                <li className="licensing-editions-text">No upfront fees</li>
                <li className="licensing-editions-text">
                  Direct support from the Search Guard team
                </li>
              </ul>
              <div className="licensing-editions-button">
                <Button
                  text="Contact us"
                  buttonStyle="light-green-button"
                  link="/contacts/"
                />
              </div>
            </div>
            {infoButton}
          </div>
        </div>
      </div>
    );
  }

  let buttons;
  let renderTableView;

  if (topButtons) {
    buttons = (
      <div className="licensing-buttons button-large">
        <div
          className={
            standardButton ? 'licensing-button-active' : 'licensing-button'
          }
          onClick={onButtonPress}
        >
          standard editions
        </div>
        <div
          className={
            standardButton ? 'licensing-button' : 'licensing-button-active'
          }
          onClick={onButtonPress}
        >
          academic & custom
        </div>
      </div>
    );
  }

  if (tableView) {
    renderTableView = (
      <div className="licensing-comparison-wrapper" id="feature">
        <h2
          className="licensing-comparison-headline"
          onClick={ontableViewPress}
        >
          Feature breakdown
        </h2>
        <TableEditions />
      </div>
    );
  }

  return (
    <div className="color-schema-light">
      <div
        className={
          tableView ? 'licensing-wrapper-expanded' : plain ? '' : 'licensing-wrapper'
        }
        id="standard"
      >
        <div className="row">
          <div className="col s12">
            <h3 className="licensing-headline">{headline}</h3>
            {subheadline ? <div className="licensing-subheadline">{subheadline}</div> : null}
            {buttons}
            {renderContent}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col s12">{renderTableView}</div>
      </div>
    </div>
  );
};

export default LicensingModel;
