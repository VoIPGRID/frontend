import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import logo from 'images/vg-logo.png';

export default class Navigation extends Component {
    render() {
        return (
            <div>
                <nav className="nav has-shadow">
                    <div className="container">
                        <div className="nav-left">
                            <img src={logo} alt="VoIPGRID logo" className="header-logo" />
                            <NavLink className="nav-item is-tab is-hidden-mobile" to="/partners" activeClassName="is-active">Partners</NavLink>
                            <NavLink className="nav-item is-tab is-hidden-mobile" to="/clients" activeClassName="is-active">Clients</NavLink>
                            <NavLink className="nav-item is-tab is-hidden-mobile" to="/accounts" activeClassName="is-active">VoIP Accounts</NavLink>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}
