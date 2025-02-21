import React from 'react';
import { Navigate } from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {FacebookShareButton, LinkedinShareButton, RedditShareButton, TwitterShareButton,} from 'react-share';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Markdown from 'markdown-to-jsx';
import BlogTitle from '../../components/BlogTitle/BlogTitle';
import PreFooter from '../../components/PreFooter/PreFooter';
import BlogBox from '../../components/BlogBox/BlogBox';
import Blockquote from '../../components/Blockquote/Blockquote';
import CodeBlock from './CodeBlock';
import infoArrowBack from '../../images/info-arrow-back.svg';
import x_twitter from '../../images/x-twitter.svg';
import linkedIn from '../../images/linkedin.svg';
import reddit from '../../images/reddit.svg';
import facebook from '../../images/facebook.svg';
import sgLogo from '../../images/sg_dlic_small.png';
import './BlogPostArticleContent.scss';
import ContactFormSlimOnly from "../../components/ContactFormSuperSlimOnly";
import {ReactSVG} from "react-svg";

const BlogPostArticleContent = ({postContent}) => {

    if (!postContent) {
        return (<Navigate to="/404/" replace/>);
    }

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
                    className: 'blogpostarticle-image-wrapper blogpostarticle-image materialboxed',
                },
            },
            blockquote: {
                component: Blockquote,
            },
            pre: {
                component: CodeBlock,
            },
        },
    };

    let authorProfile = postContent.fields.authorProfile;

    let renderAuthor;
    if (
        authorProfile
    ) {
        renderAuthor = (
            <>

                <div className="col">
                    <a href={`/author/${authorProfile.fields.slug}`}>
                        <img loading="lazy" src={`https:${authorProfile.fields.avatar.fields.file.url}?w=80&fit=scale`}
                             alt={`${authorProfile.fields.avatar.fields.title}`}
                             className="blogpostarticle-avatar"
                             width={80}
                        />
                    </a>
                </div>
                <div className="col">
                <span className="blogpostarticle-authorname">
                  By&nbsp;
                    <a href={`/author/${authorProfile.fields.slug}`}>
                      <b>{authorProfile.fields.firstName} {authorProfile.fields.lastName}</b>
                    </a>
                </span>
                    <div>{authorProfile.fields.position}</div>
                </div>

            </>
        );
    } else {
        renderAuthor = (
            <div className="blogpostarticle-authorname">By <b>{postContent.fields.author}</b></div>
        )
    }
    ;

    let renderAuthorMetaTag;
    if (
        authorProfile
    ) {
        renderAuthorMetaTag = (
            <meta name="author" content={`${authorProfile.fields.firstName} ${authorProfile.fields.lastName}`}/>
        );
    } else {
        renderAuthorMetaTag = (
            <meta name="author" content={`${postContent.fields.author}`}/>
        )
    }
    ;

    let audio;
    let renderAudio = "";

    if (
        postContent.fields.audio
    ) {
        renderAudio = (
            <audio controls src={`${postContent.fields.audio.fields.file.url}`}></audio>
        );
    }

    let video = postContent.fields.video;
    let renderVideo = '';
    if (
        video
    ) {
        renderVideo = '<div className="video-container"> <iframe width="560" height="315" src="' + video.fields.embedUrl + '" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe></div>'
    }
    ;

    let renderVideoJson = '';
    if (
        video
    ) {
        renderVideoJson = `
            {
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "name": "${video.fields.title}",
              "description": "${video.fields.shortDescription}",
              "uploadDate": "${video.fields.publishedAt}",
              "contentUrl": "${video.fields.url}",
              "embedUrl": "${video.fields.embedUrl}",
            }
        `
    }
    ;

    let renderAuthorJson = '';
    if (authorProfile) {
        renderAuthorJson = `
            "author": {
               "@type": "Person",
               "name": "${authorProfile.fields.firstName} ${authorProfile.fields.lastName}",
               "url": "https://search-guard.com/author/${authorProfile.fields.slug}"
            }`
    } else {
        renderAuthorJson = `
            "author": {
               "@type": "Person",
               "name": "${postContent.fields.author}"               
            }`
    }

    return (
        <PageWrapper>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>{postContent.fields.htmlTitle}</title>
                <link
                    rel="canonical"
                    href={`https://search-guard.com/blog/${postContent.fields.slug}`}
                />

                <meta name="description" content={postContent.fields.htmlDescription}/>
                <meta name="copyright" content="floragunn GmbH"/>
                {renderAuthorMetaTag}

                <meta property="og:title" content={postContent.fields.htmlTitle}/>
                <meta property="og:type" content="article"/>
                <meta property="og:url" content={`https://search-guard.com/blog/${postContent.fields.slug}`}/>
                <meta property="og:description" content={postContent.fields.htmlDescription}/>
                <meta property="og:image" content={`https:${postContent.fields.postImage.fields.file.url}`}/>
                <meta property="og:image:alt" content={postContent.fields.title}/>
                <meta property="og:locale" content="en_US"/>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:site" content="@searchguard"/>
                <meta name="twitter:creator" content="@searchguard"/>
                <meta name="twitter:title" content={postContent.fields.htmlTitle}/>
                <meta name="twitter:description" content={postContent.fields.htmlDescription}/>

                <meta name="twitter:image" content={`https:${postContent.fields.postImage.fields.file.url}`}/>
                <meta name="twitter:image:src" content={`https:${postContent.fields.postImage.fields.file.url}`}/>
                <meta name="twitter:image:alt" content={postContent.fields.title}/>

            </Helmet>
            <BlogTitle
                text={postContent.fields.title}
                subText={`${postContent.fields.author} `}
                tags={postContent.fields.tags}
                link={`/blog/${postContent.fields.slug} `}
                authorProfile={postContent.fields.authorProfile}
                image={postContent.fields.postImage.fields.file.url}
            />

            <div className="row blogpostarticle-wrapper blogpostarticle-author">
                <div className="col s12 l8 offset-l2 center">
                    <img loading="lazy"
                         src={postContent.fields.postImage.fields.file.url + "?fm=jpg&fl=progressive&w=800&fit=scale"}
                         className="blogpostarticle-headerimage responsive-img"
                         alt={postContent.fields.title}
                         width={800}
                    />
                </div>
            </div>

            <div className="row blogpostarticle-wrapper blogpostarticle-author">

                <div className="col s12 offset-l2 l8">
                    <div className="col s12 l6">
                        {renderAuthor}
                    </div>
                    <div className="col s12 l6">
                        {renderAudio}
                    </div>
                </div>
            </div>

            <div className="row blogpostarticle-wrapper">
                <div className="col s12 offset-l2 l8">

                    <Markdown options={options}>
                        {postContent.fields.postContent
                            .replace('<video/>', renderVideo)
                            .replace(/https:\/\/search-guard\.com/g, '')
                            .replace(/http:\/\/localhost:8080/g, '')}
                    </Markdown>
                    <div className="blogpostarticle-text">Published: {postContent.fields.date}</div>
                </div>

                <div className="col s12 offset-l1 l1 blogpostarticle-sidebar-container">
                    <div className="blogpostarticle-sidebar-title"></div>
                    <div className="blogpostarticle-sidebar-icons-container">
                        <FacebookShareButton
                            className="blogpostarticle-sidebar-icon"
                            url={`https://www.search-guard.com/blog/${postContent.fields.slug}`}
                            quote={postContent.fields.title}>
                            <ReactSVG src={facebook}
                                      alt="Share on facebook"
                                      className="blogpostarticle-share-icon"
                                      beforeInjection={(svg) => {
                                          svg.querySelectorAll('*').forEach((element) => {
                                              element.removeAttribute('fill');
                                          });
                                          svg.setAttribute('class', "blogpostarticle-share-icon");
                                        }
                                      }
                            />
                        </FacebookShareButton>
                        <TwitterShareButton
                            className="blogpostarticle-sidebar-icon"
                            url={`https://www.search-guard.com/blog/${postContent.fields.slug}`}
                            title={postContent.fields.title}
                            hastags={postContent.fields.tags}>
                            <ReactSVG src={x_twitter}
                                      alt="Share on X/Twitter"
                                      className="blogpostarticle-share-icon"
                                      beforeInjection={(svg) => {
                                          svg.querySelectorAll('*').forEach((element) => {
                                              element.removeAttribute('fill');
                                          });
                                          svg.setAttribute('class', "blogpostarticle-share-icon");
                                        }
                                      }
                            />
                        </TwitterShareButton>
                        <LinkedinShareButton
                            className="blogpostarticle-sidebar-icon"
                            url={`https://www.search-guard.com/blog/${postContent.fields.slug}`}>
                            <ReactSVG src={linkedIn}
                                      alt="Share on LinkedIn"
                                      className="blogpostarticle-share-icon"
                                      beforeInjection={(svg) => {
                                          svg.querySelectorAll('*').forEach((element) => {
                                              element.removeAttribute('fill');
                                          });
                                          svg.setAttribute('class', "blogpostarticle-share-icon");
                                        }
                                      }
                            />
                        </LinkedinShareButton>
                        <RedditShareButton
                            className="blogpostarticle-sidebar-icon"
                            url={`https://www.search-guard.com/blog/${postContent.fields.slug}`}
                            title={postContent.fields.title}
                        >
                            <ReactSVG src={reddit}
                                      alt="Share on LinkedIn"
                                      className="blogpostarticle-share-icon"
                                      beforeInjection={(svg) => {
                                          svg.querySelectorAll('*').forEach((element) => {
                                              element.removeAttribute('fill');
                                          });
                                          svg.setAttribute('class', "blogpostarticle-share-icon");
                                      }
                                      }
                            />
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
                postsyoulike={true}
                randomize={true}
                category={postContent.fields.tags[0]}
            />

            <div className="col s12 l4"/>

            <div className="col s12 blogpostarticle-link">
                <a href="/blog/" className="blog-back ">
                    <img
                        src={infoArrowBack}
                        className="blog-arrow-back"
                        alt="arrow icon"
                        width="16px" height="16px"
                    />
                    <span>back to blog</span>
                </a>
            </div>

            <PreFooter/>

            <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://search-guard.com/blog/${postContent.fields.slug}"
            },            
            "headline": "${postContent.fields.title}",
            "description": "${postContent.fields.htmlDescription}",            
            "image": "${postContent.fields.postImage.fields.file.url}",
               ${renderAuthorJson},
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

            <script type="application/ld+json">
                {renderVideoJson}
            </script>

        </PageWrapper>
    );
};

export default BlogPostArticleContent;
