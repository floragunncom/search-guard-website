import React, { useState, useEffect } from 'react';
import { initGA, Event, PageView } from '../Tracking/Tracking';
import './Email.scss';
import Button from '../Button/Button';

const Email = () => {
  useEffect(() => {
    initGA();
    PageView();
  }, []);

  const [emailSendStatus, setEmailSendStatus] = useState(false);

  function onSubscribeClick(event) {
    Event('Email', 'Click on Newsletter Subscription', 'any page');
    setEmailSendStatus(true);
    event.preventDefault();
    const data = {};
    const formElements = Array.from(event.target);
    formElements.forEach(input => {
      data[input.name] = input.value;
    });
  }

  return (
          <div className="sendgrid-subscription-widget widget-2963" data-emailerror="Please enter a valid email address" data-nameerror="Please enter your name" data-checkboxerror="Please tick the box to accept our conditions">
            <form className="sg-widget" data-token="feda1502bd7eb359faa050c8c00fcd14" onSubmit="return false;">

              <div className="row">
                <div className="col s12 m6 l6">
                  <input className="sg_email" type="email" name="sg_email" placeholder="Your Email" required="required"></input>
                </div>
                <div className="col s12 m6 l6">
                  <input type="submit" className="sg-submit-btn arrow-button-default-container arrow-button-default-text" id="widget-2963" value="Subscribe"></input>
                </div>
              </div>
              <div className="row">
                <div className="col s12 m12 l12">
                  <div className="sg-response"></div>
                </div>
              </div>
            </form>
          </div>
  );
};


export default Email;
