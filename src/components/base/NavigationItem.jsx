import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavigationItem = styled.li`
  font-size: 20px;
  font-weight: 200px;

  &:hover {
    cursor: pointer;

    a, i {
      color: ${props =>
        props.theme.secondary ? props.theme.secondary : '#fff'};
    }
  }

  a {
    text-decoration: none;
    line-height: 45px;
    color: rgba(255, 255, 255, 0.4);
    display: inline;

    &:hover,
    &:hover > i {
      color: ${props =>
        props.theme.secondary ? props.theme.secondary : '#fff'};
      }
    }
  }
`;

const NavigationItem = ({ icon, link, title }) => (
  <StyledNavigationItem>
    <span className="navigation--icon-wrapper">
      <i className={`fas ${icon}`} />
    </span>
    <NavLink to={link} activeClassName="is-active">
      {title}
    </NavLink>
  </StyledNavigationItem>
);

export default NavigationItem;
