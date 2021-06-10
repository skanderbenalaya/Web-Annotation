import Modal from "styled-react-modal";
import React, { useState } from "react";
import px2vw from "../../utils/px2vw";
import { QTitle } from "../../styles/QuestionStyles";
import { AddIcon } from "../../styles/IconStyles";
import styled from "styled-components";
import { AddAnswer } from "../../store/actions/answerActions";
import { useSelector, useDispatch } from "react-redux";
const ModalBox = Modal.styled`
  display: flex;
  max-width: 100%;
  position: fixed;
  top: ${px2vw(110, 320)};
  justify-content: center;
  width: ${px2vw(260, 320)};
  min-height: ${px2vw(140, 320)};
  flex-direction: row;
  flex-wrap: wrap;
  padding: ${px2vw(10)};
  margin: ${px2vw(20)};
  background-color: white;
  border-radius: 20px;
  opacity: ${(props) => props.opacity};
  transition : all 0.1s ease-in-out;
  @media (min-width: 768px) {
    top: ${px2vw(85, 320)};
    width: ${px2vw(420, 768)};
    min-height: ${px2vw(215, 768)};
  }
  @media (min-width: 1024px) {
    top: ${px2vw(70, 320)};
    width: ${px2vw(470, 1024)};
    min-height: ${px2vw(320)};
  }
  @media (min-width: 1280px) {
    top: ${px2vw(55, 320)};
    width: ${px2vw(420, 1280)};
    min-height: ${px2vw(280)};
  }
`;

const ModalBoxText = styled.textarea`
  position: relative;
  padding: 0.25em 0.5em;
  margin: auto;
  margin-left: -${px2vw(10)};
  color: #333;
  display: block;
  width: 80%;
  height: auto;
  word-wrap: break-word;
  background-color: #fff;
  border-radius: 4px;
  font-size: 1.3rem;
  outline: none;
  font-weight: 400;
`;

// const CodeText = styled.input`
//   position: relative;
//   padding: 0.25em 0.5em;
//   margin-left: auto;
//   margin-top: auto;
//   margin-right: auto;
//   color: #333;
//   display: block;
//   width: 40%;
//   border: solid 1px grey;
//   word-wrap: break-word;
//   background-color: #fff;
//   border-radius: 4px;
//   font-size: 1.3rem;
//   font-weight: 400;
// `;

const BContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #00000000;
  bottom: -36px;
  right: 20px;
  width: 120px;

  @media (min-width: 768px) {
    bottom: -46px;
    right: 30px;
    width: 160px;
  }
  @media (min-width: 1024px) {
    bottom: -64px;
    right: 40px;
    width: 200px;
  }
`;

const Button = styled.a`
  position: relative;
  color: #000;
  height: 20px;
  width: 50px;
  line-height: 20px;
  border-radius: ${px2vw(4, 320)};
  text-align: center;
  font-weight: bold;
  background-color: #fff;
  overflow: hidden;
  font-size: 1rem;
  transition: 0.1s;
  cursor: pointer;
  @media (min-width: 768px) {
    height: 24px;
    width: 60px;
    line-height: 24px;
  }
  @media (min-width: 1024px) {
    height: 28px;
    width: 70px;
    line-height: 28px;
  }
  &:hover {
    color: #000;
    cursor: pointer;
  }
  &:active {
    -ms-transform: translateY(2px);
    -webkit-transform: translateY(2px);
    transform: translateY(2px);
  }
`;
export default function AddButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);
  // const [code, setCode] = useState("");
  const [text, setText] = useState("");
  const selectedTopic = useSelector((state) => state.topic_state.selectedTopic);
  const dispatch = useDispatch();
  function toggleModal(e) {
    setOpacity(0);
    setIsOpen(!isOpen);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeClose() {
    // setCode("");
    setText("");
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 300);
    });
  }

  return (
    <React.Fragment>
      <AddIcon disabled={selectedTopic === ""} onClick={toggleModal} />
      <ModalBox
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={() => {
          toggleModal();
          setText("");
        }}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
        <QTitle>Answer</QTitle>
        {/* <CodeText
          placeholder="Insert Code Here"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        /> */}
        <ModalBoxText
          rows="5"
          placeholder="Insert Answer Here"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <BContainer>
          <Button
            className={"closeBtn"}
            onClick={() => {
              toggleModal();
            }}
          >
            Close
          </Button>
          <Button
            className={"saveBtn"}
            onClick={() => {
              if (text === "") {
                toggleModal();
              } else {
                dispatch(
                  AddAnswer(selectedTopic, [
                    {
                      A_id: null,
                      topic: selectedTopic,
                      answer: text,
                      questions: [],
                    },
                  ])
                );
                toggleModal();
              }
            }}
          >
            Save
          </Button>
        </BContainer>
      </ModalBox>
    </React.Fragment>
  );
}
