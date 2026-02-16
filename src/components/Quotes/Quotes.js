import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import quoteUp from '../../images/quote-up.svg';
import quoteDown from '../../images/quote-down.svg';
import { loadScriptOnce } from '../../utils/loadScriptOnce';

class Quotes extends Component {
  constructor(props) {
    super(props);
    this.sliderRef = React.createRef();
    this.initAttempts = 0;
    this.maxInitAttempts = 20;
    this.initRetryDelayMs = 100;
    this.initTimer = null;
  }

  componentDidMount() {
    loadScriptOnce('/assets/materialize.min.js')
      .then(() => {
        this.initSlider();
      })
      .catch(() => {
        // Show static quotes list if slider script cannot be loaded.
      });
  }

  componentWillUnmount() {
    if (this.initTimer) {
      clearTimeout(this.initTimer);
    }
  }

  initSlider = () => {
    if (!window.M || !this.sliderRef.current) {
      if (this.initAttempts < this.maxInitAttempts) {
        this.initAttempts += 1;
        this.initTimer = setTimeout(this.initSlider, this.initRetryDelayMs);
      }
      return;
    }

    const options = {
      indicators: true,
      duration: 500,
    };
    window.M.Slider.init(this.sliderRef.current, options);
  };

  render() {
    const { t } = this.props;
    const quoteIndices = [0, 1, 2, 3, 4, 5, 6];
    const quotes = quoteIndices.map((i) => ({
      quote: t(`quotes.${i}.quote`),
      author: t(`quotes.${i}.author`),
      profession: t(`quotes.${i}.profession`, { defaultValue: '' }),
      company: t(`quotes.${i}.company`),
    }));

    return (
      <div className="quotes-container color-schema-light default-padding-top-bottom">
        <div className="row">
          <h2 className="quotes-headline">{t('quotes.headline')}</h2>
          <div className="slider" ref={this.sliderRef}>
            <ul className="slides">
              {quotes.map(quote => {
                return (
                  <li key={quote.author}>
                    <div className="quotes-wrapper">
                      <div className="quotes-left-icon">
                        <img loading="lazy" src={quoteUp} alt="quote icon" width="58px" height="51px"/>
                      </div>
                      <div className="quotes-quote">
                        <div className="body-din quotes-text">{quote.quote}</div>
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
                        <img loading="lazy" src={quoteDown} alt="quote icon" width="58px" height="51px" />
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

export default withTranslation('home')(Quotes);
