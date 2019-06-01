import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './WhitePapers.scss';
import infoArrowForward from '../../images/blog-info-arrow-forward.svg';

class WhitePaper extends Component {
  render() {
    const whitePaper = this.props.whitePaper.fields;
    const content = whitePaper.whitePaperContent.content;
    console.log(content)
    // const relatedPosts = this.props.relatedPosts;
    const teaserText = null;
    // content.forEach((paragraph) => {
    //   if (paragraph.nodeType === "paragraph") {
    //     teaserText = paragraph.content[0].value.slice(0, 80);
    //     return;
    //   }
    // });
    return (
      <div className="blog-wrapper">
        <Link
          to={{
            pathname: `white-papers/${whitePaper.slug}`,
            state: { content: whitePaper },
          }}
          className="blog-link-wrapper"
        >
          <div className="blog-image-wrapper">
            <img
              src={whitePaper.cover.fields.file.url}
              className="blogpost-feed-image"
            />
          </div>
          <div className="blog-text-content">
            <div className="blog-headline">{whitePaper.title}</div>
            <div className="blog-info-headline">
              {whitePaper.author} || {whitePaper.date}
            </div>
            {/* <div className="blog-paragraph">{teaserText} ...</div> */}
            <div className="blog-info-link">
              read more
              <img src={infoArrowForward} className="blog-arrow" />
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

WhitePaper.propTypes = {
  whitePaper: PropTypes.object,
};

export default WhitePaper;
