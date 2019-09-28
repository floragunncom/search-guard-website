import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BlogContextProvider from './contexts/BlogContext';
import { render } from 'react-snapshot';
import Routes from './Routes';
import './index.scss';

render(
  <BlogContextProvider>
    <Router onUpdate={() => window.scrollTo(0, 0)}>
      <Routes />
    </Router>
  </BlogContextProvider>,
  document.getElementById('root'),
);
