import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '../../components/NavBar/NavBar';
import Title from '../../components/Title/Title';
import Footer from '../../components/Footer/Footer';
import PreFooter from '../../components/PreFooter/PreFooter';
import BlogPost from './BlogPost';
import infoArrowBack from '../../images/info-arrow-back.svg';
import posts from '../../Api/contentfulPosts.json';

const BlogCategory = ({ location }) => {
  const { slug, categoryName } = location;
  const categoryPosts = posts.filter(post =>
    post.fields.tags.includes(categoryName),
  );

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Official Search Guard blog - news about security for Elasticsearch
        </title>
        <link
          rel="canonical"
          href={`https://search-guard.com/blog/category/${slug}/`}
        />
        <meta
          name="description"
          content="This is the official Search Guard blog. Here you can find articles, guidelines and news about Search Guard, new features and security for Elasticsearch."
        />
      </Helmet>
      <NavBar />
      <Title headline={categoryName} />
      <div className="row">
        {categoryPosts.map(post => {
          return (
            <div
              className="col s12 l6 blogpost-column-wrapper"
              key={post.sys.id}
            >
              <BlogPost post={post} />
            </div>
          );
        })}
        <div className="col s12 blogpost-link">
          <a href="/blog/">
            <img
              src={infoArrowBack}
              className="blogpost-arrow-back"
              alt="arrow icon"
            />
            <span>back to blog</span>
          </a>
        </div>
      </div>
      <PreFooter />
      <Footer />
    </div>
  );
};

export default BlogCategory;
