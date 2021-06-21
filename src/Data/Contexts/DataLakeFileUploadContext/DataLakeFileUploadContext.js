import React, { Component, createContext } from "react";

const DataLakeFileUploadContext = React.createContext();

class DataLakeFileUploadProvider extends Component {
  state = {
    files: JSON.parse(localStorage.getItem("Files"))
      ? JSON.parse(localStorage.getItem("Files")).files
      : null,
    progress: JSON.parse(localStorage.getItem("Files"))
      ? JSON.parse(localStorage.getItem("Files")).progress
      : null,
    error: JSON.parse(localStorage.getItem("Files"))
      ? JSON.parse(localStorage.getItem("Files")).error
      : null,
  };

  setFiles = (value) => {
    this.setState({
      files: value,
      progress: null,
      error: null,
    });
  };

  setProgress = (value) => {
    let temp = this.state.progress ? this.state.progress : {};
    temp[`${value.name}`] = value.val;
    this.setState({
      files: this.state.files,
      progress: temp,
      error: this.state.error,
    });
  };

  setError = (value) => {
    let temp = this.state.error ? this.state.error : {};
    temp[`${value.name}`] = value.val;
    this.setState({
      files: this.state.files,
      progress: this.state.progress,
      error: temp,
    });
  };

  deleteFile = (index, file) => {
    console.log(index, file);
    console.log(this.state.files);
    let temp = this.state.files;
    let i = null;
    if (temp) {
      temp.forEach((element, count) => {
        if (element.file.path === file.name) {
          i = count;
        }
      });
      if (temp.length === 1) {
        temp = [];
      } else {
        temp = temp.splice(i, 1);
      }
      this.setState({
        files: temp,
        progress: this.state.progress,
        error: this.state.error,
      });
    }
  };

  deleteAll = () => {
    this.setState({
      files: [],
      progress: this.state.progress,
      error: this.state.error,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      // Whatever storage mechanism you end up deciding to use.
      localStorage.setItem("Files", JSON.stringify(this.state));
    }
  }

  render() {
    return (
      <DataLakeFileUploadContext.Provider
        value={{
          Files: this.state,
          setFiles: this.setFiles,
          setProgress: this.setProgress,
          deleteFile: this.deleteFile,
          setError: this.setError,
          deleteAll: this.deleteAll,
        }}
      >
        {this.props.children}
      </DataLakeFileUploadContext.Provider>
    );
  }
}
const DataLakeFileUploadConsumer = DataLakeFileUploadContext.Consumer;

export { DataLakeFileUploadProvider, DataLakeFileUploadContext };
