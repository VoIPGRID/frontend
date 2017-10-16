import React from 'react';
import { connect } from 'react-redux';

import Notification from './Notification';

/**
 * Notification component to render a notification on top of the page.
 * @param {object} props - Props data from higher order component.
 */
const NotificationContainer = props =>
  props.notification && (
    <Notification type={props.notification.notificationType}>
      {props.notification.content}
    </Notification>
  );

const mapStateToProps = state => ({
  notification: state.base.notification
});

export default connect(mapStateToProps)(NotificationContainer);
