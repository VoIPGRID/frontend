import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  padding: 10px;
  color: #fff;
  margin-bottom: 10px;

  &.success {
    background: #5eb75f;
  }

  &.is-danger {
    background: #fe3f64;
  }

  &.error {
    background: #fe3f64;
  }
`;

/**
 * Notification component to render a notification on top of the page.
 * @param {string} type - A string that renders a specific type of notification.
 * @param {object} ...props - A spreaded props object to display children.
 */
const Notification = ({ type, ...props }) => (
  <Container className={type}>
    <p>{props.children}</p>
  </Container>
);

export default Notification;
