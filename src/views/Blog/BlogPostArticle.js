import React from 'react';
import {Redirect} from 'react-router-dom'
import { usePageData } from '../../context/PageDataContext';
import BlogPostArticleContent from '../../components/BlogPost/BlogPostArticleContent';

const BlogPostArticle = ({ match }) => {
  const pageData = usePageData();
  const postContent = pageData?.post || null;

  if (!postContent) {
    return (<Redirect to="/404/" />);
  }

  return (
    <BlogPostArticleContent postContent={postContent} relatedPosts={pageData?.relatedPosts} />
  );
};

export default BlogPostArticle;
