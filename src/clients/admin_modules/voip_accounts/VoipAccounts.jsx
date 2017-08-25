import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getVoipAccounts } from './VoipAccountsActions'


class VoipAccounts extends Component {
    componentDidMount() {
        const { clientId } = this.props.match.params;
        this.props.getVoipAccounts(clientId);
    }

    renderTable() {
        let table = <tr><td colSpan="6">No VoIP accounts</td></tr>

        if (this.props.voipaccounts.length) {
            table = this.props.voipaccounts.map(voipaccount => {
                return (
                    <tr key={voipaccount.account_id}>
                        <td>{voipaccount.description}</td>
                        <td>{voipaccount.account_id}</td>
                    </tr>
                )
            });
        }

        return table;
    }

    render() {
        if (!this.props.voipaccounts) {
            return (
                <div>Loading...</div>
            )
        }

        return (
            <div>
                <div className="list-header is-clearfix">
                    All VoIP Accounts ({this.props.voipaccounts.length})

                    <Link className="button is-primary is-pulled-right" to="phoneaccount/add">Add</Link>
                </div>

                <table className="table is-bordered is-striped">
                    <tbody>
                        <tr>

                            <th>Description</th>
                            <th>Account ID</th>
                        </tr>
                    </tbody>

                    <tbody>
                        {this.renderTable()}
                    </tbody>
                </table>
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
