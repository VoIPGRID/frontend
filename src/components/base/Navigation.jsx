import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withTranslate } from 'react-redux-multilingual';

import '../../assets/style/navigation.scss';

/**
 * Navigation component that renders our main navigation.
 */
class Navigation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            context: {
                type: null,
                id: null,
            },
        }
    }

    // This lifecycle method will set the state with params from the url
    // to change the url when switching context between partner and client.
    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id) {
            this.setState({
                context: {
                    type: nextProps.match.params.type,
                    id: nextProps.match.params.id,
                },
            })
        } else {
            this.setState({
                context: {
                    type: nextProps.match.params.type,
                    id: null,
                },
            })
        }
    }

    render() {
        const { translate } = this.props;
        let urlPrepend = '/';

        if (this.state.context.id && this.state.context.type) {
            urlPrepend = `/${this.state.context.type}/${this.state.context.id}/`
        }

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
                            <NavLink to={`${urlPrepend}clients`} activeClassName="is-active">
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

// Use the withTranslate Higher Order Component (HoC) to transpose the
// translate function in our component.
export default withTranslate(Navigation);
