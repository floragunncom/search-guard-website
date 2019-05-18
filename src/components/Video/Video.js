import React from 'react';
import ReactPlayer from 'react-player';
import Button from '../Button/Button';
import './Video.scss';

const Video = props => {
  let playlist = undefined;
  let playlistButton = undefined;

  if (props.playlist) {
    playlist = (
      <div>
        <div className="video-playlist-headline">Other videos you may like</div>
        <div className="video-playlist">
          <div className="video-playlist-item col l4">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=393C3pr2ioY"
              width="350px"
              height="208px"
            />
            <div className="video-playlist-text">
              Search Guard - Compliance Module
              </div>
          </div>
          <div className="video-playlist-item col l4">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=KWZ-J_Ab4ec"
              width="350px"
              height="208px"
            />
            <div className="video-playlist-text">
              Search Guard - Orci varius natoque penatibus et magnis dis
              parturient
              </div>
          </div>
          <div className="video-playlist-item col l4">
            <ReactPlayer
              url="https://vimeo.com/311493992"
              width="350px"
              height="208px"
            />
            <div className="video-playlist-text">
              Search Guard - Suspendisse nibh libero
            </div>
          </div>
        </div>
      </div>
    );
    playlistButton = (
      <div className="video-button">
        <Button text="see more videos" />
      </div>
    );
  }
  return (
    <div className={ props.playlist ? "video-wrapper video-wrapper-long" : "video-wrapper" }>
      <div className="row">
        <div className="video-headline">
          Video convallis condimentum lobortis
        </div>
        <div className="video-description">
          <div className="video-description-video">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=XINBvGAaowI"
              width="100%"
              height="400px"
            />
          </div>
          <div className="video-description-headline">
            Video title consectetur adipiscing elit
          </div>
          <div className="video-description-text">
            Lorem ipsum dolor sit amet, finibus, orci ut tincidunt vulputate,
            tortor erat maximus dolor, vel convallis ligula mi eu urna. Etiam
            consequat neque et ante pretium rutrum. Proin condimentum tellus ex,
            eget consectetur nunc bibendum vel. Suspendisse potenti.{' '}
          </div>
        </div>
        {playlist}
      </div>
      {playlistButton}
    </div>
  );
};

export default Video;
