import React, { useState } from 'react';
import './../LicensingModel/LicensingModel.scss';

import TableEditions from '../TableEditions/TableEditions';
import enterprise from '../../images/icon-enterprise.svg';
import compliance from '../../images/icon-compliance.svg';
import community from '../../images/icon-community.svg';
import academic from '../../images/icon-academic.svg';
import custom from '../../images/icon-custom.svg';
import Button from '../Button/Button';

const LicensingModel = ({ tableView, topButtons, headline, subheadline }) => {
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
              <h3 className="licensing-editions-headline">
                Community Edition for Elasticsearch
              </h3>
              <div className="licensing-editions-text-wrapper">
                <div className="licensing-editions-text">
                  TLS encryption on REST and transport
                </div>
                <div className="licensing-editions-text">
                  Role-based access control to indices
                </div>
                <div className="licensing-editions-text">
                  Fully featured Alerting module
                </div>
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
              <h3 className="licensing-editions-headline">
                Enterprise Edition for Elasticsearch
              </h3>
              <div className="licensing-editions-text-wrapper">
                <div className="licensing-editions-text">
                  Integrates with all major security standards
                </div>
                <div className="licensing-editions-text">
                  Document- and Field-Level security controls
                </div>
                <div className="licensing-editions-text">
                  Audit Logging
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
              <h3 className="licensing-editions-headline">
                Compliance Edition for Elasticsearch
              </h3>
              <div className="licensing-editions-text-wrapper">
                <div className="licensing-editions-text">
                  Designed for meeting compliance regulations
                </div>
                <div className="licensing-editions-text">
                  Field anonymization
                </div>
                <div className="licensing-editions-text">
                  Record read and write access to data
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
              <div className="licensing-editions-headline">
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
              <div className="licensing-editions-headline">
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
    <div>
      <div
        className={
          tableView ? 'licensing-wrapper-expanded' : 'licensing-wrapper'
        }
        id="standard"
      >
        <div className="row">
          <div className="col s12">
            <div className="licensing-headline">{headline}</div>
            <div className="licensing-subheadline">{subheadline}</div>
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
