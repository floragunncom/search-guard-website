import React from 'react';
import './Button.scss';

const ButtonLink = ({style, link, target, text, onPress}) => {

    return (
        <a href={link} target={target} className={`button button-default-container` } onClick={onPress}>
            <div className={`button-large`}>{text}</div>
        </a>
    );
};

export default ButtonLink;
