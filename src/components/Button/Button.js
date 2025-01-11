import React from 'react';
import './Button.scss';
import ButtonLink from './ButtonLink';
import ButtonSubmit from "./ButtonSubmit";

const Button = props => {

    let style;
    let variant;

    // defaults
    if (!props.variant) {
        variant = 'link';
    } else {
        variant = props.variant;
    }

    if (!props.style) {
        style = 'light';
    } else {
        style = props.style;
    }

    switch (variant) {
        case 'link':
            return <ButtonLink text={props.text} onPress={props.onPress} target={props.target}
                               link={props.link} style={style}/>;
        case 'submit':
            return <ButtonSubmit text={props.text} style={style} additionalCss={props.additionalCss}/>;
        default:
            return <ButtonLink text={props.text} onPress={props.onPress} target={props.target}
                               link={props.link} style={style}/>;
    }
};

export default Button;
