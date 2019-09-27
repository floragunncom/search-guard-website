import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-snapshot';
import Routes from './Routes';
import './index.scss';

render(
  <Router onUpdate={() => window.scrollTo(0, 0)}>
    <Routes />
  </Router>,
  document.getElementById('root'),
);
