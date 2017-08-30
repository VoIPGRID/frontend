import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import '../assets/style/navigation.scss';

class Navigation extends Component {

    constructor(props) {
        super(props);

        console.log(this.props)
    }

    componentDidMount() {
        console.log(this.props.context)
    }

    render() {
        return (
                window.__STORE__.user.authenticated &&
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
                            <NavLink to="/clients" activeClassName="is-active">{this.context.translate('Clients')}</NavLink>
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
}


Navigation.contextTypes = {
  translate: PropTypes.func
};

function mapStateToProps(state) {
    return {
        context: state.base.context
    }
}

export default connect(mapStateToProps)(Navigation);
