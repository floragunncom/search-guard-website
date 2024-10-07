import React from 'react';
import bg_arrow from '../../images/arrows_group.svg';
import './FilledDivider.scss';

const FilledDivider = () => {
    return (
        <div className="security-bg-wrapper">
            <img loading="lazy" src={bg_arrow} alt="background arrows"/>
        </div>
    )
};

export default FilledDivider;