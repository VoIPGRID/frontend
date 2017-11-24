import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import './sass/styles.css';
import ErrorBoundry from './components/ErrorBoundry/';
import VoIPGRID from './components/VoIPGRID/';
import history from './utils/history';
import './lib/globalHelpers';

render(
  <ErrorBoundry>
    <Router history={history}>
      <VoIPGRID />
    </Router>
  </ErrorBoundry>,
  document.getElementById('root')
);
