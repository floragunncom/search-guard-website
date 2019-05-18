import React from 'react';
import './DropDown.scss';
import arrowDown from '../../images/arrow-down-green-full.svg';

class DropDowm extends React.Component {
  state = {
    selectedValue: '',
    isOpen: false
  };

  handleClick = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  getDropDownOptions = () => {
    if (this.state.isOpen) {
      return this.props.dropDownOptions.map(option => {
        return (
          <div 
            className="drop-down-value"
            onClick={() => this.setState({
              selectedValue: option,

            })}
          >
            {option}
          </div>
        );
      });
    };
  }

  render() {
    const dropDownOptions = this.getDropDownOptions()
    return (
      <div>
        <div 
          className="drop-down-container col s12 m6"
          onClick={() => this.handleClick()}
        > 
          <div className="drop-down-text-field">
            {this.state.selectedValue || this.props.dropDownCategory}
          </div>
          <img
            className={`drop-down-open-and-close-button ${this.state.isOpen ? 'drop-down-close-button' : ''}`}
            src={arrowDown}
            alt="drop-down-open-and-close-button"
          />
          <div className="drop-down-options-container">
            { dropDownOptions }
          </div>
        </div>
      </div>
    );
  };
};

export default DropDowm;