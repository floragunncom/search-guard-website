import React from 'react';
import { NavLink } from 'react-router-dom';
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
              <NavLink onClick={() => paginate(number)}>{number}</NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;
