import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Button from '../../components/Button/Button';
import {initGA, PageView} from '../../components/Tracking/Tracking';

const Error = () => {

  useEffect(() => {
    initGA();
    PageView();
  }, []);

  return (
    <PageWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Search Guard | An error occurred</title>
        <link rel="canonical" href="https://search-guard.com/error/" />
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="An internal error occurred, we humpy and deeply apologize"
        />
      </Helmet>
      <div className="error-wrapper">
        <div className="row">
          <div className="col s12 m10 offset-m1 l8 offset-l2">
            <h1 className="error-warning">An error occurred</h1>
            <div className="error-text">
              It's not you, it's us!
              <br /><br />
              We are very sorry, but an error occurred. We are working on it, please try again later.
              <br />
              <br />
              We apologize deeply and humbly for the inconvenience,
              <br /><br />
              Your Search Guard team
            </div>
            <div className="error-button">
              <Button text="home" link="/" />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Error;
