import React, { Component } from "react";
import DropDown from "../DropDown";

import "./styles.css";

export default class FilterInput extends Component {
  state = {
    value: "",
    isOpen: false,
    valuesOptions: [],
    needOperators: false,
    isShowDropdown: false,
    filteredSuggestions: []
  };

  toggleModalHandler = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  componentDidUpdate(prevProps) {
    const { options } = this.props;
    if (prevProps.options !== this.props.options)
      this.setState({ valuesOptions: options });
  }

  onChange = e => {
    const { options } = this.props;
    const { valuesOptions } = this.state;
    const value = e.currentTarget.value;

    if (!value) {
      this.filterSuggestions(options);
      this.setState({ valuesOptions: options, value });
      return;
    }

    const curentItem = valuesOptions.find(
      el => el.columnField === value.trim()
    );

    if (curentItem) {
      this.setOperators(curentItem.supportedOperators);
    }

    this.filterSuggestions(valuesOptions, value);
    this.setState({ value, isShowDropdown: true });
  };

  filterSuggestions = (suggestions, value = "") => {
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.columnField
          .toLowerCase()
          .indexOf(value.toLowerCase().trim()) > -1
    );
    this.setState({ filteredSuggestions });
  };

  onItemClick = item => {
    const { columnField, supportedOperators } = item;
    this.setState({ value: columnField }, () => console.log(this.state.value));
    if (supportedOperators) this.setOperators(supportedOperators);
  };

  setOperators = supportedOperators => {
    const operators = supportedOperators.map(el => {
      return {
        columnField: el
      };
    });
    console.log(operators);
    this.setState({ valuesOptions: operators }, () =>
      this.filterSuggestions(this.state.valuesOptions)
    );
  };

  render() {
    const { value, isShowDropdown, filteredSuggestions } = this.state;
    return (
      <div className="container">
        <input
          type="text"
          value={value}
          onChange={this.onChange}
          className="input"
        />
        {isShowDropdown && (
          <DropDown options={filteredSuggestions} onClick={this.onItemClick} />
        )}
      </div>
    );
  }
}
