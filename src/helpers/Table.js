import React from 'react';

import ReactTable from 'react-table';

import '../assets/style/Table.scss';

const Table = ({columns, data, defaultLength}) => {
    return (
        <ReactTable
            data={data}
            columns={columns}
            defaultPageSize={defaultLength}
            showPagination={false}
        />
    )
}

export default Table;
