import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import infoArrowForward from '../../images/blog-info-arrow-forward.svg';
import './BlogBox.scss';
import allPosts from '../../Api/contentfulPosts.json';

const BlogBox = ({ overview, headline, randomize, category }) => {
  function shuffle(array) {
    // Fisher-Yates Shuffle
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      const index = Math.floor(Math.random() * counter);
      counter--;
      const temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  let posts;

  if (category !== undefined) {
    posts = allPosts.filter(post =>
        post.fields.tags.includes(category),
    );
  } else {
    posts = allPosts;
  }

  if (randomize) {
    posts = shuffle(posts);
  }

  const startPoint1 = 0;
  const startPoint2 = 3;

  const morePostsButton = overview ? (
    <div className="blog-box-button">
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
          <div className="blog-box-info-link">
            <span>read more</span>
            <img
              src={infoArrowForward}
              className="blogpost-arrow"
              alt="arrow icon"
            />
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
