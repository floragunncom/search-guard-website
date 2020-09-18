import React from 'react';
import { Helmet } from 'react-helmet';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import ContactFormSlimOnly from "../../components/ContactFormSuperSlimOnly";
import './NotFound.scss';

const NotFound = () => {
  return (
    <PageWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>404 - Page not found</title>
        <link rel="canonical" href="https://search-guard.com/404.html" />
        <meta
          name="description"
          content="The page you tried to access could not be found."
        />
      </Helmet>
      <div className="notfound-wrapper">
        <div className="row">
          <div className="col s12 m10 offset-m1 l8 offset-l2">
            <div className="notfound-warning">We're sorry ...</div>
            {/* <div className="notfound-headline">This unfortunately did not work</div> */}
            <div className="notfound-text">
              The page you are looking for was moved, removed, renamed or might
              have never existed.
              <br /><br />
              Maybe you want to try out one of the following pages:
            </div>

            <div className="notfound-text-list">
              <ul>
                <li><a href="/security/">Search Guard Security</a></li>
                <li><a href="/alerting/">Search Guard Alerting</a></li>
                <li><a href="/blog/">Search Guard Blog</a></li>
                <li><a href="/faq/">Search Guard FAQ</a></li>
                <li><a href="https://docs.search-guard.com" target="_blank" rel="noopener noreferrer">Search Guard Documentation</a></li>
              </ul>
            </div>

            <div className="col s12 l12">
              <div>
                <div className="flex-center notfound-headline">
                  Any Questions? Drop us a line!
                </div>
              </div>
              <ContactFormSlimOnly/>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default NotFound;
