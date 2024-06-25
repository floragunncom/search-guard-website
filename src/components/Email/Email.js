import React from 'react';
import './Email.scss';


const Email = () => {


  return (
          <div className="sendgrid-subscription-widget widget-2963" data-emailerror="Please enter a valid email address" data-nameerror="Please enter your name" data-checkboxerror="Please tick the box to accept our conditions">
            <form className="sg-widget" data-token="feda1502bd7eb359faa050c8c00fcd14" >

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
