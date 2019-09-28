import React, { useState } from 'react';
import * as lunr from 'lunr';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NavBar from '../../components/NavBar/NavBar';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import Pagination from '../../components/Pagination/Pagination';
import Footer from '../../components/Footer/Footer';
import BlogPost from './BlogPost';
import SearchBlogPost from './SearchBlogPost';
import infoArrowBack from '../../images/info-arrow-back.svg';

const Blog = ({ posts }) => {
  const [searchResultPosts, setSearchResultPosts] = useState([]);
  const [categoryPosts, setCategoryPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  // posts === undefined ? setLoading(true) : setLoading(false);

  function onSearchTermChange(query) {
    const searchedWord = `${query.target.value.trim()}*`;
    setSearchTerm(searchedWord);
    let searchResultPosts = [];
    const searchResult = searchIndexGeneral.search(searchTerm);
    searchResult.map(res => {
      searchResultPosts.push(posts.find(post => post.sys.id === res.ref));
    });
    setSearchResultPosts(searchResultPosts);
  }

  function onCategoryClick(tag) {
    let categoryPosts = [];
    const categorySearchResult = searchIndexTags.search(tag);
    categorySearchResult.map(res => {
      categoryPosts.push(posts.find(post => post.sys.id === res.ref));
    });
    setCategoryPosts(categoryPosts);
  }

  let documentsGeneral = [];
  let documentsTags = [];
  const fetchTags = {};

  posts.map(post => {
    documentsGeneral.push({
      id: post.sys.id,
      author: post.fields.author,
      title: post.fields.title,
      content: post.fields.postContent,
    });

    documentsTags.push({
      id: post.sys.id,
      tags: post.fields.tags,
    });

    post.fields.tags.map(tag => {
      fetchTags[tag] ? (fetchTags[tag] += 1) : (fetchTags[tag] = 1);
    });
  });

  const searchIndexGeneral = lunr(function() {
    this.ref('id');
    this.field('content');
    this.field('title');
    this.field('author');

    this.pipeline.remove(lunr.stemmer);
    this.searchPipeline.remove(lunr.stemmer);

    documentsGeneral.forEach(doc => {
      this.add(doc);
    });
  });

  const searchIndexTags = lunr(function() {
    this.ref('id');
    this.field('tags');

    this.pipeline.remove(lunr.stemmer);
    this.searchPipeline.remove(lunr.stemmer);

    documentsTags.forEach(doc => {
      this.add(doc);
    });
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  let postsToRender;
  if (loading) {
    postsToRender = <div className="searchblogpost-no-results">Loading ...</div>;
  } else if (searchTerm.length > 1) {
  // if (searchTerm.length > 1) {
    if (searchResultPosts.length === 0) {
      postsToRender = (
        <div className="searchblogpost-no-results">
          No results for "{searchTerm.substring(0, searchTerm.length - 1)}"
        </div>
      );
    } else {
      postsToRender = (
        <div>
          <div className="searchblogpost-result-headline">
            {searchResultPosts.length}{' '}
            {searchResultPosts.length !== 1 ? 'results' : 'result'} found for
            "{searchTerm.substring(0, searchTerm.length - 1)}"
          </div>
          {searchResultPosts.map((post, index) => {
            return (
              <div className="col m12 l8 offset-l2 searchblogpost-wrapper">
                <SearchBlogPost key={index} post={post} />
              </div>
            );
          })}
        </div>
      );
    }
  } else {
    if (categoryPosts.length !== 0) {
      postsToRender = (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            {categoryPosts.map((post, index) => {
              return (
                <div className="col s12 l6 blogpost-column-wrapper">
                  <BlogPost key={index} post={post} intro />
                </div>
              );
            })}
          </div>
          <div className="col s12 blogpost-link">
            <a href="/blog">
              <img src={infoArrowBack} className="blogpost-arrow-back" alt="arrow icon" />
              <span>back to blog</span>
            </a>
          </div>
        </div>
      );
    } else {
      postsToRender = (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            {currentPosts.map((post, index) => {
              return (
                <div className="col s12 l6 blogpost-column-wrapper">
                  <BlogPost key={index} post={post} intro />
                </div>
              );
            })}
          </div>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
          />
        </div>
      );
    }
  }


  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Official Search Guard blog - news about security for Elasticsearch
        </title>
        <meta
          name="description"
          content="This is the official Search Guard blog. Here you can find articles, guidelines and news about Search Guard, new features and security for Elasticsearch."
        />
      </Helmet>
      <NavBar />
      <Title headline="Blog" />
      <div className="row">
        <div>
          <div className="blog-searchbar">
            <div className="row">
              <form>
                <div className="row">
                  <div className="input-field col m8 offset-m2 s12 center">
                    <i className="material-icons prefix">search</i>
                    <input
                      id="search"
                      type="text"
                      className="validate dark-blue blog-search"
                      onChange={query => onSearchTermChange(query)}
                      placeholder="Search blog ..."
                    />
                    {/* <div onPress={query => onClearSearch(query)}>
                      <i className="material-icons">close</i>
                    </div> */}
                  </div>
                </div>
                <div className="row">
                  <div className="blog-tags-headline">tags</div>
                  <div className="blog-tags-wrapper">
                    {Object.keys(fetchTags).map(tag => {
                      const tagUrl = tag
                        .split(' ')
                        .join('-')
                        .toLowerCase();
                      if (fetchTags[tag] > 3) {
                        return (
                          <Link
                            to={`/blog/category/${tagUrl}`}
                            className="blog-tags-tag"
                            onClick={() => onCategoryClick(tag)}
                          >
                            {tag}
                          </Link>
                        );
                      }
                    })}
                  </div>
                </div>
              </form>
            </div>
          </div>
          {postsToRender}
        </div>
      </div>
      <PreFooter />
      <Footer />
    </div>
  );
};

export default Blog;
