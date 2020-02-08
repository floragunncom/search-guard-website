import React from 'react';
import { Link } from 'react-router-dom';
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
              <Link
                to={{ pathname: `/blog/page/${number}` }}
                onClick={() => paginate(number)}
              >
                {number}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;
