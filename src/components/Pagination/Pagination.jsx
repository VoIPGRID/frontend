import React from 'react';
import { string, number, shape, func } from 'prop-types';

const pageLinks = ['first', 'prev', 'next', 'last'];

const Pagination = ({ totalCount, per_page = 20, page, links, handler }) => {
  const pageCount = Math.ceil(totalCount / per_page);

  return (
    <div className="pagination">
      <span>
        page {page} of {pageCount}
      </span>
      {pageLinks.filter(v => !!links[v]).map(linkName => (
        <button
          key={linkName}
          onClick={() => {
            handler(links[linkName]);
          }}
        >
          {linkName}
        </button>
      ))}
    </div>
  );
};

Pagination.propTypes = {
  totalCount: number.isRequired,
  link: shape({
    next: string,
    prev: string,
    last: string,
    first: string
  }),
  handler: func.isRequired
};

export default Pagination;
