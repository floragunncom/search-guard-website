import React from 'react';
import { Helmet } from 'react-helmet';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton,
} from 'react-share';
import Markdown from 'markdown-to-jsx';
import NavBar from '../../components/NavBar/NavBar';
import BlogTitle from '../../components/BlogTitle/BlogTitle';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import BlogBox from '../../components/BlogBox/BlogBox';
import Blockquote from '../../components/Blockquote/Blockquote';
import infoArrowBack from '../../images/info-arrow-back.svg';
import iconTwitter from '../../images/icon-tw-loud.svg';
import iconY from '../../images/icon-y-loud.svg';
import iconIn from '../../images/icon-in-loud.svg';
import iconFb from '../../images/icon-fb-loud.svg';
import sgLogo from '../../images/sg_dlic_small.png';
import NotFound from '../../views/NotFound/NotFound';
import './BlogPostArticle.scss';

const BlogPostArticle = ({ posts, match }) => {
  const postContent = posts.find(
    entry => entry.fields.slug === `${match.url.substring(1)}`,
  );
  const options = {
    overrides: {
      h1: {
        props: {
          className: 'blogpost-headline1',
        },
      },
      h2: {
        props: {
          className: 'blogpost-headline2',
        },
      },
      h3: {
        props: {
          className: 'blogpost-headline2',
        },
      },
      p: {
        component: 'div',
        props: {
          className: 'blogpost-text',
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
          className: 'blogpost-code-snippet',
          id: 'post-code',
        },
      },
      a: {
        component: 'a',
        props: {
          className: 'blogpost-link',
        },
      },
      li: {
        component: 'div',
        props: {
          className: 'blogpost-listitem',
        },
      },
      img: {
        component: 'img',
        props: {
          className: 'blogpost-image-wrapper blogpost-image',
        },
      },
      blockquote: {
        component: Blockquote,
      },
    },
  };
  if (!postContent) {
    return <NotFound />;
  }

  return (
    <div className="blogpost-container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{postContent.fields.htmlTitle}</title>
        <link
          rel="canonical"
          href={`https://search-guard.com/${postContent.fields.slug}`}
        />
        <meta name="description" content={postContent.fields.htmlDescription} />
      </Helmet>
      <NavBar />
      <BlogTitle
        text={postContent.fields.title}
        subText={`${postContent.fields.author} || ${postContent.fields.date}`}
        tags={postContent.fields.tags.join(', ')}
      />
      <div className="row">
        <div className="col s12 offset-l2 l8">
          {/* {documentToReactComponents(this.state.documentContent, options)} */}
          <Markdown options={options}>
            {postContent.fields.postContent
              .replace(/https\:\/\/search\-guard\.com/g, '')
              .replace(/http\:\/\/localhost\:8080/g, '')}
          </Markdown>
        </div>
        <div className="col s12 offset-l1 l1 blogpost-sidebar-container">
          <div className="blogpost-sidebar-title">share</div>
          <div className="blogpost-sidebar-icons-container">
            {/* <a
              href={`https://twitter.com/intent/tweet?url=https://www.search-guard.com/${postContent.fields.slug}&text=${postContent.fields.title}`}
              target="_blank"
              rel="noopener noreferrer"
              >
              <img src={iconFb} alt="facebook icon" />
            </a> */}
            <FacebookShareButton
              className="blogpost-sidebar-icon"
              url={`https://www.search-guard.com/${postContent.fields.slug}`}
              quote={postContent.fields.title}
              onShareWindowClose
            >
              <img src={iconFb} alt="facebook icon" />
            </FacebookShareButton>
            <TwitterShareButton
              className="blogpost-sidebar-icon"
              url={`https://www.search-guard.com/${postContent.fields.slug}`}
              title={postContent.fields.title}
              hastags={postContent.fields.tags}
              onShareWindowClose
            >
              <img src={iconTwitter} alt="twitter icon" />
            </TwitterShareButton>
            <LinkedinShareButton
              className="blogpost-sidebar-icon"
              url={`https://www.search-guard.com/${postContent.fields.slug}`}
              onShareWindowClose
            >
              <img src={iconIn} alt="linkedIn icon" />
            </LinkedinShareButton>
            <RedditShareButton
              className="blogpost-sidebar-icon"
              url={`https://www.search-guard.com/${postContent.fields.slug}`}
              title={postContent.fields.title}
              onShareWindowClose
            >
              <img src={iconY} alt="y icon" />
            </RedditShareButton>
          </div>
        </div>
      </div>
      <BlogBox headline="Other posts you may like" />
      <div className="col s12 l4" />
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
      <PreFooter />
      <Footer />

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

    </div>
  );
};

export default BlogPostArticle;
