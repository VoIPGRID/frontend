import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
      {...rest}
      render={props => auth.authenticated === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
 )

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth.auth
    }
};

export default connect(mapStateToProps, null, null, {
  pure: false,
})(PrivateRoute);
