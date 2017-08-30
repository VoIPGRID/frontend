import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Table from '../../../helpers/Table';

import { getUsers, deleteUser } from '../../../users/UserActions'


class ClientUserList extends Component {
    async componentDidMount() {
        const { clientId } = this.props.match.params;
        await this.props.getUsers(clientId);
    }

    render() {
        // if (!this.props.users) {
        //     return (
        //         <div>No users</div>
        //     )
        // }

        if (!this.props.users.length) {
            return (
                <div>Loading...</div>
            )
        }

        const { clientId } = this.props.match.params;

        const columns = [{
            Header: 'Email',
            accessor: 'email',
            Cell: props => <Link className="table--link" to={`/clients/${clientId}/user/${props.original.id}/`}>{props.value}</Link>
        }, {
            Header: 'Description',
            accessor: 'profile.description',
        },{
            Header: 'Actions',
            accessor: 'actions',
            Cell: props => <span><Link to={`/clients/${clientId}/user/${props.original.id}/change`}><i className="fas fa-edit"></i> Edit</Link><button className="button is-link margin-left-5" onClick={() => this._handleDelete(props.original.id)}><i className="fas fa-trash"></i> Delete</button></span>
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

    _handleDelete(id) {
        this.props.deleteUser(id);
    }
}

function mapStateToProps(state) {
    return {
        users: state.user.users,
    }
}

export default connect(mapStateToProps, { getUsers, deleteUser })(ClientUserList);
