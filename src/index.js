import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './lib/i18n';
import './sass/styles.css';
import ErrorBoundry from './components/ErrorBoundry/';
import VoIPGRID from './components/VoIPGRID/';
import history from './utils/history';
import './lib/globalHelpers';

render(
  <ErrorBoundry>
    <I18nextProvider i18n={i18n}>
      <Router history={history}>
        <VoIPGRID />
      </Router>
    </I18nextProvider>
  </ErrorBoundry>,
  document.getElementById('root')
);
