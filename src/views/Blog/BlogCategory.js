import React from 'react';
import {Helmet} from 'react-helmet-async';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import BlogPost from '../../components/BlogPost/BlogPost';
import infoArrowBack from '../../images/info-arrow-back.svg';
import posts from '../../Api/contentfulPosts.json';

const BlogCategory = ({ match }) => {
  const categoryFromSlug = match.params.slug.replace('-ssl', '/ssl').replace(/-/g, ' ');
  const categoryName = categoryFromSlug.toLowerCase();
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

  const categoryTitle = `Search Guard Blog - ${categoryDisplayName} Articles`;
  const categoryDescription = `Browse ${categoryName}-related articles on the Search Guard blog.`;
  const categoryPosts = posts.filter(post => {
    const tagsToLowercase = post.fields.tags.map(tag => tag.toLowerCase());
    return tagsToLowercase.includes(categoryName)
  });

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
