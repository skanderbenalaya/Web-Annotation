import React, { Component } from "react";
import { QContainer, QBox, QBoxText, QTitle } from "../styles/QuestionStyles";
import api from "../api";

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      question: "",
      isLoading: false,
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    await api.getQuestion().then((question) => {
      console.log(question.data.data.question);
      if (question.data.data == null || question.data.data.length === 0) {
        this.setState({
          id: 0,
          question: "There are no questions to be mapped!",
          isLoading: false,
        });
      } else
        this.setState({
          id: question.data.data._id,
          question: question.data.data.question,
          isLoading: false,
        });
    });
  };

  render() {
    const { id, question, isLoading } = this.state;
    console.log("render -> cisLoading", isLoading);
    console.log("render -> cid", id);
    console.log("render -> cquestion", question);

    return (
      <QContainer>
        <QBox key={id}>
          <QTitle>Question</QTitle>
          <QBoxText>{question}</QBoxText>
        </QBox>
      </QContainer>
    );
  }
}
