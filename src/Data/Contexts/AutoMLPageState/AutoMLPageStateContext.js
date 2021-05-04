import React, { Component, createContext } from "react";

const PageContext = React.createContext();

class PageProvider extends Component {
  state = {
    all: {
      projects: true,
      models: false,
      selectdatasets: false,
      selecteddatasets: false,
      datasetprocessing: false,
      linking: false,
      metascreen: false,
      correlation: false,
      modeltype: false,
    },
  };

  setCurrentPage = (value) => {
    let temp = this.state.all;
    temp[`${value}`] = true;
    this.setState((prevState) => ({
      all: temp,
    }));
  };

  setPageFalse = (value) => {
    console.log(this.state);
    let temp = this.state.all;
    temp[`${value}`] = false;
    this.setState((prevState) => ({
      all: temp,
    }));
  };
  CanGoNext = () => {
    return false;
  };
  CanGoPrev = () => {
    return false;
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      // Whatever storage mechanism you end up deciding to use.
      localStorage.setItem("Page", JSON.stringify(this.state));
    }
  }

  render() {
    return (
      <PageContext.Provider
        value={{
          pages: this.state,
          setCurrentPage: this.setCurrentPage,
          CanGoNext: this.CanGoNext,
          CanGoPrev: this.CanGoPrev,
          setPageFalse: this.setPageFalse,
        }}
      >
        {this.props.children}
      </PageContext.Provider>
    );
  }
}
const PageConsumer = PageContext.Consumer;

export { PageProvider, PageContext };
