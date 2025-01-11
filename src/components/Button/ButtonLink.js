import React from 'react';
import './Button.scss';
import {getColorSchemaCSS} from "../../utils/styleUtils";

const ButtonLink = ({style, link, target, text, onPress}) => {

    let baseCss = getColorSchemaCSS(style);

    return (
        <a href={link} target={target} className={`button button-default-container ${baseCss}` } onClick={onPress}>
            <div className={`button-large ${baseCss}`}>{text}</div>
        </a>
    );
};

export default ButtonLink;
