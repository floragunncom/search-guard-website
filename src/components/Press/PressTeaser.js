import React from 'react';
import Button from '../Button/Button';
import './PressTeaser.scss';
import alerting from "../../images/press_teaser_alerting.png";
import tmahler from "../../images/tmahler_press.jpg";
import {LazyLoadImage} from "react-lazy-load-image-component";

const PressTeaser = () => {

  return (
    <div className="company-press-teaser-wrapper" id="press-teaser">
      <div className="row company-press-teaser">
        <div className="company-press-teaser-headline">Press</div>


        <div className="company-press-teaser-section">
          <div className="press-teaser-pic">
            <LazyLoadImage
                src={alerting}
            />
          </div>
          <div className="press-teaser-content">
            <div className="press-teaser-content-headline">
              Current release of Search Guard with new standard "Signals" function
            </div>
            <div className="press-teaser-content-text">
              Berlin, 07/23/2020. ​As of the current release version 7.x-42.0.0, Search Guard contains the new standard function "Signals".
              The alerting and monitoring feature helps IT administrators  detect deviations and conspicuous
              changes in data stored in elasticsearch clusters. The more sensitive the data stored in the cluster, the more
              important it is to quickly detect abnormalities and prioritize them correctly. To do this, IT
              management needs an alerting strategy.
            </div>
            <div className="press-teaser-content-button">
              <Button
                  text="English"
                  link="/press/en/search-guard-alerting/"
                  rel="noopener norefferrer"
                  buttonStyle="loud-link"
              />
              &nbsp;&nbsp;
              <Button
                  text="German"
                  link="/press/de/search-guard-alerting/"
                  rel="noopener norefferrer"
                  buttonStyle="loud-link"
              />

            </div>
          </div>
        </div>

            <div className="company-press-teaser-section">
              <div className="press-teaser-pic">
                <LazyLoadImage
                    src={tmahler}
                />
              </div>
              <div className="press-teaser-content">
                <div className="press-teaser-content-headline">
                  Search Guard expands sales activities in DACH
                </div>
                <div className="press-teaser-content-text">
                  Berlin, 06/29/2020. floragunn GmbH, manufacturer of the security plug-in Search Guard, based in Berlin, is strengthening
                  its business activities in the German-speaking market. Software resellers and distributors in Germany, Austria and Switzerland
                  who want to expand their portfolio in the area of Big Data Security with a user-friendly solution now have a direct person to contact.
                </div>
                <div className="press-teaser-content-button">
                  <Button
                    text="English"
                    link="/press/en/search-guard-sales-dach/"
                    rel="noopener norefferrer"
                    buttonStyle="loud-link"
                  />
                  &nbsp;&nbsp;
                  <Button
                      text="German"
                      link="/press/de/search-guard-vertrieb-dach/"
                      rel="noopener norefferrer"
                      buttonStyle="loud-link"
                  />

                </div>
              </div>
            </div>

      </div>
    </div>
  );
};

export default PressTeaser;
