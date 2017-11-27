import React from 'react';

export default ({ headers = [], data = [] }) => {
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
    </div>
  );
};
