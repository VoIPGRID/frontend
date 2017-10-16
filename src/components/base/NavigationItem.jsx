import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * NavigationItem component for every item in the main navigation bar.
 * @public
 * @param {string} icon - A font-awesome classname to display an icon.
 * @param {string} link - The link to which the navigationitem should link.
 * @param {string} title - The title for the anchor tag link.
 * @param {object} ...props - Spreaded props to display possible children.
 */
const NavigationItem = ({ icon, link, title, ...props }) => (
  <Wrapper>
    <IconWrapper>
      <i className={`fas ${icon}`} />
    </IconWrapper>
    {link && (
      <NavLink to={link} activeClassName="is-active">
        {title}
      </NavLink>
    )}
    {props.children}
  </Wrapper>
);

NavigationItem.propTypes = {
  icon: PropTypes.string.isRequired,
  link: PropTypes.string,
  title: PropTypes.string
};

const Wrapper = styled.li`
  font-size: 20px;
  font-weight: 200px;
  list-style-type: none;

  &:hover {
    cursor: pointer;

    a, i {
      color: ${props => props.theme.secondary || '#fff'};
    }
  }

  a {
    text-decoration: none;
    line-height: 45px;
    color: rgba(255, 255, 255, 0.4);
    display: inline;

    &:hover,
    &:hover > i {
      color: ${props => props.theme.secondary || '#fff'};
      }
    }


  }
`;

const IconWrapper = styled.span`
  display: inline-block;
  text-align: center;
  width: 80px;

  i {
    color: #fff;
  }
`;

export default NavigationItem;
