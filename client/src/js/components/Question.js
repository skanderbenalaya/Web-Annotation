import React, { Component } from "react";
import { QContainer, QBox, QBoxText, QTitle } from "../styles/QuestionStyles";
import { connect } from "react-redux";
import { LoadQuestion } from "../store/actions/questionActions";

class question extends Component {
  componentDidMount = async () => {
    console.log("Mount");
    this.props.LoadQuestion();
  };
  render() {
    const question = this.props.question_state.question_data;
    // console.log("question",question);
    return (
      <QContainer>
        <QBox key={question._id}>
          <QTitle>Question</QTitle>
          <QBoxText>{question.question}</QBoxText>
        </QBox>
      </QContainer>
    );
  }
}

const mapStateToProps = (state) => ({ question_state: state.question_state });

export default connect(mapStateToProps, { LoadQuestion })(question);
