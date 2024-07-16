import React from 'react';
import './PreFooterAnnouncement.scss';
import Button from "../Button/Button";

const PreFooterAnnouncement = ({ headline, buttonStyle, buttonText, buttonLink, buttonTarget }) => {
  return (
    <div className="prefooter-announcement-container">
      <div className="prefooter-announcement-row">
        <div className="row">
          <div className="prefooter-announcement-content-wrapper col s12 center">
            <div className="prefooter-announcement-col-content">
              <div className="prefooter-announcement-headline">{headline}</div>
            </div>
          </div>
          <div className="prefooter-announcement-content-wrapper prefooter-announcement-button-spacer col s12 l6 push-l3 center">
            <Button
                text="View Full Documentaton"
                buttonStyle="sand-button"
                link="https://preview.search-guard.com/docs/latest/"
                target="_blank"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreFooterAnnouncement;
