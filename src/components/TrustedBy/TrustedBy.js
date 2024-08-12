import React from 'react';
import sieMonster from '../../images/sie-monster.svg';
import pivotal from '../../images/pivotal.svg';
import wuerthPhoenix from '../../images/wuerth-phoenix.svg';
import redHat from '../../images/redHatNew.svg';
import objectRocket from '../../images/objectRocket.svg';
import mitratech from '../../images/mitratech.svg';
import siren from '../../images/siren.svg';
import kubedb from '../../images/kubedb.svg';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import './TrustedBy.scss';



const TrustedBy = () => {
  const icons = [
    {
      name: 'Red Hat',
      logo: redHat
    },
    {
      name: 'ObjectRocket',
      logo: objectRocket
    },
    {
      name: 'Würth Phoenix',
      logo: wuerthPhoenix
    },
    {
      name: 'Pivotal',
      logo: pivotal
    },
    {
      name: 'SieMonster',
      logo: sieMonster
    },
    {
      name: 'Mitratech',
      logo: mitratech
    },
    {
      name: 'KubeDB',
      logo: kubedb
    },
    {
      name: 'Siren Investigate',
      logo: siren
    }
  ];

  const responsiveCarouselBreakpoints= {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 4,
      partialVisibilityGutter: 40
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
    <div className="trusted-wrapper">
      <div className="row">
        <h2 className="trusted-headline">Search Guard is trusted by</h2>

        <Carousel
            additionalTransfrom={0}
            arrows={false}
            autoPlay
            autoPlaySpeed={1500}
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
        >

        {icons.map((entry, index) => {
          return (
            <div className="col s12 m6 l4" key={index}>
              <div className="">
                <img src={entry.logo} alt={entry.name} />
              </div>
            </div>
          );
        })}

        </Carousel>
      </div>
    </div>
  );
};

export default TrustedBy;
