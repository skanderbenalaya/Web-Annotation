import React from "react";
import Global from "../styles/global";
import Question from "./Question";
import Topic from "./Topic";
import Answer from "./Answer";
import Footer from "./Footer";

function App() {
  return (
    <>
      <Global />
      <Question />
      <Topic />
      <Answer />
      <Footer />
    </>
  );
}

export default App;

// class App extends Component {
//   constructor(props) {
//     super(props);
// this.state = { answers: [] };
// this.fetchData = this.fetchData.bind(this);
// }

// fetchData = async (topic) => {
//   await apis.getTopicAnswers(topic).then((res) => {
//     var answerarray = [];
//     res.data.data.forEach((doc, i) =>
//       answerarray.push({
//         id: doc._id,
//         title: doc.A_id,
//         text: doc.answer,
//         bgColor: classcolors[Math.floor(i % classcolors.length)],
//         bgImage: classimages[Math.floor(i % classcolors.length)],
//       })
//     );
//     this.setState({
//       answers: answerarray,
//     });
//     console.log(answerarray);
//   });
// };
// fetchData={this.fetchData}
/* 
        <AnswerBox boxData={this.state.answers} /> */

//   render() {
//     return (
//       <>
//         <Global />
//         <Question />
//         <Footer />
//       </>
//     );
//   }
// }
// export default App;
