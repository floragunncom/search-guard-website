import React from 'react';
import './TextInput.scss';

const TextInput = props => {
  return (
    <div className="text-input-wrapper">
      <input
        onChange={props.onTextChange}
        value={props.value}
        placeholder={props.placeholder}
        style={inputStyle}
      />
    </div>
  );
}

const inputStyle = {
  color: '#184962',
  width: '310px',
  height: '40px',
  border: 'none',
  fontSize: '14px'
}

export default TextInput;