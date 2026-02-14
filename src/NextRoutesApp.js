import React from 'react';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import Routes from './Routes';

const NextRoutesApp = ({ location }) => {
  if (typeof window === 'undefined') {
    return (
      <StaticRouter location={location}>
        <Routes />
      </StaticRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

export default NextRoutesApp;
