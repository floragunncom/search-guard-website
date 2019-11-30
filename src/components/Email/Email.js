import React, { useState } from 'react';
import './Email.scss';
import Button from '../Button/Button';

const Email = () => {
  const [emailSendStatus, setEmailSendStatus] = useState(false);
  // componentDidMount() {
  //   M.AutoInit();
  // }

  function onSubscribeClick(event) {
    setEmailSendStatus(true);
    event.preventDefault();
    const data = {};
    const formElements = Array.from(event.target);
    formElements.map(input => (data[input.name] = input.value));
  }

  return (
    <div>
      {emailSendStatus ? (
        <div
          className="prefooter-content-text bold"
          style={{ color: '#246E94' }}
        >
          Thank you for signing up to our newsletter!
        </div>
      ) : (
        <form onSubmit={onSubscribeClick}>
          <div className="input-field col s12 m6 l8">
            <input
              id="email"
              name="email"
              type="email"
              className="validate"
              required
            />
            <label htmlFor="email" id="email-input">
              Email address
            </label>
            <span
              className="helper-text"
              data-error="Please type in the correct format!"
            />
          </div>
          <div className="input-field col s12 m6 l4">
            <Button text="subscribe" style="default-button" />
          </div>
        </form>
      )}
    </div>
  );
};

export default Email;
