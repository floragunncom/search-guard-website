import React from 'react';
import { Navigate, useParams } from 'react-router-dom'
import posts from '../../Api/contentfulPosts.json';
import BlogPostArticleContent from '../../components/BlogPost/BlogPostArticleContent.jsx';

const BlogPostArticle = () => {
  const { slug } = useParams();

  const postContent = posts.find(
    entry => entry.fields.slug === `${slug}/`,
  );

  if (!postContent) {
    return (<Navigate to="/404/" replace />);
  }

  return (
    <BlogPostArticleContent postContent={postContent}/>
  );
};

export default BlogPostArticle;
