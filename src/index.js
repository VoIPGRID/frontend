import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import reducers from 'base';
import PartnerList from 'partners/PartnerList';
import PartnerDetail from 'partners/PartnerDetail';
import PartnerForm from 'partners/PartnerForm';
import ClientList from 'clients/ClientList';
import Navigation from 'base/Navigation';

import './assets/style/base.scss';
import './assets/vendor/fontawesome/css/font-awesome-core.css';
import './assets/vendor/fontawesome/css/font-awesome-regular.css';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <BrowserRouter>
            <div>
                <Navigation />

                <section className="section">
                    <div className="container">
                        <Switch>
                            <Route path="/partners/create" component={PartnerForm} />
                            <Route path="/partners/:id/edit" component={PartnerForm} />
                            <Route path="/partners/:id" component={PartnerDetail} />
                            <Route path="/partners" component={PartnerList} />
                            <Route path="/clients/partner/:partnerId" component={ClientList} />
                            <Route path="/clients" component={ClientList} />
                        </Switch>
                    </div>
                </section>
            </div>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#app')
);
