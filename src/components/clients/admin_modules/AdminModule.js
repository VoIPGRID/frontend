import React from "react";

import "../../../assets/style/AdminModule.css";

/**
 * Admin Module. Generic component for showing available modules.
 * @param {object} props - Props data from higher order component.
 */
const AdminModule = props => (
  <div className="column admin--module">
    <h3 className="admin--module-title">{props.title}</h3>
    <ul className="admin--module-list">{props.children}</ul>
  </div>
);

export default AdminModule;
