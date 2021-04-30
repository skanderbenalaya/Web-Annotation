import React, { Component } from "react";
import { TContainer } from "../styles/TopicStyles";
import px2vw from "../utils/px2vw";
import Select from "react-select";
import { connect } from "react-redux";
import { LoadTopic, SelectTopic } from "../store/actions/topicActions";
import { LoadAnswer, SelectAnswer } from "../store/actions/answerActions";

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
    backgroundColor: "#fff",
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
    backgroundColor: "#fff",
    fontWeight: 700,
    "@media only screen and (min-width: 1024px)": {
      ...styles["@media only screen and (min-width: 1024px)"],
      fontSize: "1rem",
    },
  }),
  placeholder: (styles) => ({
    ...styles,
    backgroundColor: "#fff",
  }),
};

class topic extends Component {
  constructor(props) {
    super(props);
    this.selectTopic = this.selectTopic.bind(this);
  }
  selectTopic(val) {
    this.props.SelectTopic(val);
  }
  componentDidMount = async () => {
    this.props.LoadTopic();
  };

  handleChange = (selectedOption) => {
    console.log(`afterselect : `, selectedOption.value);
  };

  render() {
    const question_count = this.props.question_count;
    const selectedTopic = this.props.topic_state.selectedTopic;
    console.log(`render selectOption`, selectedTopic);
    const topic_data = this.props.topic_state.topic_data;
    return (
      <>
        <TContainer>
          <Select
            isSearchable={false}
            placeholder={"Select a topic ..."}
            styles={customStyles}
            value={
              !selectedTopic
                ? null
                : { value: selectedTopic, label: selectedTopic }
            }
            onChange={(selectedTopic) => {
              this.handleChange(selectedTopic);
              this.props.SelectAnswer({ A_id: 0, answer: "" });
              this.props.LoadAnswer(selectedTopic.value);
              this.selectTopic(selectedTopic.value);
              console.log("HandleselectedOption", selectedTopic);
            }}
            options={topic_data}
            isDisabled={!question_count}
          />
        </TContainer>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  question_count: state.question_state.count,
  topic_state: state.topic_state,
});

export default connect(mapStateToProps, {
  LoadTopic,
  SelectTopic,
  LoadAnswer,
  SelectAnswer,
})(topic);
