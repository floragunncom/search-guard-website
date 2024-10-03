import React, { useState } from 'react';
import './LicensingModel.scss';
import TableEditions from '../TableEditions/TableEditions';
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
          <Button text="see all license models" link="/licensing/" />
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
                  src={community}
                  alt="community icon"
                  className="licensing-icon"
                  width="145px" height="145px"
                />
              </div>
              <h3 className="licensing-editions-headline community-border">
                Search Guard Community Edition ///
              </h3>
              <div className="licensing-editions-text-wrapper">
                <div className="licensing-editions-text">
                  Covers all your basic Security and Alerting needs
                </div>
                <div className="licensing-editions-text">Free of charge</div>
                <div className="licensing-editions-text">
                  Integrated with the entire Elastic Stack
                </div>
              </div>
              <div className="licensing-editions-button">
                <Button
                  text="install community edition"
                  buttonStyle="ghost-link"
                  link="/search-guard-free-trial/"
                  color="#00C9B7"
                />
              </div>
            </div>
          </div>
          <div className="col s12 l4 licensing-right-border">
            <div className="licensing-edition">
              <div className="licensing-editions-icon">
                <img
                  src={enterprise}
                  alt="enterprise icon"
                  className="licensing-icon"
                  width="145px" height="145px"
                />
              </div>
              <h3 className="licensing-editions-headline enterprise-border">
                Search Guard Enterprise Edition
              </h3>
              <div className="licensing-editions-text-wrapper">
                <div className="licensing-editions-text">
                  Integrates with major security standards e.g. Active Directory
                </div>
                <div className="licensing-editions-text">
                  Field and Document-level Security and access control
                </div>
                <div className="licensing-editions-text">
                  Professional management API and Kibana multitenancy
                </div>
              </div>
              <div className="licensing-editions-button">
                <Button
                  text="start free trial"
                  buttonStyle="ghost-link"
                  link="/search-guard-free-trial/"
                  color="#009688"
                />
              </div>
            </div>
          </div>
          <div className="col s12 l4 licensing-right-border">
            <div className="licensing-edition">
              <div className="licensing-editions-icon">
                <img
                  src={compliance}
                  alt="compliance icon"
                  className="licensing-icon"
                  width="145px" height="145px"
                />
              </div>
              <h3 className="licensing-editions-headline compliance-border">
                Search Guard Compliance Edition
              </h3>
              <div className="licensing-editions-text-wrapper">
                <div className="licensing-editions-text">
                  Designed for meeting compliance regulations e.g. GDPR
                </div>
                <div className="licensing-editions-text">
                  Record all read-and-write access to data
                </div>
                <div className="licensing-editions-text">
                  Monitor integrity of Elasticsearch installation
                </div>
              </div>
              <div className="licensing-editions-button">
                <Button
                  text="start free trial"
                  buttonStyle="ghost-link"
                  link="/search-guard-free-trial/"
                  color="#007D71"
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
                  src={academic}
                  alt="academic icon"
                  className="licensing-icon"
                  width="145px" height="145px"
                />
              </div>
              <div className="licensing-editions-headline academic-border">
                Academic & Scientific edition
              </div>
              <div className="licensing-editions-text-wrapper">
                <div className="licensing-editions-text">
                  Search Guard Enterprise and Compliance licenses free of charge
                </div>
                <div className="licensing-editions-text">
                  For all non-profit academic and scientific projects
                </div>
                <div className="licensing-editions-text">
                  Unlimited clusters, unlimited nodes.
                </div>
              </div>
              <div className="licensing-editions-button">
                <Button
                  text="Contact us"
                  buttonStyle="ghost-link"
                  link="/contacts/"
                  color="#246E94"
                />
              </div>
            </div>
          </div>
          <div className="col s12 l6 licensing-right-border">
            <div className="licensing-edition">
              <div className="licensing-editions-icon">
                <img
                  src={custom}
                  alt="custom icon"
                  className="licensing-icon"
                  width="145px" height="145px"
                />
              </div>
              <div className="licensing-editions-headline custom-border">
                Custom edition
              </div>
              <div className="licensing-editions-text-wrapper">
                <div className="licensing-editions-text">
                  For OEM partners and system integrators
                </div>
                <div className="licensing-editions-text">No upfront fees</div>
                <div className="licensing-editions-text">
                  Direct support from the Search Guard team
                </div>
              </div>
              <div className="licensing-editions-button">
                <Button
                  text="Contact us"
                  buttonStyle="ghost-link"
                  link="/contacts/"
                  color="#246E94"
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
      <div className="licensing-buttons">
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
        <div
          className="licensing-comparison-headline"
          onClick={ontableViewPress}
        >
          Feature breakdown
        </div>
        <TableEditions />
      </div>
    );
  }

  return (
    <div>
      <div
        className={
          tableView ? 'licensing-wrapper-expanded' : plain ? '' : 'licensing-wrapper'
        }
        id="standard"
      >
        <div className="row">
          <div className="col s12">
            <h3 className="licensing-headline">{headline}</h3>
            <div className="licensing-subheadline">{subheadline}</div>
            {buttons}
            {renderContent}
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: 'white' }}>
        <div className="row">
          <div className="col s12">{renderTableView}</div>
        </div>
      </div>
    </div>
  );
};

export default LicensingModel;
