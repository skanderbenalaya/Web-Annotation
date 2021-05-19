import React, { Component } from "react";
import {
  QContainer,
  QBox,
  QBoxText,
  QTitle,
  Button,
  Reload,
  SButton,
} from "../styles/QuestionStyles";
import {DeleteIcon} from "../styles/IconStyles";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";
import {
  LoadCount,
  DeleteQuestion,
  LoadQuestion,
  SkipQuestion,
} from "../store/actions/questionActions";
import AddButton from "./Modals/AddQuestionModal";
import EditButton from "./Modals/EditQuestionModal";

class question extends Component {
  componentDidMount = async () => {
    // console.log("Mount");
    this.props.LoadQuestion();
    this.props.LoadCount();
  };

  render() {
    const question = this.props.question_state.question_data;
    const count = this.props.count;
    // console.log("question", question);
    // console.log("count ", count);
    const styleTooltip = {
      backgroundColor: "#00000000",
      color: "white",
      textAlign: "center",
    };
    return (
      <QContainer>
        <QBox key={question._id}>
          <QTitle>Question</QTitle>
          <SButton>
            <AddButton />
            <EditButton />
            <DeleteIcon
              disabled={count === 0}
              onClick={() => {
                this.props.DeleteQuestion(question._id);
              }}
            />
          </SButton>
          <QBoxText>{question.question}</QBoxText>
        </QBox>
        <Button
          className={"skipBtn"}
          data-tip
          data-for="skip"
          disabled={count < 2}
          onClick={() => {
            this.props.SkipQuestion();
          }}
        >
          <Reload />
        </Button>
        <ReactTooltip id="skip" place="right" type="dark" effect="solid">
          <span style={styleTooltip}>Skip</span>
        </ReactTooltip>
      </QContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  question_state: state.question_state,
  count: state.question_state.count,
});

export default connect(mapStateToProps, {
  LoadCount,
  DeleteQuestion,
  LoadQuestion,
  SkipQuestion,
})(question);
