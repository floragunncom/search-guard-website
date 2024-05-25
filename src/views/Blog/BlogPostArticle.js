import React from 'react';
import  { Redirect } from 'react-router-dom'
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
import ContactFormSlimOnly from "../../components/ContactFormSuperSlimOnly";

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
          className: 'blogpostarticle-headline3',
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
    return (<Redirect to="/404/" />);
  }

  let authorProfile = postContent.fields.authorProfile;

  let renderAuthor;
  if (
      authorProfile
  ) {
    renderAuthor = (
        <>
          <div className="row">
            <div className="col">
              <a href={`/authors/${authorProfile.fields.slug}`}>
                <img src={`https:${authorProfile.fields.avatar.fields.file.url}?w=80&fit=scale`}
                     alt={`${authorProfile.fields.avatar.fields.title}`}
                     className="blogpostarticle-avatar"/>
              </a>
            </div>
            <div className="col">
                <span className="blogpostarticle-authorname">
                  By&nbsp;
                  <a href={`/authors/${authorProfile.fields.slug}`}>
                      <b>{authorProfile.fields.firstName} {authorProfile.fields.lastName}</b>
                    </a>
                </span>
              <div>{authorProfile.fields.position}</div>
            </div>
          </div>
        </>
    );
  } else {
    renderAuthor = (
        <div className="blogpostarticle-authorname">By <b>{postContent.fields.author}</b></div>
    )
  };

  let renderAuthorMetaTag;
  if (
      authorProfile
  ) {
    renderAuthorMetaTag = (
        <>
          <meta name="description" content={`${authorProfile.fields.firstName} ${authorProfile.fields.lastName}`} />
        </>
    );
  } else {
    renderAuthorMetaTag = (
        <meta name="description" content={`${postContent.fields.author}`} />
    )
  };

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

        <meta property="og:title" content={postContent.fields.htmlTitle} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://search-guard.com/${postContent.fields.slug}`} />
        <meta property="og:description" content={postContent.fields.htmlDescription}/>
        <meta property="og:image" content={`https:${postContent.fields.postImage.fields.file.url}`}/>
        <meta property="og:image:alt" content={postContent.fields.htmlDescription}/>
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:site" content="@searchguard"/>
        <meta name="twitter:creator" content="@searchguard"/>
        <meta name="twitter:title" content={postContent.fields.htmlTitle} />
        <meta name="twitter:description" content={postContent.fields.htmlDescription} />

        <meta name="twitter:image" content={`https:${postContent.fields.postImage.fields.file.url}`} />
        <meta name="twitter:image:src" content={`https:${postContent.fields.postImage.fields.file.url}`} />
        <meta name="twitter:image:alt" content={`https:${postContent.fields.postImage.fields.file.url}`} />

        {renderAuthorMetaTag}

      </Helmet>
      <BlogTitle
        text={postContent.fields.title}
        subText={`${postContent.fields.author} `}
        tags={postContent.fields.tags}
        link={postContent.fields.slug}
        authorProfile={postContent.fields.authorProfile}
      />
      <div className="row blogpostarticle-wrapper blogpostarticle-author">
        <div className="col s12 offset-l2 l8">
          {renderAuthor}
        </div>
      </div>

      <div className="row blogpostarticle-wrapper">
        <div className="col s12 offset-l2 l8">
          <Markdown options={options}>
            {postContent.fields.postContent
              .replace(/https:\/\/search-guard\.com/g, '')
              .replace(/http:\/\/localhost:8080/g, '')}
          </Markdown>
          <div className="blogpostarticle-text">Published: {postContent.fields.date}</div>


          {/*
          <div>
            <div className="flex-center">
              <div className="col m6 s12 flex-center">
                <div className="valign-wrapper">
                  <Button
                      text="start free trial"
                      link="/search-guard-free-trial/"
                  />
                </div>
              </div>

              <div className="col m6 s12 flex-center ">
                <div className="valign-wrapper">
                  <Button
                      text="Contact us!"
                      link="/contacts/"
                  />
                </div>
              </div>
            </div>
          </div>
           */}

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

      <div className="row blogpostarticle-wrapper">
        <div className="col s12 offset-l2 l8">
          <div>
            <div className="flex-center blogpostarticle-headline2">
              Questions? Drop us a line!
            </div>
          </div>
          <ContactFormSlimOnly/>
        </div>
      </div>

      <BlogBox
        headline="Other posts you may like"
        postsyoulike
        randomize
        category={postContent.fields.tags[0]}
      />

      <div className="col s12 l4" />

      <div className="col s12 blogpostarticle-link">
        <a href="/blog/" className="blog-back ">
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
              "@id": "https://search-guard.com/${postContent.fields.slug}/"
            },            
            "headline": "${postContent.fields.title}",
            "description": "${postContent.fields.htmlDescription}",            
            "image": "${postContent.fields.postImage.fields.file.url}",
            "author": {
               "@type": "Person",
               "name": "${postContent.fields.author}",
               "url": "https://search-guard.com/authors/${postContent.fields.slug}/"
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
