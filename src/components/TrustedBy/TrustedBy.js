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
import { loadScriptOnce } from '../../utils/loadScriptOnce';


const TrustedBy = () => {
  const carouselRef = React.useRef(null);

  React.useEffect(() => {
    let retries = 0;
    const maxRetries = 20;
    const retryDelayMs = 100;
    let retryTimer;
    let glideInstance;
    let isCancelled = false;

    const initCarousel = () => {
      if (isCancelled) {
        return;
      }
      if (!window.Glide || !carouselRef.current) {
        if (retries < maxRetries) {
          retries += 1;
          retryTimer = setTimeout(initCarousel, retryDelayMs);
        }
        return;
      }

      glideInstance = new window.Glide(carouselRef.current, {
        type: 'carousel',
        startAt: 0,
        perView: 4,
        autoplay: 2000,
        hoverpause: false,
      });
      glideInstance.mount();
    };

    loadScriptOnce('/assets/glide.min.js')
      .then(() => {
        initCarousel();
      })
      .catch(() => {
        // Keep the section visible even if carousel enhancement fails to load.
      });

    return () => {
      isCancelled = true;
      if (retryTimer) {
        clearTimeout(retryTimer);
      }
      if (glideInstance) {
        glideInstance.destroy();
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
    <div className="trusted-wrapper">
      <div className="row">
        <h2 className="trusted-headline">Search Guard is trusted by</h2>
        <div className="glide" ref={carouselRef}>
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
