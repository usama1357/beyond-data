import React, { Component, createContext } from "react";

const CustomTableContext = React.createContext();

class CustomTableProvider extends Component {
  state = {
    customtable: JSON.parse(localStorage.getItem("CustomTable"))
      ? JSON.parse(localStorage.getItem("CustomTable")).customtable
      : null,
  };

  setCustomTable = (value) => {
    this.setState({
      customtable: value,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      // Whatever storage mechanism you end up deciding to use.
      localStorage.setItem("CustomTable", JSON.stringify(this.state));
    }
  }

  render() {
    return (
      <CustomTableContext.Provider
        value={{
          CustomTable: this.state,
          setCustomTable: this.setCustomTable,
        }}
      >
        {this.props.children}
      </CustomTableContext.Provider>
    );
  }
}
const CustomTableConsumer = CustomTableContext.Consumer;

export { CustomTableProvider, CustomTableContext };
