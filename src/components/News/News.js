import React from 'react';
import events from '../../Api/contentfulEvents.json';
import Markdown from 'markdown-to-jsx';
import './News.scss';

const News = () => {
  return (
    <div className="news__wrapper" id="news">
      <div className="row">
        <div className="news__headline">News & Events</div>

          <div className="row">
              <div className="col s12 l8 offset-l2">
                  <div className="news-plain-headline">Search Guard FLX Beta announced</div>
                  <div>
                      <div className="news-plain-text" itemProp="text">
                          <p>
                              floragunn announces <a href="/search-guard-flx/">Search Guard FLX Beta 2</a>, the next generation of Search Guard.
                              Search Guard FLX offers a new and concise configuration format, an easy-to-use and lightweight command line administration tool
                              which replaces sgadmin, faster performance in many areas, and last but not least support for <a href="https://opensearch.org/">OpenSearch</a>.
                          </p>
                      </div>
                  </div>
              </div>
          </div>

          <div className="row">
              <div className="col s12 l8 offset-l2">
                  <div className="news-plain-headline">LTS support for Elasticsearch 7.10.2</div>
                  <div>
                      <div className="news-plain-text" itemProp="text">
                          <p>
                                floragunn announces long-term support for Elasticsearch and Kibana 7.10.2, the last versions
                                available under the Apache2 license. We will continue to backport bug fixes and security fixes to this version.
                                Users that want or need to stay on 7.10.2 can enjoy ongoing support and maintenance for Search Guard.
                          </p>
                      </div>
                  </div>
              </div>
          </div>


          <div className="row">
              <div className="col s12 l8 offset-l2">
                  <div className="news-plain-headline">Elastic license changes - no impact on Search Guard</div>
                  <div>
                      <div className="news-plain-text" itemProp="text">
                          <p>
                              Beginning of this year, Elastic has stopped releasing Elasticsearch and Kibana under the Apache2 license.
                              From 7.11.x onwards, the software is <a href="https://www.elastic.co/blog/elastic-license-v2" target="_blank">dual licensed under the SSPL and Elastic v2 license</a>.
                              These changes do not impact the usage of Search Guard
                              in any way. The license changes only apply to Elasticsearch and Kibana, and have <a href="https://www.elastic.co/pricing/faq/licensing#i’m-building-plugins-for-elasticsearch-or-kibana,-how-does-this-change-affect-me?" target="_blank">
                                  no impact on the usage of plugins like Search Guard.
                                </a>
                          </p>

                      </div>
                  </div>
              </div>
          </div>


          <div className="row">
              <div className="col s12 l8 offset-l2">
                  <div className="news-plain-headline">COVID 19 - Events</div>
                  <div>
                      <div className="news-plain-text">
                          <p>
                                Due to the ongoing COVID-19 crisis there are no events or conferences planned at the moment.
                                We will update you as soon as the situation changes. Hope to see all of you in person again very soon!
                          </p>
                      </div>
                  </div>
              </div>
          </div>


      </div>
    </div>
  );
};

export default News;
