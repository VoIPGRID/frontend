import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import '../assets/style/header.scss';


import logo from 'images/logo.svg';

const Header = (props, context) =>
    window.__STORE__.user.authenticated &&
    <header>
        <img src={logo} alt="VoIPGRID logo" className="header--logo" />
        <div className="header--navigation">
            <NavLink to="/user/personal_settings" activeClassName="is-active"><i className="fas fa-user"></i></NavLink>
        </div>
    </header>



Header.contextTypes = {
  translate: PropTypes.func
};

export default withRouter(Header);
