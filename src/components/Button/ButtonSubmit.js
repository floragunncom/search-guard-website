import React from 'react';
import './Button.scss';
import {getColorSchemaCSS} from "../../utils/styleUtils";

const ButtonSubmit = ({style, text, onPress}) => {

    let baseCss = getColorSchemaCSS(style);

    return (
        <button
            className={`button button-default-container ${baseCss}` }
            type="submit"
        >
            <div className={`button-large ${baseCss}`}>{text}</div>
        </button>
    );
};

export default ButtonSubmit;
