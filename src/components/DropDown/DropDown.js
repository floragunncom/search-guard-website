import React from 'react';
import './DropDown.scss';
// import arrowDown from '../../images/arrow-down-green-full.svg';

const DropDowm = ({ category, options, name }) => {
  return (
    <div className="drop-down-wrapper col s12 m6">
      <div className="dropdown-container">
        <div className="drop-down-text-field">
          {category} {category === 'Country' ? '*' : ''}
        </div>
        <select name={name} className="browser-default">
          {options.map(option => {
            return <option value={option}>{option}</option>;
          })}
        </select>
      </div>
    </div>
  );
};

export default DropDowm;
