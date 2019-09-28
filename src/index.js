import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, hydrate } from 'react-dom';
import BlogContextProvider from './contexts/BlogContext';
// import { render } from 'react-snapshot';
import Routes from './Routes';
import './index.scss';

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  hydrate(
    <BlogContextProvider>
      <Router onUpdate={() => window.scrollTo(0, 0)}>
        <Routes />
      </Router>
    </BlogContextProvider>,
    rootElement,
  );
} else {
  render(
    <BlogContextProvider>
      <Router onUpdate={() => window.scrollTo(0, 0)}>
        <Routes />
      </Router>
    </BlogContextProvider>,
    rootElement,
  );
}
