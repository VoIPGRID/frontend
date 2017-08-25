import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import '../assets/style/navigation.scss';

const Navigation = (props, context) => {
    return (
            window.__INITIAL_STATE__.authenticated &&
            <div className="navigation--wrapper">
                <ul className="navigation--list">
                    <li className="navigation--list-item">
                        <span className="navigation--icon-wrapper">
                            <i className="fas fa-users"></i>
                        </span>
                        <NavLink to="/partners" activeClassName="is-active">Partners</NavLink>
                    </li>
                    <li className="navigation--list-item">
                        <span className="navigation--icon-wrapper">
                            <i className="fas fa-users"></i>
                        </span>
                        <NavLink to="/clients" activeClassName="is-active">{context.translate('Clients')}</NavLink>
                    </li>
                </ul>

                <ul className="navigation--list-bottom">
                    <li className="navigation--list-item">
                        <span className="navigation--icon-wrapper">
                            <i className="fas fa-question-circle"></i>
                        </span>
                        <NavLink to="/user/personal_settings" activeClassName="is-active">Wiki</NavLink>
                    </li>
                    <li className="navigation--list-item">
                        <span className="navigation--icon-wrapper">
                            <i className="fas fa-arrow-square-right"></i>
                        </span>
                        <NavLink to="/user/personal_settings" activeClassName="is-active">Logout</NavLink>
                    </li>
                </ul>
            </div>
    );
}


Navigation.contextTypes = {
  translate: PropTypes.func
};

export default Navigation;
