import React, { Component, createContext } from "react";

const NotificationsContext = React.createContext();

class NotificationsProvider extends Component {
  state = {
    Notifications: JSON.parse(localStorage.getItem("Notifications"))
      ? JSON.parse(localStorage.getItem("Notifications")).Notifications
      : null,
  };

  setNotifications = (value) => {
    this.setState({
      Notifications: value,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      // Whatever storage mechanism you end up deciding to use.
      localStorage.setItem("Notifications", JSON.stringify(this.state));
    }
  }

  render() {
    return (
      <NotificationsContext.Provider
        value={{
          Notifications: this.state,
          setNotifications: this.setNotifications,
        }}
      >
        {this.props.children}
      </NotificationsContext.Provider>
    );
  }
}
const NotificationsConsumer = NotificationsContext.Consumer;

export { NotificationsProvider, NotificationsContext };
