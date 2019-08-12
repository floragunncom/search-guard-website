import React from 'react';
import './DropDown.scss';
import arrowDown from '../../images/arrow-down-green-full.svg';

class DropDowm extends React.Component {
  state = {
    selectedValue: '',
    isOpen: false
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideClick, false);
  }

  handleOutsideClick = (event) => {
    if (this.node && !this.node.contains(event.target)) {
      if (this.state.isOpen) {
        this.setState({
          isOpen: false
        });
      };
    };
  }

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
            onClick={() => {this.setState({
              selectedValue: option,
            }); this.props.onDropDownOptionChange(option)}}
          >
            {option}
          </div>
        );
      });
    };
  }

  getLabelOnOptionSelected = () => {
    if (this.state.selectedValue) {
      return (
        <label for="website" class="input-field-label drop-down-label">{this.props.dropDownCategory}</label>
      )
    };

    return null
  }

  render() {
    const dropDownOptions = this.getDropDownOptions()
    return (
      <div className="drop-down-wrapper col s12 m6">
        <div 
          className="drop-down-container"
          onClick={() => this.handleClick()}
          ref={node => { this.node = node; }}
        > 
          {this.getLabelOnOptionSelected()}
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