import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * Regular button to be used in forms.
 *
 * @public
 * @param {string} addClasses - Extra classes for the component's styling.
 * @param {string} type - The type of HTML button the component should return.
 */
const FormButton = ({ addClasses, type, ...props }) => (
  <StyledFormButton type={type} className={addClasses}>
    {props.children}
  </StyledFormButton>
);

FormButton.propTypes = {
  addClasses: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']).isRequired
};

const StyledFormButton = styled.button`
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
  border-bottom: 2px solid #fff;
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

  &.is-inline {
    display: inline-block;
  }
`;

export default FormButton;
