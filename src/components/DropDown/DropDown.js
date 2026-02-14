import React from 'react';

const DropDowm = ({ category, options, name }) => {
  return (
    <div className="drop-down-wrapper col s12 m6">
      <div className="dropdown-container">
        <div className="drop-down-text-field">
          {category} {category === 'Country' ? '*' : ''}
        </div>
        <select name={name} className="browser-default">
          {options.map((option, index) => {
            return (
              <option value={option} key={index}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default DropDowm;
