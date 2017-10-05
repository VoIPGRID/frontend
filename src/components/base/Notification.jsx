import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  padding: 15px;
  color: #fff;

  &.success {
    background: green;
  }

  &.danger {
    background: orange;
  }

  &.error {
    background: red;
  }
`;

/**
 * Notification component to render a notification on top of the page.
 * @constructor
 * @param {object} props - Props data from higher order component.
 */
const Notification = ({ type, ...props }) => (
  <Container className={type}>
    <p>{props.children}</p>
  </Container>
);

export default Notification;
