import React, { Component } from "react";
import {
  Container,
  Box,
  BoxTitle,
  BoxText,
  AContainer,
  SButton,
  SearchBox,
} from "../styles/AnswerStyles";
import { DeleteIcon } from "../styles/IconStyles";
import { connect } from "react-redux";
import { SelectAnswer, DeleteAnswer } from "../store/actions/answerActions";
import AddButton from "./Modals/AddAnswerModal";
import EditButton from "./Modals/EditAnswerModal";

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
    console.log("boxData", boxData);
    const cardActive = this.props.answer_state.cardActive;
    const selectedTopic = this.props.topic_state.selectedTopic;
    let id =
      boxData.length === 0 || cardActive.A_id === 0
        ? null
        : boxData.find((item) => item.title === cardActive.A_id).id;
    return (
      <>
        {" "}
        {boxData.length ? (
          <Container>
            <AContainer>
              <SButton>
                <AddButton />
                <EditButton />
                <DeleteIcon
                  disabled={cardActive.A_id === 0}
                  onClick={() => {
                    this.props.DeleteAnswer(selectedTopic, id);
                  }}
                />
              </SButton>
            </AContainer>
            {boxData.map((box) => (
              <Box
                key={box.id}
                onClick={() => {
                  this.selectCard({ A_id: box.title, answer: box.text });
                }}
                bgColor={box.bgColor}
                bgImage={box.bgImage}
                className={
                  box.title === cardActive.A_id ? "cardActive" : "card"
                }
              >
                <BoxTitle>{box.title}</BoxTitle>
                <BoxText>{box.text}</BoxText>
              </Box>
            ))}
          </Container>
        ) : null}
      </>
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
