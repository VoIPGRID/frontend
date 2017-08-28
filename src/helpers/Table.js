import React from 'react';

import ReactTable from 'react-table';

import '../assets/style/table.scss';

const Table = ({columns, data, defaultLength}) => {
    console.log(data)
    return (
        <ReactTable
            data={data}
            columns={columns}
            defaultPageSize={defaultLength}
            showPagination={false}
            className={'table'}
        />
    )
}

export default Table;
