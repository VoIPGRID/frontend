import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { getUsers, deleteUser } from '../../users/UserActions'


class ClientUserList extends Component {
    componentDidMount() {
        const { clientId } = this.props.match.params;
        this.props.getUsers(clientId);
    }

    renderTable() {
        const { clientId } = this.props.match.params;
        let table = <tr><td colSpan="6">No users</td></tr>

        if (this.props.users.length) {
            table = this.props.users.map(user => {
                return (
                    <tr key={user.id}>
                        <td>-</td>
                        <td><Link to={`/clients/${clientId}/user/${user.id}/change`}>{user.email}</Link></td>
                        <td>{user.profile.description}</td>
                        <td>
                            <Link className="fas fa-edit" to={`/clients/${clientId}/user/${user.id}/change`}></Link>
                            <button className="button is-link fas fa-trash margin-left-5" onClick={() => this._handleDelete(user.id)} />
                        </td>
                    </tr>
                )
            });
        }

        return table;
    }

    render() {
        if (!this.props.users) {
            return (
                <div>Loading...</div>
            )
        }

        return (
            <div>
                <div className="list-header">
                    All users ({this.props.users.length})

                    <Link className="button is-primary is-pulled-right" to="/users/create">Add</Link>
                </div>

                <table className="table is-bordered is-striped">
                    <tbody>
                        <tr>
                            <th>Internal number</th>
                            <th>Email</th>
                            <th>Description</th>
                            <th className="table-actions">Actions</th>
                        </tr>
                    </tbody>

                    <tbody>
                        {this.renderTable()}
                    </tbody>
                </table>
            </div>
        );
    }

    _handleDelete(id) {
        this.props.deleteUser(id);
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        users: state.user.users,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getUsers, deleteUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientUserList);
