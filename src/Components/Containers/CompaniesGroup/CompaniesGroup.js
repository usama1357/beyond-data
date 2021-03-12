import React, { Component } from "react";
import { Tag } from "antd";
import "./CompaniesGroup.scss";

const { CheckableTag } = Tag;

export default class CompaniesGroup extends Component {
  handleChange(tag, checked) {
    // const { selectedTags } = this.state;
    // const nextSelectedTags = checked
    //   ? [...selectedTags, tag]
    //   : selectedTags.filter((t) => t !== tag);
    // console.log("You are interested in: ", nextSelectedTags);
    // this.setState({ selectedTags: nextSelectedTags });
    if (checked === false) {
      this.props.removeselected(tag);
    } else if (checked === true) {
      this.props.addselected(tag);
    }
  }
  handleSingleChange(tag, checked) {
    if (checked === false) {
      this.props.removesingle(tag);
    } else if (checked === true) {
      this.props.addsingle(tag);
    }
  }

  render() {
    console.log(this.props);
    return this.props.data ? (
      <div className="CompaniesGroup">
        {this.props.data.length > 1 ? (
          this.props.data.map((tag) => (
            <CheckableTag
              key={tag}
              checked={this.props.selected.includes(tag)}
              onChange={(checked) => this.handleChange(tag, checked)}
            >
              {tag}
            </CheckableTag>
          ))
        ) : (
          <CheckableTag
            key={"0"}
            checked={this.props.selected}
            onChange={(checked) =>
              this.handleSingleChange(this.props.data[0], checked)
            }
          >
            {this.props.data[0]}
          </CheckableTag>
        )}
      </div>
    ) : null;
  }
}
