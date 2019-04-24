import React from 'react';
import './Quotes.scss';
import Slider from 'react-slick';
import quoteUp from '../../images/quote-up.svg';
import quoteDown from '../../images/quote-down.svg';

const Quotes = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    pauseOnHover: true,
    swipeToSlide: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: dots => (
      <div>
        <div
          style={{
            height: '12px',
            width: '12px',
            borderRadius: '6px',
            color: 'white',
            fontSize: '0px',
            border: '0.5px solid #009688',
          }}
        >
          {dots}
        </div>
      </div>
    ),
  };
  return (
    <div className="quotes-container">
      <div className="row">
        <div className="quotes-headline">What our clients say</div>
        <div className="col s12 quotes-slider">
          <Slider {...settings}>
            <div className="quotes-wrapper">
              <img src={quoteUp} alt="icon" />
              <div className="quotes-text">
                I’ve missed more than 9000 shots in my career. I’ve lost almost
                300 games. 26 times, I’ve been trusted to take the game winning
                shot and missed. I’ve failed over and over and over again in my
                life. And that is why I succeed.
              </div>
              <img src={quoteDown} alt="icon" className="quotes-right-icon" />
              <div className="quotes-author-name">- Michael Jordan</div>
              <div className="quotes-author-title">GOT</div>
              <div className="quotes-author-company">Chicago Bulls</div>
            </div>
            <div className="quotes-wrapper">
              <img src={quoteUp} alt="icon" />
              <div className="quotes-text">Ehöhö ffhm deDaddle diddleli</div>
              <img src={quoteDown} alt="icon" className="quotes-right-icon" />
              <div className="quotes-author-name">- Bahara Mazdak</div>
              <div className="quotes-author-title">deDaddle</div>
              <div className="quotes-author-company">Novili</div>
            </div>
            <div className="quotes-wrapper">
              <img src={quoteUp} alt="icon" />
              <div className="quotes-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
              <img src={quoteDown} alt="icon" className="quotes-right-icon" />
              <div className="quotes-author-name">- Goethe</div>
              <div className="quotes-author-title">Tastenhauer</div>
              <div className="quotes-author-company">was mit Beats</div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
