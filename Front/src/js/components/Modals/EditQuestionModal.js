import Modal from "styled-react-modal";
import React, { useState } from "react";
import px2vw from "../../utils/px2vw";
import { QTitle } from "../../styles/QuestionStyles";
import { EditIcon } from "../../styles/IconStyles";
import styled from "styled-components";
import { EditQuestion } from "../../store/actions/questionActions";
import { useSelector, useDispatch } from "react-redux";
const ModalBox = Modal.styled`
  display: flex;
  max-width: 100%;
  position: fixed;
  top: ${px2vw(35, 320)};
  justify-content: center;
  width: ${px2vw(280, 320)};
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
    width: ${px2vw(650, 768)};
    min-height: ${px2vw(100, 1024)};
  }
  @media (min-width: 1024px) {
    width: ${px2vw(800, 1024)};
    min-height: ${px2vw(100)};
  }
`;

const ModalBoxText = styled.textarea`
  position: relative;
  padding: 0.25em 0.5em;
  margin: auto;
  color: #333;
  display: block;
  width: 90%;
  height: auto;
  word-wrap: break-word;
  background-color: #fff;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 400;
  outline: none;
  @media (min-width: 1024px) {
    font-size: 1.3rem;
  }
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
export default function EditButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const initText = useSelector(
    (state) => state.question_state.question_data.question
  );
  const [text, setText] = useState(initText);
  let id = useSelector((state) => state.question_state.question_data._id);
  const dispatch = useDispatch();
  function toggleModal(e) {
    setOpacity(0);
    setIsOpen(!isOpen);
  }

  function beforeOpen() {
    setText(initText);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeClose() {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 300);
    });
  }

  return (
    <React.Fragment>
      <EditIcon disabled={id === 0} onClick={toggleModal} />
      <ModalBox
        isOpen={isOpen}
        beforeOpen={beforeOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
        <QTitle>Question</QTitle>
        <ModalBoxText
          rows="2"
          placeholder="Insert Question Here"
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
                dispatch(EditQuestion(id, text));
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
