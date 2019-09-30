import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './BlogPost.scss';
import infoArrowForward from '../../images/blog-info-arrow-forward.svg';

const BlogPost = ({ post, intro }) => {
  const blogPost = post.fields;
  let infoTextLength = 165;
  while (blogPost.postContent[infoTextLength] !== ' ') {
    infoTextLength -= 1;
  }

  let BlogPostContent;
  if (blogPost !== undefined) {
    BlogPostContent = (
      <Link
        to={{ pathname: `/${blogPost.slug}`, state: { status: 302 } }}
        className="blog-link-wrapper"
        onPress={window.scrollTo(0, 0)}
      >
        <div className="blog-image-wrapper">
          <img
            src={blogPost.postImage.fields.file.url}
            className="blogpost-feed-image"
            alt="Post Header"
          />
        </div>
        <div className="blog-text-content">
          <div className="blog-headline">
            {blogPost.title.length < 46
              ? blogPost.title
              : `${blogPost.title.substring(0, 43)}...`}
          </div>
          <div className="blog-info-headline">
            {blogPost.author} || {blogPost.date}
          </div>
          <div className="blog-paragraph">
            {blogPost.postContent.substring(0, infoTextLength)} ...
          </div>
          <div className="blog-info-link">
            <span>read more</span>
            <img
              src={infoArrowForward}
              className="blog-arrow"
              alt="arrow icon"
            />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className={intro ? 'blog-wrapper' : 'blog-wrapper-intro'}>
      {BlogPostContent}
    </div>
  );
};

export default BlogPost;
