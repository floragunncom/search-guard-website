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
import Blockquote from '../../components/Blockquote/Blockquote';
import infoArrowBack from '../../images/info-arrow-back.svg';
import iconTwitter from '../../images/icon-tw-loud.svg';
import iconY from '../../images/icon-y-loud.svg';
import iconIn from '../../images/icon-in-loud.svg';
import iconFb from '../../images/icon-fb-loud.svg';
import sgLogo from '../../images/sg_dlic_small.png';
import './WhitePaperArticle.scss';
import articles from '../../Api/contentfulWhitepapers.json';
import Button from "../../components/Button/Button";
import pdf from "../../images/pdf-download.svg";

const WhitePaperArticle = ({ match }) => {
  // cannot dynamic require, so we need to define twice :(

  const whitepaperDownloads =
    {
      "hipaa-compliance-elastic-slack/": require("../../downloads/20200831_HIPAA_Elastic_Stack.pdf"),
    };

  const slug = match.url.split("/")[2] + "/";
  const postContent = articles.find(
    entry => entry.fields.slug === `${slug}`,
  );

  const options = {
    overrides: {
      h1: {
        props: {
          className: 'whitepaperarticle-headline1',
        },
      },
      h2: {
        props: {
          className: 'whitepaperarticle-headline2',
        },
      },
      h3: {
        props: {
          className: 'whitepaperarticle-headline2',
        },
      },
      p: {
        component: 'div',
        props: {
          className: 'whitepaperarticle-text',
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
          className: 'whitepaperarticle-code-snippet',
          id: 'post-code',
        },
      },
      a: {
        component: 'a',
        props: {
          className: 'whitepaperarticle-link',
        },
      },
      li: {
        component: 'div',
        props: {
          className: 'whitepaperarticle-listitem',
        },
      },
      img: {
        component: 'img',
        props: {
          className: 'whitepaperarticle-image-wrapper whitepaperarticle-image',
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
        <title>{postContent.fields.title}</title>
        <link
          rel="canonical"
          href={`https://preview.search-guard.com/${postContent.fields.slug}`}
        />
        <meta name="description" content={postContent.fields.description} />

        <meta property="og:title" content={postContent.fields.title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://preview.search-guard.com/${postContent.fields.slug}`} />
        <meta property="og:description" content={postContent.fields.description}/>
        <meta property="og:image" content={postContent.fields.cover.fields.file.url}/>
        <meta property="og:image:alt" content={postContent.fields.description}/>
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@searchguard" />
        <meta name="twitter:site" content="@searchguard" />
      </Helmet>
      <BlogTitle
        text={postContent.fields.title}
        tags={postContent.fields.tags}
      />

      <div className="row whitepaperarticle-wrapper">
        <div className="col s12 offset-l2 l8">
          <div className="flex-center">
            <div className="whitepaperarticle-text flex-center">
              <a
                  href={whitepaperDownloads[slug]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitepapers-button"
              >
                <img
                    src={pdf}
                    alt="download icon"
                    className="whitepapers-button-icon"
                />
                <div className="whitepapers-button-text">Download PDF</div>
              </a>
            </div>
          </div>


          <Markdown options={options}>
            {postContent.fields.content
              .replace(/https:\/\/search-guard\.com/g, '')
              .replace(/http:\/\/localhost:8080/g, '')}
          </Markdown>

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








        </div>
        <div className="col s12 offset-l1 l1 whitepaperarticle-sidebar-container">
          <div className="whitepaperarticle-sidebar-title">share</div>
          <div className="whitepaperarticle-sidebar-icons-container">
            <FacebookShareButton
              className="whitepaperarticle-sidebar-icon"
              url={`https://www.preview.search-guard.com/${postContent.fields.slug}`}
              quote={postContent.fields.title}
            >
              <img src={iconFb} alt="facebook icon" />
            </FacebookShareButton>
            <TwitterShareButton
              className="whitepaperarticle-sidebar-icon"
              url={`https://www.preview.search-guard.com/${postContent.fields.slug}`}
              title={postContent.fields.title}
            >
              <img src={iconTwitter} alt="twitter icon" />
            </TwitterShareButton>
            <LinkedinShareButton
              className="whitepaperarticle-sidebar-icon"
              url={`https://www.preview.search-guard.com/${postContent.fields.slug}`}
            >
              <img src={iconIn} alt="linkedIn icon" />
            </LinkedinShareButton>
            <RedditShareButton
              className="whitepaperarticle-sidebar-icon"
              url={`https://www.preview.search-guard.com/${postContent.fields.slug}`}
              title={postContent.fields.title}
            >
              <img src={iconY} alt="y icon" />
            </RedditShareButton>
          </div>
        </div>
      </div>


      <div className="col s12 l4" />
      <div className="col s12 whitepaperarticle-link">
        <a href="/whitepapers/" className="blog-back">
          <img
            src={infoArrowBack}
            className="blog-arrow-back"
            alt="arrow icon"
          />
          <span>back to whitepapers</span>
        </a>
      </div>



      <PreFooter />
      <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://preview.search-guard.com/whitepapers/${postContent.fields.slug}/"
            },            
            "headline": "${postContent.fields.title}",
            "description": "${postContent.fields.description}",            
            "image": "${postContent.fields.cover.fields.file.url}",
            "author": {
               "@type": "Person",
               "name": "Jochen Kressin"
            },
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

export default WhitePaperArticle;
