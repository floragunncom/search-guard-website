import React from 'react';
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
import './BlogPostArticle.scss';

const BlogPostArticle = props => {
  const postContent = props.posts.find(function(entry) {
    return (
      entry.fields.slug ===
      `${props.match.url.substring(1, props.match.url.length)}`
    );
  });

  // useEffect(() => {
  //   const createPostContent = async () => {
  //     if (props.posts !== []) {
  //     setContent(postContent);
  //   }
  //   };
  //   createPostContent();
  // }, []);

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
          className: 'blogpost-image-wrapper, blogpost-image',
        },
      },
      blockquote: {
        component: Blockquote,
      },
    },
  };

  if (!postContent) {
    return <h1>Loading ...</h1>;
  }
  console.log('postContent', postContent)
  return (
    <div className="blogpost-container">
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
            {postContent.fields.postContent}
          </Markdown>
        </div>
        <div className="col s12 offset-l1 l1 blogpost-sidebar-container">
          <div className="blogpost-sidebar-title">share</div>
          <div className="blogpost-sidebar-icons-container">
            <div className="blogpost-sidebar-icon">
              <img src={iconFb} alt="facebook icon" />
            </div>
            <div className="blogpost-sidebar-icon">
              <img src={iconTwitter} alt="twitter icon" />
            </div>
            <div className="blogpost-sidebar-icon">
              <img src={iconIn} alt="linkedIn icon" />
            </div>
            <div className="blogpost-sidebar-icon">
              <img src={iconY} alt="y icon" />
            </div>
          </div>
        </div>
      </div>
      <BlogBox headline="Other posts you may like" />
      <div className="col s12 l4" />
      <div className="col s12 blogpost-link">
        <a href="/blog">
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
    </div>
  );
};

export default BlogPostArticle;
