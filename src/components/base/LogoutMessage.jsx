import React from 'react';
import { NavLink } from 'react-router-dom';

import '../../assets/style/login.css';

/**
 * Logout message component to show a user is succesfully logged out.
 */
const LogoutMessage = () => (
  <div className="login--container">
    <h1 className="title">Logged out</h1>
    <p>You are now logged out.</p>
    <p>
      <NavLink to="/login">Log in again</NavLink>
    </p>
  </div>
);

export default LogoutMessage;
