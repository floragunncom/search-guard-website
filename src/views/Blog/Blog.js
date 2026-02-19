import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import * as lunr from 'lunr';
import {Helmet} from 'react-helmet-async';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import BlogPost from '../../components/BlogPost/BlogPost';
import SearchBlogPost from '../../components/SearchBlogPost/SearchBlogPost';
import posts from '../../Api/contentfulPosts.json';
import Pagination from '../../components/Pagination/Pagination';
import { toSeoDescription, toSeoTitle } from '../../utils/urlUtils';

const Blog = ({ match } ) => {

  const breadcrumb = [
    { anchor: '/', name: 'Home' },
    { anchor: '/resource/', name: 'Resources' },
    { anchor: '/blog/', name: 'Blog' },
  ];

  const { pageNumber } = match.params;
  const currentPage = parseInt(pageNumber, 10) || 1;
  const isPaginatedView = currentPage > 1;
  const [postsPerPage] = useState(10);
  const totalPages = Math.ceil(posts.length / postsPerPage);

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

  const pageTitle = isPaginatedView
    ? `Official Search Guard blog - Page ${currentPage}`
    : 'Search Guard Blog: Elasticsearch Security News';

  const pageDescription = isPaginatedView
    ? `Official Search Guard blog page ${currentPage}. Here you can find articles, guidelines and news about Search Guard, new features and security for Elasticsearch.`
    : 'This is the official Search Guard blog. Here you can find articles, guidelines and news about Search Guard, new features and security for Elasticsearch.';
  const seoTitle = toSeoTitle(pageTitle, 60);
  const seoDescription = toSeoDescription(pageDescription, 155);

  const prevPageHref = currentPage > 1
    ? currentPage === 2
      ? 'https://search-guard.com/blog/'
      : `https://search-guard.com/blog/page/${currentPage - 1}/`
    : null;

  const nextPageHref = currentPage < totalPages
    ? `https://search-guard.com/blog/page/${currentPage + 1}/`
    : null;

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
            <a href={`/blog/category/${slug}/`}
              key={tag.name}
              className="blog-categories-item"
            >
              {tag.name} ({tag.count})
            </a>
          );
        })}
      </div>
    </div>
  );

  let renderPosts;

  renderPosts = (
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
        <title>{seoTitle}</title>
        <link rel="canonical" href={canonical} />
        {prevPageHref && <link rel="prev" href={prevPageHref} />}
        {nextPageHref && <link rel="next" href={nextPageHref} />}
        <meta name="description" content={seoDescription} />
      </Helmet>
      <Title headline="Blog" breadcrumb={breadcrumb}/>
      <div className="row">
        
        {renderPosts}

      </div>

        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
        />

      <div className="blog-wrapper">
        {categories}
      </div>

      <PreFooter />
    </PageWrapper>
  );
};

export default Blog;
