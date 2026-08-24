import React from 'react';
import Button from '../Button/Button';


const Video = ({ playlist: showPlaylist, videos: allVideos = [] }) => {

  let playlist;
  let playlistButton;

    let videos = allVideos.filter(video => video.fields.displayOnVideoOverviewPage === true);
    let featuredVideo = allVideos.filter(video => video.fields.displayAsFeaturesVideo === true)[0];

    if (showPlaylist) {

    playlist = (
      <div className="video-playlist-wrapper">
          {videos.map((item, index) => (
              <div className="video-playlist-item col l4" key={index}>
                  <iframe
                      className="responsive-video"
                      src={item.fields.embedUrl}
                      title={item.fields.title}
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                  />
                  <div className="video-playlist-text">
                      {item.fields.shortDescription}
                  </div>
              </div>
          ))}
      </div>
    );

    playlistButton = (
      <div className="video-button">
        <Button text="Visit our channel" link="https://www.youtube.com/channel/UCUw93I0DHMvoA8HNQ31AeJw" target="_blank"/>
      </div>
    );
  }
  if (!featuredVideo) return null;

  return (
    <div className="hide-on-med-and-down">
      <div
        className={
          showPlaylist ? 'video-wrapper video-wrapper-long' : 'video-wrapper'
        }
      >
        <div className="row">
          <h3 className="video-headline">Videos</h3>
           <div className="video-description">
            <div className="video-description-video">
              <iframe
                className="video-iframe-video"
                src={featuredVideo.fields.embedUrl}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                title="Search Guard - Security and Alerting for Elasticsearch and Kibana"
                allowFullScreen
              />
            </div>
            <div className="video-description-headline">
                {featuredVideo.fields.title}
            </div>

            <div className="video-description-text">
                {featuredVideo.fields.description}
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
