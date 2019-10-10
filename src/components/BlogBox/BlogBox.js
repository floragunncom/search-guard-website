import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { BlogContext } from '../../contexts/BlogContext';
import infoArrowForward from '../../images/blog-info-arrow-forward.svg';
import './BlogBox.scss';

const BlogBox = ({ teaser, headline }) => {
  const posts = useContext(BlogContext);
  const startPoint = Math.floor(Math.random() * posts.length - 6);
  const endPoint = teaser ? startPoint + 6 : startPoint + 3;

  const morePostsButton = teaser ? (
    <div className="blogbox-button">
      <Button text="see more" link="/blog/" />
    </div>
  ) : null;

  function titleLength(title) {
    let titleChars = 45;
    if (title.length < 46) {
      while (title[titleChars] !== ' ') {
        titleChars -= 1;
      }
    }
    return titleChars;
  }

  function textLength(content) {
    let contentChars = 165;
    while (content[contentChars] !== ' ') {
      contentChars -= 1;
    }
    return contentChars;
  }

  return (
    <div className="boxblog-wrapper" id="blog">
      <div className={teaser ? 'boxblog-headline-intro' : 'boxblog-headline'}>
        {headline}
      </div>
      <div className="boxblog-posts">
        {posts.slice(startPoint, endPoint).map(post => {
          return (
            <Link
              to={{ pathname: `/${post.fields.slug}` }}
              className="blogbox-post-wrapper"
              onPress={window.scrollTo(0, 0)}
            >
              <div className="blog-image-wrapper">
                <img
                  src={post.fields.postImage.fields.file.url}
                  className="blogpost-feed-image"
                  alt={post.fields.postImage.fields.title}
                />
              </div>
              <div className="blog-text-content">
                <div className="blog-headline">
                  {post.fields.title.substring(
                    0,
                    titleLength(post.fields.title),
                  )}
                </div>
                <div className="blog-info-headline">
                  {post.fields.author} || {post.fields.date}
                </div>
                <div className="blog-paragraph">
                  {post.fields.postContent.substring(
                    0,
                    textLength(post.fields.postContent),
                  )}
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
        })}
      </div>
      {morePostsButton}
    </div>
  );
};

export default BlogBox;
