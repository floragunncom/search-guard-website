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
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua.Utenim ad minim veniam.',
        author: 'Goethe',
        profession: 'Pianist',
        company: 'Wien',
      },
      {
        quote:
          'Security is the prerequisite for every project in the IT industry, especially when it comes to data. HEAnet chooses Search Guard to protect its ELK cluster because it provides node-to-node encryption (TLS) and more features such as multi-tenancy, compliance, unlike its competitors who only provide security on the REST layer.',
        author: 'Yasvanth Babu',
        profession: 'Fuerst',
        company: 'Siemens',
      },
      {
        quote:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua.Utenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        author: 'Peter Müller',
        profession: 'Unternehmer in der Sofware Branche',
        company: 'Middleware System Administrator HEAnet CLG ',
      },
    ];
    return (
      <div className="quotes-container">
        <div className="row">
          <div className="quotes-headline">What our clients say</div>
          <div className="slider">
            <ul className="slides">
              {quotes.map((quote, index) => {
                return (
                  <li key={index}>
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
