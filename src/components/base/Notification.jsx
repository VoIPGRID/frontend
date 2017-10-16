import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * Notification component to render a notification on top of the page.
 *
 * @public
 * @arg {string} type Render a specific type of the notification.
 * @argument {object} ...props - A spreaded props object to display children.
 */
const Notification = ({ type, ...props }) => (
  <Container className={type}>
    <p>{props.children}</p>
  </Container>
);

const Container = styled.div`
  width: 100%;
  padding: 10px;
  color: #fff;
  margin-bottom: 10px;

  &.success {
    background: #5eb75f;
  }

  &.danger {
    background: #ffdd57;
  }

  &.error {
    background: #fe3f64;
  }

  &.info {
    background: #3273dc;
  }
`;

Notification.propTypes = {
  type: PropTypes.oneOf(['success', 'danger', 'error', 'info'])
};

export default Notification;
