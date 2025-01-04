import React from 'react';
import './References.scss';
import heanet from '../../images/logo-heanet.svg';
import harvard from '../../images/logo-harvard.svg';
import kit from '../../images/logo-kit.svg';
import seges from '../../images/logo-seges.svg';
import deflect from '../../images/logo-deflect.svg';
import princeton from '../../images/logo-princeton.svg';
import koc from '../../images/logo-koc.svg';
import mdc from '../../images/logo-mdc.svg';
import laval from '../../images/logo-laval.svg';
import uc3m from '../../images/logo-uc3m.svg';
import ub from '../../images/logo-ub.svg';
import bucharest from '../../images/logo-bucharest.svg';
import icfo from '../../images/logo-icfo.svg';
import arnes from '../../images/logo-arnes.svg';
import oxford from '../../images/logo-oxford.svg';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

const References = () => {

  const responsiveCarouselBreakpoints= {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 4,
      partialVisibilityGutter: 180
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0
      },
      items: 2,
      partialVisibilityGutter: 30
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464
      },
      items: 2,
      partialVisibilityGutter: 30
    }
  };

  return (
    <div className="ref-wrapper">
      <div className="row ref-content-responsive">
        <h3 className="ref-headline">References</h3>
        <div className="ref-content">
          <Carousel
              additionalTransfrom={0}
              arrows={false}
              autoPlay
              autoPlaySpeed={2000}
              centerMode={false}
              className=""
              containerClass="container-with-dots"
              dotListClass=""
              draggable
              focusOnSelect={false}
              infinite
              itemClass=""
              keyBoardControl
              minimumTouchDrag={80}
              pauseOnHover={false}
              renderArrowsWhenDisabled={false}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              responsive={responsiveCarouselBreakpoints}
              showDots={false}
              slidesToSlide={2}
          >
            <img loading="lazy" width="154px" height="154px" src={heanet} alt="heanet logo" />
            <img loading="lazy" width="154px" height="154px" src={harvard} alt="harvard logo" />
            <img loading="lazy" width="154px" height="154px" src={kit} alt="kit logo" />
            <img loading="lazy" width="154px" height="154px" src={seges} alt="seges logo" />
            <img loading="lazy" width="154px" height="154px" src={deflect} alt="deflect logo" />
            <img loading="lazy" width="154px" height="154px" src={princeton} alt="princeton logo" />
            <img loading="lazy" width="154px" height="154px" src={koc} alt="koc logo" />
            <img loading="lazy" width="154px" height="154px" src={mdc} alt="mdc logo" />
            <img loading="lazy" width="154px" height="154px" src={laval} alt="laval logo" />
            <img loading="lazy" width="154px" height="154px" src={uc3m} alt="uc3m logo" />
            <img loading="lazy" width="154px" height="154px" src={ub} alt="ub logo" />
            <img loading="lazy" width="154px" height="154px" src={bucharest} alt="bucharest logo" />
            <img loading="lazy" width="154px" height="154px" src={icfo} alt="icfo logo" />
            <img loading="lazy" width="154px" height="154px" src={arnes} alt="arnes logo" />
            <img loading="lazy" width="154px" height="154px" src={oxford} alt="oxford logo" />
          </Carousel>
          </div>
        </div>
    </div>
  );
}


export default References;