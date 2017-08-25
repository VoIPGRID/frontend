import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { withTranslate } from 'react-redux-multilingual'

import { getPartners, updatePartner, deletePartner } from './PartnerActions'


class PartnerList extends Component {
    constructor(props, context) {
        super(props, context);

        this._handleDelete = this._handleDelete.bind(this);
        this._toggleActive = this._toggleActive.bind(this);
    }

    componentDidMount() {
        this.props.getPartners();
    }

    renderTable() {
        let table = <tr><td colSpan="5">No partners</td></tr>

        if (this.props.partners.length) {
            table = this.props.partners.map(partner => {
                let activeButtonClass;

                if (partner.is_active) {
                    activeButtonClass = 'fas fa-pause';
                } else {
                    activeButtonClass = 'fas fa-play';
                }

                return (
                    <tr key={partner.id}>
                        <td><Link to={`/partners/${partner.id}/clients/`}>{partner.name}</Link></td>
                        <td>{partner.description}</td>
                        <td>{partner.partner}</td>
                        <td>
                            <button className="button is-link" onClick={() => this._toggleActive(partner)}>
                                <span className="icon">
                                    <i className={activeButtonClass}></i>
                                </span>
                                <span>
                                    {partner.is_active ? (
                                        <span>Deactivate</span>
                                    ) : (
                                        <span>Activate</span>
                                    )}
                                </span>
                            </button>
                        </td>
                        <td>
                            <Link className="fas fa-edit" to={`/partners/${partner.id}/edit`}></Link>
                            <button className="button is-link fas fa-trash margin-left-5" onClick={() => this._handleDelete(partner.id)} />
                        </td>
                    </tr>
                )
            });
        }

        return table;
    }

    render() {

        const { translate } = this.props;

        if (!this.props.partners) {
            return (
                <div>{translate('Loading')}...</div>
            )
        }

        return (
            <div>
                <div className="list-header is-clearfix">
                    {translate('All partners')} ({this.props.partners.length})

                    <Link className="button is-primary is-pulled-right" to="/partners/create">{translate('Add')}</Link>
                </div>

                <table className="table is-bordered is-striped">
                    <tbody>
                        <tr>
                            <th>{translate('Name')}</th>
                            <th>{translate('Description')}</th>
                            <th>{translate('Related Partner')}</th>
                            <th>{translate('Inactive')}</th>
                            <th className="table-actions">{translate('Acties')}</th>
                        </tr>
                    </tbody>

                    <tbody>
                        {this.renderTable()}
                    </tbody>
                </table>
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getPartners, updatePartner, deletePartner }, dispatch);
}

PartnerList = connect(mapStateToProps, mapDispatchToProps)(PartnerList);

PartnerList = withTranslate(PartnerList);

export default PartnerList;
