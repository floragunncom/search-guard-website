import React, { Component } from 'react';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Link } from 'react-router-dom';
import '../Blog/BlogPostArticle';
import NavBar from '../../components/NavBar/NavBar';
import BlogTitle from '../../components/BlogTitle/BlogTitle';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
// import BlogPost from './BlogPost';
import quote from '../../images/quote-up.svg';
import infoArrowBack from '../../images/info-arrow-back.svg';
import iconGoogle from '../../images/icon-google-loud.svg';
import iconTwitter from '../../images/icon-tw-loud.svg';
import iconY from '../../images/icon-y-loud.svg';
import iconIn from '../../images/icon-in-loud.svg';
import iconFb from '../../images/icon-fb-loud.svg';

class WhitePaperDetail extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     content: null,
  //     documentContent: null,
  //   };
  // }

  // componentDidMount() {
  //   const content = this.props.location.state.content;
  //   const documentContent = content.whitePaperContent;
  //   if (content) {
  //     this.setState({ content, documentContent });
  //   }
  // }

  render() {
    // const options = {
    //   renderMark: {
    //     [MARKS.BOLD]: text => <div className="bold">{text}</div>,
    //     [MARKS.ITALIC]: text => <div className="italic">{text}</div>,
    //     [MARKS.UNDERLINE]: text => <div className="underline">{text}</div>,
    //     [MARKS.CODE]: text => <div className="blogpost-code-snippet">{text}</div>,
    //   },
    //   renderNode: {
    //     [BLOCKS.QUOTE]: (node, children) =>
    //       <div className="blogpost-quote-wrapper">
    //         <img src={quote} className="blogpost-quote-image" />
    //         <div className="blogpost-quote-text">{children}</div>
    //       </div>,
    //     [BLOCKS.PARAGRAPH]: (node, children) => node.content.some(childNode => childNode.nodeType === `text` && childNode.marks.some(mark => mark.type === MARKS.CODE)) ? children : <div className="blogpost-text">{children}</div>,
    //     [BLOCKS.HEADING_1]: (node, children) => <div className="blogpost-headline1">{children}</div>,
    //     [BLOCKS.HEADING_2]: (node, children) => <div className="blogpost-headline2">{children}</div>,
    //     [BLOCKS.EMBEDDED_ASSET]: (node) => (
    //       <div className="blogpost-image-wrapper">
    //         <img className="blogpost-image" src={node.data.target.fields.file.url} />
    //         <div className="blogpost-image-description">{node.data.target.fields.description}</div>
    //       </div>
    //     ),
    //   },
    // };

    // if (!this.state.content) {
    //   return <h1>Loading ...</h1>;
    // }

    return (
      <div className="blogpost-container">
        <NavBar />
        <BlogTitle
          text={this.state.content.title}
          subText={`SEARCH GUARD WHITE PAPER || ${this.state.content.date}`}
        />
        {/* <div className="row">
          <div className="col s12 offset-l2 l8">
            {documentToReactComponents(this.state.documentContent, options)}
          </div>
          <div className="col s12 offset-l1 l1 blogpost-sidebar-container">
            <div className="blogpost-sidebar-title">share</div>
            <div className="blogpost-sidebar-icons-container">
              <div className="blogpost-sidebar-icon">
                <img src={iconFb} />
              </div>
              <div className="blogpost-sidebar-icon">
                <img src={iconTwitter} />
              </div>
              <div className="blogpost-sidebar-icon">
                <img src={iconIn} />
              </div>
              <div className="blogpost-sidebar-icon">
                <img src={iconY} />
              </div>
              <div className="blogpost-sidebar-icon">
                <img src={iconGoogle} />
              </div>
            </div>
          </div>
          <div className="col s12 blogpost-recommended-headline">Other posts you may like</div>
          <div className="col s12 blogpost-link">
            <Link to={'/white-papers'}>
              <img src={infoArrowBack} className="blogpost-arrow-back" />
              back to all white papers
            </Link>
          </div>
        </div> */}
        <PreFooter />
        <Footer />
      </div>
    );
  }
};


export default WhitePaperDetail;
