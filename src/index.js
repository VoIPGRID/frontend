import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import reducers from 'base';
import Login from 'base/Login';
import PartnerList from 'partners/PartnerList';
import PartnerDetail from 'partners/PartnerDetail';
import PartnerForm from 'partners/PartnerForm';
import ClientList from 'clients/ClientList';
import Navigation from 'base/Navigation';

import './assets/style/base.scss';
import './assets/vendor/fontawesome/css/font-awesome-core.css';
import './assets/vendor/fontawesome/css/font-awesome-regular.css';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

const authed = window.__INITIAL_STATE__.authenticated;

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <BrowserRouter>
            <div>
                <Navigation />

                <section className="section">
                    <div className="container">
                        <Switch>
                            <Route path="/login" component={Login} />
                            <PrivateRoute path="/partners/create" component={PartnerForm} />
                            <PrivateRoute path="/partners/:id/edit" component={PartnerForm} />
                            <PrivateRoute path="/partners/:id" component={PartnerDetail} />
                            <PrivateRoute path="/partners" authed={authed} component={PartnerList} />
                            <PrivateRoute path="/clients/partner/:partnerId" component={ClientList} />
                            <PrivateRoute path="/clients" authed={authed} component={ClientList} />
                        </Switch>
                    </div>
                </section>
            </div>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#app')
);
