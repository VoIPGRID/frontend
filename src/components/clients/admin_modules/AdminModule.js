import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * Admin Module. Generic component for showing available modules.
 * @public
 * @param {string} title - Title for the module.
 * @param {array} children - children object from the parent component.
*/
const AdminModule = ({ title, children }) => (
  <div>
    <Title>{title}</Title>
    <List>{children}</List>
  </div>
);

AdminModule.propTypes = {
  title: PropTypes.string,
  children: PropTypes.array
};

const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 0.75em 0;
`;

const List = styled.ul`
  background: #fff;
  border: 1px #e6e7eb solid;
  border-radius: 3px;
  margin: 0;
  padding: 0;
  list-style-type: none;
  li {
    border-bottom: 1px #f6f7fb solid;
  }

  li:last-child {
    border-bottom: 0;
  }

  li.not-used a {
    color: #cccfd5;
  }

  li a {
    color: #2a3042;
    display: block;
    padding: 10px;
    text-decoration: none;

    i {
      width: 20px;
    }
  }

  li a:hover {
    color: ${props => props.theme.secondary || '#000'};
  }
`;

export default AdminModule;
