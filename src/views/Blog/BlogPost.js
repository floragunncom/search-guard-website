import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './BlogPost.scss';
import infoArrowForward from '../../images/blog-info-arrow-forward.svg';

class BlogPost extends Component {
  render() {
    const post = this.props.post.fields;
    const content = post.postContent.content;
    let teaserText = null;
    content.forEach((paragraph) => {
      if (paragraph.nodeType === "paragraph") {
        teaserText = paragraph.content[0].value.slice(0, 80);
        return;
      }
    });

    return (
      <div className="blog-wrapper">
        <Link to={{pathname: `blog/${post.slug}`, state: {content: post}}} className="blog-link-wrapper">
          <div className="blog-image-wrapper">
            <img
              src={post.postImage.fields.file.url}
              className="blogpost-feed-image"
            />
          </div>
          <div className="blog-text-content">
            <div className="blog-headline">
              {post.title}
            </div>
            <div className="blog-info-headline">
              {post.author} || {post.date}
            </div>
            <div className="blog-paragraph">{teaserText} ...</div>
            <div className="blog-info-link">
              read more
              <img src={infoArrowForward} className="blog-arrow" />
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

BlogPost.propTypes = {
  post: PropTypes.object,
};

export default BlogPost;
