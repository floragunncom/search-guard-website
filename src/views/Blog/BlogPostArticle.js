import React, { Component } from 'react';
import Markdown from 'markdown-to-jsx';
import './BlogPostArticle.scss';
import NavBar from '../../components/NavBar/NavBar';
import BlogTitle from '../../components/BlogTitle/BlogTitle';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
// import quote from '../../images/quote-up.svg';
// import infoArrowBack from '../../images/info-arrow-back.svg';
import iconGoogle from '../../images/icon-google-loud.svg';
import iconTwitter from '../../images/icon-tw-loud.svg';
import iconY from '../../images/icon-y-loud.svg';
import iconIn from '../../images/icon-in-loud.svg';
import iconFb from '../../images/icon-fb-loud.svg';

class BlogPostArticle extends Component {
  constructor() {
    super();
    this.state = {
      content: null,
      documentContent: null,
    };
  }

  componentDidMount() {
    const content = this.props.location.state.content;
    const posts = this.props.location.state.posts;
    const documentContent = content.postContent;
    if (content) {
      this.setState({ content, documentContent });
    }
  }

  render() {
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
        blockquote: {
          component: 'div',
          props: {
            className: 'blogpost-quote-wrapper',

        //     <div className="blogpost-quote-wrapper">
        //     <img src={quote} className="blogpost-quote-image" />
        //     <div className="blogpost-quote-text">{children}</div>
        // </div>
          },
        },
      },
    };

    if (!this.state.content) {
      return <h1>Loading ...</h1>;
    }
    return (
      <div className="blogpost-container">
        <NavBar />
        <BlogTitle
          text={this.state.content.title}
          subText={`${this.state.content.author} || ${this.state.content.date}`}
          tags={this.state.content.tags.join(', ')}
        />
        <div className="row">
          <div className="col s12 offset-l2 l8">
            {/* {documentToReactComponents(this.state.documentContent, options)} */}
            <Markdown options={options}>{this.state.documentContent}</Markdown>
          </div>
          <div className="col s12 offset-l1 l1 blogpost-sidebar-container">
            <div className="blogpost-sidebar-title">share</div>
            <div className="blogpost-sidebar-icons-container">
              <div className="blogpost-sidebar-icon">
                <img src={iconFb} alt="icon" />
              </div>
              <div className="blogpost-sidebar-icon">
                <img src={iconTwitter} alt="icon" />
              </div>
              <div className="blogpost-sidebar-icon">
                <img src={iconIn} alt="icon" />
              </div>
              <div className="blogpost-sidebar-icon">
                <img src={iconY} alt="icon" />
              </div>
              <div className="blogpost-sidebar-icon">
                <img src={iconGoogle} alt="icon" />
              </div>
            </div>
          </div>
          <div className="col s12 blogpost-recommended-headline">
            Other posts you may like
          </div>
          <div className="col s12 l4" />
          {/* <div className="col s12 blogpost-link">
            <a href="/blog">
              <img src={infoArrowBack} className="blogpost-arrow-back" />
              back to blog
            </a>
          </div> */}
        </div>
        <PreFooter />
        <Footer />
      </div>
    );
  }
}

export default BlogPostArticle;
