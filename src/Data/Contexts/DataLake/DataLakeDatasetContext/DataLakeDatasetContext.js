import React, { Component, createContext } from "react";

const DataLakeDatasetContext = React.createContext();

class DataLakeDatasetProvider extends Component {
  state = {
    dataset: JSON.parse(localStorage.getItem("Dataset"))
      ? JSON.parse(localStorage.getItem("Dataset")).dataset
      : null,
  };

  setDataset = (value) => {
    this.setState({
      dataset: value,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      // Whatever storage mechanism you end up deciding to use.
      localStorage.setItem("Dataset", JSON.stringify(this.state));
    }
  }

  render() {
    return (
      <DataLakeDatasetContext.Provider
        value={{ Dataset: this.state, setDataset: this.setDataset }}
      >
        {this.props.children}
      </DataLakeDatasetContext.Provider>
    );
  }
}
const DataLakeDatasetConsumer = DataLakeDatasetContext.Consumer;

export { DataLakeDatasetProvider, DataLakeDatasetContext };
