import React from 'react';
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
import { loadScriptOnce } from '../../utils/loadScriptOnce';

const References = () => {
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
      name: 'Heanet',
      logo: heanet
    },
    {
      name: 'Harvard',
      logo: harvard
    },
    {
      name: 'KIT',
      logo: kit
    },
    {
      name: 'Seges',
      logo: seges
    },
    {
      name: 'Deflect',
      logo: deflect
    },
    {
      name: 'Princeton',
      logo: princeton
    },
    {
      name: 'KOC',
      logo: koc
    },
    {
      name: 'MDC',
      logo: mdc
    },
    {
      name: 'Lavalle',
      logo: laval
    },
    {
      name: 'UC3M',
      logo: uc3m
    },
    {
      name: 'UB',
      logo: ub
    },
    {
      name: 'Bucarest',
      logo: bucharest
    },
    {
      name: 'ICFO',
      logo: icfo
    },
    {
      name: 'Arnes',
      logo: arnes
    },
    {
      name: 'Oxford',
      logo: oxford
    },
  ];

  return (
    <div className="ref-wrapper">
      <div className="row ref-content-responsive">
        <h3 className="ref-headline">References</h3>
        <div className="ref-content">

          <div className="glide" ref={carouselRef}>
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides">
                {icons.map((entry, index) => {
                  return (
                      <li className="glide__slide" key={index}>
                        <img  loading="lazy" src={entry.logo} alt={entry.name} width="154px" height="154px" />
                      </li>
                  );
                })}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


export default References;
