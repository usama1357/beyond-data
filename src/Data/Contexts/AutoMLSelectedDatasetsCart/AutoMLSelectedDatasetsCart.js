import React, { Component, createContext } from "react";

const SelectedDatasetsContext = React.createContext();

class SelectedDatasetsProvider extends Component {
  state = {
    financial_datasets: JSON.parse(localStorage.getItem("SelectedDatasets"))
      ? JSON.parse(localStorage.getItem("SelectedDatasets")).financial_datasets
      : null,
    trading_datasets: JSON.parse(localStorage.getItem("SelectedDatasets"))
      ? JSON.parse(localStorage.getItem("SelectedDatasets")).trading_datasets
      : null,
    industrial_datasets: JSON.parse(localStorage.getItem("SelectedDatasets"))
      ? JSON.parse(localStorage.getItem("SelectedDatasets")).industrial_datasets
      : null,
    economical_datasets: JSON.parse(localStorage.getItem("SelectedDatasets"))
      ? JSON.parse(localStorage.getItem("SelectedDatasets")).economical_datasets
      : null,
    my_datasets: JSON.parse(localStorage.getItem("SelectedDatasets"))
      ? JSON.parse(localStorage.getItem("SelectedDatasets")).economical_datasets
      : null,
  };

  setSelectedDatasets = (value, type) => {
    let temp = this.state;
    temp[`${type}`].push(value);
    this.setState({
      temp,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      // Whatever storage mechanism you end up deciding to use.
      localStorage.setItem("SelectedDatasets", JSON.stringify(this.state));
    }
  }

  render() {
    return (
      <SelectedDatasetsContext.Provider
        value={{
          SelectedDatasets: this.state,
          setSelectedDatasets: this.setSelectedDatasets,
        }}
      >
        {this.props.children}
      </SelectedDatasetsContext.Provider>
    );
  }
}
const SelectedDatasetsConsumer = SelectedDatasetsContext.Consumer;

export { SelectedDatasetsProvider, SelectedDatasetsContext };
