import React from 'react';
import "./Email.scss";

const Email = () => {
  return (
    <div className="email-container">
      <input type="text" placeholder="Email address" className="email-input" />
      <div className="email-button">
        <div className="email-button-text">subscribe</div>
      </div>
    </div>
  );
}

export default Email;
