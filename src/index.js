import React from 'react';
import './index.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

if (rootElement.hasChildNodes()) {
  root.hydrate(
    <Router>
      <Routes />
    </Router>,
  );
} else {
  root.render(
    <Router>
      <Routes />
    </Router>,
  );
}
