import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../assets/style/header.scss';
import logo from '../../assets/images/logo.svg';

/**
 * Header component to render the logo and the user preferences link.
 * @constructor
 * @param {object} props - Props data from higher order component.
 */
const Header = props =>
    window.__STORE__.user.authenticated &&
    <header>
        <img src={logo} alt="VoIPGRID logo" className="header--logo" />
        <div className="header--navigation">
            <NavLink to="/user/personal_settings" activeClassName="is-active"><i className="fas fa-user" /></NavLink>
        </div>
    </header>


export default Header;
