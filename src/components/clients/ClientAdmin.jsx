import React from 'react';
import { Link } from 'react-router-dom';
import AdminModule from './admin_modules/AdminModule';


const ClientAdmin = props =>
    (<div>
        <div className="columns">
            <AdminModule title="Main Functionalities">
                <li><Link to="/phonenumber"><i className="fas fa-phone" /> Phonenumber</Link></li>
                <li><Link to="phoneaccount"><i className="fas fa-phone" /> VoIP accounts</Link></li>
                <li><Link to="users"><i className="fas fa-users" /> Users</Link></li>
            </AdminModule>

            <AdminModule title="Call Forwarding">
                <li><Link to="/phonenumber"><i className="fas fa-phone" /> Callgroup</Link></li>
                <li><Link to="/phonenumber"><i className="fas fa-phone" /> Fixed/Mobile</Link></li>
                <li><Link to="/phonenumber"><i className="fas fa-users" /> Voicemail</Link></li>
            </AdminModule>

        </div>

        <div className="columns">
            <AdminModule title="Options">
                <li><Link to="/phonenumber"><i className="fas fa-phone" /> Openinghours</Link></li>
                <li><Link to="/phonenumber"><i className="fas fa-phone" /> Messages</Link></li>
                <li><Link to="/phonenumber"><i className="fas fa-users" /> Music on old</Link></li>
            </AdminModule>


            <AdminModule title="Fax">
                <li><Link to="/phonenumber"><i className="fas fa-phone" /> Fax inbound</Link></li>
                <li><Link to="/phonenumber"><i className="fas fa-phone" /> Fax outbound</Link></li>
            </AdminModule>
        </div>

        <div className="columns">
            <AdminModule title="Advanced Options">
                <li><Link to="/phonenumber"><i className="fas fa-phone" /> IVR</Link></li>
                <li><Link to="/phonenumber"><i className="fas fa-phone" /> Queue</Link></li>
                <li><Link to="/phonenumber"><i className="fas fa-phone" /> Conference</Link></li>
                <li><Link to="/phonenumber"><i className="fas fa-phone" /> Pickup group</Link></li>
                <li><Link to="/phonenumber"><i className="fas fa-phone" /> Listen in</Link></li>
                <li><Link to="/phonenumber"><i className="fas fa-phone" /> Filter</Link></li>
                <li><Link to="/phonenumber"><i className="fas fa-phone" /> Area group</Link></li>
                <li><Link to="/phonenumber"><i className="fas fa-phone" /> Area routing</Link></li>
                <li><Link to="/phonenumber"><i className="fas fa-phone" /> Call recording</Link></li>
            </AdminModule>


            <AdminModule title="System management">
                <li><Link to="/phonenumber"><i className="fas fa-phone" /> Sounds</Link></li>
                <li><Link to="/phonenumber"><i className="fas fa-phone" /> VoIP trunk</Link></li>
                <li><Link to="/phonenumber"><i className="fas fa-phone" /> SIP analysis</Link></li>
            </AdminModule>
        </div>

        <div className="columns">
            <AdminModule title="Integration">
                <li><Link to="/phonenumber"><i className="fas fa-phone" /> Call-me-now</Link></li>
                <li><Link to="/phonenumber"><i className="fas fa-phone" /> Web hooks</Link></li>
                <li><Link to="/phonenumber"><i className="fas fa-phone" /> Caller ID lookup</Link></li>
                <li><Link to="/phonenumber"><i className="fas fa-phone" /> CRM</Link></li>
            </AdminModule>
        </div>
    </div>)


export default ClientAdmin;
