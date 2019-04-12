import React, { Component} from 'react';
import client from '../../components/Client/Client';
import { Link } from 'react-router-dom';
import './BlogPostArticle.scss';
import NavBar from '../../components/NavBar/NavBar';
import BlogTitle from '../../components/BlogTitle/BlogTitle';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';

class BlogPostArticle extends Component {
  constructor() {
    super();
    this.state = {
      content: null,
    };
  }

  componentDidMount() {
    const content = this.props.location.state.content;
    // this.setState({ post });
    // const {params} = this.props;
    // console.log('params', params);
    if (content && content.slug) {
      // client.getEntries({ contentType: 'post', 'fields.slug': params.slug })
      // .then((response) => {
      //         console.log('response', response);
      this.setState({ content });
    }
  }

  render() {
    function setParagraph (paragraph) {
      return <div>{paragraph.content[0].value}</div>
    }

    if (!this.state.content) {
      return <h1>Loading ...</h1>;
    }
    
    const content = this.state.content.postContent.content;
    console.log(content);
    return (
      <div className="blogpost-container">
        <NavBar />
        <BlogTitle 
          text={this.state.content.title}
          subText={`${this.state.content.author} || ${this.state.content.date}`}
          tags="security, search-guard, installation"
        />
        <div className="row">
          <div className="col s12 offset-l2 l8 offset-l2">
            {content.map(paragraph => {
              switch (paragraph.nodeType) {
                case "paragraph": 
                  const contentType = paragraph.content[0].marks;
                  if (contentType.length === 0) {
                    return <div className="blogpost-text">{paragraph.content[0].value}</div>;
                  }
                  return <div className="blogpost-code-snippet"><code>{paragraph.content[0].value}</code></div>;
                case "heading-1":
                  return <div className="blogpost-headline1">{paragraph.content[0].value}</div>;
                case "heading-2":
                  return <div className="blogpost-headline2">{paragraph.content[0].value}</div>;
                case "heading-3":
                  return <div className="blogpost-headline2">{paragraph.content[0].value}</div>;
                case "blockquote":
                  return <div className="blogpost-quote">{paragraph.content[0].value}</div>;
                case "embedded-asset-block":
                  return (
                    <div className="blogpost-image-wrapper">
                      <img className="blogpost-image" src={paragraph.data.target.fields.file.url}/>
                      <div className="blogpost-image-description">{paragraph.data.target.fields.description}</div>
                    </div>
                  );
                default:
                  return <div className="blogpost-text">{paragraph.content[0].value}</div>;
              }
              if (paragraph.nodeType == "paragraph") {
              }
            })}
            <Link to={'/blog'}>Back</Link>
          </div>
        </div>
        <PreFooter />
        <Footer />
      </div>
    );
  }
};


export default BlogPostArticle;
