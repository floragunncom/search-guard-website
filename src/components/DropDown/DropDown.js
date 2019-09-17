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
            name="version"
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
        <div className="dropdown-container">
          <div className="drop-down-text-field">
            {this.props.category}
          </div>
          <select name={this.props.name} className="browser-default">
            {this.props.options.map(option => {
              return <option value={option}>{option}</option>;
            })}
          </select>
        </div>
      </div>
    );
  };
};

export default DropDowm;