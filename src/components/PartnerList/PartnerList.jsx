import React, { Component } from 'react';
import * as queryString from 'query-string';
import { get } from '../../lib/api/';
import DataTable from '../DataTable/';

class PartnerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      headers: ['name', 'description'],
      page: 1,
      per_page: 4
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = (_uri = '/partners') => {
    const extracted = queryString.extract(_uri);
    const base = _uri.replace(extracted, '').replace('?', '');
    const parsed = queryString.parse(extracted);
    const params = Object.assign(
      {},
      {
        page: this.state.page,
        per_page: this.state.per_page
      },
      parsed
    );

    this.setState({
      page: parseInt(params.page, 10),
      per_page: parseInt(params.per_page, 10)
    });

    const uri = `${base}?${queryString.stringify(params)}`;

    get(uri)
      .then(response => {
        const { data, totalCount, links } = response;
        this.setState({ data, totalCount, links, loading: false });
      })
      .catch(err => {
        console.error(err);
        this.setState({ data: [], loading: false });
      });
  };

  render() {
    return <DataTable {...this.state} handler={this.getData} />;
  }
}

export default PartnerList;
