import React, { Component } from "react";
import { TContainer } from "../styles/TopicStyles";
import api from "../api";
import px2vw from "../utils/px2vw";
// import React from 'react';
import Select from "react-select";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "0.8px solid #F0F2F3",
    ":last-child": {
      ...provided[":last-child"],
      borderBottom: "none",
    },
    color: state.isSelected ? "black" : "black",
    backgroundColor: state.isSelected ? "#AEC0CA" : "white",
    // backgroundColor: state.isFocused ? (state.isSelected ? "#AEC0CA" : "#E1E9EC") :"white" ,
    ":hover": {
      ...provided[":hover"],
      backgroundColor: state.Selected ? "#AEC0CA" : "#E1E9EC",
    },
    padding: 20,
  }),

  menuList: (styles) => ({
    ...styles,
    paddingBottom: 0,
    paddingTop: 0,
  }),

  control: (styles) => ({
    ...styles,
    borderColor: "hsl(0, 0%, 80%)",
    ":hover": {
      ...styles[":hover"],
      borderColor: "hsl(0, 0%, 80%)",
    },
    boxShadow: "0 0 0 0.5px #C1C1C1",
  }),

  container: (styles) => ({
    ...styles,
    width: `${px2vw(260, 320)}`,
    "@media only screen and (min-width: 768px)": {
      ...styles["@media only screen and (min-width: 768px)"],
      width: `${px2vw(400, 768)}`,
    },
    "@media only screen and (min-width: 1024px)": {
      ...styles["@media only screen and (min-width: 1024px)"],
      width: `${px2vw(580, 1440)}`,
    },
  }),

  valueContainer: () => ({
    width: 400,
    alignItems: "center",
    display: "flex",
    flex: 1,
    flexWrap: "wrap",
    padding: "10px 10px",
    position: "relative",
    overflow: "hidden",
    boxSizing: "border-box",
  }),
  singleValue: (styles) => ({
    ...styles,
    fontSize: "1.3rem",
    fontWeight: 700,
    "@media only screen and (min-width: 1024px)": {
      ...styles["@media only screen and (min-width: 1024px)"],
      fontSize: "1rem",
    },
  }),
};

export default class DropdownTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      topics: [],
      isLoading: false,
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    await api.getTopics().then((topic) => {
      var a = [];
      topic.data.data.forEach((doc) => a.push({ value: doc, label: doc }));
      console.log(topic);
      this.setState({
        topics: a,
        isLoading: false,
      });
    });
  };
  state = {
    selectedOption: null,
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
  };

  render() {
    const { selectedOption, topics } = this.state;
    return (
      <>
        <TContainer>
          <Select
            isSearchable={false}
            // menuIsOpen={true}
            placeholder={"Select a topic ..."}
            styles={customStyles}
            value={selectedOption}
            onChange={this.handleChange}
            options={topics}
          />
        </TContainer>
      </>
    );
  }
}
