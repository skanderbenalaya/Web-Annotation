import React from "react";
import Global from "../styles/global";
import Question from "./Question";
import Topic from "./Topic";
import Answer from "./Answer";
import Footer from "./Footer";
import styled from "styled-components";
import { ModalProvider, BaseModalBackground } from "styled-react-modal";
const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.1s ease-in-out;
`;
function MainWindow(props) {
  return (
    <ModalProvider backgroundComponent={FadingBackground}>
      <Global />
      <Question username={props.username} />
      <Topic />
      <Answer />
      <Footer username={props.username} />
    </ModalProvider>
  );
}

export default MainWindow;
