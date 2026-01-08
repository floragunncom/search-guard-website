import React from 'react';
import {Link} from 'react-router-dom';
import infoArrowForward from '../../images/blog-info-arrow-forward.svg';
import './BlogPostSmall.scss';

/**
 * Truncates text to a maximum length, breaking at the last space before the limit.
 * Falls back to hard truncation if no space is found.
 *
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text with ellipsis if needed
 */
const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) {
    return text || '';
  }

  // Find the last space before maxLength
  const truncated = text.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  // If we found a space and it's not too far back (at least 50% of maxLength),
  // truncate at the space. Otherwise, hard truncate at maxLength.
  if (lastSpaceIndex > maxLength * 0.5) {
    return truncated.substring(0, lastSpaceIndex) + ' ...';
  }

  // Hard truncate if no reasonable space found
  return truncated + '...';
};

const BlogPost = ({ post }) => {

    // let CDN scale images for blogbox
    const imageParameters = "?fm=jpg&fl=progressive&w=500&fit=scale";

    const blogPost = post.fields;

  if (blogPost !== undefined) {
    return (
      <Link to={`/blog/${blogPost.slug}`} className="blogpost-small-wrapper">
        <div className="blogpost-small-image-wrapper">
          <img
            src={blogPost.postImage.fields.file.url + imageParameters }
            className="blogpost-feed-image"
            alt={blogPost.postImage.fields.title}
            width={500}
          />
        </div>
        <div className="blogpost-headline">
          {truncateText(blogPost.title, 100)}
        </div>
        <div className="blogpost-info-headline">
            {blogPost.date}
        </div>
        <div className="blogpost-info-link">
          <span>read more</span>
          <img
            src={infoArrowForward}
            className="blogpost-arrow"
            alt="arrow icon"
            width="16px" height="16px"
          />
        </div>
      </Link>
    );
  }
};

export default BlogPost;
