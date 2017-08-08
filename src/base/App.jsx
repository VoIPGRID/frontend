import React, { Component } from 'react';

import Navigation from './Navigation';

export default class App extends Component {
    render() {
        return (
            <div>
                <div>
                    <Navigation />

                    {this.props.children}
                </div>
            </div>
        );
    }
}
