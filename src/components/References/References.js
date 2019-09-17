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
            <img src={heanet} alt="heanet logo" />
            <img src={harvard} alt="harvard logo" />
            <img src={kit} alt="kit logo" />
            <img src={seges} alt="seges logo" />
            <img src={deflect} alt="deflect logo" />
          </div>
          <div className="ref-content-row">
            <img src={princeton} alt="princeton logo" />
            <img src={koc} alt="koc logo" />
            <img src={mdc} alt="mdc logo" />
            <img src={laval} alt="laval logo" />
            <img src={uc3m} alt="uc3m logo" />
          </div>
          <div className="ref-content-row">
            <img src={ub} alt="ub logo" />
            <img src={bucharest} alt="bucharest logo" />
            <img src={icfo} alt="icfo logo" />
            <img src={arnes} alt="arnes logo" />
            <img src={oxford} alt="oxford logo" />
          </div>
        </div>
        <div className="ref-content-responsive hide-on-large-only">
          <div className="col s4 m3 ref-image">
            <img src={heanet} alt="heanet logo" className="ref" />
          </div>
          <div className="col s4 m3 ref-image">
            <img src={harvard} alt="harvard logo" className="ref" />
          </div>
          <div className="col s4 m3 ref-image">
            <img src={kit} alt="kit logo" className="ref" />
          </div>
          <div className="col s4 m3 ref-image">
            <img src={seges} alt="seges logo" className="ref" />
          </div>
          <div className="col s4 m3 ref-image">
            <img src={deflect} alt="deflect logo" className="ref" />
          </div>
          <div className="col s4 m3 ref-image">
            <img src={princeton} alt="princeton logo" className="ref" />
          </div>
          <div className="col s4 m3 ref-image">
            <img src={koc} alt="koc logo" className="ref" />
          </div>
          <div className="col s4 m3 ref-image">
            <img src={mdc} alt="mdc logo" className="ref" />
          </div>
          <div className="col s4 m3 ref-image">
            <img src={laval} alt="laval logo" className="ref" />
          </div>
          <div className="col s4 m3 ref-image">
            <img src={uc3m} alt="uc3m logo" className="ref" />
          </div>
          <div className="col s4 m3 ref-image">
            <img src={ub} alt="ub logo" className="ref" />
          </div>
          <div className="col s4 m3 ref-image">
            <img src={bucharest} alt="bucharest logo" className="ref" />
          </div>
          <div className="col s4 m3 ref-image">
            <img src={icfo} alt="icfo logo" className="ref" />
          </div>
          <div className="col s4 m3 ref-image">
            <img src={arnes} alt="arnes logo" className="ref" />
          </div>
          <div className="col s4 m3 ref-image">
            <img src={oxford} alt="oxford logo" className="ref" />
          </div>
        </div>
      </div>
    </div>
  );
}


export default References;