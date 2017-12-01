import React from 'react';
import Pagination from '../Pagination';

export default ({
  headers = [],
  data = [],
  totalCount,
  page = 1,
  per_page,
  links,
  handler
}) => {
  if (0 === data.length) {
    return <div className="loading" />;
  }
  return (
    <div className="data-table">
      <table cellSpacing="0">
        <thead>
          <tr>
            {headers.map((header, index) => <th key={index}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {headers.map((header, index) => (
                <td key={index}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalCount={totalCount}
        links={links}
        handler={handler}
        page={page}
        per_page={per_page}
      />
    </div>
  );
};
