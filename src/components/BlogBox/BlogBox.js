import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import infoArrowForward from '../../images/blog-info-arrow-forward.svg';
import './BlogBox.scss';
import posts from '../../Api/contentfulPosts.json';

const BlogBox = ({ overview, headline }) => {
  const startPoint1 = Math.floor(Math.random() * (posts.length - 6));
  const startPoint2 = Math.floor(Math.random() * (posts.length - 6));

  const morePostsButton = overview ? (
    <div className="blogbox-button">
      <Button text="see more" link="/blog/" />
    </div>
  ) : null;

  const textLength = (text, limit) => {
    while (text[limit] !== ' ') {
      limit -= 1;
    }
    return limit;
  };

  const previewPosts = startPoint => {
    return posts.slice(startPoint, startPoint + 3).map(post => {
      const fittedTitle =
        post.fields.title.length > 45
          ? `${post.fields.title.substring(
              0,
              textLength(post.fields.title, 45),
            )} ...`
          : post.fields.title;
      const fittedContent = `${post.fields.htmlDescription.substring(
        0,
        textLength(post.fields.postContent, 160),
      )} ...`;
      return (
        <Link
          to={{ pathname: `/${post.fields.slug}` }}
          onClick={window.scrollTo(0, 0)}
          className="blog-box__box"
          key={post.sys.id}
        >
          <div className="blog-box__box-image-container">
            <img
              src={post.fields.postImage.fields.file.url}
              alt={post.fields.postImage.fields.title}
              className="blog-box__box-image"
            />
          </div>
          <div className="blog-box__box-content">
            <div className="blog-box__box-content-headline">{fittedTitle}</div>
            <div className="blog-box__box-content-info">
              {post.fields.author} || {post.fields.date}
            </div>
            <div className="blog-box__box-content-text">{fittedContent}</div>
          </div>
          <div className="blog-box__box-content-link">
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
    });
  };

  return (
    <div className="blog-box__wrapper" id="blog">
      <div
        className={
          overview ? 'blog-box__headline-overview' : 'blog-box__headline'
        }
      >
        {headline}
      </div>
      <div className={overview ? '' : 'custom-row'} id="blog-box__table">
        {previewPosts(startPoint1)}
      </div>
      {overview ? (
        <div className={overview ? '' : 'custom-row'} id="blog-box__table">
          {previewPosts(startPoint2)}
        </div>
      ) : null}
      {morePostsButton}
    </div>
  );
};

export default BlogBox;
