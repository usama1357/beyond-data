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

  addModel = (val) => {
    let temp = this.state.allmodels;
    temp.push(val);
  };

  removeModel = (name) => {
    let temp = this.state.allmodels;
    let arr = [];
    temp.forEach((element) => {
      if (name !== element.model_name) {
        arr.push(element);
      }
    });
    this.setState({
      allmodels: arr,
    });
    console.log(arr);
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
          removeModel: this.removeModel,
          addModel: this.addModel,
        }}
      >
        {this.props.children}
      </ModelContext.Provider>
    );
  }
}
const ModelConsumer = ModelContext.Consumer;

export { ModelProvider, ModelContext };
