import React, { Component } from 'react';

import Navigation from './Navigation';

import './assets/style/navigation.scss';

export default class App extends Component {
    render() {
        return (
            <div>
                <div>
                    <nav className="nav">
                        <ul>
                            <li>Tom</li>
                        </ul>
                    </nav>
                    <Navigation />

                    {this.props.children}
                </div>
            </div>
        );
    }
}
