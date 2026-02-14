import React from 'react';

const ButtonLink = ({style, link, target, text, onPress}) => {

    return (
        <a href={link} target={target} className={`button button-default-container` } onClick={onPress}>
            <div className={`button-large`}>{text}</div>
        </a>
    );
};

export default ButtonLink;
