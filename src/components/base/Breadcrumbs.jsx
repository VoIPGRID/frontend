import React from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledBreadcrumbs = styled.ul`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #e6e7eb;
  padding-left: 1.5em;

  li {
    display: inline-block;
    padding-right: 15px;
    margin-right: 15px;
    border-right: 1px #e6e7eb solid;
    height: 36px;
    color: #2a3042;
    line-height: 36px;
    margin-top: 11px;
    font-weight: bold;

    :last-child {
      order-right: 0;
    }
  }
`;

const Breadcrumbs = () => (
  <Route
    path="*"
    render={props => {
      let parts = props.location.pathname.split('/');
      const place = parts[parts.length - 1];
      parts = parts.slice(1, parts.length - 1);
      return (
        <StyledBreadcrumbs>
          {parts.map(crumb)} <li>{capitalizeFirstLetter(place)}</li>
        </StyledBreadcrumbs>
      );
    }}
  />
);

const crumb = (part, partIndex, parts) => {
  const path = ['', ...parts.slice(0, partIndex + 1)].join('/');
  return (
    <li key={path}>
      <Link key={path} to={path}>
        {capitalizeFirstLetter(part)}
      </Link>
    </li>
  );
};

// Capitalize first letter of our breadcrumbs.
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).replace(/_/g, ' ');
}

export default Breadcrumbs;
