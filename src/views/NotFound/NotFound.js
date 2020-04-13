import React from 'react';
import { Helmet } from 'react-helmet';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Button from '../../components/Button/Button';
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
            <div className="notfound-warning">404</div>
            <div className="notfound-headline">Something is wrong!</div>
            <div className="notfound-text">
              The page you are looking for was moved, removed, renamed or might
              have never existed.
            </div>
            <div className="notfound-button">
              <Button text="home" link="/" />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default NotFound;
