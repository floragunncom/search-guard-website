import React from 'react';
import { useTranslation } from 'react-i18next';
import sieMonster from '../../images/sie-monster.svg';
import pivotal from '../../images/pivotal.svg';
import wuerthPhoenix from '../../images/wuerth-phoenix.svg';
import redHat from '../../images/redHatNew.svg';
import objectRocket from '../../images/objectRocket.svg';
import mitratech from '../../images/mitratech.svg';
import siren from '../../images/siren.svg';
import kubedb from '../../images/kubedb.svg';
import { loadScriptOnce } from '../../utils/loadScriptOnce';

const Integrators = () => {
  const { t } = useTranslation('security');
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

  const integrators = [
    {
      headline: t('integrators.redhat.headline'),
      text: t('integrators.redhat.text'),
      pic: redHat,
      link: 'https://www.redhat.com',
    },
    {
      headline: t('integrators.objectrocket.headline'),
      text: t('integrators.objectrocket.text'),
      pic: objectRocket,
      link: 'https://www.objectrocket.com/managed-elasticsearch/',
    },
    {
      headline: t('integrators.wuerthphoenix.headline'),
      text: t('integrators.wuerthphoenix.text'),
      pic: wuerthPhoenix,
      link: 'https://wuerth-phoenix.com/en/',
    },
    {
      headline: t('integrators.pivotal.headline'),
      text: t('integrators.pivotal.text'),
      pic: pivotal,
      link: 'https://pivotal.io/platform',
    },
    {
      headline: t('integrators.siemonster.headline'),
      text: t('integrators.siemonster.text'),
      pic: sieMonster,
      link: 'https://siemonster.com/',
    },
    {
      headline: t('integrators.mitratech.headline'),
      text: t('integrators.mitratech.text'),
      pic: mitratech,
      link: 'https://www.mitratech.com/',
    },
    {
      headline: t('integrators.kubedb.headline'),
      text: t('integrators.kubedb.text'),
      pic: kubedb,
      link: 'https://kubedb.com/',
    },
    {
      headline: t('integrators.siren.headline'),
      text: t('integrators.siren.text'),
      pic: siren,
      link: 'https://siren.io',
    },
  ];

  return (
    <div className="company-integrators-wrapper" id="integrators">
      <div className="row">
        <h4 className="company-integrators-headline">{t('integrators.headline')}</h4>
        <div className="glide" ref={carouselRef}>
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {integrators.map((entry, index) => {
                return (
                    <li className="glide__slide" key={index}>
                      <img  loading="lazy" src={entry.pic} alt={entry.headline} width="165px" height="165px" />
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

export default Integrators;
