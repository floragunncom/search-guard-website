import React from 'react';
import {Link} from 'react-router-dom';
import infoArrowForward from '../../images/blog-info-arrow-forward.svg';
import './BlogPostSmall.scss';

const BlogPost = ({ post }) => {

    // let CDN scale images for blogbox
    const imageParameters = "?fm=jpg&fl=progressive&w=500&fit=scale";

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
      <Link to={{ pathname: `/blog/${blogPost.slug}` }} className="blogpost-small-wrapper">
        <div className="blogpost-small-image-wrapper">
          <img
            src={blogPost.postImage.fields.file.url + imageParameters }
            className="blogpost-feed-image"
            alt={blogPost.postImage.fields.title}
            width={500}
          />
        </div>
        <div className="blogpost-headline">
          {blogPost.title.length < 145
            ? blogPost.title
            : `${blogPost.title.substring(0, infoHeadlineIndex)} ...`}
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
