import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getClients, updateClient, deleteClient } from './ClientActions';
import { setContext } from '../base/BaseActions';

import Table from '../helpers/Table';


class ClientList extends Component {
    componentDidMount() {
        const { partnerId } = this.props.match.params;

        if(partnerId) {
            this.props.setContext({'type': 'partner', 'id': partnerId});
        }

        this.props.getClients(partnerId);
    }

    render() {
        if (!this.props.clients) {
            return (
                <div>Loading...</div>
            )
        }

        const columns = [{
            Header: 'Name',
            accessor: 'name',
            Cell: props => <Link className="table--link" to={`/clients/${props.original.id}/admin`}>{props.value}</Link>
        }, {
            Header: 'Created',
            accessor: 'created',
        }, {
            Header: 'Description',
            accessor: 'description',
        }, {
            Header: 'Partner',
            accessor: 'partner',
        }, {
            Header: 'Inactive',
            accessor: 'is_active',
        },{
            Header: 'Actions',
            accessor: 'actions',
            Cell: props => <span><Link to={`${props.original.id}/edit`}><i className="fas fa-edit"></i> Edit</Link><button className="button is-link margin-left-5" onClick={() => this._handleDelete(props.original.id)}><i className="fas fa-trash"></i> Delete</button></span>
        }]

        return (
            <div>
                <div className="list-header is-clearfix">
                    All clients ({this.props.clients.length})

                    <Link className="button is-primary is-pulled-right" to="/clients/create">Add</Link>
                </div>

                <Table data={this.props.clients} columns={columns} defaultLength={this.props.clients.length}/>

            </div>
        );
    }

    _handleDelete(id) {
        console.log(id);
    }

    _toggleActive({ id, is_active }) {
        this.props.updateClient({id, is_active: !is_active});
    }
}

function mapStateToProps(state) {
    return {
        clients: state.clients.objects,
    }
}

export default connect(mapStateToProps, { getClients, updateClient, deleteClient, setContext })(ClientList);
