import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withTranslate } from 'react-redux-multilingual';

import Table from '../helpers/Table';
import LinkButton from '../base/LinkButton';
import { StyledTableActions } from '../helpers/Table';

import {
  getPartners,
  // updatePartner,
  deletePartner
} from '../../actions/PartnerActions';

class PartnerList extends Component {
  constructor(props, context) {
    super(props, context);

    this._handleDelete = this._handleDelete.bind(this);
    // this._toggleActive = this._toggleActive.bind(this);
  }

  componentDidMount() {
    this.props.getPartners();
  }

  async _handleDelete(id) {
    await this.props.deletePartner(id);
  }

  // async _toggleActive({ id, is_active }) {
  //   await this.props.updatePartner({ id, is_active: !is_active });
  // }

  render() {
    const { translate } = this.props;

    if (!this.props.partners) {
      return <div>{translate('Loading')}...</div>;
    }

    const columns = [
      {
        accessor: 'name',
        Cell: props => (
          <Link
            className="table--link"
            to={`/partners/${props.original.id}/clients`}
          >
            {props.value}
          </Link>
        ),
        Header: 'Name'
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
          <StyledTableActions>
            <Link to={`/partners/${props.original.id}/edit`}>
              <i className="fas fa-edit" /> Edit
            </Link>
            <button onClick={() => this._handleDelete(props)}>
              <i className="fas fa-trash" /> Delete
            </button>
          </StyledTableActions>
        ),
        Header: 'Actions',
        sortable: false
      }
    ];

    return (
      <div>
        <div className="list-header is-clearfix">
          <h2 className="subtitle">
            {translate('All partners')} ({this.props.partners.length})
          </h2>

          <LinkButton link="/partners/create" addClasses="pull-right">
            {translate('Add')}
          </LinkButton>
        </div>

        <Table
          data={this.props.partners}
          columns={columns}
          defaultLength={this.props.partners.length}
        />
      </div>
    );
  }
}

function mapStateToProps({ partners }) {
  return {
    partners: partners.partners
  };
}

PartnerList = connect(mapStateToProps, {
  deletePartner,
  getPartners
  // updatePartner
})(PartnerList);

export default withTranslate(PartnerList);
