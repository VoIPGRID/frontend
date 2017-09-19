import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

/**
 * PrivateRoute component
 * @param {Component} Component - The routing Component we wish to authenticate.
 * @returns {Component} Comp - The authenticated component or a redirect
 * component.
 */
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            // Prevent a double redirect when manually redirecting a user to
            // the login page or logout page after auth fails or a user logs out.
            if (props.location.pathname === '/login' ||
                props.location.pathname === '/user/logout') {
                return null;
            }

            const comp = auth.user.authenticated === true
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login'}} />
            return comp;
        }}
    />
)

const mapStateToProps = (state, ownProps) => ({
    auth: state.base.auth,
});

export default connect(mapStateToProps, null, null, {
    pure: false,
})(PrivateRoute);
