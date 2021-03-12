import React, { Component, createContext } from "react";

const AuthContext = React.createContext();

class AuthProvider extends Component {
  state = {
    user_id: JSON.parse(localStorage.getItem("Auth"))
      ? JSON.parse(localStorage.getItem("Auth")).user_id
      : null,
    company_id: JSON.parse(localStorage.getItem("Auth"))
      ? JSON.parse(localStorage.getItem("Auth")).company_id
      : null,
    company_name: JSON.parse(localStorage.getItem("Auth"))
      ? JSON.parse(localStorage.getItem("Auth")).company_name
      : null,
  };

  setAuth = (value) => {
    this.setState({
      user_id: value.user_id,
      company_id: value.company_id,
      company_name: value.company_name,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      // Whatever storage mechanism you end up deciding to use.
      localStorage.setItem("Auth", JSON.stringify(this.state));
    }
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          Auth: this.state,
          setAuth: this.setAuth,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthContext };
