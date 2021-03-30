import React, { Component } from "react";
import Global from "./styles/global";
import ABox from "./components/ABox";
import Question from "./components/QuestionBox";
import DropdownTopic from "./components/TopicBox";
import Footer from "./components/Footer";
import apis from "./api";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { answers: [] };
    this.fetchData = this.fetchData.bind(this);
  }
  // "#D5CAFA",
  // "#FBA2A2",
  // "#FFFB89",
  // "#9FEACD",
  // "#FADCCA",
  // "#CAF6FA",
  classcolors = ["#8BC6EC", "#FFB086", "#A9C9FF","#FFCC7D", "#FAACA8", "#CEE88B"];
  classimages = [
    "linear-gradient(315deg, #8BC6EC 0%, #9599E2 100%)",
    "linear-gradient(315deg, #FFB086 0%, #FFDA87 100%)",
    "linear-gradient(315deg, #A9C9FF 0%, #FFBBEC 100%)",
    "linear-gradient(315deg, #FFCC7D 0%, #C6FF7C 100%)",
    "linear-gradient(315deg, #FAACA8 0%, #DDD6F3 100%)",
    "linear-gradient(315deg, #CEE88B 0%, #9DF0DF 71%, #6CECCF 100%)",
  ];

  fetchData = async (topic) => {
    await apis.getTopicAnswers(topic).then((res) => {
      var answerarray = [];
      res.data.data.forEach((doc, i) =>
        answerarray.push({
          id: doc._id,
          title: doc.A_id,
          text: doc.answer,
          bgColor: this.classcolors[Math.floor(i % this.classcolors.length)],
          bgImage: this.classimages[Math.floor(i % this.classcolors.length)],
        })
      );
      this.setState({
        answers: answerarray,
      });
      console.log(answerarray);
    });
  };

  render() {
    return (
      <>
        <Global />
        <Question />
        <DropdownTopic fetchData={this.fetchData} />
        <ABox boxData={this.state.answers} />
        <Footer />
      </>
    );
  }
}
export default App;
