import React from 'react';
import { NavLink } from 'react-router-dom';
import history from '../../utils/history';
import api from '../../lib/api';
import navItems from '../../config/nav.json';

function logOut() {
  api('/session', { method: 'delete' });
  history.replace('/login');
}

export default () => (
  <nav>
    <ul>
      <li>
        <NavLink to="/partners" exact>
          <span className="icon partners-icon" />
          <span>Beheer</span>
        </NavLink>
      </li>
    </ul>
    <div className="account-selection" />
    <ul>
      {navItems.map((navItem, index) => (
        <li key={index}>
          <NavLink to={navItem.link} exact>
            <span className={`icon ${navItem.icon}-icon`} />
            <span>{navItem.text}</span>
          </NavLink>
        </li>
      ))}
    </ul>
    <ul>
      <li>
        <NavLink to="/wiki">
          <span className="icon wiki-icon" />
          <span>Wiki</span>
        </NavLink>
      </li>
      <li>
        <button onClick={logOut}>
          <span className="icon wiki-icon" />
          <span>Log out</span>
        </button>
      </li>
    </ul>
  </nav>
);
