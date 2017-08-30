import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getVoipAccounts } from './VoipAccountsActions';

import Table from '../../../helpers/Table';


class VoipAccounts extends Component {
    componentDidMount() {
        const { clientId } = this.props.match.params;
        this.props.getVoipAccounts(clientId);
    }

    render() {
        if (!this.props.voipaccounts.length) {
            return (
                <div>Loading...</div>
            )
        }

        const columns = [{
            Header: 'Description',
            accessor: 'description',
        }, {
            Header: 'Account ID',
            accessor: 'account_id',
        }]

        return (
            <div>
                <div className="list-header is-clearfix">
                    All VoIP Accounts ({this.props.voipaccounts.length})

                    <Link className="button is-primary is-pulled-right" to="phoneaccount/add">Add</Link>
                </div>

                <Table data={this.props.voipaccounts} columns={columns} defaultLength={this.props.voipaccounts.length} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        voipaccounts: state.voipaccounts.accounts
    }
}

export default connect(mapStateToProps, {getVoipAccounts})(VoipAccounts);
