import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getVoipAccounts } from '../../../../actions/VoipAccountsActions';

import Table from '../../../helpers/Table';
import LinkButton from '../../../base/LinkButton';

class VoipAccounts extends Component {
  componentDidMount() {
    const { clientId } = this.props.match.params;
    this.props.getVoipAccounts(clientId);
  }

  render() {
    if (!this.props.voipaccounts.length) {
      return <div>Loading...</div>;
    }

    const columns = [
      {
        accessor: 'description',
        Header: 'Description'
      },
      {
        accessor: 'account_id',
        Header: 'Account ID'
      }
    ];

    return (
      <div>
        <div className="list-header is-clearfix">
          All VoIP Accounts ({this.props.voipaccounts.length})
          <LinkButton
            link="phoneaccount/create"
            addClasses="primary pull-right"
          >
            Add
          </LinkButton>
        </div>

        <Table data={this.props.voipaccounts} columns={columns} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  voipaccounts: state.voipaccounts.accounts
});

export default connect(mapStateToProps, { getVoipAccounts })(VoipAccounts);
