import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

/**
 * Button that acts like an anchor and uses the Link component.
 *
 * @public
 * @param {string} addClasses - Extra classes for the component's styling.
 * @param {string} link - A link that the button should link to when clicked on.
 */
const LinkButton = ({ addClasses, link, ...props }) => (
  <StyledLinkButton to={link} className={addClasses}>
    {props.children}
  </StyledLinkButton>
);

LinkButton.propTypes = {
  link: PropTypes.string.isRequired,
  addClasses: PropTypes.string
};

const StyledLinkButton = styled(Link)`
  display: inline-block;
  border: none;
  background: #fff;
  padding: 9px;
  border-radius: 3px;
  color: #000;
  margin: 0;
  text-decoration: none;
  font-size: 14px;
  font-weight: 400;
  outline: none;
  cursor: pointer;
  text-transform: capitalize;
  white-space: nowrap;
  position: relative;
  border-bottom: 2px #fff solid;
  line-height: initial;
  margin: 5px;

  &.pull-right {
    float: right;
  }

  &.primary {
    background: ${props => props.theme.primary || '#E94E1B'};
    border-bottom: 2px ${props => props.theme.primary || '#E94E1B'} solid;
    color: #fff;
  }

  &.secondary {
    background: #eff1f8;
    border-bottom: 2px #e6e7eb solid;
    color: #000;
  }
`;

export default LinkButton;
