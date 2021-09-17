import React, { Component } from "react";
import {
  Container,
  Box,
  BoxText,
  AContainer,
  SButton,
  ATitle,
} from "../styles/AnswerStyles";
import { connect } from "react-redux";
import { SelectAnswer, DeleteAnswer } from "../store/actions/answerActions";
import AddButton from "./Modals/AddAnswerModal";
import EditButton from "./Modals/EditAnswerModal";
import { DeleteIcon } from "../styles/IconStyles";

class answer extends Component {
  constructor(props) {
    super(props);
    this.selectCard = this.selectCard.bind(this);
  }
  selectCard(data) {
    this.props.SelectAnswer(data);
  }

  render() {
    const boxData = this.props.answer_state.answer_data;
    // console.log("boxData", boxData);
    const cardActive = this.props.answer_state.cardActive;
    // console.log("cardActive", cardActive);
    const selectedTopic = this.props.topic_state.selectedTopic;
    return (
      <React.Fragment>
        {boxData.length ? (
          <Container>
            <ATitle>Answers</ATitle>
            <AContainer>
              <SButton>
                <AddButton />
                <EditButton />
                <DeleteIcon
                  disabled={cardActive.A_id === 0 || boxData.length === 1}
                  onClick={() => {
                    this.props.DeleteAnswer(selectedTopic, cardActive._id);
                  }}
                />
              </SButton>
            </AContainer>
            {boxData.map((box) => (
              <Box
                key={box.id}
                onClick={() => {
                  this.selectCard({
                    _id: box.id,
                    A_id: box.title,
                    answer: box.text,
                  });
                }}
                bgColor={box.bgColor}
                bgImage={box.bgImage}
                className={box.id === cardActive._id ? "cardActive" : "card"}
              >
                <BoxText>{box.text}</BoxText>
              </Box>
            ))}
          </Container>
        ) : selectedTopic.length ? (
          <Container>
            <ATitle>Answers</ATitle>
            <AContainer>
              <SButton>
                <AddButton />
                <EditButton />
              </SButton>
            </AContainer>
            <div style={{ margin: "50px", textAlign: "center" }}>
              <span style={{ display: "inline-block" }}>
                Add answers for this topic
              </span>
            </div>
          </Container>
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  answer_state: state.answer_state,
  topic_state: state.topic_state,
});

export default connect(mapStateToProps, {
  SelectAnswer,
  DeleteAnswer,
})(answer);
