import React from 'react';
import Button from '../Button/Button';
import './Video.scss';

const Video = props => {
  let playlist;
  let playlistButton;

  if (props.playlist) {
    playlist = (
      <div>
        {/* <div className="video-playlist-headline">Other videos you may like</div> */}
        <div className="video-playlist">
          <div className="video-playlist-item col l4">
            <iframe
                className="responsive-video"
                src="https://www.youtube.com/embed/Big_niMxQJ4"
                frameBorder="0"
                title="Introducing Signals - Free Alerting for Elasticsearch"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
            <div className="video-playlist-text">
              Introducing Signals - Free Alerting for Elasticsearch
            </div>
          </div>
          <div className="video-playlist-item col l4">
            <iframe
              className="responsive-video"
              src="https://www.youtube.com/embed/qiRgy5FcsnI"
              title="Search Guard - Compliance Module"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="video-playlist-text">
              Search Guard - Compliance Module
            </div>
          </div>
          <div className="video-playlist-item col l4">
            <iframe
              className="responsive-video"
              src="https://www.youtube.com/embed/1uWGqcy5PeQ"
              frameBorder="0"
              title="Search Guard puts security first"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="video-playlist-text">
              Search Guard puts security first
            </div>
          </div>
        </div>
      </div>
    );
    playlistButton = (
      <div className="video-button">
        <Button text="see more videos" link="https://www.youtube.com/channel/UCUw93I0DHMvoA8HNQ31AeJw" target="_blank"/>
      </div>
    );
  }
  return (
    <div className="hide-on-med-and-down">
      <div
        className={
          props.playlist ? 'video-wrapper video-wrapper-long' : 'video-wrapper'
        }
      >
        <div className="row">
          <div className="video-headline">Videos</div>
           <div className="video-description">
            <div className="video-description-video">
              <iframe
                className="video-iframe-video"
                src="https://www.youtube.com/embed/ewM9glvw0E4"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="video-description-headline">
              Search Guard - Security and Alerting for Elasticsearch
            </div>

            <div className="video-description-text">
              Data breaches happen all the time and will cost your business reputation, customers, and money.
              That's why you should protect your sensitive data in Elasticsearch by using Search Guard,
              the free security and alerting suite for the Elastic stack!
            </div>
          </div>
          {playlist}
        </div>
        {playlistButton}
      </div>
    </div>
  );
};

export default Video;
