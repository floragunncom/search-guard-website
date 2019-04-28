import React, { Component } from 'react';
import './LicensingModel.scss';
import enterprise from '../../images/icon-enterprise.svg';
import compliance from '../../images/icon-compliance.svg';
import community from '../../images/icon-community.svg';
import academic from '../../images/icon-academic.svg';
import custom from '../../images/icon-custom.svg';
import Button from '../Button/Button';

class LicensingModel extends Component {
  state = {
    standardButton: true,
  };

  onButtonPress() {
    const standardButton = !this.state.standardButton;
    this.setState({ standardButton });
    console.log(standardButton);
  }

  renderContent() {
    if (this.state.standardButton) {
      return <div className="licensing-editions-wrapper">
        <div className="row">
          <div className="col s12 l4 licensing-right-border">
            <div className="licensing-edition">
              <div className="licensing-editions-icon">
                <img
                  src={community}
                  alt="icon"
                  className="licensing-icon"
                />
              </div>
              <div className="licensing-editions-headline community-border">
                Community edition
              </div>
              <div className="licensing-editions-text-wrapper">
                <div className="licensing-editions-text">
                  Covers all your basic security needs
                </div>
                <div className="licensing-editions-text">
                  Free of charge
                </div>
                <div className="licensing-editions-text">
                  Integrated with the entire Elastic Stack
                </div>
              </div>
              <div className="licensing-editions-button">
                <Button text="get a quote" style="ghost-link" />
              </div>
            </div>
          </div>
          <div className="col s12 l4 licensing-right-border">
            <div className="licensing-edition">
              <div className="licensing-editions-icon">
                <img
                  src={enterprise}
                  alt="icon"
                  className="licensing-icon"
                />
              </div>
              <div className="licensing-editions-headline enterprise-border">
                Enterprise edition
              </div>
              <div className="licensing-editions-text-wrapper">
                <div className="licensing-editions-text">
                  Integrates with major security standards e.g. Active
                  Directory
                </div>
                <div className="licensing-editions-text">
                  Control access to data to document and field level
                </div>
                <div className="licensing-editions-text">
                  Professional management API and Kibana multitenancy
                </div>
              </div>
              <div className="licensing-editions-button">
                <Button
                  text="get a quote"
                  style="ghost-link"
                  color="#00C9B7"
                />
              </div>
            </div>
          </div>
          <div className="col s12 l4 licensing-right-border">
            <div className="licensing-edition">
              <div className="licensing-editions-icon">
                <img
                  src={compliance}
                  alt="icon"
                  className="licensing-icon"
                />
              </div>
              <div className="licensing-editions-headline compliance-border">
                Compliance edition
              </div>
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
                  text="install now"
                  style="ghost-link"
                  color="#00B0A0"
                />
              </div>
            </div>
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
                <Button text="see all license models" />
              </div>
            </div>
          </div>
        </div>
      </div>
    } else {
      return <div className="licensing-editions-wrapper">
        <div className="row">
          <div className="col s12 l6 licensing-right-border">
            <div className="licensing-edition">
              <div className="licensing-editions-icon">
                <img
                  src={academic}
                  alt="icon"
                  className="licensing-icon"
                />
              </div>
              <div className="licensing-editions-headline academic-border">
                Academic & Scientific edition
              </div>
              <div className="licensing-editions-text-wrapper">
                <div className="licensing-editions-text">
                  Etiam vitae dolor eu felis porttitor
                </div>
                <div className="licensing-editions-text">
                  In quam neque
                </div>
                <div className="licensing-editions-text">
                  Quisque ut eros sit amet ex convallis condimentum lobortis eu ante
                </div>
              </div>
              <div className="licensing-editions-button">
                <Button
                  text="find out more"
                  style="ghost-link"
                  color="#63737E"
                  width="200px"
                />
              </div>
            </div>
          </div>
          <div className="col s12 l6 licensing-right-border">
            <div className="licensing-edition">
              <div className="licensing-editions-icon">
                <img
                  src={custom}
                  alt="icon"
                  className="licensing-icon"
                />
              </div>
              <div className="licensing-editions-headline custom-border">
                Custom edition
              </div>
              <div className="licensing-editions-text-wrapper">
                <div className="licensing-editions-text">
                  Integer fermentum et ipsum
                </div>
                <div className="licensing-editions-text">
                  Nunc eu augue ullamcorper, ornare nibh maximus
                </div>
                <div className="licensing-editions-text">
                  Amet ex convallis condimentum lobortis eu ante
                </div>
              </div>
              <div className="licensing-editions-button">
                <Button
                  text="find out more"
                  style="ghost-link"
                  color="#246E94"
                  width="200px"
                  />
              </div>
            </div>
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
                <Button text="see all license models" />
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  }

  render() {
    return (
      <div className="licensing-wrapper">
        <div className="row">
          <div className="licensing-headline">Licensing headline</div>
          <div className="licensing-buttons">
            <div
              className={this.state.standardButton ? 'licensing-button-active' : 'licensing-button'}
              onClick={() => this.onButtonPress()}
            >
              standard edition
            </div>
            <div
              className={this.state.standardButton ? 'licensing-button' : 'licensing-button-active'}
              onClick={() => this.onButtonPress()}
            >
              academic & custom
            </div>
          </div>
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

export default LicensingModel;
