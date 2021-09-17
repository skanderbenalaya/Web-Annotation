import Modal from "styled-react-modal";
import React, { useState } from "react";
import px2vw from "../../utils/px2vw";
import { QTitle } from "../../styles/QuestionStyles";
import { AddIcon } from "../../styles/IconStyles";
import styled from "styled-components";
import { AddTopic } from "../../store/actions/topicActions";
import { useSelector, useDispatch } from "react-redux";
const ModalBox = Modal.styled`
  display: flex;
  max-width: 100%;
  position: fixed;
  top: ${px2vw(35, 320)};
  justify-content: center;
  width: ${px2vw(240, 320)};
  min-height: ${px2vw(100, 768)};
  flex-direction: row;
  flex-wrap: wrap;
  padding: ${px2vw(10)};
  margin: ${px2vw(20)};
  background-color: white;
  border-radius: 20px;
  opacity: ${(props) => props.opacity};
  transition : all 0.1s ease-in-out;
  @media (min-width: 768px) {
    width: ${px2vw(450, 768)};
    min-height: ${px2vw(85, 1024)};
  }
  @media (min-width: 1024px) {
    width: ${px2vw(500, 1024)};
    min-height: ${px2vw(87)};
  }
`;

const ModalBoxText = styled.textarea`
  position: relative;
  padding: 0.25em 0.5em;
  margin: auto;
  color: #333;
  display: block;
  width: 80%;
  height: auto;
  word-wrap: break-word;
  background-color: #fff;
  border-radius: 4px;
  font-size: 1.3rem;
  font-weight: 400;
  outline: none;
`;

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
  height: 20px;
  width: 50px;
  line-height: 20px;
  border-radius: ${px2vw(4, 320)};
  text-align: center;
  font-weight: bold;
  background-color: #fff;
  color: #000;
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
  const [text, setText] = useState("");
  let count = useSelector((state) => state.question_state.count);
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
    setText("");
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 300);
    });
  }

  return (
    <React.Fragment>
      <AddIcon disabled={count === 0} onClick={toggleModal} />
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
        <QTitle>Topic</QTitle>
        <ModalBoxText
          rows="1"
          placeholder="Insert Topic Here"
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
              dispatch(AddTopic(text));
            }}
          >
            Save
          </Button>
        </BContainer>
      </ModalBox>
    </React.Fragment>
  );
}
