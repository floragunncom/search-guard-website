import React from 'react';
import { Link } from 'react-router-dom';
import infoArrowForward from '../../images/blog-info-arrow-forward.svg';
import './BlogPost.scss';

const BlogPost = ({ post }) => {
  const blogPost = post.fields;
  let infoTextIndex = 165;
  let infoHeadlineIndex = 42;
  while (blogPost.postContent[infoTextIndex] !== ' ') {
    infoTextIndex -= 1;
  }
  while (blogPost.title[infoHeadlineIndex] !== ' ') {
    infoHeadlineIndex -= 1;
  }

  if (blogPost !== undefined) {
    return (
      <Link
        to={{ pathname: `/${blogPost.slug}` }}
        className="blogpost-wrapper"
        onClick={window.scrollTo(0, 0)}
      >
        <div className="blogpost-image-wrapper">
          <img
            src={blogPost.postImage.fields.file.url}
            className="blogpost-feed-image"
            alt={blogPost.postImage.fields.title}
          />
        </div>
        <div className="blogpost-headline">
          {blogPost.title.length < 45
            ? blogPost.title
            : `${blogPost.title.substring(0, infoHeadlineIndex)} ...`}
        </div>
        <div className="blogpost-info-headline">
          {blogPost.author} || {blogPost.date}
        </div>
        <div className="blogpost-paragraph">
          {blogPost.htmlDescription.substring(0, infoTextIndex)} ...
        </div>
        <div className="blogpost-info-link">
          <span>read more</span>
          <img
            src={infoArrowForward}
            className="blogpost-arrow"
            alt="arrow icon"
          />
        </div>
      </Link>
    );
  }
};

export default BlogPost;
