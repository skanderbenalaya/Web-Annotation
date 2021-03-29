import React, { Component } from "react";
import Global from "./styles/global";
import ABox from "./components/Box";
import Question from "./components/QuestionBox";
import DropdownTopic from "./components/TopicBox";
const lorem =
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, sed iure blanditiis voluptatum nulla quidem minus quam tempora obcaecati necessitatibus inventore! Vitae totam quam pariatur facilis fugit maxime adipisci eaque.";
const data = [
  {
    id: Math.random(),
    title: "Box title 1",
    text: lorem,
    bgColor: "#D5CAFA",
  },
  {
    id: Math.random(),
    title: "Box title 2",
    text: lorem,
    bgColor: "#EDA9A9",
  },
  {
    id: Math.random(),
    title: "Box title 3",
    text: lorem,
    bgColor: "#F2EE8D",
  },
  {
    id: Math.random(),
    title: "Box title 4",
    text: lorem,
    bgColor: "#9FEACD",
  },
  {
    id: Math.random(),
    title: "Box title 5",
    text: lorem,
    bgColor: "#FADCCA",
  },
  {
    id: Math.random(),
    title: "Box title 5",
    text: lorem,
    bgColor: "#CAF6FA",
  },
];

class App extends Component {
  render() {
    return (
      <>
        <Global />
        <Question />
        <DropdownTopic />
        <ABox boxData={data} />
      </>
    );
  }
}
export default App;
