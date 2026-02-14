import React from 'react';

const Pagination = ({ postsPerPage, totalPosts}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className="pagination-wrapper">
        {pageNumbers.map(number => {
          const href = number === 1 ? '/blog/' : `/blog/page/${number}/`;
          return (
            <li key={number} className="pagination-number">
              <a href={href} >
                {number}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;
