import React from 'react';
import  { Redirect } from 'react-router-dom'
import posts from '../../Api/contentfulPosts.json';
import BlogPostArticleContent from '../../components/BlogPost/BlogPostArticleContent';

const BlogPostArticle = ({ match }) => {

  const postContent = posts.find(
    entry => entry.fields.slug === `${match.url.substring(1)}`,
  );

  if (!postContent) {
    return (<Redirect to="/404/" />);
  }

  return (
    <BlogPostArticleContent postContent={postContent}/>
  );
};

export default BlogPostArticle;
