import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, hydrate } from 'react-dom';
import BlogContextProvider from './contexts/BlogContext';
import Routes from './Routes';
import './index.scss';

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  hydrate(
    <BlogContextProvider>
      <Router>
        <Routes />
      </Router>
    </BlogContextProvider>,
    rootElement,
  );
} else {
  render(
    <BlogContextProvider>
      <Router>
        <Routes />
      </Router>
    </BlogContextProvider>,
    rootElement,
  );
}
