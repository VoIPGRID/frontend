import React, { Component } from 'react';
import { get } from '../../lib/api';
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
    get('/partners?page=1&per_page=3').then(data => {
      this.setState({ data });
    });
  }

  render() {
    return <DataTable {...this.state} />;
  }
}

export default PartnerList;
