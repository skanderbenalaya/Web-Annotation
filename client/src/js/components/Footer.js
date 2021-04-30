import React, { Component } from "react";
import { Container, Button } from "../styles/FooterStyle";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";
import {
  LoadCount,
  LoadQuestion,
  IgnoreQuestion,
  ValidateQuestion,
} from "../store/actions/questionActions";

class footer extends Component {
  componentDidMount = async () => {
    this.props.LoadCount();
  };
  render() {
    const question_id = this.props.question_state.question_data._id;
    const A_id = this.props.answer_state.cardActive.A_id;
    const data = {
      topic: this.props.topic_state.selectedTopic,
      answer: this.props.answer_state.cardActive.answer,
      question: this.props.question_state.question_data.question,
    };
    const count = this.props.count;
    // console.log("count ", count);
    const selectedCard = this.props.selectedCard;
    const styleTooltip = {
      backgroundColor: "#00000000",
      color: "black",
      textAlign: "center",
    };
    return (
      <Container>
        <Button
          className={"ignoreBtn"}
          data-tip
          data-for="ignore"
          disabled={count === 0}
          onClick={() => {
            this.props.IgnoreQuestion(question_id);
          }}
        ></Button>
        <ReactTooltip id="ignore" place="left" type="error" effect="solid">
          <span style={styleTooltip}>Ignore</span>
        </ReactTooltip>
        <Button
          className={"validateBtn"}
          data-tip
          data-for="validate"
          disabled={selectedCard === 0}
          onClick={() => {
            this.props.ValidateQuestion(question_id, A_id, data);
            console.log("data: ", data);
          }}
        ></Button>
        <ReactTooltip id="validate" place="left" type="success" effect="solid">
          <span style={styleTooltip}>Validate</span>
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
  LoadCount,
  LoadQuestion,
  IgnoreQuestion,
  ValidateQuestion,
})(footer);
