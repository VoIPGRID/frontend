import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../assets/style/header.css';
import logo from '../../assets/images/logo.svg';



/**
 * Header component to render the logo and the user preferences link.
 * @constructor
 * @param {object} props - Props data from higher order component.
 */
class Header extends Component {

    render() {
        return (
            this.props.auth.user.authenticated &&
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
    }
}

const mapStateToProps = state => ({
    auth: state.base.auth,
});


export default connect(mapStateToProps)(Header);
