import React from 'react';
import {Helmet} from 'react-helmet-async';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import BlogPost from '../../components/BlogPost/BlogPost';
import Pagination from '../../components/Pagination/Pagination';
import { toSeoDescription, toSeoTitle } from '../../utils/urlUtils';
import { usePageData } from '../../context/PageDataContext';

const Blog = ({ match } ) => {
  const pageData = usePageData();
  const currentPosts = pageData?.posts || [];
  const totalPosts = pageData?.totalPosts || 0;
  const tags = pageData?.tags || [];

  const breadcrumb = [
    { anchor: '/', name: 'Home' },
    { anchor: '/resource/', name: 'Resources' },
    { anchor: '/blog/', name: 'Blog' },
  ];

  const { pageNumber } = match.params;
  const currentPage = parseInt(pageNumber, 10) || 1;
  const isPaginatedView = currentPage > 1;
  const postsPerPage = 10;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

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

  const categories = (
    <div className="blog-categories-wrapper">
      <div className="blog-categories-title">Tags</div>
      <div className="blog-categories-items-wrapper">
        {tags.map(tag => {
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

  const renderPosts = (
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
          totalPosts={totalPosts}
        />

      <div className="blog-wrapper">
        {categories}
      </div>

      <PreFooter />
    </PageWrapper>
  );
};

export default Blog;
