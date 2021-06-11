import React, { Component, createContext } from "react";

const NotificationsContext = React.createContext();

class NotificationsProvider extends Component {
  state = {
    Notifications: JSON.parse(localStorage.getItem("Notifications"))
      ? JSON.parse(localStorage.getItem("Notifications")).Notifications
      : [],
  };

  setNotifications = (value) => {
    let temp = this.state.Notifications;
    if (this.state.Notifications.length !== 0) {
      temp.push(value);
    } else {
      temp = [];
    }
    if (temp.length > 6) {
      temp = temp.slice(temp.length - 6, temp.length);
    }
    this.setState({
      Notifications: temp,
    });
  };

  setNotificationsStatus = () => {
    let temp = this.state.Notifications;
    if (this.state.Notifications.length !== 0) {
      temp.forEach((element) => {
        element.status = "read";
      });
    }
    this.setState({
      Notifications: temp,
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
          setNotificationsStatus: this.setNotificationsStatus,
        }}
      >
        {this.props.children}
      </NotificationsContext.Provider>
    );
  }
}
const NotificationsConsumer = NotificationsContext.Consumer;

export { NotificationsProvider, NotificationsContext };
