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
                <li className="not-used"><Link to="/phonenumber"><i className="fas fa-phone" /> Callgroup</Link></li>
                <li className="not-used"><Link to="/phonenumber"><i className="fas fa-phone" /> Fixed/Mobile</Link></li>
                <li className="not-used"><Link to="/phonenumber"><i className="fas fa-users" /> Voicemail</Link></li>
            </AdminModule>

            <AdminModule title="Options">
                <li className="not-used"><Link to="/phonenumber"><i className="fas fa-phone" /> Openinghours</Link></li>
                <li className="not-used"><Link to="/phonenumber"><i className="fas fa-phone" /> Messages</Link></li>
                <li className="not-used"><Link to="/phonenumber"><i className="fas fa-music" /> Music on old</Link></li>
            </AdminModule>

        </div>

    </div>)


export default ClientAdmin;
