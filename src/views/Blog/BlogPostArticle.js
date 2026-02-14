import React from 'react';
import {Redirect} from 'react-router-dom'
import posts from '../../Api/contentfulPosts.json';
import BlogPostArticleContent from '../../components/BlogPost/BlogPostArticleContent';

const BlogPostArticle = ({ match }) => {

  const normalizeSlug = (value) => String(value || '').replace(/^\/+|\/+$/g, '');
  const slug = normalizeSlug(match.url.split('/')[2]);

  const postContent = posts.find(
    (entry) => normalizeSlug(entry.fields.slug) === slug,
  );

  if (!postContent) {
    return (<Redirect to="/404/" />);
  }

  return (
    <BlogPostArticleContent postContent={postContent}/>
  );
};

export default BlogPostArticle;
