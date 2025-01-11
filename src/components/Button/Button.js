import React from 'react';
import ButtonLightGreen from './ButtonLightGreen';
import ButtonDefault from './ButtonDefault';
import LinkDefault from './LinkDefault';
import LinkGhost from './LinkGhost';
import './Button.scss';

const Button = props => {

    let style;

    // default
    if (!props.buttonStyle) {
        style = 'light-green-button';
    } else {
        style = props.buttonStyle;
    }

    // REMOVE UNUSED BUTTONS
    switch (style) {
        case 'default-button':
            return <ButtonDefault text={props.text} onPress={props.onPress}/>;
        case 'light-green-button':
            return <ButtonLightGreen text={props.text} onPress={props.onPress} target={props.target}
                                     link={props.link}/>;
        case 'default-link':
            return (
                <LinkDefault
                    text={props.text}
                    target={props.target}
                    link={props.link}
                />
            );
        case 'ghost-link':
            return (
                <LinkGhost
                    text={props.text}
                    target={props.target}
                    link={props.link}
                    color={props.color}
                />
            );
        default:
            return <ButtonLightGreen text={props.text} onPress={props.onPress} target={props.target}
                                     link={props.link}/>;
    }
};

export default Button;
