import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import logo from 'images/vg-logo.png';

const Navigation = (props, context) => {
    return (
        <div>
            <nav className="nav has-shadow">
                    {
                        window.__INITIAL_STATE__.authenticated &&
                        <div className="container">
                            <div className="nav-left">
                                <img src={logo} alt="VoIPGRID logo" className="header-logo" />
                                <NavLink className="nav-item is-tab is-hidden-mobile" to="/partners" activeClassName="is-active">Partners</NavLink>
                                <NavLink className="nav-item is-tab is-hidden-mobile" to="/clients" activeClassName="is-active">{context.translate('Clients')}</NavLink>
                                <NavLink className="nav-item is-tab is-hidden-mobile" to="/accounts" activeClassName="is-active">VoIP Accounts</NavLink>
                            </div>

                            <NavLink className="nav-item is-tab is-hidden-mobile is-pulled-right" to="/user/personal_settings" activeClassName="is-active"><i className="far fa-user"></i></NavLink>
                        </div>
                    }
            </nav>
        </div>
    );
}


Navigation.contextTypes = {
  translate: PropTypes.func
};

export default Navigation;
