import React from 'react';

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
