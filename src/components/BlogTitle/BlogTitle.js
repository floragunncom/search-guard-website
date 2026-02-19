import React from 'react';

const Title = ({ text, subText, tags, link, authorProfile, image }) => {
  const currentPageLink = typeof link === 'string' && link.length > 0 ? link : '/';
  const tagList = Array.isArray(tags) ? tags : [];
  const renderTags = (
    <div className="blogtitle-sub-text">
      Tags:{' '}
      {tagList.map(tag => {
        const slug = tag.replace(/[ /]/g, '-').toLowerCase();
        return (
            <a href={`/blog/category/${slug}/`} className="blogtitle-tag" key={tag}>
                {tag}
            </a>
        );
      })}
    </div>
  );

  return (
    <div>
      <div className="blogtitle-container">
        <div className="blogtitle-wrapper">


            <div itemScope itemType="https://schema.org/BreadcrumbList" className="col s12 center breadcrumblist">
                <span itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <a itemProp="item" href="/" className="title-breadcrumb-item">
                        <span itemProp="name">Home {'>'}</span>
                        <meta itemProp="position" content="1"/>
                    </a>
                </span>
                <span itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <a itemProp="item" href="/resource/" className="title-breadcrumb-item">
                        <span itemProp="name">Resources {'>'}</span>
                        <meta itemProp="position" content="2"/>
                    </a>
                </span>
                <span itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <a itemProp="item" href="/blog/" className="title-breadcrumb-item">
                        <span itemProp="name">Blog {'>'}</span>
                        <meta itemProp="position" content="3"/>
                    </a>
                </span>
                <span itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <a itemProp="item" href={currentPageLink} className="title-breadcrumb-item">
                        <span itemProp="name">{text}</span>
                        <meta itemProp="position" content="3"/>
                    </a>
                </span>
            </div>



          <h1 className="blogtitle-text">{text}</h1>
        </div>
      </div>
      <div className="blogtitle-subtext-container">
          {renderTags}
      </div>
    </div>
  );
};

export default Title;
