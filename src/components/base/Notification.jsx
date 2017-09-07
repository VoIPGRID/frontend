import React from 'react';
import { connect } from 'react-redux';
import '../../assets/style/notification.scss';



/**
 * Header component to render the logo and the user preferences link.
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
