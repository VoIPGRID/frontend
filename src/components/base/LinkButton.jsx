import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLinkButton = styled(Link)`
  display: inline-block;
  border: none;
  background: #e94e1b;
  padding: 9px;
  border-radius: 3px;
  color: #fff;
  margin: 0;
  text-decoration: none;
  font-size: 14px;
  font-weight: 400;
  outline: none;
  cursor: pointer;
  text-transform: capitalize;
  white-space: nowrap;
  position: relative;
  border-bottom: 2px #bf3d12 solid;
  line-height: initial;

  &.pull-right {
    float: right;
  }

  &.secondary {
    background: inherit;
    border: none;
    color: #000;
  }
`;

const LinkButton = ({ title, addClasses, link, ...props }) => (
  <StyledLinkButton to={link} className={addClasses}>
    {props.children}
  </StyledLinkButton>
);

export default LinkButton;
