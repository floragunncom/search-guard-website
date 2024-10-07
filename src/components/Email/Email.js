import React, { useState, useEffect } from 'react';
import './Email.scss';
import Button from '../Button/Button';

const Email = () => {

    const [emailSendStatus, setEmailSendStatus] = useState(false);
    const [procesing, setProcessing] = useState(false);

   const onNewsletterSubscribeClick = async event => {
    event.preventDefault();
    setProcessing(true);
    const formValuesJson = {};
    const formData = new FormData(event.target);
    formValuesJson.email = formData.get("email");
    formValuesJson.ids = formData.getAll("ids");
    handleNewsletterSubmit(formValuesJson)
        .then(response => {
          if (response && response.ok) {
            setProcessing(false);
            setEmailSendStatus(true);
          } else {
            setProcessing(false);
            setEmailSendStatus(true);
          }
        }).catch(function (error) {
          setProcessing(false);
          setEmailSendStatus(true);
    });
  };

  async function handleNewsletterSubmit(formProps) {
    const data = {};
    // Default options are marked with *
    return fetch('https://sisag8b0fg.execute-api.eu-central-1.amazonaws.com/dev', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        accept: 'application/json; charset=utf-8',
        'content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(formProps)
    });
  }
  return (
    <div>

      {emailSendStatus ?
          (
            <div
              className="prefooter-content-text bold text-processing"
            >
              Thank you for signing up to our newsletter!
            </div>
          ) : (
          procesing ? (
                <div
                    className="prefooter-content-text bold text-processing"
                >
                  Processing
                </div>
            ) : (
                  <form onSubmit={onNewsletterSubscribeClick}>
                    <div className="input-field col s12 m6 l8">
                      <input
                          id="email"
                          name="email"
                          type="email"
                          className="validate input-field"
                          required
                      />
                      <label htmlFor="email" id="email-input">
                        Email address
                      </label>
                      <span
                          className="helper-text"
                          data-error="Please type in the correct format!"
                      />
                      <input
                          name="ids"
                          type="hidden"
                          value="9254dc87-0c97-43a8-bf7b-85a624da753e"
                      />
                    </div>
                    <div className="input-field col s12 m6 l4">
                      <Button text="subscribe" buttonStyle="light-aqua-button" type="submit"/>
                    </div>
                  </form>
            ))
      }
    </div>
  );
};


export default Email;
