import React, { Component } from 'react';
import './LicensingModel.scss';
import TableEditions from '../../components/TableEditions/TableEditions';
import enterprise from '../../images/icon-enterprise.svg';
import compliance from '../../images/icon-compliance.svg';
import community from '../../images/icon-community.svg';
import academic from '../../images/icon-academic.svg';
import custom from '../../images/icon-custom.svg';
import Button from '../Button/Button';

class LicensingModel extends Component {
  state = {
    standardButton: true,
    tableVisible: false,
  };

  onButtonPress() {
    const standardButton = !this.state.standardButton;
    this.setState({ standardButton });
  }
  
  onBottomButtonPress() {
    const tableVisible = !this.state.tableVisible;
    this.setState({ tableVisible });
  }

  renderContent() {
    let infoButton = undefined;

    if (this.props.topButtons) {
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
            <Button text="see all license models" />
          </div>
        </div>
      );
    }
    if (this.state.standardButton) {
      return (
        <div className="licensing-editions-wrapper">
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
              {infoButton}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="licensing-editions-wrapper">
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
                    />
                </div>
              </div>
              {infoButton}
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    let buttons = undefined;
    let bottomButton = undefined;

    if (this.props.topButtons) {
      buttons = (
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
      );
    }

    if (this.props.bottomButton) {
      if (!this.state.tableVisible) {
        bottomButton = (
          <div className="licensing-bottom-button-wrapper">
            <Button text="See licensing model comparison" style="loud-button" onPress={() => this.onBottomButtonPress()} />
          </div>
        );
      } else {
        bottomButton = (
          <div className="licensing-comparison-wrapper ">
            <div className="licensing-comparison-headline" onClick={() => this.onBottomButtonPress()}>Feature breakdown</div>
            <TableEditions />
          </div>
        );
      }
    }

    return (
      <div className="licensing-wrapper" id="standard">
        <div className="row">
          <div className="col s12">
            <div className="licensing-headline">{this.props.headline}</div>
            {buttons}
            {this.renderContent()}
            {bottomButton}
          </div>
        </div>
      </div>
    );
  }
}

export default LicensingModel;
