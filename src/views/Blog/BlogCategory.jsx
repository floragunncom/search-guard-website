import React from 'react';
import {Helmet} from 'react-helmet-async';
import {useParams, useLocation} from 'react-router-dom';
import PageWrapper from '../../components/PageWrapper/PageWrapper.jsx';
import Title from '../../components/Title/Title.jsx';
import PreFooter from '../../components/PreFooter/PreFooter.jsx';
import BlogPost from '../../components/BlogPost/BlogPost.jsx';
import infoArrowBack from '../../images/info-arrow-back.svg';
import posts from '../../Api/contentfulPosts.json';
import './BlogCategory.scss';

const BlogCategory = () => {
  const { slug } = useParams();
  const location = useLocation();

  const categoryName = slug.replace('-ssl', '/ssl').replace(/-/g, ' ').toLowerCase();
  const categoryPosts = posts.filter(post => {
    const tagsToLowercase = post.fields.tags.map(tag => tag.toLowerCase());
    return tagsToLowercase.includes(categoryName)
  });

  return (
    <PageWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Official Search Guard blog - news about security for Elasticsearch
        </title>
        <link
          rel="canonical"
          href={`https://search-guard.com${location.pathname}`}
        />
        <meta
          name="description"
          content="This is the official Search Guard blog. Here you can find articles, guidelines and news about Search Guard, new features and security for Elasticsearch."
        />
      </Helmet>
      <Title headline={categoryName} />
      <div className="blog-wrapper">
        {categoryPosts.map(post => {
          return <BlogPost key={post.sys.id} post={post} />;
        })}
      </div>
      <div className="col s12 blogpost-link">
        <a href="/blog/" className="blog-back">
          <img
            src={infoArrowBack}
            className="blog-arrow-back"
            alt="arrow back icon"
            width={16}
            height={16}
          />
          <span>back to blog</span>
        </a>
      </div>
      <PreFooter />
    </PageWrapper>
  );
};

export default BlogCategory;
