import React, { Component } from "react";
import "./styles.css";

class DropDown extends Component {
  render() {
    const { options, onClick } = this.props;
    return (
      <ul className="list">
        {options.map((el, i) => (
          <li key={i} onClick={() => onClick(el)}>
            {el.columnField}
          </li>
        ))}
      </ul>
    );
  }
}

export default DropDown;
