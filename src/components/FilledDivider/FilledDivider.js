import React from 'react';
import bg_arrow from '../../images/arrows_group.svg';
import './FilledDivider.scss';

const FilledDivider = ( { backgroundClass, shapeClass } ) => {
    return (
        <div className={backgroundClass || ''}>
            <div className="row divider-base ">
                <div className="col s12 m12">
                        <img className={`img-class ${shapeClass || ''}`} loading="lazy" src={bg_arrow} alt="background arrows"/>
                </div>
            </div>
        </div>
    )
};

export default FilledDivider;