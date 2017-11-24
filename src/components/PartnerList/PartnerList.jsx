import React, { Component } from 'react';
import api from '../../lib/api';
import DataTable from '../DataTable/';

class PartnerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      headers: ['name', 'description']
    };
  }

  componentDidMount() {
    api('/partners').then(data => {
      this.setState({ data });
    });
  }

  render() {
    return <DataTable {...this.state} />;
  }
}

export default PartnerList;
