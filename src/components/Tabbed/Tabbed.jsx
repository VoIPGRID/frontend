import React from 'react';
import { node, string } from 'prop-types';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import { t } from 'i18next';

const Tabbed = ({ title, icon, children, buttons, base }) => {
  const paths = buttons.map(v => v.path).filter(v => !!v);

  return (
    <div className="tabbed">
      <div className="tabbed-buttons">
        <h2>{t(title)}</h2>
        <ul>
          {buttons.map(({ path, text }) => {
            if (path) {
              return (
                <li key={path}>
                  <NavLink to={`${base}${path}`}>{t(text)}</NavLink>
                </li>
              );
            }
            return <li className="divider" />;
          })}
        </ul>
      </div>
      <div className="tabbed-content">
        <Switch>
          <Redirect from="/" to={`${base}${paths[0]}`} />
          {Array.from(children).map((child, index) => {
            const path = paths[index];
            if (index === paths.length) {
            }
            return (
              <Route key={path || index} path={`${base}${path}`}>
                {child}
              </Route>
            );
          })}
        </Switch>
      </div>
    </div>
  );
};

Tabbed.propTypes = {
  title: string.isRequired,
  icon: string,
  children: node.isRequired,
  base: string.isRequired
};

export default Tabbed;
