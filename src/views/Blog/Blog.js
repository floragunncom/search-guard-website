import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import * as lunr from 'lunr';
import {Helmet} from 'react-helmet';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import BlogPost from '../../components/BlogPost/BlogPost';
import SearchBlogPost from '../../components/SearchBlogPost/SearchBlogPost';
import posts from '../../Api/contentfulPosts.json';
import Pagination from '../../components/Pagination/Pagination';
import './Blog.scss';

const Blog = ({ match } ) => {

  const breadcrumb = [
    { anchor: '/', name: 'Home' },
    { anchor: '/resource/', name: 'Resources' },
    { anchor: '/blog/', name: 'Blog' },
  ];

  const { pageNumber } = match.params;
  const currentPage = parseInt(pageNumber, 10) || 1;

  const [searchResultsPresented, setSearchResultsPresented] = useState(false);
  const [categoryResultsPresented, setCategoryResultsPresented] = useState(
    false,
  );
  const [defaultResultsPresented, setDefaultResultsPresented] = useState(true);
  const [searchResultPosts, setSearchResultPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [postsPerPage] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const documentsGeneral = [];

  let canonical = '';
  if ( pageNumber) {
    canonical = `https://search-guard.com/blog/page/${pageNumber}/`
  } else {
    canonical="https://search-guard.com/blog/"
  };

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

  const onClearSearch = () => {
    setSearchResultsPresented(false);
    setDefaultResultsPresented(true);
    setSearchTerm('');
  };

  const searchBar = (
    <div className="blog-searchbar">
      <div className="row">
        <div
          className="input-field col m8 offset-m2 s12 center"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <input
            id="search"
            type="text"
            className="dark-blue blog-search"
            value={searchTerm}
            onChange={value => onSearchTermChange(value)}
            placeholder="Search blog ..."
          />
          {searchResultsPresented ? (
            <div onClick={onClearSearch}>
              <i
                className="material-icons"
                style={{
                  color: '#246E94',
                  opacity: '0.25',
                  cursor: 'pointer',
                }}
              >
                close
              </i>
            </div>
          ) : null}
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
                pathname: `/blog/category/${slug}/`
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
    setSearchResultsPresented(true);
    setDefaultResultsPresented(false);
    setCategoryResultsPresented(false);
    const searchedWord = `${query.target.value.trim()}*`;
    setSearchTerm(query.target.value);
    setSearchQuery(searchedWord);
    const createSearchResultPosts = [];
    const searchResult = searchIndexGeneral.search(searchQuery);
    searchResult.forEach(res => {
      createSearchResultPosts.push(posts.find(post => post.sys.id === res.ref));
    });
    setSearchResultPosts(createSearchResultPosts);
  }

  let renderSearchResultPosts;
  if (searchResultsPresented && !categoryResultsPresented) {
    if (searchQuery.length < 4) {
      renderSearchResultPosts = (
        <div className="searchblogpost-result-headline">
          Please provide more than 2 characters for a proper search result,
          thank you.
        </div>
      );
    } else if (searchResultPosts.length === 0) {
      renderSearchResultPosts = (
        <div className="searchblogpost-no-results">
          No results for &apos;{searchTerm.substring(0, searchTerm.length - 1)}
          &apos;
        </div>
      );
    } else {
      renderSearchResultPosts = (
        <div>
          <div className="searchblogpost-result-headline">
            {searchResultPosts.length}{' '}
            {searchResultPosts.length !== 1 ? 'results' : 'result'} found for
            &apos;{searchTerm}&apos;
          </div>
          {searchResultPosts.map(post => {
            return (
              <div className="col m12 l8 offset-l2 searchblogpost-wrapper">
                <SearchBlogPost key={post.sys.id} post={post} />
              </div>
            );
          })}
        </div>
      );
    }
  }

  let renderPosts;
  if (
    defaultResultsPresented &&
    !searchResultsPresented &&
    !categoryResultsPresented
  ) {
    renderPosts = (
      <div className="blog-wrapper">
        {currentPosts.map(post => {
          return <BlogPost post={post} key={post.sys.id} intro />;
        })}
      </div>
    );
  }

  return (
    <PageWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Official Search Guard blog - news about security for Elasticsearch
        </title>
        <link rel="canonical" href={canonical} />
        <meta
          name="description"
          content="This is the official Search Guard blog. Here you can find articles, guidelines and news about Search Guard, new features and security for Elasticsearch."
        />
      </Helmet>
      <Title headline="Blog" breadcrumb={breadcrumb}/>
      <div className="row">
        {searchBar}
        {renderPosts}
        {renderSearchResultPosts}
      </div>
      {!searchResultsPresented && (
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
        />
      )}
      <PreFooter />
    </PageWrapper>
  );
};

export default Blog;
