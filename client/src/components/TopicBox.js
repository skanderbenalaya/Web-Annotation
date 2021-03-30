import React, { Component } from "react";
import { TContainer } from "../styles/TopicStyles";
import api from "../api";
import px2vw from "../utils/px2vw";
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
    ":hover": {
      ...provided[":hover"],
      backgroundColor: state.Selected ? "#AEC0CA" : "#E1E9EC",
    },
    padding: 20,
    transition: "all 0.3s ease 0s",
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
    backgroundColor:"#fff",
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
    backgroundColor:"#fff",
    fontWeight: 700,
    "@media only screen and (min-width: 1024px)": {
      ...styles["@media only screen and (min-width: 1024px)"],
      fontSize: "1rem",
    },
  }),
  placeholder: (styles) => ({
    ...styles,
    backgroundColor:"#fff",
    
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
      var topicoptions = [];
      topic.data.data.forEach((doc) => topicoptions.push({ value: doc, label: doc }));
      console.log(topic);
      this.setState({
        topics: topicoptions,
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
    const { fetchData } = this.props;
    return (
      <>
        <TContainer>
          <Select
            isSearchable={false}
            placeholder={"Select a topic ..."}
            styles={customStyles}
            value={selectedOption}
            onChange={(selectedOption) => {
              this.handleChange(selectedOption);
              console.log(selectedOption);
              fetchData(selectedOption.value);
            }}
            options={topics}
          />
        </TContainer>
      </>
    );
  }
}
