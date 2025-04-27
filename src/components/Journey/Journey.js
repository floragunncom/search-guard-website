import React, {useRef} from 'react';
import './Journey.scss';


const Journey = () => {
  const timelineContent = [
    {
      year: 2025,
      events: [
        {
          headline: 'March',
          text: 'First technical preview of our Encryption at Rest plugin'
        },
        {
          headline: 'February',
          text: 'We start to work on our Anomaly Detection Feature'
        },
        {
          headline: 'January',
          text: 'Search Guard FLX 3.0.3 released'
        },
      ],
    },
    {
      year: 2024,
      events: [
        {
          headline: 'November',
          text: 'Sponsored the OSMC conference and presented the latest Search Guard FLX features'
        },
        {
          headline: 'November',
          text: 'Search Guard FLX 3.0.0 released'
        },
        {
          headline: 'June',
          text: 'We are Sponsors of the Berlin Buzzwords Conference'
        },
        {
          headline: 'May',
          text: 'Search Guard FLX 2.0.0 released'
        },
        {
          headline: 'February',
          text: 'First technical preview of our Automated Index Management Feature'
        },
        {
          headline: 'January',
          text: 'Search Guard FLX 1.5.0 released'
        },
      ],
    },
    {
      year: 2023,
      events: [
        {
          headline: 'December',
          text: 'We conclude a year of growth, new team additions and a lot of releases and improvements. '
        },
        {
          headline: 'October',
          text: 'Our company offsite brings together the complete Search Guard team from Europe, USA and Latin America'
        },
        {
          headline: 'August',
          text: 'Search Guard FLX 1.3.0 released which brings new Audit Logging features'
        },
        {
          headline: 'June',
          text: 'Search Guard FLX 1.2.0 released with a lot of Signals improvements and features'
        },
        {
          headline: 'February',
          text: 'Search Guard FLX 1.1.1 for Elasticsearch 8.6.x released'
        },
      ],
    },
    {
      year: 2022,
      events: [
        {
          headline: 'Dec',
          text: 'We celebrate the 10th anniversary of floragunn'
        },
        {
          headline: 'Dec',
          text: 'Search Guard FLX 1.1.1 for Elasticsearch 7.17.8 and 8.5.0 released'
        },
        {
          headline: 'Nov',
          text: 'We sponsored and attended the OSMC conference in Nuremberg'
        },
        {
          headline: 'sep',
          text: 'Search Guard FLX for Elasticsearch 8 released'
        },
        {
          headline: 'Aug',
          text: 'Search Guard FLX GA released.'
        },
        {
          headline: 'Jun',
          text: 'Search Guard FLX Beta 2 for Elasticsearch released'
        },
        {
          headline: 'Jun',
          text: 'Working on Search Guard for Elasticsearch 8. Search Guard 8 will be based on the Search Guard FLX codebase.'
        },

        {
          headline: 'May',
          text: 'Search Guard FLX Beta 1 for Elasticsearch and OpenSearch released'
        },
        {
          headline: 'February',
          text: 'Released a new technical preview for the next generation of Search Guard which also supports OpenSearch.'
        },
      ],
    },
    {
      year: 2021,
      events: [
        {
          headline: 'December',
          text: 'We end the year with the infamous Log4j Vulnerabilities CVE-2021-44228, CVE-2021-45046 and CVE-2021-45105! We release Search Guard for Elasticsearch 7.16.1 and 7.16.2 which mitigates the issue'
        },
        {
          headline: 'November',
          text: 'Sponsoring the Open Source Monitoring Conference (OSMC) in Nuremberg for the second time. We held a talk entitled, "An introduction to OpenSearch and its impact on FOSS".'
        },
        {
          headline: 'October',
          text: 'Attended our first in person conference of the year, B-Boost in La Rochelle, France. Picture perfect weather with like minded people - what more could we ask for in a two day event. '
        },
        {
          headline: 'September',
          text: 'Search Guard for OpenSearch is here! We have published a pre-release version that we would love you to test!'
        },
        {
          headline: 'August',
          text: 'We started to work on the next major version of Search Guard, introducing a plethora of improvements and fixes.'
        },
        {
          headline: 'July',
          text: 'Published a cumulative bugfix release that backports many fixes down to Elasticsearch 7.4.0'
        },
        {
          headline: 'June',
          text: 'Announced LTS support for Elasticsearch 7.10.2, the last version that is available under Apache2 license.'
        },
        {
          headline: 'May',
          text: 'Started to work on a new Kibana Session Management architecture based on the Search Gaurd Token Service.'
        },
        {
          headline: 'March',
          text: 'Kubernetes Support: Search Guard Helm Charts are now available.'
        },
        {
          headline: 'March',
          text: 'Released major improvements to Signals Alerting, improving the stability and footprint when running a lot of watches.'
        },
        {
          headline: 'February',
          text: 'New API Auth Token Service released which allows for creating individual access tokens for users.'
        },
      ],
    },
    {
      year: 2020,
      events: [
        {
          headline: 'September',
          text: 'Released Search Guard v45 which includes attribute based access control'
        },
        {
          headline: 'August',
          text: 'Meet us at the virtual BlackHat conference.'
        },
        {
          headline: 'July',
          text: 'Released Search Guard v43 which includes TLS certificate hot reload'
        },
        {
          headline: 'June',
          text: 'Added dynamic salts for field anonymization and attachement support for Alerting Email actions'
        },
        {
          headline: 'May',
          text: 'Introduced user filters, IP filters and JWT nested keys'
        },
        {
          headline: 'February',
          text: 'Meet us at the RSA conference San Francisco, booth 2450'
        },
        {
          headline: 'January',
          text: 'Signals Alerting for Elasticsearch GA released'
        },
        {
          headline: 'January',
          text: 'Andreas Riedel joins as CEO'
        }
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

  const documentRef = useRef(document); // document here is window.document
  documentRef.current.addEventListener("DOMContentLoaded", () => {

    var elements = document.querySelectorAll('.collapse-header');

    elements.forEach((element) => {
      element.addEventListener('click', () => {
        var collapseBody = element.nextSibling
        var icon = element.querySelector("#icon")
        if (collapseBody.classList.contains("hidden")) {
          // up and down arrow
          icon.innerHTML = "keyboard_arrow_down";
          collapseBody.classList.remove("hidden");
          setTimeout(() => {
            collapseBody.classList.add("fadein");
            collapseBody.classList.remove("hidden");
          }, "100");
        } else {
          // up and down arrow
          icon.innerHTML = "keyboard_arrow_up";
          collapseBody.classList.remove("fadein");
          setTimeout(() => {
            collapseBody.classList.add("hidden");
          }, "200");
        }
      });
    });
  });

  return (
    <div className="journey-wrapper color-schema-light" id="journey">
      <div className="row">
        <h3 className="journey-headline"> The Search Guard Journey </h3>
        <div className="journey-timeline-wrapper">
          <section className="timeline">
            <ul>
              {timelineContent.map((event, index) => {
                return (
                  <li key={index}>
                    <div className="content no-hide">
                      <h2 className="collapse-header">
                        <time>{event.year}</time><i id="icon" className="material-icons">{`${index > 1 ? "keyboard_arrow_up" : "keyboard_arrow_down"}`}</i>
                      </h2>
                      <p className={`details ${index > 1 ? "hidden" : "show fadein"}`}>
                        {event.events.map(content => {
                          return (
                            <div key={content.text} >
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
