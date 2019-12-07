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
    <div id="videos" className="hide-on-med-and-down">
      <div
        className={
          props.playlist ? 'video-wrapper video-wrapper-long' : 'video-wrapper'
        }
      >
        <div className="row">
          <div className="video-headline">Instructional videos</div>
          {/* <div className="video-description">
            <div className="video-description-video">
              <iframe
                className="video-iframe-video"
                src="https://www.youtube.com/embed/0vCqFtFd5B8"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="video-description-headline">
              Search Guard - Open Source Software
            </div>
            <div className="video-description-text">
              Security-related software has to be Open Source by definition.
              Since it is such a crucial and sensitive part of your
              infrastructure, you need to be able to inspect, audit and compile
              the code yourself. The complete code of Search Guard has always
              been openly available, and will always be.
            </div>
          </div> */}
          {playlist}
        </div>
        {playlistButton}
      </div>
    </div>
  );
};

export default Video;
