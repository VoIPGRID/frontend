import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withTranslate } from 'react-redux-multilingual';

import Table from '../helpers/Table';

import { getPartners, updatePartner, deletePartner } from '../../actions/PartnerActions';


class PartnerList extends Component {
    constructor(props, context) {
        super(props, context);

        this._handleDelete = this._handleDelete.bind(this);
        this._toggleActive = this._toggleActive.bind(this);
    }

    componentDidMount() {
        this.props.getPartners();
    }

    async _handleDelete(id) {
        await this.props.deletePartner(id);
    }

    async _toggleActive({ id, is_active }) {
        await this.props.updatePartner({id, is_active: !is_active});
    }

    render() {
        const { translate } = this.props;

        if (!this.props.partners) {
            return (
                <div>{translate('Loading')}...</div>
            )
        }

        const columns = [{
            accessor: 'name',
            Cell: props => <Link className="table--link" to={`/partners/${props.original.id}/clients`}>
                {props.value}</Link>,
            Header: 'Name',
        }, {
            accessor: 'description',
            Header: 'Description',
        }, {
            accessor: 'partner',
            Header: 'Partner',
        }, {
            accessor: 'is_active',
            Header: 'Inactive',
        }, {
            accessor: 'actions',
            Cell: props => <span>
                <Link to={`/partners/${props.original.id}/edit`}>
                    <i className="fas fa-edit" /> Edit
                </Link>
                <button className="button is-link margin-left-5" onClick={() => this._handleDelete(props)}>
                    <i className="fas fa-trash" /> Delete
                </button></span>,
            Header: 'Actions',

        }]

        return (
            <div>
                <div className="list-header is-clearfix">
                    <h2 className="subtitle">{translate('All partners')} ({this.props.partners.length})</h2>

                    <Link className="button is-primary is-pulled-right" to="/partners/create">{translate('Add')}</Link>
                </div>

                <Table data={this.props.partners} columns={columns} defaultLength={this.props.partners.length} />
            </div>
        );
    }
}

function mapStateToProps({ partners }) {
    return {
        partners: partners.objects,
    }
}


PartnerList = connect(mapStateToProps, { deletePartner, getPartners, updatePartner})(PartnerList);

PartnerList = withTranslate(PartnerList);

export default PartnerList;
