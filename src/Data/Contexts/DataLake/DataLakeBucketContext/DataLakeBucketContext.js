import React, { Component, createContext } from "react";

const DataLakeBucketContext = React.createContext();

class DataLakeBucketProvider extends Component {
  state = {
    bucket: JSON.parse(localStorage.getItem("Bucket"))
      ? JSON.parse(localStorage.getItem("Bucket")).bucket
      : null,
    type: JSON.parse(localStorage.getItem("Bucket"))
      ? JSON.parse(localStorage.getItem("Bucket")).type
      : null,
  };

  setBucket = (value) => {
    this.setState({
      bucket: value.bucket,
      type: value.type,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      // Whatever storage mechanism you end up deciding to use.
      localStorage.setItem("Bucket", JSON.stringify(this.state));
    }
  }

  render() {
    return (
      <DataLakeBucketContext.Provider
        value={{ Bucket: this.state, setBucket: this.setBucket }}
      >
        {this.props.children}
      </DataLakeBucketContext.Provider>
    );
  }
}
const DataLakeBucketConsumer = DataLakeBucketContext.Consumer;

export { DataLakeBucketProvider, DataLakeBucketContext };
