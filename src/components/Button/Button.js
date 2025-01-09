import React from 'react';
import LinkLoud from './LinkLoud';
import ButtonLoud from './ButtonLoud';
import ButtonLightGreen from './ButtonLightGreen';
import ButtonDefault from './ButtonDefault';
import LinkDefault from './LinkDefault';
import LinkGhost from './LinkGhost';
import ButtonSand from './ButtonSand';
import './Button.scss';

const Button = props => {

    // default
    if (!props.buttonStyle) {
        return <ButtonLightGreen text={props.text} onPress={props.onPress} target={props.target} link={props.link}/>;
    }

    // REMOVE UNUSED BUTTONS
    switch (props.buttonStyle) {
        case 'loud-button':
            return <ButtonLoud text={props.text} onPress={props.onPress}/>;
        case 'default-button':
            return <ButtonDefault text={props.text} onPress={props.onPress}/>;
        case 'light-green-button':
            return <ButtonLightGreen text={props.text} onPress={props.onPress} target={props.target}
                                     link={props.link}/>;
        case 'loud-link':
            return (
                <LinkLoud text={props.text} target={props.target} link={props.link}/>
            );
        case 'sand-button':
            return <ButtonSand text={props.text} target={props.target} link={props.link}/>;
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
