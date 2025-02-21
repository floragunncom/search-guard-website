import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import posts from '../../Api/contentfulPosts.json';
import BlogPostArticleContent from '../../components/BlogPost/BlogPostArticleContent';

const BlogPostArticle = ({ match }) => {

  const location = useLocation();
  const slug = location.pathname.split("/")[2] + "/";

  const postContent = posts.find(
    entry => entry.fields.slug === `${slug}`,
  );

  if (!postContent) {
    return (<Navigate to="/404/" replace />);
  }

  return (
    <BlogPostArticleContent postContent={postContent}/>
  );
};

export default BlogPostArticle;
