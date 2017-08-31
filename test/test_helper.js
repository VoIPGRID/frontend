import jsdom from 'jsdom';
import jquery from 'jquery';
import TestUtils from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import chaiJquery from 'chai-jquery';

import { MemoryRouter } from 'react-router-dom';

import { IntlProvider } from 'react-redux-multilingual';
import reducers from '../src/reducers/RootReducer';
import translations from '../src/translations/translations';

// Skip requiring files with these formats in components.
['.css', '.scss', '.png', '.jpg', '.svg'].forEach((ext) => {
    require.extensions[ext] = () => null
})


// Set up testing environment to run like a browser in the command line
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;

// Mimick a default store that is normally served by Django as state.js.
global.document.defaultView.__STORE__ = {
    user: {
        selectedPartner: {
            id: null, name: '',
        },
        superuser: true,
        authenticated: true,
        language: 'en',
        selectedClient: {id: null, name: ''},
        client: null,
        csrf: '',
        partner: {may_have_children: true, id: 1, name: 'Default partner'},
        id: 1,
    },
};

const $ = jquery(global.window);

// Build 'renderComponent' helper that should render a given React class.
function renderComponent(ComponentClass, props, state) {
    const componentInstance = TestUtils.renderIntoDocument(
        <Provider store={createStore(reducers, state)}>
            <MemoryRouter>
                <IntlProvider translations={translations} locale="en">
                    <ComponentClass {...props} />
                </IntlProvider>
            </MemoryRouter>
        </Provider>
    );

    return $(ReactDOM.findDOMNode(componentInstance)); // produces HTML
}

// Build helper for simulating events.
$.fn.simulate = function(eventName, value) {
    if (value) {
        this.val(value);
    }
    TestUtils.Simulate[eventName](this[0]);
}

// Set up chai-jquery
chaiJquery(chai, chai.util, $);

export { renderComponent, expect };
