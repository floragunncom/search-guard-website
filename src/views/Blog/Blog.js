import React, { useState, useEffect } from 'react';
import * as lunr from 'lunr';
import NavBar from '../../components/NavBar/NavBar';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import Pagination from '../../components/Pagination/Pagination';
import Footer from '../../components/Footer/Footer';
import client from '../../components/Client/Client';
import BlogPost from './BlogPost';
import SearchBlogPost from './SearchBlogPost';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [searchResultPosts, setSearchResultPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const fetch = await client
        .getEntries({ content_type: 'post', order: 'sys.createdAt' })
        .then(response => {
          setPosts(response.items);
        });
      setLoading(false);
    };
    fetchPosts();
  }, []);

  function onSearchTermChange(event) {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const searchResultPosts = [];
    const searchResult = searchIndex.search(searchTerm);
    searchResult.map(res => {
      searchResultPosts.push(posts.find(post => post.sys.id === res.ref));
    });
    setSearchResultPosts(searchResultPosts);
  }

  const documents = [];
  posts.map(post => {
    documents.push({
      id: post.sys.id,
      author: post.fields.author,
      title: post.fields.title,
      content: post.fields.postContent,
    });
  });

  const searchIndex = lunr(function() {
    this.ref('id');
    this.field('content');
    this.field('title');
    this.field('author');

    this.pipeline.remove(lunr.stemmer);
    this.searchPipeline.remove(lunr.stemmer);

    documents.forEach(doc => {
      this.add(doc);
    });
  });

  // function searchResult(searchTerm) {
  //   console.log('searchTerm', searchTerm)
  //   let searchResultPosts = [];
  //   const searchResult = searchIndex.search(searchTerm);
  //   searchResult.map(res => {
  //     searchResultPosts.push(posts.find(post => post.sys.id === res.ref));
  //   });
  //   setSearchResultPosts(searchResultPosts);
  //     console.log('searchResultPosts', searchResultPosts)
  // }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  let postResult;

  const paginate = pageNumber => setCurrentPage(pageNumber);

  if (loading) {
    postResult = <div className="searchblogpost-no-results">Loading ...</div>;
  } else {
    postResult = (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="blog-searchbar">
          <div className="row">
            <form>
              <div className="row">
                <div className="input-field col m8 offset-m2 s12 center">
                  <i className="material-icons prefix">search</i>
                  <input
                    id="search"
                    type="text"
                    className="validate dark-blue"
                    onChange={event => onSearchTermChange(event)}
                    placeholder="Search blog ..."
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
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

  if (searchTerm.length > 1) {
    postResult = (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="blog-searchbar">
          <div className="row">
            <form>
              <div className="row">
                <div className="input-field col m8 offset-m2 s12 center">
                  <i className="material-icons prefix">search</i>
                  <input
                    id="icon_prefix"
                    type="text"
                    className="validate"
                    onChange={event => onSearchTermChange(event)}
                    placeholder="Search blog ..."
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div>
          {searchResultPosts.length === 0 ? (
            <div className="searchblogpost-no-results">
              No results for '{searchTerm}'
            </div>
          ) : (
            <div>
              <div className="searchblogpost-result-headline">
                {searchResultPosts.length}{' '}
                {searchResultPosts.length !== 1 ? 'results' : 'result'} found
                for "{searchTerm}"
              </div>
              {searchResultPosts.map((post, index) => {
                return (
                  <div className="col m12 l8 offset-l2 searchblogpost-wrapper">
                    <SearchBlogPost key={index} post={post} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <Title headline="Blog" />
      <div className="row">{postResult}</div>
      <PreFooter />
      <Footer />
    </div>
  );
};

export default Blog;
