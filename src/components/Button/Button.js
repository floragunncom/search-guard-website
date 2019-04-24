import React from 'react';
import LinkLoud from './LinkLoud';
import ButtonLoud from './ButtonLoud';
import ButtonDefault from './ButtonDefault';
import LinkDefault from './LinkDefault';
import LinkGhost from './LinkGhost';

const Button  = props => {
  switch (props.style) {
    case 'loud-link':
      return <LinkLoud text={props.text} />;
    case 'loud-button':
      return <ButtonLoud text={props.text} />;
    case 'default-link':
      return <LinkDefault text={props.text} />;
    case 'default-button':
      return <ButtonDefault text={props.text} />;
    case 'ghost-link':
      return <LinkGhost text={props.text} color={props.color} />;
    default:
      return <LinkDefault text={props.text} />;
  }
};

export default Button;
