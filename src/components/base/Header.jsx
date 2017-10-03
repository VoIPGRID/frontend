import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../assets/style/header.css';
import logo from '../../assets/images/logo.svg';


/**
 * Header component to render the logo and the user preferences link.
 */
const Header = () => (
    <header>
        <img src={logo} alt="VoIPGRID logo" className="header--logo" />
        <div className="header--navigation">
            <NavLink
                to="/user/personal_settings"
                activeClassName="is-active"
            ><i className="fas fa-user" /></NavLink>
        </div>
    </header>
)

export default Header;
