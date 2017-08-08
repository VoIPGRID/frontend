import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

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
                    activeButtonClass = 'far fa-pause';
                } else {
                    activeButtonClass = 'far fa-play';
                }

                return (
                    <tr key={partner.id}>
                        <td><Link to={`/clients/partner/${partner.id}`}>{partner.name}</Link></td>
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
                            <Link className="far fa-edit" to={`/partners/${partner.id}/edit`}></Link>
                            <button className="button is-link far fa-trash margin-left-5" onClick={() => this._handleDelete(partner.id)} />
                        </td>
                    </tr>
                )
            });
        }

        return table;
    }

    render() {
        if (!this.props.partners) {
            return (
                <div>Loading...</div>
            )
        }

        return (
            <div>
                <div className="list-header is-clearfix">
                    All partners ({this.props.partners.length})

                    <Link className="button is-primary is-pulled-right" to="/partners/create">Add</Link>
                </div>

                <table className="table is-bordered is-striped">
                    <tbody>
                        <tr>
                            <th>Name</th>
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

export default connect(mapStateToProps, mapDispatchToProps)(PartnerList);
