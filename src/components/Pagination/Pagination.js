import React from 'react';
import './Pagination.scss';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className="pagination-wrapper">
        {pageNumbers.map(number => {
          return (
            <li key={number} className="pagination-number">
              <a onClick={() => paginate(number)}>{number}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;
