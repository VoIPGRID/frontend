import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-redux-multilingual'
import PrivateRoute from './components/base/PrivateRoute';

import reducers from './reducers/RootReducer';
import translations from './translations/translations';

import './assets/style/base.css';
import './assets/vendor/fontawesome/css/font-awesome-core.css';
import './assets/vendor/fontawesome/css/font-awesome-solid.css';

import Login from './components/base/Login';
import Header from './components/base/Header';
import LogoutMessage from './components/base/LogoutMessage';

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
    AsyncUserProfileForm,
} from './components/helpers/AsyncComponents';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

const store = createStoreWithMiddleware(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);

store.dispatch({
    locale: window.__STORE__.user.language,
    type: 'SET_LOCALE',
})

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider translations={translations} locale={window.__STORE__.user.language}>
            <BrowserRouter>
                <div className="base-body">
                    <Route exact path="/user/logout" component={LogoutMessage} />
                    <AsyncNotification />
                    <PrivateRoute component={Header} />
                    <PrivateRoute path="/:type?/:id?" component={AsyncNavigation} />

                    <section className="section">
                        <div>
                            <Switch>
                                <Route exact path="/login" component={Login} />
                                <PrivateRoute path="/partners/create" component={AsyncPartnerForm} />
                                <PrivateRoute path="/clients/:clientId/admin/" component={AsyncClientAdmin} />
                                <PrivateRoute path="/clients/:clientId/phoneaccount/" component={AsyncVoipAccounts} />
                                <PrivateRoute path="/clients/:clientId/users/" component={AsyncClientUserList} />
                                <PrivateRoute
                                    path="/partners/:partnerId/clients/:clientId/edit"
                                    component={AsyncClientForm}
                                />
                                <PrivateRoute path="/partners/:partnerId/edit" component={AsyncPartnerForm} />
                                <PrivateRoute path="/partners/:partnerId/clients/" component={AsyncClientList} />
                                <PrivateRoute exact path="/partners" component={AsyncPartnerList} />
                                <PrivateRoute exact path="/clients" component={AsyncClientList} />
                                <PrivateRoute path="/user/personal_settings" component={AsyncUserProfileForm} />
                            </Switch>
                        </div>
                    </section>
                </div>
            </BrowserRouter>
        </IntlProvider>
    </Provider>,
    document.querySelector('#app')
);
