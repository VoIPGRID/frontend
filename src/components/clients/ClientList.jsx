import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  getClients,
  updateClient,
  deleteClient
} from '../../actions/ClientActions';

import Table from '../helpers/Table';

class ClientList extends Component {
  componentDidMount() {
    const { partnerId } = this.props.match.params;
    this.props.getClients(partnerId);
  }

  _handleDelete(id) {
    console.log(id);
  }

  _toggleActive({ id, is_active }) {
    this.props.updateClient({ id, is_active: !is_active });
  }

  render() {
    if (!this.props.clients) {
      return <div>Loading...</div>;
    }

    const { partnerId } = this.props.match.params;

    const columns = [
      {
        accessor: 'name',
        Cell: props => (
          <Link
            className="table--link"
            to={`/partners/${partnerId}/clients/${props.original.id}/admin`}
          >
            {props.value}
          </Link>
        ),
        Header: 'Name'
      },
      {
        accessor: 'created',
        Header: 'Created'
      },
      {
        accessor: 'description',
        Header: 'Description'
      },
      {
        accessor: 'partner',
        Header: 'Partner'
      },
      {
        accessor: 'is_active',
        Header: 'Inactive'
      },
      {
        accessor: 'actions',
        Cell: props => (
          <span>
            <Link
              to={`/partners/${partnerId}/clients/${props.original.id}/edit`}
            >
              <i className="fas fa-edit" /> Edit
            </Link>
            <button
              className="button is-link margin-left-5"
              onClick={() => this._handleDelete(props.original.id)}
            >
              <i className="fas fa-trash" /> Delete
            </button>
          </span>
        ),
        Header: 'Actions'
      }
    ];

    return (
      <div>
        <div className="list-header is-clearfix">
          All clients ({this.props.clients.length})
          <Link
            className="button is-primary is-pulled-right"
            to="/clients/create"
          >
            Add
          </Link>
        </div>

        <Table
          data={this.props.clients}
          columns={columns}
          defaultLength={this.props.clients.length}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  clients: state.clients.objects
});

export default connect(mapStateToProps, {
  deleteClient,
  getClients,
  updateClient
})(ClientList);
