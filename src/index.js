import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import Routes from './Routes';


const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  hydrateRoot(
    rootElement,
    <HelmetProvider>
      <Router>
        <Routes />
      </Router>
    </HelmetProvider>,
  );
} else {
  createRoot(rootElement).render(
    <HelmetProvider>
      <Router>
        <Routes />
      </Router>
    </HelmetProvider>,
  );
}
