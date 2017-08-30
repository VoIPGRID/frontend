import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-redux-multilingual'

import PrivateRoute from './components/base/PrivateRoute';

import reducers from './components/base';
import Login from './components/base/Login';
import PartnerList from './components/partners/PartnerList';
import PartnerForm from './components/partners/PartnerForm';
import ClientForm from './components/clients/ClientForm';

import ClientList from './components/clients/ClientList';
import ClientUserList from './components/clients/admin_modules/users/ClientUserList';
import VoipAccounts from './components/clients/admin_modules/voip_accounts/VoipAccounts';
import ClientAdmin from './components/clients/ClientAdmin';
import Navigation from './components/base/Navigation';
import Header from './components/base/Header';

import UserProfileForm from './components/users/UserProfileForm';
import translations from './translations/translations'

import './assets/style/base.scss';
import './assets/vendor/fontawesome/css/font-awesome-core.css';
import './assets/vendor/fontawesome/css/font-awesome-solid.css';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

const store = createStoreWithMiddleware(
    reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.dispatch({
    locale: window.__STORE__.user.language,
    type: 'SET_LOCALE',
})

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider translations={translations} locale={window.__STORE__.user.language}>
            <BrowserRouter>
                <div className="base-body">
                    <Header />
                    <Navigation />

                    <section className="section">
                        <div>
                            <Switch>
                                <Route path="/login" component={Login} />
                                <PrivateRoute path="/partners/create" component={PartnerForm} />
                                <PrivateRoute path="/clients/:clientId/admin/" component={ClientAdmin} />
                                <PrivateRoute path="/clients/:clientId/phoneaccount/" component={VoipAccounts} />
                                <PrivateRoute path="/clients/:clientId/users/" component={ClientUserList} />
                                <PrivateRoute
                                    path="/partners/:partnerId/clients/:clientId/edit"
                                    component={ClientForm}
                                />
                                <PrivateRoute path="/partners/:partnerId/edit" component={PartnerForm} />
                                <PrivateRoute path="/partners/:partnerId/clients/" component={ClientList} />
                                <PrivateRoute exact path="/partners" component={PartnerList} />
                                <PrivateRoute exact path="/clients" component={ClientList} />
                                <PrivateRoute path="/user/personal_settings" component={UserProfileForm} />
                            </Switch>
                        </div>
                    </section>
                </div>
            </BrowserRouter>
        </IntlProvider>
    </Provider>,
    document.querySelector('#app')
);
