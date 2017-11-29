import React from 'react';

export default ({ headers = [], data = [], totalCount, links }) => {
  if (0 === data.length) {
    return <div className="loading" />;
  }
  return (
    <div className="data-table">
      <div>total count: {totalCount}</div>
      <div>
        links:{' '}
        {Object.keys(links).map(link => (
          <div key={link}>
            {link}:
            {links[link]}
          </div>
        ))}
      </div>
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
