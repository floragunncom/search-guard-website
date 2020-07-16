import React from 'react';
import { Link } from 'react-router-dom';
import './BlogTitle.scss';
import posts from '../../Api/contentfulPosts';

const Title = ({ text, subText, tags }) => {
  const renderTags = (
    <div className="blogtitle-sub-text">
      Tags:{' '}
      {tags.map(tag => {
        const slug = tag.replace(/[ /]/g, '-').toLowerCase();
        const categoryPosts = posts.filter(post =>
          post.fields.tags.includes(tag.name),
        );
        return (
          <Link
            to={{
              pathname: `/category/${slug}/`,
              categoryName: tag,
              categoryPosts,
              slug,
            }}
            key={tag}
            className="blogtitle-tag"
          >
            {tag}
          </Link>
        );
      })}
    </div>
  );

  return (
    <div>
      <div className="blogtitle-container">
        <div className="blogtitle-wrapper">
          <h1 className="blogtitle-text">{text}</h1>
        </div>
      </div>
      <div className="blogtitle-subtext-container">
        <div className="blogtitle-sub-text">{subText}</div>
        {renderTags}
      </div>
    </div>
  );
};

export default Title;
