import React, { Component } from "react";
import { Container, Button, FSpan } from "../styles/FooterStyle";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";
import {
  IgnoreQuestion,
  ValidateQuestion,
} from "../store/actions/questionActions";

class footer extends Component {
  componentDidMount = async () => {
    // const username = this.props.username;
    // console.log(username);
  };
  render() {
    const question_id = this.props.question_state.question_data._id;
    const _id = this.props.answer_state.cardActive._id;
    const username= this.props.username;
    const data = {
      A_id: this.props.answer_state.cardActive.A_id,
      topic: this.props.topic_state.selectedTopic,
      answer: this.props.answer_state.cardActive.answer,
      question: this.props.question_state.question_data.question,
    };
    // console.log(data);
    const selectedCard = this.props.selectedCard;
    // const styleTooltip = {
    //   backgroundColor: "#00000000",
    //   color: "black",
    //   textAlign: "center",
    // };
    return (
      <Container>
        <Button
          className={"validateBtn"}
          data-tip
          data-for="validate"
          disabled={
            selectedCard === 0
          }
          onClick={() => {
            this.props.ValidateQuestion(question_id, _id, data,username);
          }}
        ></Button>
        <ReactTooltip id="validate" place="left" type="success" effect="solid">
          <FSpan>Validate</FSpan>
        </ReactTooltip>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  question_state: state.question_state,
  topic_state: state.topic_state,
  answer_state: state.answer_state,
  count: state.question_state.count,
  selectedCard: state.answer_state.cardActive.A_id,
});

export default connect(mapStateToProps, {
  IgnoreQuestion,
  ValidateQuestion,
})(footer);
