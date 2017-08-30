import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withTranslate } from 'react-redux-multilingual'

import Table from '../helpers/Table';

import { getPartners, updatePartner, deletePartner } from './PartnerActions';
import { setContext } from '../base/BaseActions';


class PartnerList extends Component {
    constructor(props, context) {
        super(props, context);

        this._handleDelete = this._handleDelete.bind(this);
        this._toggleActive = this._toggleActive.bind(this);
    }

    componentDidMount() {
        this.props.getPartners();
        this.props.setContext({'type': 'partner', 'id': null});
    }

    render() {
        const { translate } = this.props;

        if (!this.props.partners) {
            return (
                <div>{translate('Loading')}...</div>
            )
        }

        const columns = [{
            Header: 'Name',
            accessor: 'name',
            Cell: props => <Link className="table--link" to={`/partners/${props.original.id}/clients`}>{props.value}</Link>
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
            Cell: props => <span><Link to={`/partners/${props.original.id}/edit`}><i className="fas fa-edit"></i> Edit</Link><button className="button is-link margin-left-5" onClick={() => this._handleDelete(props)}><i className="fas fa-trash"></i> Delete</button></span>
        }]

        return (
            <div>
                <div className="list-header is-clearfix">
                    <h2 className="subtitle">{translate('All partners')} ({this.props.partners.length})</h2>

                    <Link className="button is-primary is-pulled-right" to="/partners/create">{translate('Add')}</Link>
                </div>

                <Table data={this.props.partners} columns={columns} defaultLength={this.props.partners.length}/>
            </div>
        );
    }

    async _handleDelete(id) {
        await this.props.deletePartner(id);
    }

    async _toggleActive({ id, is_active }) {
        await this.props.updatePartner({id, is_active: !is_active});
    }
}

function mapStateToProps({ partners }) {
    return {
        partners: partners.objects,
    }
}


PartnerList = connect(mapStateToProps, { getPartners, updatePartner, deletePartner, setContext })(PartnerList);

PartnerList = withTranslate(PartnerList);

export default PartnerList;
