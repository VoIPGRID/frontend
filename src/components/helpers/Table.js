import React from 'react';
import ReactTable from 'react-table';
import styled from 'styled-components';

import PropTypes from 'prop-types';

import 'react-table/react-table.css';

/**
 * React Table that returns a table with a given header and data.
 * @public
 * @param {array} columns - Columns array with data for the table header.
 * @param {array} data - Array with data that should be displayed in the table.
 */
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

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array
};

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

    .rt-thead .rt-th.-cursor-pointer:hover,
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
      text-align: left;
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

// This helper can be used to wrap table actions for styling.
export const StyledTableActions = styled.div`
  a {
    text-decoration: none;
  }

  button {
    background: none;
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 15px;
    color: ${props => props.theme.primary};
    margin-left: 10px;
  }
`;
export default Table;
