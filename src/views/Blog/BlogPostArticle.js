import React from 'react';
import { Helmet } from 'react-helmet';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton,
} from 'react-share';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Markdown from 'markdown-to-jsx';
import BlogTitle from '../../components/BlogTitle/BlogTitle';
import PreFooter from '../../components/PreFooter/PreFooter';
import BlogBox from '../../components/BlogBox/BlogBox';
import Blockquote from '../../components/Blockquote/Blockquote';
import infoArrowBack from '../../images/info-arrow-back.svg';
import iconTwitter from '../../images/icon-tw-loud.svg';
import iconY from '../../images/icon-y-loud.svg';
import iconIn from '../../images/icon-in-loud.svg';
import iconFb from '../../images/icon-fb-loud.svg';
import sgLogo from '../../images/sg_dlic_small.png';
import './BlogPostArticle.scss';
import posts from '../../Api/contentfulPosts.json';

const BlogPostArticle = ({ match }) => {
  const postContent = posts.find(
    entry => entry.fields.slug === `${match.url.substring(1)}`,
  );
  const options = {
    overrides: {
      h1: {
        props: {
          className: 'blogpostarticle-headline1',
        },
      },
      h2: {
        props: {
          className: 'blogpostarticle-headline2',
        },
      },
      h3: {
        props: {
          className: 'blogpostarticle-headline2',
        },
      },
      p: {
        component: 'div',
        props: {
          className: 'blogpostarticle-text',
        },
      },
      b: {
        component: 'div',
        props: {
          className: 'bold',
        },
      },
      i: {
        component: 'div',
        props: {
          className: 'i',
        },
      },
      u: {
        component: 'div',
        props: {
          className: 'underline',
        },
      },
      code: {
        component: 'div',
        props: {
          className: 'blogpostarticle-code-snippet',
          id: 'post-code',
        },
      },
      a: {
        component: 'a',
        props: {
          className: 'blogpostarticle-link',
        },
      },
      li: {
        component: 'div',
        props: {
          className: 'blogpostarticle-listitem',
        },
      },
      img: {
        component: 'img',
        props: {
          className: 'blogpostarticle-image-wrapper blogpostarticle-image',
        },
      },
      blockquote: {
        component: Blockquote,
      },
    },
  };
  if (!postContent) {
    return '';
  }

  return (
    <PageWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{postContent.fields.htmlTitle}</title>
        <link
          rel="canonical"
          href={`https://search-guard.com/${postContent.fields.slug}`}
        />
        <meta name="description" content={postContent.fields.htmlDescription} />
      </Helmet>
      <BlogTitle
        text={postContent.fields.title}
        subText={`${postContent.fields.author} || ${postContent.fields.date}`}
        tags={postContent.fields.tags}
      />
      <div className="row blogpostarticle-wrapper">
        <div className="col s12 offset-l2 l8">
          <Markdown options={options}>
            {postContent.fields.postContent
              .replace(/https:\/\/search-guard\.com/g, '')
              .replace(/http:\/\/localhost:8080/g, '')}
          </Markdown>
        </div>
        <div className="col s12 offset-l1 l1 blogpostarticle-sidebar-container">
          <div className="blogpostarticle-sidebar-title">share</div>
          <div className="blogpostarticle-sidebar-icons-container">
            <FacebookShareButton
              className="blogpostarticle-sidebar-icon"
              url={`https://www.search-guard.com/${postContent.fields.slug}`}
              quote={postContent.fields.title}
            >
              <img src={iconFb} alt="facebook icon" />
            </FacebookShareButton>
            <TwitterShareButton
              className="blogpostarticle-sidebar-icon"
              url={`https://www.search-guard.com/${postContent.fields.slug}`}
              title={postContent.fields.title}
              hastags={postContent.fields.tags}
            >
              <img src={iconTwitter} alt="twitter icon" />
            </TwitterShareButton>
            <LinkedinShareButton
              className="blogpostarticle-sidebar-icon"
              url={`https://www.search-guard.com/${postContent.fields.slug}`}
            >
              <img src={iconIn} alt="linkedIn icon" />
            </LinkedinShareButton>
            <RedditShareButton
              className="blogpostarticle-sidebar-icon"
              url={`https://www.search-guard.com/${postContent.fields.slug}`}
              title={postContent.fields.title}
            >
              <img src={iconY} alt="y icon" />
            </RedditShareButton>
          </div>
        </div>
      </div>
      <BlogBox
        headline="Other posts you may like"
        randomize
        category={postContent.fields.tags[0]}
      />
      <div className="col s12 l4" />
      <div className="col s12 blogpostarticle-link">
        <a href="/blog/" className="blog-back">
          <img
            src={infoArrowBack}
            className="blog-arrow-back"
            alt="arrow icon"
          />
          <span>back to blog</span>
        </a>
      </div>
      <PreFooter />
      <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://www.search-guard.com/${postContent.fields.slug}"
            },            
            "headline": "${postContent.fields.htmlTitle}",
            "description": "${postContent.fields.htmlDescription}",            
            "image": "${postContent.fields.postImage.fields.file.url}",
            "author": {
               "@type": "Person",
               "name": "${postContent.fields.author}"
            },
            "datePublished": "${postContent.fields.date}",
            "dateModified": "${postContent.sys.updatedAt}",
            "publisher": {
              "@type": "Organization",
              "name": "Search Guard",
              "logo": {
                "@type": "ImageObject",
                "url": "${sgLogo}"
              }
            }
          }
        `}</script>
    </PageWrapper>
  );
};

export default BlogPostArticle;
