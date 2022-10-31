import React from 'react';
import Button from '../Button/Button';
import './Video.scss';

const Video = props => {

  let playlist;
  let playlistButton;

    const videos = [
        {
            'source': 'https://www.youtube.com/embed/ZK5hC_o_vAM',
            'title': "Kibana multiple authentication",
            'description': 'Search Guard FLX supports multiple authentication methods for Kibana, so users can choose how they would like to authenticate.'
        },
        {
            'source': 'https://www.youtube.com/embed/whNdYp9dhJU',
            'title': "Using sgctl to configure security",
            'description': 'How to use the sgctl command line interface to change the security configuration of an Elasticsearch cluster.'
        },
        {
            'source': 'https://www.youtube.com/embed/sq87TJBMlLM',
            'title': "Generate TLS certificates for Elasticsearch",
            'description': 'How to use the Search Guard TLS Tool to generate TLS certificates for Elasticsearch.'
        },
        {
            'source': 'https://www.youtube.com/embed/SMaxuNPc2CI',
            'title': "Monitoring Elasticsearch by using Signals Alerting",
            'description': 'Monitoring Elasticsearch by using Signals Alerting'
        },
        {
            'source': 'https://www.youtube.com/embed/lQNauVac8tw',
            'title': "Creating Elasticsearch Watches using the Signals Blocks Mode",
            'description': 'Creating Elasticsearch Watches using the Signals Blocks Mode'
        },
        {
            'source': 'https://www.youtube.com/embed/Wqk0m8ibNnM',
            'title': "Signals Alerting for Elasticsearch: Creating a simple alert",
            'description': 'Signals Alerting for Elasticsearch: Creating a simple alert'
        },
        {
            'source': 'https://www.youtube.com/embed/TIpN413V1gQ',
            'title': "Creating Search Guard Users and Roles",
            'description': 'Creating Search Guard Users and Roles'
        },
        {
            'source': 'https://www.youtube.com/embed/gdtrphHWK7M',
            'title': "Securing Elasticsearch and Kibana with the Zero Trusted Networks approach",
            'description': 'Securing Elasticsearch and Kibana with the Zero Trusted Networks approach'
        },
        {
            'source': 'https://www.youtube.com/embed/Big_niMxQJ4',
            'title': "Introducing Signals - Free Alerting for Elasticsearch",
            'description': 'Introducing Signals - Free Alerting for Elasticsearch'
        },
    ];

    /**
     *         {
     *             'source': 'https://www.youtube.com/embed/OQqF8kJ6QKM',
     *             'title': "Keep your Elasticsearch GDPR compliant with Search Guard",
     *             'description': 'Keep your Elasticsearch GDPR compliant with Search Guard'
     *         },
     */

    if (props.playlist) {

    playlist = (
      <div class="video-playlist-wrapper">
          {videos.map((item) => (
              <div className="video-playlist-item col l4">
                  <iframe
                      className="responsive-video"
                      src={item.source}
                      title={item.title}
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                  />
                  <div className="video-playlist-text">
                      {item.description}
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
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                title="Search Guard - Security and Alerting for Elasticsearch and Kibana"
                allowFullScreen
              />
            </div>
            <div className="video-description-headline">
              Search Guard - Security and Alerting for Elasticsearch and Kibana
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
