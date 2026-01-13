import React from 'react';
import sieMonster from '../../images/sie-monster.svg';
import pivotal from '../../images/pivotal.svg';
import wuerthPhoenix from '../../images/wuerth-phoenix.svg';
import redHat from '../../images/redHatNew.svg';
import objectRocket from '../../images/objectRocket.svg';
import mitratech from '../../images/mitratech.svg';
import siren from '../../images/siren.svg';
import kubedb from '../../images/kubedb.svg';
import unil from '../../images/unil-universite-de-lausanne.png';

import './TrustedBy.scss';


const TrustedBy = () => {
  const glideRef = React.useRef(null);

  // Initialize Glide carousel
  React.useEffect(() => {
    const initGlide = () => {
      if (typeof window !== 'undefined' && window.Glide && glideRef.current) {
        const glideElement = glideRef.current.querySelector('.glide');
        if (glideElement) {
          const glideInstance = new window.Glide(glideElement, {
            type: 'carousel',
            startAt: 0,
            perView: 4,
            autoplay: 2000,
            hoverpause: false,
          });
          glideInstance.mount();

          // Store instance for cleanup
          glideElement._glideInstance = glideInstance;
        }
      }
    };

    // Try to initialize immediately
    initGlide();

    // Also try after a short delay to ensure Glide is loaded
    const timer = setTimeout(initGlide, 100);

    return () => {
      clearTimeout(timer);
      // Cleanup Glide instance on unmount
      if (glideRef.current) {
        const glideElement = glideRef.current.querySelector('.glide');
        if (glideElement && glideElement._glideInstance) {
          glideElement._glideInstance.destroy();
        }
      }
    };
  }, []);

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
      name: 'UNIL Universite de Lausanne',
      logo: unil
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

  return (
    <div className="trusted-wrapper" ref={glideRef}>
      <div className="row">
        <h2 className="trusted-headline">Search Guard is trusted by</h2>
        <div className="glide">
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {icons.map((entry, index) => {
                return (
                    <li className="glide__slide" key={index}>
                        <img  loading="lazy" src={entry.logo} alt={entry.name} width="165px" height="165px" />
                    </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedBy;
