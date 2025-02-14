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
