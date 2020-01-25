import React from 'react';
import './Journey.scss';

const Journey = () => {
  const timelineContent = [
    {
      year: 2020,
      events: [
        {
          headline: 'February',
          text: 'Meet us at the RSA conference San Francisco, booth 2450',
        },
        {
          headline: 'January',
          text: 'Signals Alerting for Elasticsearch GA released',
        },
      ],
    },
    {
      year: 2019,
      events: [
        {
          headline: 'December',
          text: 'We release Signals Beta',
        },
        {
          headline: 'November',
          text: 'We present Search Guard at the Big Data World in Paris',
        },
        {
          headline: 'June',
          text:
            'We present Search Guard at the Infosecurity conference in London',
        },
        {
          headline: 'May',
          text: 'We begin working on Signals - Alerting for Elasticsearch',
        },
        {
          headline: 'April',
          text: 'Search Guard 7 was released',
        },
        {
          headline: 'March',
          text:
            'We present Search Guard at the RSA conference in San Francisco',
        },
        {
          headline: 'January',
          text: 'We present Search Guard at the Intersec conference in Dubai',
        },
      ],
    },
    {
      year: 2018,
      events: [
        {
          headline: 'December',
          text: 'Hendrik Saly joins Search Guard as our new CTO',
        },
        {
          headline: 'November',
          text: 'We participate in the Open Source conference in Bordeaux.',
        },
        {
          headline: 'August',
          text:
            'We visit our business partners in Mexico City, New York, Washington and Seattle.',
        },
        {
          headline: 'June',
          text: 'First Search Guard global offsite',
        },
        {
          headline: 'May',
          text: 'We added SAML and OpenID support',
        },
        {
          headline: 'April',
          text:
            'We presented Search Guard at the RSA conference in San Francisco',
        },
        {
          headline: 'February',
          text:
            'TLS Tool for easy creation of production ready TLS certificates released',
        },
      ],
    },
    {
      year: 2017,
      events: [
        {
          headline: 'December',
          text: 'Search Guard 6 was released',
        },
        {
          headline: 'April',
          text: 'We presented Search Guard at the Big Data Paris conference',
        },
        {
          headline: 'January',
          text: 'The Search Guard Kibana plugin was officially released.',
        },
      ],
    },
    {
      year: 2016,
      events: [
        {
          headline: 'November',
          text:
            'Search Guard 5 released, including Audit Logging and the new REST management API.',
        },
        {
          headline: 'June',
          text: 'Search Guard 2 released',
        },
      ],
    },
    {
      year: 2015,
      events: [
        {
          headline: 'Winter',
          text:
            'Search Guard SSL for Elasticsearch 2.2.0 was officially released',
        },
        {
          highlight: 'Source code is available',
        },
        {
          headline: 'Spring/ Summer',
          text: 'Search Guard 1.x for Elasticsearch 1.x released on GitHub',
        },
        {
          headline: 'May',
          text:
            'Elastic Defender released as Search Guard 1.x TLS is mandatory',
        },
        {
          headline: 'January',
          text: 'Elastic Defender by Hendrik Saly',
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
                    <div className="content no-hide">
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
};

export default Journey;
