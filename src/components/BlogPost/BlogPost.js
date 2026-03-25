import React from 'react';
import { ensureHttps, ensureTrailingSlash } from '../../utils/urlUtils';
import infoArrowForward from '../../images/blog-info-arrow-forward.svg';

const BlogPost = ({ post }) => {

    // let CDN scale images for blogbox
    const imageParameters = "?fm=jpg&fl=progressive&w=500&fit=scale";

    const blogPost = post.fields;

    let infoTextIndexMaxLength = 200;
    let infoHeadlineIndexMaxLength = 120;

    let infoTextIndex = blogPost.htmlDescription.length;
    let infoHeadlineIndex = blogPost.title.length;

    while (blogPost.htmlDescription.length > infoTextIndexMaxLength && blogPost.htmlDescription[infoTextIndex] !== ' ') {
        infoTextIndex -= 1;
    }

    while (blogPost.title.length > infoHeadlineIndexMaxLength && blogPost.title[infoHeadlineIndex] !== ' ') {
        infoHeadlineIndex -= 1;
    }

  if (blogPost !== undefined) {
    return (
      <a href={ `/blog/${ensureTrailingSlash(blogPost.slug)}` } className="blogpost-wrapper">
        <div className="blogpost-image-wrapper">
          <img
            src={ensureHttps(blogPost.postImage.fields.file.url) + imageParameters }
            className="blogpost-feed-image"
            alt={blogPost.postImage.fields.title}
            width={500}
          />
        </div>
        <div className="blogpost-headline">
          {blogPost.title.length < infoHeadlineIndexMaxLength
            ? blogPost.title
            : `${blogPost.title.substring(0, infoHeadlineIndex)} ...`}
        </div>
        <div className="blogpost-info-headline">
          {blogPost.author} || {blogPost.date}
        </div>
        <div className="blogpost-paragraph">
            {blogPost.htmlDescription.length < infoTextIndexMaxLength
                ? blogPost.htmlDescription
                : `${blogPost.htmlDescription.substring(0, infoTextIndex)} ...`}
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
      </a>
    );
  }
};

export default BlogPost;
