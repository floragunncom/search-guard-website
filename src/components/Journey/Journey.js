import React, { Component } from 'react';
import './Journey.scss';

class Journey extends Component {
  state = {
    showH1: false,
  };

  onInViewChange = inview => {
    if (!this.state.showH1 && inview) this.setState({ showH1: true });
    console.log('inview, this.state.showH1', inview, this.state.showH1)
  };
  
  render() {
    const timelineContent = [
      {
        year: 2019,
        events: [
          {
            headline: 'March',
            text: 'We present Search Guard at the Intersec conference in Dubai',
          },
          {
            headline: 'January',
            text: 'Hendrik Saly joins Search Guard as our new CTO',
          },
          {
            headline: 'March',
            text:
              'We present Search Guard at the RSA conference in San Franciso',
          },
          {
            headline: 'April',
            text: 'Search Guard 7 was released',
          },
          {
            headline: 'May',
            text: 'We begin working on Signals - Insights for Elasticsearch',
          },
          {
            headline: 'March',
            text:
              'We present Search Guard at the Infosecurity conference in London',
          },
          {
            headline: 'August',
            text: 'We released Kibana role based access control',
          },
        ],
      },
      {
        year: 2018,
        events: [
          {
            headline: 'February',
            text:
              'TLS Tool for easy creation of production ready TLS certificates released',
          },
          {
            headline: 'April',
            text:
              'We presented Search Guard at the RSA conference in San Francisco',
          },
          {
            headline: 'May',
            text: 'We added SAML and OpenID support',
          },
          {
            headline: 'June',
            text: 'First Search Guard global offsite',
          },
          {
            headline: 'August',
            text:
              'We visit our business partners in Mexico City, New York, Washington and Seattle.',
          },
          {
            headline: 'November',
            text: 'We participate in the Open Source conference in Bordeaux.',
          },
        ],
      },
      {
        year: 2017,
        events: [
          {
            headline: 'January',
            text: 'The Search Guard Kibana plugin was officially released.',
          },
          {
            headline: 'April',
            text: 'We presented Search Guard at the Big Data Paris conference',
          },
          {
            headline: 'December',
            text: 'Search Guard 6 was released',
          },
        ],
      },
      {
        year: 2016,
        events: [
          {
            headline: 'June',
            text: 'Search Guard 2 released',
          },
          {
            headline: 'November',
            text:
              'Search Guard released, including Audit Logging and the new REST management API.',
          },
        ],
      },
      {
        year: 2015,
        events: [
          {
            headline: 'January',
            text: 'Elastic Defender by Hendrik Saly',
          },
          {
            headline: 'May',
            text:
              'Elastic Defender released as Search Guard 1.x TLS is mandatory',
          },
          {
            headline: 'Spring/ Summer',
            text: 'Search Guard 1.x for Elasticsearch 1.x released on GitHub',
          },
          {
            highlight: 'Source code is available',
          },
          {
            headline: 'Winter',
            text:
              'Search Guard SSL for Elasticsearch 2.2.0 was officially released',
          },
        ],
      },
      {
        year: 2014,
        events: [
          {
            text:
              'Work on Search Guard, called Elastic Defender back then, started.',
          },
        ],
      },
      {
        year: 2013,
        events: [
          {
            headline: 'October',
            text: 'Elasticsearch Security Plugin by Hendrik Saly',
          },
        ],
      },
    ];

    return (
      <div className="journey-wrapper" id="journey">
        <div className="row">
          <div className="journey-headline"> The Search Guard Journey </div>
          <div className="journey-timeline-wrapper">
            <section className="timeline">
              <ul>
                {timelineContent.map(event => {
                  return (
                    <li>
                      <div className="content">
                        <h2>
                          <time>{event.year}</time>
                        </h2>
                        <p>
                          {event.events.map(content => {
                            return (
                              <div>
                                <div id="headline">{content.headline}</div>
                                <div id="text">{content.text}</div>
                                {content.highlight !== undefined ? (
                                  <div id="highlight">{content.highlight}</div>
                                ) : (
                                  ''
                                )}
                              </div>
                            );
                          })}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default Journey;
