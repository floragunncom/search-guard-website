import React from 'react';
import LinkLoud from './LinkLoud';
import ButtonLoud from './ButtonLoud';
import ButtonDefault from './ButtonDefault';
import LinkDefault from './LinkDefault';
import LinkGhost from './LinkGhost';

const Button = props => {
  switch (props.style) {
    case 'loud-link':
      return <LinkLoud text={props.text} onPress={props.onPress} />;
    case 'loud-button':
      return <ButtonLoud text={props.text} onPress={props.onPress} />;
    case 'default-link':
      return <LinkDefault text={props.text} onPress={props.onPress} />;
    case 'default-button':
      return <ButtonDefault text={props.text} onPress={props.onPress} />;
    case 'ghost-link':
      return (
        <LinkGhost
          text={props.text}
          onPress={props.onPress}
          color={props.color}
        />
      );
    default:
      return <LinkDefault text={props.text} />;
  }
};

export default Button;
