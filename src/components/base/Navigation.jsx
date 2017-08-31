import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { withTranslate } from 'react-redux-multilingual';

import '../../assets/style/navigation.scss';

class Navigation extends Component {
    render() {
        const { translate } = this.props;
        return (
            window.__STORE__.user.authenticated &&
                <div className="navigation--wrapper">
                    <ul className="navigation--list">
                        <li className="navigation--list-item">
                            <span className="navigation--icon-wrapper">
                                <i className="fas fa-users" />
                            </span>
                            <NavLink to="/partners" activeClassName="is-active">Partners</NavLink>
                        </li>
                        <li className="navigation--list-item">
                            <span className="navigation--icon-wrapper">
                                <i className="fas fa-users" />
                            </span>
                            <NavLink to="/clients" activeClassName="is-active">
                                {translate('Clients')}
                            </NavLink>
                        </li>
                    </ul>

                    <ul className="navigation--list-bottom">
                        <li className="navigation--list-item">
                            <span className="navigation--icon-wrapper">
                                <i className="fas fa-question-circle" />
                            </span>
                            <NavLink to="/user/personal_settings" activeClassName="is-active">Wiki</NavLink>
                        </li>
                        <li className="navigation--list-item">
                            <span className="navigation--icon-wrapper">
                                <i className="fas fa-arrow-square-right" />
                            </span>
                            <NavLink to="/user/personal_settings" activeClassName="is-active">Logout</NavLink>
                        </li>
                    </ul>
                </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        context: state.base.context,
    }
}

Navigation = withTranslate(Navigation);

export default connect(mapStateToProps)(Navigation);
