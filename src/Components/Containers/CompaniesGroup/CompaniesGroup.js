import React, { Component } from "react";
import { Tag } from "antd";
import "./CompaniesGroup.scss";

const { CheckableTag } = Tag;

export default class CompaniesGroup extends Component {
  state = {
    selectedTags: this.props.data,
  };

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }

  render() {
    const { selectedTags } = this.state;

    return (
      <div className="CompaniesGroup">
        {this.props.data.map((tag) => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={(checked) => this.handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </div>
    );
  }
}
