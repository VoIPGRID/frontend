import React, { Component } from 'react';
import { get } from '../../lib/api/';
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
    get('/partners?page=1&per_page=3')
      .then(response => {
        const { data, totalCount, links } = response;
        this.setState({ data, totalCount, links, loading: false });
      })
      .catch(err => {
        console.error(err);
        this.setState({ data: [], loading: false });
      });
  }

  render() {
    return <DataTable {...this.state} />;
  }
}

export default PartnerList;
