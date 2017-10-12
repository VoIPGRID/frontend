import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { IntlProvider } from 'react-redux-multilingual';
import PrivateRoute from './components/base/PrivateRoute';

// Main reducer and translations file.
import reducers from './reducers/RootReducer';
import translations from './translations/translations';

// Assets for our generic app styling.
import './assets/style/base.css';
import './assets/vendor/fontawesome/css/font-awesome-core.css';
import './assets/vendor/fontawesome/css/font-awesome-solid.css';

// Small pure components, that do not necessarily need to be loaded async.
import Login from './components/base/Login';
import Header from './components/base/Header';
import Breadcrumbs from './components/base/Breadcrumbs';
import LogoutMessage from './components/base/LogoutMessage';

import SetTheme from './components/helpers/SetTheme';

// Async components. These are to setup code splitting (chunks) for Webpack 2.
// This speeds up load time of the bundle because it can load different
// JS files at the right time, instead of loading one big bundle.
import {
  AsyncNotification,
  AsyncNavigation,
  AsyncPartnerForm,
  AsyncClientAdmin,
  AsyncVoipAccounts,
  AsyncClientUserList,
  AsyncClientForm,
  AsyncClientList,
  AsyncPartnerList,
  AsyncUserProfileForm
} from './components/helpers/AsyncComponents';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStoreWithMiddleware(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

// Dispatch default language on load, this retrieves the logged in user
// language and sets it in the store.
store.dispatch({
  locale: window.__STORE__.user.language,
  type: 'SET_LOCALE'
});

export const App = () => (
  <IntlProvider
    translations={translations}
    locale={window.__STORE__.user.language}
  >
    <SetTheme>
      <BrowserRouter>
        <div className="base-body">
          <Route exact path="/user/logout" component={LogoutMessage} />
          <AsyncNotification />
          <PrivateRoute component={Breadcrumbs} />
          <PrivateRoute component={Header} />
          <PrivateRoute path="/:type?/:id?" component={AsyncNavigation} />

          <section className="section">
            <div>
              <Switch>
                <Redirect from="/" exact to="/partners" />

                <Route exact path="/login" component={Login} />
                <PrivateRoute
                  path="/partners/create"
                  component={AsyncPartnerForm}
                />

                <PrivateRoute
                  exact
                  path="/partners/:partnerId/clients/:clientId/admin/"
                  component={AsyncClientAdmin}
                />

                <PrivateRoute
                  path="/partners/:partnerId/clients/:clientId/phoneaccount/"
                  component={AsyncVoipAccounts}
                />

                <PrivateRoute
                  exact
                  path="/partners/:partnerId/clients/:clientId/users/"
                  component={AsyncClientUserList}
                />

                <PrivateRoute
                  exact
                  path="/partners/:partnerId/clients/:clientId/edit"
                  component={AsyncClientForm}
                />

                <PrivateRoute
                  exact
                  path="/partners/:partnerId/edit"
                  component={AsyncPartnerForm}
                />
                <PrivateRoute
                  staticName={true}
                  exact
                  path="/partners/:partnerId/clients/"
                  component={AsyncClientList}
                />
                <PrivateRoute
                  exact
                  path="/partners"
                  component={AsyncPartnerList}
                />
                <PrivateRoute
                  exact
                  path="/clients"
                  component={AsyncClientList}
                />
                <PrivateRoute
                  exact
                  path="/user/personal_settings"
                  component={AsyncUserProfileForm}
                />
              </Switch>
            </div>
          </section>
        </div>
      </BrowserRouter>
    </SetTheme>
  </IntlProvider>
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#app')
);
