import React from 'react';
import { Helmet } from 'react-helmet';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import BlogPost from '../../components/BlogPost/BlogPost';
import infoArrowBack from '../../images/info-arrow-back.svg';
import posts from '../../Api/contentfulPosts.json';
import './BlogCategory.scss';

const BlogCategory = ({ match }) => {
  const categoryName = match.params.slug.replace('-ssl', '/ssl').replace(/-/g, ' ').toLowerCase();
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
          href={`https://search-guard.com/blog/${match.url}`}
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
