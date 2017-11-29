import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { translate } from 'react-i18next';
import { second } from '../../utils/time';
import history from '../../utils/history';
import { del } from '../../lib/api/';
import navItems from '../../config/nav.json';

class Nav extends Component {
  logOut = () => {
    del('/session');
    history.replace('/login');
  };

  // make the nav collapse if we click on a coordinate which is outside the initial view size of the nav (collpased)
  collapseIfNeeded = ({ currentTarget, clientX }) => {
    const span = currentTarget.querySelector('span');

    if (span && clientX > span.clientWidth) {
      const { nav: { style } } = this.refs;

      style.pointerEvents = 'none';
      setTimeout(() => {
        style.pointerEvents = 'initial';
      }, 0.15 * second);
    }
  };

  render() {
    const { t } = this.props;

    return (
      <nav ref="nav">
        <ul>
          <li>
            <NavLink to="/partners" exact onClick={this.collapseIfNeeded}>
              <span className="icon partners-icon" />
              <span>{t('maintenance')}</span>
            </NavLink>
          </li>
        </ul>
        <div className="account-selection" />
        <ul>
          {navItems.map((navItem, index) => (
            <li key={index}>
              <NavLink to={navItem.link} exact onClick={this.collapseIfNeeded}>
                <span className={`icon ${navItem.icon}-icon`} />
                <span>{t(navItem.text)}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <ul>
          <li>
            <NavLink to="/wiki" onClick={this.collapseIfNeeded}>
              <span className="icon wiki-icon" />
              <span>{t('wiki')}</span>
            </NavLink>
          </li>
          <li>
            <button onClick={this.logOut}>
              <span className="icon wiki-icon" />
              <span>{t('logout')}</span>
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}
export default translate(['shared', 'nav'])(Nav);
