import React from 'react';
import './Journey.scss';

const Journey = () => {
  const timelineContent = [
    {
      year: 2013,
      events: [
        {
          headline: 'October',
          text: 'Elasticsearch Security Plugin by Hendrik Saly',
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
      year: 2016,
      events: [
        {
          headline: 'October',
          text: 'Elasticsearch Security Plugin by Hendrik Saly',
        },
      ],
    },
    {
      year: 2017,
      events: [
        {
          headline: 'March',
          text: 'Etiam vitae dolor eu felis porttitor placerat',
        },
        {
          headline: 'May',
          text: 'Etiam vitae dolor eu felis porttitor placerat',
        },
        {
          headline: 'November',
          text: 'Etiam vitae dolor eu felis porttitor placerat',
        },
      ],
    },
    {
      year: 2018,
      events: [
        {
          headline: 'March',
          text: 'Etiam vitae dolor eu felis porttitor placerat',
        },
        {
          headline: 'May',
          text: 'Etiam vitae dolor eu felis porttitor placerat',
        },
        {
          headline: 'November',
          text: 'Etiam vitae dolor eu felis porttitor placerat',
        },
      ],
    },
    {
      year: 2019,
      events: [
        {
          headline: 'March',
          text: 'Etiam vitae dolor eu felis porttitor placerat',
        },
        {
          headline: 'May',
          text: 'Etiam vitae dolor eu felis porttitor placerat',
        },
        {
          headline: 'November',
          text: 'Etiam vitae dolor eu felis porttitor placerat',
        },
      ],
    },
  ];
  return (
    <div className="journey-wrapper" id="timeline">
      <div className="row">
        <div className="journey-headline"> The Search Guard Journey </div>
        <div className="journey-timeline-wrapper">
          <section className="timeline">
            <ul>
              {timelineContent.map((event, index) => {
                return (
                  <li>
                    <div
                      className="content"
                      // ref={ref => { this.allContentRefs.push(ref) }}
                      // id={`${index}`}
                    >
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

export default Journey;
