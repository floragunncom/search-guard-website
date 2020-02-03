import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, hydrate } from 'react-dom';
import Routes from './Routes';
import './index.scss';

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  hydrate(
    <Router>
      <Routes />
    </Router>,
    rootElement,
  );
} else {
  render(
    <Router>
      <Routes />
    </Router>,
    rootElement,
  );
}
