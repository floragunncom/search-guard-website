import React, { Component } from 'react';
import './Email.scss';
import M from 'materialize-css';
import Button from '../Button/Button';

class Email extends Component {
  componentDidMount() {
    M.AutoInit();
  }
  render() {
    return (
      <form>
        <div className="input-field col s12 m6 l8">
          <input id="email" type="email" className="validate" />
          <label htmlFor="email" id="email-input">Email address</label>
          <span className="helper-text" data-error="Please type in the correct format!" data-success="Valid format" />
        </div>
        <div className="input-field col s12 m6 l4">
          <Button text="subscribe" style="default-button" />
        </div>
      </form>
    );
  }
}

export default Email;
