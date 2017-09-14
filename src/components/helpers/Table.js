import React from 'react';

import ReactTable from 'react-table';

import '../../assets/style/Table.scss';

const Table = ({columns, data}) => (
    <ReactTable
        data={data}
        columns={columns}
        showPagination={false}
        minRows={0}
    />
)

export default Table;
