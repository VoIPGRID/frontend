import React from 'react';
import styled from 'styled-components';

const StyledFormButton = styled.button`
  display: inline-block;
  border: none;
  background: ${props => props.theme.primary || '#E94E1B'};
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

  &.is-inline {
    display: inline-block;
  }
`;

const FormButton = ({ title, addClasses, type, ...props }) => (
  <StyledFormButton type={type} className={addClasses}>
    {props.children}
  </StyledFormButton>
);

export default FormButton;
