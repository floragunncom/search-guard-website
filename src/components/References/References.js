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

const References = () => {
  return (
    <div className="ref-wrapper">
      <div className="row ref-content-responsive">
        <div className="ref-headline">References</div>
        <div className="ref-content hide-on-med-and-down">
          <div className="ref-content-row">
            <img src={heanet} alt="icon" />
            <img src={harvard} alt="icon" />
            <img src={kit} alt="icon" />
            <img src={seges} alt="icon" />
            <img src={deflect} alt="icon" />
          </div>
          <div className="ref-content-row">
            <img src={princeton} alt="icon" />
            <img src={koc} alt="icon" />
            <img src={mdc} alt="icon" />
            <img src={laval} alt="icon" />
            <img src={uc3m} alt="icon" />
          </div>
          <div className="ref-content-row">
            <img src={ub} alt="icon" />
            <img src={bucharest} alt="icon" />
            <img src={icfo} alt="icon" />
            <img src={arnes} alt="icon" />
            <img src={oxford} alt="icon" />
          </div>
        </div>
        <div className="ref-content-responsive hide-on-large-only">
          <div className="col s4 m3 ref-image">
            <img src={heanet} alt="icon" className="ref" />
          </div>
          <div className="col s4 m3 ref-image">
            <img src={harvard} alt="icon" className="ref" />
          </div>
          <div className="col s4 m3 ref-image">
            <img src={kit} alt="icon" className="ref" />
          </div>
          <div className="col s4 m3 ref-image">
            <img src={seges} alt="icon" className="ref" />
          </div>
          <div className="col s4 m3 ref-image">
            <img src={deflect} alt="icon" className="ref" />
          </div>
          <div className="col s4 m3 ref-image">
            <img src={princeton} alt="icon" className="ref" />
          </div>
          <div className="col s4 m3 ref-image">
            <img src={koc} alt="icon" className="ref" />
          </div>
          <div className="col s4 m3 ref-image">
            <img src={mdc} alt="icon" className="ref" />
          </div>
          <div className="col s4 m3 ref-image">
            <img src={laval} alt="icon" className="ref" />
          </div>
          <div className="col s4 m3 ref-image">
            <img src={uc3m} alt="icon" className="ref" />
          </div>
          <div className="col s4 m3 ref-image">
            <img src={ub} alt="icon" className="ref" />
          </div>
          <div className="col s4 m3 ref-image">
            <img src={bucharest} alt="icon" className="ref" />
          </div>
          <div className="col s4 m3 ref-image">
            <img src={icfo} alt="icon" className="ref" />
          </div>
          <div className="col s4 m3 ref-image">
            <img src={arnes} alt="icon" className="ref" />
          </div>
          <div className="col s4 m3 ref-image">
            <img src={oxford} alt="icon" className="ref" />
          </div>
        </div>
      </div>
    </div>
  );
}


export default References;