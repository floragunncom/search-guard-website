import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, hydrate } from 'react-dom';
import BlogContextProvider from './contexts/BlogContext';
import Routes from './Routes';
import './index.scss';

import {Helmet} from "react-helmet";

const rootElement = document.getElementById('root');

const BASE_URL = 'https://search-guard.com'

const Head = () => {
    const canonical = `${BASE_URL}${window.location.pathname || ''}`

    return (
        <Helmet>
            <link rel="canonical" href={canonical} />
        </Helmet>
    )
}

if (rootElement.hasChildNodes()) {
  hydrate(
    <BlogContextProvider>
      <Head />
      <Router onUpdate={() => window.scrollTo(0, 0)}>
        <Routes />
      </Router>
    </BlogContextProvider>,
    rootElement,
  );
} else {
  render(
    <BlogContextProvider>
      <Head />
      <Router onUpdate={() => window.scrollTo(0, 0)}>
        <Routes />
      </Router>
    </BlogContextProvider>,
    rootElement,
  );
}
