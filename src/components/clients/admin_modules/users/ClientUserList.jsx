import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getUsers, deleteUser } from '../../../../actions/UserActions';
import { showNotification } from '../../../../actions/BaseActions';
import Table from '../../../helpers/Table';


class ClientUserList extends Component {
    async componentDidMount() {
        const { clientId } = this.props.match.params;
        await this.props.getUsers(clientId);
    }

    async _handleDelete(id) {
        const { clientId } = this.props.match.params;
        const result = await this.props.deleteUser(clientId, id);

        if (result) {
            this.props.showNotification('Succesfully deleted the user.', 'is-success', true);
        }
    }

    render() {
        if (!this.props.users.length) {
            return (
                <div>Loading...</div>
            )
        }

        const { clientId } = this.props.match.params;

        const columns = [{
            accessor: 'email',
            Cell: props => <Link className="table--link" to={`/clients/${clientId}/user/${props.original.id}/`}>
                {props.value}</Link>,
            Header: 'Email',
        }, {
            accessor: 'profile.description',
            Header: 'Description',
        }, {
            accessor: 'actions',
            Cell: props => <span>
                <Link to={`/clients/${clientId}/user/${props.original.id}/change`}>
                    <i className="fas fa-edit" /> Edit</Link>
                <button className="button is-link margin-left-5" onClick={() => this._handleDelete(props.original.id)}>
                    <i className="fas fa-trash" /> Delete</button></span>,
            Header: 'Actions',
        }]

        return (
            <div>
                <div className="list-header">
                    All users ({this.props.users.length})

                    <Link className="button is-primary is-pulled-right" to="/users/create">Add</Link>
                </div>


                <Table data={this.props.users} columns={columns} defaultLength={this.props.users.length} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.user.users,
    }
}

export default connect(mapStateToProps, { deleteUser, getUsers, showNotification })(ClientUserList);
