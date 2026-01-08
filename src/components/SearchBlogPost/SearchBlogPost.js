import React from 'react';
import {Link} from 'react-router-dom';
import './SearchBlogPost.scss';

/**
 * Truncates text to a maximum length, breaking at the last space before the limit.
 * Falls back to hard truncation if no space is found.
 */
const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) {
    return text || '';
  }

  const truncated = text.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  if (lastSpaceIndex > maxLength * 0.5) {
    return truncated.substring(0, lastSpaceIndex) + ' ...';
  }

  return truncated + '...';
};

const SearchBlogPost = ({ post }) => {
  return (
    <Link to={`/blog/${post.fields.slug}`}>
      <div className="searchblogpost-item">
        <div className="searchblogpost-title">{post.fields.title}</div>
        <div className="searchblogpost-author">
          {post.fields.author} || {post.fields.date}
        </div>
        <div className="searchblogpost-content">
          {truncateText(post.fields.postContent, 165)}
        </div>
      </div>
    </Link>
  );
};

export default SearchBlogPost;
