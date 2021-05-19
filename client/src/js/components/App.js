import React, { useEffect } from "react";
import Global from "../styles/global";
import Question from "./Question";
import Topic from "./Topic";
import Answer from "./Answer";
import Footer from "./Footer";
import styled from "styled-components";
import { ModalProvider, BaseModalBackground } from "styled-react-modal";
import useExitPrompt from "../utils/useExitPrompt";
const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.1s ease-in-out;
`;

function App() {
  const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);
  console.log("showExitPrompt", showExitPrompt);
  useEffect(() => {
    return () => {
      setShowExitPrompt(false);
    };
  });

  return (
    <>
      <ModalProvider backgroundComponent={FadingBackground}>
        <Global />
        <Question />
        <Topic />
        <Answer />
        <Footer />
      </ModalProvider>
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
