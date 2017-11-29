import React from 'react';
import { NavLink } from 'react-router-dom';
import AvailabilityMenu from '../AvailabilityMenu/';
import LanguageSelector from '../LanguageSelector';
import logo from './logo.svg';

export default () => (
  <header>
    <div>
      <img src={logo} alt="VoIPGRID logo" />
    </div>
    <div className="header-quick-links">
      <AvailabilityMenu />
      <LanguageSelector />
      <NavLink to="/help">
        <span className="icon help-icon" />
      </NavLink>
      <NavLink to="/company/1/settings">
        <span className="icon settings-icon" />
      </NavLink>
      <NavLink to="/user/1">
        <span className="icon user-icon" />
      </NavLink>
    </div>
  </header>
);
