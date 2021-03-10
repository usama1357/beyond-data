import React, { Component, createContext } from "react";

const ProjectContext = React.createContext();

class ProjectProvider extends Component {
  state = {
    name: JSON.parse(localStorage.getItem("Project"))
      ? JSON.parse(localStorage.getItem("Project")).name
      : null,
    type: JSON.parse(localStorage.getItem("Project"))
      ? JSON.parse(localStorage.getItem("Project")).type
      : null,
    data: JSON.parse(localStorage.getItem("Project"))
      ? JSON.parse(localStorage.getItem("Project")).desc
      : null,
    user: JSON.parse(localStorage.getItem("Project"))
      ? JSON.parse(localStorage.getItem("Project")).user
      : null,
  };

  setProject = (value) => {
    this.setState({
      name: value.name,
      type: value.type,
      data: value.desc,
      user: value.user,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      // Whatever storage mechanism you end up deciding to use.
      localStorage.setItem("Project", JSON.stringify(this.state));
    }
  }

  render() {
    return (
      <ProjectContext.Provider
        value={{ Project: this.state, setProject: this.setProject }}
      >
        {this.props.children}
      </ProjectContext.Provider>
    );
  }
}
const ProjectConsumer = ProjectContext.Consumer;

export { ProjectProvider, ProjectContext };
