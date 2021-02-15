import React from "react";
import { Select } from "antd";
import "./AutoMLSelectDatasetsDropdown.scss";

export default function AutoMLSelectDatasetsDropdown(props) {
  const { Option } = Select;

  function onChange(value) {
    props.selected(value);
  }

  function onBlur() {}

  function onFocus() {}

  function onSearch(val) {}
  return (
    <div className="SelectDatasetsDropdown">
      <Select
        showSearch
        style={{
          width: "350px",
          fontSize: "11px",
          height: "30px",
        }}
        placeholder={`Select ${props.type}`}
        optionFilterProp="children"
        disabled={!props.data}
        value={props.value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        size="large"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {props.data ? (
          props.data.map((item, index) => (
            <Option value={`${item}`} key={index}>
              {item}
            </Option>
          ))
        ) : (
          <Option value="Nothing">Nothing to Show</Option>
        )}
        {/* <Option value="Oil and Gas">Oil and Gas</Option>
                <Option value="Banking">Banking</Option>
                <Option value="Oil and Gas Exploration">Oil and Gas Exploration</Option>
                <Option value="Oil and Gas Refinery">Oil and Gas Refinery</Option>
                <Option value="Oil and Gas Marketing">Oil and Gas Marketing</Option> */}
      </Select>
    </div>
  );
}
