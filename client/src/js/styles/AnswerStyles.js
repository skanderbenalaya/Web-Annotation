import styled from "styled-components";
import px2vw from "../utils/px2vw";
export const Container = styled.div`
  display: flex;
  border: 2px solid #b6b6b6;
  border-radius: 20px;
  padding-top: ${px2vw(200)};
  padding-left: ${px2vw(32)};
  padding-right: ${px2vw(32)};
  padding-bottom: ${px2vw(32)};
  margin-top: ${px2vw(100)};
  margin-left: ${px2vw(32)};
  margin-right: ${px2vw(32)};
  margin-bottom: ${px2vw(32)};
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
  @media (min-width: 768px) {
    padding-top: ${px2vw(80)};
    margin-top: ${px2vw(32)};
    margin-left: ${px2vw(32)};
    margin-right: ${px2vw(32)};
    margin-bottom: ${px2vw(32)};
  }
  @media (min-width: 1024px) {
    padding-top: ${px2vw(50)};
  }
  @media (min-width: 1280px) {
    padding-top: ${px2vw(40)};
  }
`;
export const Box = styled.div`
  display: flex;
  width: ${px2vw(280, 320)};
  min-height: ${px2vw(200, 320)};
  flex-direction: column;
  padding: ${px2vw(32)};
  margin: ${px2vw(20)};
  background-color: ${(props) => props.bgColor};
  background-image: ${(props) => props.bgImage};
  box-shadow: 0 7px 30px -10px rgba(150, 170, 180, 0.5);
  border: 2px solid ${(props) => props.bgColor};
  height: auto;
  border-radius: 20px;
  cursor: pointer;
  @media (min-width: 768px) {
    padding-top: ${px2vw(40)};
    width: ${px2vw(320, 768)};
    min-height: ${px2vw(200, 768)};
    height: auto;
  }
  @media (min-width: 1024px) {
    padding-top: ${px2vw(40)};
    width: ${px2vw(400, 1024)};
    min-height: ${px2vw(300)};
    height: auto;
  }
  @media (min-width: 1280px) {
    padding-top: ${px2vw(20)};
    width: ${px2vw(348, 1280)};
    min-height: ${px2vw(300)};
    height: auto;
  }
  &.card {
    :hover {
      filter: brightness(110%);
      -webkit-filter: brightness(110%);
      -moz-filter: brightness(110%);
      -o-filter: brightness(110%);
      -ms-filter: brightness(110%);
      -webkit-transform: scale(1.05);
      -ms-transform: scale(1.05);
      transform: scale(1.05);
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      transition: 0.25s ease-out;
    }
  }
  &.cardActive {
    transform: scale(1);
    filter: brightness(96%);
    -webkit-filter: brightness(96%);
    -moz-filter: brightness(96%);
    -o-filter: brightness(96%);
    -ms-filter: brightness(96%);
    border: 2px solid #000;
    transition: 0.15s ease-in;
  }
`;
export const BoxTitle = styled.h3`
  color: #333;
  font-size: 2rem;
  text-align: center;
  border-radius: 20px;
  background-color: #00000000;
  @media (min-width: 1024px) {
    font-size: 1.5rem;
  }
`;
export const BoxText = styled.p`
  position: relative;
  white-space: pre-wrap;
  margin-top: ${px2vw(20)};
  background-color: #00000000;
  color: #464646;
  font-size: 1.5rem;
  @media (min-width: 1024px) {
    font-size: 1.1rem;
  }
`;

export const AContainer = styled.div`
  display: flex;
  margin-top: -${px2vw(150)};
  flex-direction: row;
  position: absolute;
  flex-wrap: wrap;
  justify-content: center;
  @media (min-width: 768px) {
    margin-top: -${px2vw(50)};
  }
  @media (min-width: 1024px) {
    padding-top: ${px2vw(25)};
  }
  @media (min-width: 1280px) {
    padding-top: ${px2vw(26)};
  }
`;

export const SButton = styled.a`
  position: relative;
  flex-direction: row;
  display: flex;
  flex: 1 100%;
  justify-content: space-evenly;
  height: 14px;
  width: 45px;
  line-height: 24px;

  @media (min-width: 768px) {
    height: 16px;
    width: 128px;
    bottom: auto;
    line-height: 16px;
  }
  @media (min-width: 1024px) {
    height: 18px;
    width: 190px;
    bottom: auto;
    line-height: 18px;
  }
`;

export const SearchBox = styled.input`
  display: flex;
  position: relative;
  margin-top: 12px;
  padding: 0.25em 0.5em;
  width: 140px;
  border: solid 1px grey;
  color: #333;
  word-wrap: break-word;
  background-color: #fff;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 50;
  @media (min-width: 768px) {
    margin-top: -${px2vw(7, 320)};
    left: ${px2vw(120, 320)};
  }
  @media (min-width: 1024px) {
    margin-top: -${px2vw(6, 320)};
  }
  @media (min-width: 1280px) {
    margin-top: -${px2vw(11, 786)};
    left: ${px2vw(310, 768)};
  }
`;
