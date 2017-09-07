import React from 'react';
import { connect } from 'react-redux';
import '../../assets/style/notification.scss';



/**
 * Notification component to render a notification on top of the page.
 * @constructor
 * @param {object} props - Props data from higher order component.
 */
const Notification = props =>
    props.notification &&
    <div className={`notification ${props.notification.type}`}>
        <p>{props.notification.content}</p>
    </div>


const mapStateToProps = state => ({
    notification: state.base.notification,
});

export default connect(mapStateToProps)(Notification);
