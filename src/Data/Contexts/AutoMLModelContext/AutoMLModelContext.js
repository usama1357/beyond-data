import React, { Component, createContext } from "react";

const ModelContext = React.createContext();

class ModelProvider extends Component {
  state = {
    model: JSON.parse(localStorage.getItem("Model"))
      ? JSON.parse(localStorage.getItem("Model")).model
      : null,
    type: JSON.parse(localStorage.getItem("Model"))
      ? JSON.parse(localStorage.getItem("Model")).type
      : null,
    allmodels: JSON.parse(localStorage.getItem("Model"))
      ? JSON.parse(localStorage.getItem("Model")).allmodels
      : null,
  };

  setModel = (value) => {
    this.setState({
      model: value,
    });
  };
  setModelList = (list) => {
    this.setState({
      allmodels: list,
    });
  };
  setModelsType = (value) => {
    this.setState({
      type: value,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      // Whatever storage mechanism you end up deciding to use.
      localStorage.setItem("Model", JSON.stringify(this.state));
    }
  }

  render() {
    return (
      <ModelContext.Provider
        value={{
          Model: this.state,
          setModel: this.setModel,
          setModelList: this.setModelList,
          setModelsType: this.setModelsType,
        }}
      >
        {this.props.children}
      </ModelContext.Provider>
    );
  }
}
const ModelConsumer = ModelContext.Consumer;

export { ModelProvider, ModelContext };
