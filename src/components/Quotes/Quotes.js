import React, { Component } from 'react';
import './Quotes.scss';
import M from 'materialize-css';
import quoteUp from '../../images/quote-up.svg';
import quoteDown from '../../images/quote-down.svg';

class Quotes extends Component {
  componentDidMount() {
    const elems = document.querySelectorAll('.slider');
    const options = {
      indicators: true,
      duration: 750,
    };
    M.Slider.init(elems, options);
  }

  render() {
    const quotes = [
      {
        quote:
          'Search Guard met all of our needs and more. Not only have we found open source tools that meet our needs, but we’ve found a partner that’s worked with us through the development of the new platform. They’ve been responsive and engaged every step of the way.',
        author: 'Steve Croce',
        profession: ' Senior Product Manager and Head of User Experience',
        company: 'ObjectRocket',
      },
      {
        quote:
          'Security is paramount to the protection of our customer’s data. ICHEC chose Search Guard to protect its ELK-Stack environment because of its Single Sign-On authentication integration, access control measures and audit features. The licensing model is also flexible enough as we continue to grow our services.',
        author: 'Tim Murphy',
        profession: ' System Administrator',
        company: 'Irish Centre for High-End Computing (ICHEC)',
      },
      {
        quote:
          'Security is the prerequisite for every project in the IT industry, especially when it comes to data. HEAnet chooses Search Guard to protect its ELK cluster because it provides node-to-node encryption (TLS) and more features such as multi-tenancy, compliance, unlike its competitors who only provide security on the REST layer.',
        author: 'Yasvanth Babu',
        profession: 'Middleware System Administrator',
        company: 'HEAnet CLG',
      },
      {
        quote:
          'The Steinbuch Centre for Computing at KIT is using Search Guard to secure Elasticsearch instances operated in the World Wide LHC Computing Grid Tier-1 center "GridKa" and in the Large Scale Data Facility. Without fine-grained access control we would be unable to expose Elasticsearch to individual users or use single instances for both private and public data. The multitenancy features for Kibana offered by Search Guard are specially useful, enabling us to also use Kibana for public dashboards.',
        author: 'Andreas Petzold',
        profession: 'Manager “GridKa” WLCG Tier-1 Center',
        company:
          'Karlsruhe Institute of Technology (KIT) Steinbuch Centre for Computing (SCC)',
      },
      {
        quote:
          'Search Guard makes it possible for us to use the ELK-Stack in a productive environment. We chose Search Guard primarily because of the Active Directory and role-permission features. We find their licensing model incredibly helpful, as well as the fact that we are able to use an unlimited amount of nodes.',
        author: 'Arno Haß',
        profession: 'Project Manager',
        company: 'Max-Delbrück Centre for Molecular Medicine',
      },
      {
        quote:
          'We have chose SearchGuard because it matches our values of technical rigour, openness, and auditability. It is enabled us to ensure that data in transit is secure against eavesdropping in off-prem environments, to implement verifiable and granular access to our Elastic clusters, and most importantly to give our analysts access to restricted data sets with confidence that PII remains protected and confidential.',
        author: 'Tom',
        company: 'Deflect (DDoS protection CDN) & Deflect Labs (DDoS research)',
      },
    ];
    return (
      <div className="quotes-container">
        <div className="row">
          <div className="quotes-headline">What our clients say</div>
          <div className="slider">
            <ul className="slides">
              {quotes.map(quote => {
                return (
                  <li key={quote.author}>
                    <div className="quotes-wrapper">
                      <div className="quotes-left-icon">
                        <img src={quoteUp} alt="icon" />
                      </div>
                      <div className="quotes-quote">
                        <div className="quotes-text">{quote.quote}</div>
                        <div className="quotes-author-name">
                          - {quote.author}
                        </div>
                        <div className="quotes-author-title">
                          {quote.profession}
                        </div>
                        <div className="quotes-author-company">
                          {quote.company}
                        </div>
                      </div>
                      <div className="quotes-right-icon">
                        <img src={quoteDown} alt="icon" />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Quotes;
