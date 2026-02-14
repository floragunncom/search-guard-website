import React from 'react';
import arrow from '../../images/blog-info-arrow-forward.svg';

const SEOSection = () => {
  const links = [
    {
      text: 'seo headline 1',
      link: 'https://www.search-guard.com',
    },
    {
      text: 'seo headline 2',
      link: 'https://www.search-guard.com',
    },
    {
      text: 'seo headline 3',
      link: 'https://www.search-guard.com',
    },
    {
      text: 'seo headline 4',
      link: 'https://www.search-guard.com',
    },
    {
      text: 'seo headline 5',
      link: 'https://www.search-guard.com',
    },
    {
      text: 'seo headline 6',
      link: 'https://www.search-guard.com',
    },
    {
      text: 'seo headline 7',
      link: 'https://www.search-guard.com',
    },
    {
      text: 'seo headline 8',
      link: 'https://www.search-guard.com',
    },
    {
      text: 'seo headline 9',
      link: 'https://www.search-guard.com',
    },
    {
      text: 'seo headline 10',
      link: 'https://www.search-guard.com',
    },
    {
      text: 'seo headline 11',
      link: 'https://www.search-guard.com',
    },
    {
      text: 'seo headline 12',
      link: 'https://www.search-guard.com',
    },
    {
      text: 'seo headline 13',
      link: 'https://www.search-guard.com',
    },
    {
      text: 'seo headline 14',
      link: 'https://www.search-guard.com',
    },
    {
      text: 'seo headline 15',
      link: 'https://www.search-guard.com',
    },
  ];

  return (
    <div className="seo-wrapper">
      <div className="row">
        <div className="seo-headline">SEO Section headline</div>
        <div className="seo-content">
          {links.map(link => {
            return (
              <div className="col s12 m4">
                <div className="seo-content-link">
                  <a href={link.link} target="_blank" rel="noopener noreferrer">
                    {link.text}
                  </a>
                  <img
                    src={arrow}
                    alt="arrow icon"
                    className="seo-content-arrow"
                    width="16px" height="16px"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SEOSection;
