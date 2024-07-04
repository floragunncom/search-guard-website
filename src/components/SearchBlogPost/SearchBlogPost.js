import React from 'react';
import { Link } from 'react-router-dom';
import './SearchBlogPost.scss';

const SearchBlogPost = ({ post }) => {
  let previewContentTextLength = 165;
  while (post.fields.postContent[previewContentTextLength] !== ' ') {
    previewContentTextLength -= 1;
  }

  return (
    <Link
      to={{
        pathname: `/blog/${post.fields.slug}`,
      }}
    >
      <div className="searchblogpost-item">
        <div className="searchblogpost-title">{post.fields.title}</div>
        <div className="searchblogpost-author">
          {post.fields.author} || {post.fields.date}
        </div>
        <div className="searchblogpost-content">
          {post.fields.postContent.substring(0, previewContentTextLength)} ...
        </div>
      </div>
    </Link>
  );
};

export default SearchBlogPost;
