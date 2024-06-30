import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as lunr from 'lunr';
import { Helmet } from 'react-helmet';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import BlogPost from '../../components/BlogPost/BlogPost';
import SearchBlogPost from '../../components/SearchBlogPost/SearchBlogPost';
import posts from '../../Api/contentfulPosts.json';
import Pagination from '../../components/Pagination/Pagination';
import './Blog.scss';

const Blog = props => {

  const breadcrumb = [
    { anchor: '/', name: 'Home' },
    { anchor: '/resource/', name: 'Resources' },
    { anchor: '/blog/', name: 'Blog' },
  ];

  const [postsPerPage] = useState(10);

  let page;
  if (props.match.params.slug) {
    page = props.match.params.slug
  } else {
    page = 1;
  }

  const indexOfLastPost = page * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const documentsGeneral = [];

  if (posts !== undefined) {
    posts.map(post => {
      documentsGeneral.push({
        id: post.sys.id,
        author: post.fields.author,
        title: post.fields.title,
        content: post.fields.postContent,
      });
    });
  }

  const searchBar = (
    <div className="blog-searchbar">
      <div className="row">
        <div
          className="input-field col m8 offset-m2 s12 center"
          style={{ display: 'flex', alignItems: 'center' }}>

          <form className="blog-search-form" action="/search/" method="GET">
            <input
              id="search"
              type="text"
              className="dark-blue blog-search"
              name="q"
              placeholder="Search blog ..."
            />
          </form>
        </div>
      </div>
    </div>
  );

  const categoryNameTags = () => {
    const tags = [];
    posts.map(post => post.fields.tags.map(tag => tags.push(tag)));
    const tagsObj = tags.map(tagName => {
      return {
        name: tagName,
        count: tags.filter(tag => tag === tagName).length,
      };
    });
    const final = tagsObj.reduce(
      (x, y) => (x.findIndex(e => e.name === y.name) < 0 ? [...x, y] : x),
      [],
    );
    return final.sort((a, b) => b.count - a.count);
  };

  const categories = (
    <div className="blog-categories-wrapper">
      <div className="blog-categories-title">Tags</div>
      <div className="blog-categories-items-wrapper">
        {categoryNameTags().map(tag => {
          const slug = tag.name.replace(/[ /]/g, '-').toLowerCase();
          return (
            <Link
              to={{
                pathname: `/category/${slug}/`
              }}
              key={tag.name}
              className="blog-categories-item"
            >
              {tag.name} ({tag.count})
            </Link>
          );
        })}
      </div>
    </div>
  );

  function onSearchTermChange(query) {

  }

  let  renderPosts = (
      <div className="blog-wrapper">
        {currentPosts.map(post => {
          return <BlogPost post={post} key={post.sys.id} intro />;
        })}
      </div>
    );


  return (
    <PageWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Official Search Guard blog - news about security for Elasticsearch
        </title>
        <link rel="canonical" href="https://search-guard.com/blog/" />
        <meta
          name="description"
          content="This is the official Search Guard blog. Here you can find articles, guidelines and news about Search Guard, new features and security for Elasticsearch."
        />
      </Helmet>
      <Title headline="Blog" breadcrumb={breadcrumb}/>
      <div className="row">
        {searchBar}
        {renderPosts}
      </div>
      <PreFooter />
    </PageWrapper>
  );
};

export default Blog;
