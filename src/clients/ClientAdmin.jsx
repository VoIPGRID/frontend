import React, { Component } from 'react';
import AdminModule from './admin_modules/AdminModule';
import { Link } from 'react-router-dom';

class ClientAdmin extends Component {
    render() {
        return (
            <div>
                <div className="columns">
                    <AdminModule title="Main Functionalities">
                        <li><Link to="/phonenumber"><i className="fas fa-phone"></i> Phonenumber</Link></li>
                        <li><Link to="phoneaccount"><i className="fas fa-phone"></i> VoIP accounts</Link></li>
                        <li><Link to="users"><i className="fas fa-users"></i> Users</Link></li>
                    </AdminModule>

                    <AdminModule title="Call Forwarding">
                        <li><Link to="/phonenumber"><i className="fas fa-phone"></i> Callgroup</Link></li>
                        <li><Link to="/phonenumber"><i className="fas fa-phone"></i> Fixed/Mobile</Link></li>
                        <li><Link to="/phonenumber"><i className="fas fa-users"></i> Voicemail</Link></li>
                    </AdminModule>

                </div>

                <div className="columns">
                    <AdminModule title="Options">
                        <li><Link to="/phonenumber"><i className="fas fa-phone"></i> Openinghours</Link></li>
                        <li><Link to="/phonenumber"><i className="fas fa-phone"></i> Messages</Link></li>
                        <li><Link to="/phonenumber"><i className="fas fa-users"></i> Music on old</Link></li>
                    </AdminModule>


                    <AdminModule title="Fax">
                        <li><Link to="/phonenumber"><i className="fas fa-phone"></i> Fax inbound</Link></li>
                        <li><Link to="/phonenumber"><i className="fas fa-phone"></i> Fax outbound</Link></li>
                    </AdminModule>
                </div>

                <div className="columns">
                    <AdminModule title="Advanced Options">
                        <li><Link to="/phonenumber"><i className="fas fa-phone"></i> IVR</Link></li>
                        <li><Link to="/phonenumber"><i className="fas fa-phone"></i> Queue</Link></li>
                        <li><Link to="/phonenumber"><i className="fas fa-phone"></i> Conference</Link></li>
                        <li><Link to="/phonenumber"><i className="fas fa-phone"></i> Pickup group</Link></li>
                        <li><Link to="/phonenumber"><i className="fas fa-phone"></i> Listen in</Link></li>
                        <li><Link to="/phonenumber"><i className="fas fa-phone"></i> Filter</Link></li>
                        <li><Link to="/phonenumber"><i className="fas fa-phone"></i> Area group</Link></li>
                        <li><Link to="/phonenumber"><i className="fas fa-phone"></i> Area routing</Link></li>
                        <li><Link to="/phonenumber"><i className="fas fa-phone"></i> Call recording</Link></li>
                    </AdminModule>


                    <AdminModule title="System management">
                        <li><Link to="/phonenumber"><i className="fas fa-phone"></i> Sounds</Link></li>
                        <li><Link to="/phonenumber"><i className="fas fa-phone"></i> VoIP trunk</Link></li>
                        <li><Link to="/phonenumber"><i className="fas fa-phone"></i> SIP analysis</Link></li>
                    </AdminModule>
                </div>

                <div className="columns">
                    <AdminModule title="Integration">
                        <li><Link to="/phonenumber"><i className="fas fa-phone"></i> Call-me-now</Link></li>
                        <li><Link to="/phonenumber"><i className="fas fa-phone"></i> Web hooks</Link></li>
                        <li><Link to="/phonenumber"><i className="fas fa-phone"></i> Caller ID lookup</Link></li>
                        <li><Link to="/phonenumber"><i className="fas fa-phone"></i> CRM</Link></li>
                    </AdminModule>
                </div>
            </div>
        );
    }
}

export default ClientAdmin;
