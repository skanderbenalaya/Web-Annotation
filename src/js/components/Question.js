import React, { Component } from "react";
import {
  QContainer,
  QBox,
  QBoxText,
  QTitle,
  QCount,
  Button,
  Reload,
  SButton,
} from "../styles/QuestionStyles";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";
import {
  LoadCount,
  LoadQuestion,
  IgnoreQuestion,
  SkipQuestion,
  UnlockQuestion,
} from "../store/actions/questionActions";
import AddButton from "./Modals/AddQuestionModal";
import EditButton from "./Modals/EditQuestionModal";
import { CancelIcon } from "../styles/IconStyles";
import { Beforeunload } from "react-beforeunload";

class question extends Component {
  componentDidMount = async () => {
    console.log("Mount");
    this.props
      .LoadQuestion(this.props.question_state.question_data._id)
      .then((response) => {
        this.props.LoadCount();
      });
  };

  render() {
    const question = this.props.question_state.question_data;
    const question_id = this.props.question_state.question_data._id;
    const count = this.props.count;
    const username = this.props.username;
    const styleTooltip = {
      backgroundColor: "#00000000",
      color: "white",
      textAlign: "center",
    };
    return (
      <React.Fragment>
        <Beforeunload
          onBeforeunload={() => {
            this.props.UnlockQuestion(question_id);
            window.onunload = function () {
              fetch(
                `http://localhost:3000/api/question/release/${question_id}`,
                {
                  method: "PUT",
                  keepalive: true,
                }
              );
            };
          }}
        />
        <QContainer>
          <QBox key={question._id}>
            <QTitle>Question</QTitle>
            <QCount>
              <div
                style={{
                  display: "inline-block",
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "20px",
                  paddingLeft: "6px",
                  paddingRight: "6px",
                  paddingTop: "2px",
                  paddingBottom: "2px",
                }}
              >
                {!question_id
                  ? `${count} Remaining`
                  : !count
                  ? `Last one`
                  : `${count} Remaining`}
              </div>
            </QCount>
            <SButton>
              <AddButton />
              <EditButton />
              <CancelIcon
                disabled={question_id === 0}
                onClick={() => {
                  this.props.IgnoreQuestion(question_id, username);
                }}
              />
            </SButton>
            <QBoxText>{question.question}</QBoxText>
          </QBox>
          <Button
            className={"skipBtn"}
            data-tip
            data-for="skip"
            disabled={
              // false
              count < 1
            }
            onClick={() => {
              this.props.SkipQuestion(question_id);
            }}
          >
            <Reload />
          </Button>
          <ReactTooltip id="skip" place="right" type="dark" effect="solid">
            <span style={styleTooltip}>Skip</span>
          </ReactTooltip>
        </QContainer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  question_state: state.question_state,
  count: state.question_state.count,
});

export default connect(mapStateToProps, {
  LoadCount,
  LoadQuestion,
  IgnoreQuestion,
  SkipQuestion,
  UnlockQuestion,
})(question);
