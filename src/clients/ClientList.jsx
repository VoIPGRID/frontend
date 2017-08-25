import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { getClients, updateClient, deleteClient } from './ClientActions'


class ClientList extends Component {
    componentDidMount() {
        const { partnerId } = this.props.match.params;
        this.props.getClients(partnerId);
    }

    renderTable() {
        let table = <tr><td colSpan="6">No clients</td></tr>

        if (this.props.clients.length) {
            table = this.props.clients.map(client => {
                return (
                    <tr key={client.id}>
                        <td><Link to={`/clients/${client.id}/admin`}>{client.name}</Link></td>
                        <td>{client.created}</td>
                        <td>{client.description}</td>
                        <td>{client.partner}</td>
                        <td>{client.is_active}</td>
                        <td>
                            <Link className="far fa-edit" to={`/clients/${client.id}/edit`}></Link>
                            <button className="button is-link far fa-trash margin-left-5" onClick={() => this._handleDelete(client.id)} />
                        </td>
                    </tr>
                )
            });
        }

        return table;
    }

    render() {
        if (!this.props.clients) {
            return (
                <div>Loading...</div>
            )
        }

        return (
            <div>
                <div className="list-header is-clearfix">
                    All clients ({this.props.clients.length})

                    <Link className="button is-primary is-pulled-right" to="/clients/create">Add</Link>
                </div>

                <table className="table is-bordered is-striped">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Created on</th>
                            <th>Description</th>
                            <th>Related partner</th>
                            <th>Inactive</th>
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
        this.props.deleteClient(id);
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getClients, updateClient, deleteClient }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);
