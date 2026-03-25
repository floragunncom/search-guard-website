import React from 'react';
import {Helmet} from 'react-helmet-async';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import BlogPost from '../../components/BlogPost/BlogPost';
import infoArrowBack from '../../images/info-arrow-back.svg';
import { toSeoDescription, toSeoTitle } from '../../utils/urlUtils';
import { usePageData } from '../../context/PageDataContext';

const BlogCategory = ({ match }) => {
  const pageData = usePageData();
  const categoryPosts = pageData?.posts || [];

  const categoryFromSlug = match.params.slug.replace('-ssl', '/ssl').replace(/-/g, ' ');
  const categoryDisplayName = categoryFromSlug
    .split(' ')
    .filter(Boolean)
    .map((word) => {
      if (word.startsWith('/')) {
        return word.toUpperCase().replace('/', '');
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');

  const categoryTitle = toSeoTitle(`Search Guard Blog: ${categoryDisplayName} Articles`, 60);
  const categoryDescription = toSeoDescription(
    `Browse ${categoryDisplayName} articles on the official Search Guard blog: Elasticsearch security guides, alerting tips, and product updates.`,
    155
  );

  return (
    <PageWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{categoryTitle}</title>
        <link
          rel="canonical"
          href={`https://search-guard.com${match.url}`}
        />
        <meta name="description" content={categoryDescription} />
      </Helmet>
      <Title headline={categoryDisplayName} />
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
