import React from 'react';
import './Badge.scss';

export const Badge = ({ text, bgColor, textColor, ...props }) => {
  return (
    <span 
      {...props}  
      className='badge-style' 
      style={{
        ...props.style,
        color: textColor, 
        backgroundColor: bgColor
      }}
      >
      {text}
    </span>
  );
};
