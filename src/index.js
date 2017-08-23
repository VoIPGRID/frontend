import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-redux-multilingual'

import PrivateRoute from 'base/PrivateRoute';

import reducers from 'base';
import Login from 'base/Login';
import PartnerList from 'partners/PartnerList';
import PartnerForm from 'partners/PartnerForm';

import ClientList from 'clients/ClientList';
import Navigation from 'base/Navigation';

import UserProfileForm from './users/UserProfileForm';

import translations from './translations/translations'


import './assets/style/base.scss';
import './assets/vendor/fontawesome/css/font-awesome-core.css';
import './assets/vendor/fontawesome/css/font-awesome-regular.css';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.dispatch({
    type: 'SET_LOCALE',
    locale: window.__INITIAL_STATE__.language 
})

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider translations={translations} locale='nl'>
            <BrowserRouter>
                <div>
                    <Navigation />

                    <section className="section">
                        <div className="container">
                            <Switch>
                                <Route path="/login" component={Login} />
                                <PrivateRoute path="/partners/create" component={PartnerForm} />
                                <PrivateRoute path="/partners/:partnerId/edit" component={PartnerForm} />
                                <PrivateRoute path="/partners/:partnerId/clients/"  component={ClientList} />
                                <PrivateRoute path="/partners" component={PartnerList} />
                                <PrivateRoute path="/clients" component={ClientList} />
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
