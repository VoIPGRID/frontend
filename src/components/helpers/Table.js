import React from 'react';
import ReactTable from 'react-table';
import styled from 'styled-components';

import 'react-table/react-table.css';

const Table = ({ columns, data }) => (
  <StyledTable>
    <ReactTable
      data={data}
      columns={columns}
      showPagination={false}
      minRows={0}
    />
  </StyledTable>
);

// Overriding styles from ReactTable package.
const StyledTable = styled.div`
  .ReactTable {
    border: none;

    .rt-tbody {
      background-color: #fff;
    }

    .rt-thead-header {
      box-shadow: none;
    }

    .table--link {
      text-decoration: underline;
      color: ${props => props.theme.primary};
    }

    .rt-thead .rt-resizable-header-content {
      font-weight: 500;
    }

    .rt-td a:hover,
    .rt-td button.is-link:hover {
      color: ${props => props.theme.primary};
    }

    .rt-thead .rt-th:hover,
    .rt-thead .rt-td:hover {
      border-bottom: 2px solid ${props => props.theme.primary};
    }

    .rt-tr-group {
      border-left: solid 2px transparent;
      &:hover {
        border-left: 2px solid ${props => props.theme.primary};
      }
    }

    .rt-thead .rt-th.-sort-desc,
    .rt-thead .rt-td.-sort-desc {
      border-bottom: 2px solid ${props => props.theme.primary};
      box-shadow: none;
    }

    .rt-thead .rt-th.-sort-asc,
    .rt-thead .rt-td.-sort-asc {
      border-top: 2px solid ${props => props.theme.primary};
      box-shadow: none;
    }

    .rt-td:first-child {
      padding-left: 5px;
    }

    .rt-thead .rt-th,
    .rt-thead .rt-td {
      border-bottom: 2px #e6e7eb solid;
    }

    .rt-tr-group {
      line-height: 36px;
    }

    .rt-th,
    .rt-td {
      padding: 5px 10px;
    }

    .rt-td a,
    .rt-td button.is-link {
      color: #2a3042;
    }

    .rt-thead .rt-th.-cursor-pointer,
    .rt-thead .rt-td.-cursor-pointer {
      text-align: left;
    }

    .rt-thead .rt-th,
    .rt-thead .rt-td {
      border-right: none;
    }

    .rt-tbody .rt-tr-group {
      border-bottom: none;
    }
  }
`;

export default Table;
