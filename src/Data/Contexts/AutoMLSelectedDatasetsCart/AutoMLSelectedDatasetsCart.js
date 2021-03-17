import React, { Component, createContext } from "react";

const SelectedDatasetsContext = React.createContext();

class SelectedDatasetsProvider extends Component {
  state = {
    datasets: JSON.parse(localStorage.getItem("SelectedDatasets"))
      ? JSON.parse(localStorage.getItem("SelectedDatasets")).datasets
      : [],
    // financial_datasets: JSON.parse(localStorage.getItem("SelectedDatasets"))
    //   ? JSON.parse(localStorage.getItem("SelectedDatasets")).financial_datasets
    //   : [],
    // trading_datasets: JSON.parse(localStorage.getItem("SelectedDatasets"))
    //   ? JSON.parse(localStorage.getItem("SelectedDatasets")).trading_datasets
    //   : [],
    // industrial_datasets: JSON.parse(localStorage.getItem("SelectedDatasets"))
    //   ? JSON.parse(localStorage.getItem("SelectedDatasets")).industrial_datasets
    //   : [],
    // economical_datasets: JSON.parse(localStorage.getItem("SelectedDatasets"))
    //   ? JSON.parse(localStorage.getItem("SelectedDatasets")).economical_datasets
    //   : [],
    // my_datasets: JSON.parse(localStorage.getItem("SelectedDatasets"))
    //   ? JSON.parse(localStorage.getItem("SelectedDatasets")).my_datasets
    //   : [],
  };

  setSelectedDatasets = (value, type) => {
    let temp = this.state.datasets;
    temp.push(value);
    this.setState({
      datasets: temp,
    });
  };

  updatecompanies = (value, tab) => {
    let temp = this.state.datasets;
    temp.forEach((element) => {
      if (element.name === value.name && element.type === tab) {
        element.selectedcompanies = value.selectedcompanies;
      }
    });
    this.setState({
      datasets: temp,
    });
  };

  updatecolumns = (value, tab) => {
    console.log(value);
    let temp = this.state.datasets;
    temp.forEach((element) => {
      if (element.name === value.name && element.type === tab) {
        element.selectedcolumns = value.selectedcolumns;
        element.showncolumns = value.showncolumns;
      }
    });
    this.setState({
      datasets: temp,
    });
  };

  deletedataset = (value, tab) => {
    let temp = this.state.datasets;
    let i = null;
    temp.forEach((element, index) => {
      if (value.name === element.name && element.type === tab) {
        i = index;
      }
    });
    temp.splice(i, 1);
    this.setState({
      datasets: temp,
    });
  };

  clearcart = () => {
    console.log("cleared");
    this.setState({
      datasets: [],
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
          clearcart: this.clearcart,
          updatecompanies: this.updatecompanies,
          deletedataset: this.deletedataset,
          updatecolumns: this.updatecolumns,
        }}
      >
        {this.props.children}
      </SelectedDatasetsContext.Provider>
    );
  }
}
const SelectedDatasetsConsumer = SelectedDatasetsContext.Consumer;

export { SelectedDatasetsProvider, SelectedDatasetsContext };
