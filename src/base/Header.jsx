import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import '../assets/style/header.scss';

import logo from 'images/logo.svg';

const Header = (props, context) => {
    return (
            window.__INITIAL_STATE__.authenticated &&
            <div>
                <header>
                    <img src={logo} alt="VoIPGRID logo" className="header--logo" />
                    <div className="header--navigation">
                        <NavLink to="/user/personal_settings" activeClassName="is-active"><i className="fas fa-user"></i></NavLink>
                    </div>
                </header>
           </div>
    );
}


Header.contextTypes = {
  translate: PropTypes.func
};

export default Header;
