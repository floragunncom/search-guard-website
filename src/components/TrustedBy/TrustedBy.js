import React from 'react';
import sieMonster from '../../images/sie-monster.svg';
import pivotal from '../../images/pivotal.svg';
import wuerthPhoenix from '../../images/wuerth-phoenix.svg';
import redHat from '../../images/redHatNew.svg';
import ibm from '../../images/IBM.svg';
import objectRocket from '../../images/objectRocket.svg';
import mitratech from '../../images/mitratech.svg';
import siren from '../../images/siren.svg';
import kubedb from '../../images/kubedb.svg';
import './TrustedBy.scss';

const TrustedBy = () => {
  const icons = [
    ibm,
    redHat,
    objectRocket,
    wuerthPhoenix,
    pivotal,
    sieMonster,
    mitratech,
    kubedb,
    siren,
  ];
  return (
    <div className="trusted-wrapper">
      <div className="row">
        <div className="trusted-headline">Search Guard is trusted by</div>
        {icons.map((icon, index) => {
          return (
            <div className="col s12 m6 l4" key={index}>
              <div className="trusted-pic">
                <img src={icon} alt="company logo" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrustedBy;
