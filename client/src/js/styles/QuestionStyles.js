import styled from "styled-components";
import px2vw from "../utils/px2vw";
export const QContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: ${px2vw(32)};
  max-width: 100%;
`;
export const QBox = styled.div`
  display: flex;
  max-width: 100%;
  width: ${px2vw(280, 320)};
  min-height: ${px2vw(100, 768)};
  flex-direction: column;
  padding: ${px2vw(10)};
  margin: ${px2vw(20)};
  background-color: #fff;
  box-shadow: 0 7px 30px -10px rgba(150, 170, 180, 0.5);
  border-radius: 20px;
  height: 100%;
  @media (min-width: 768px) {
    width: ${px2vw(650, 768)};
    min-height: ${px2vw(100, 1024)};
    height: 100%;
  }
  @media (min-width: 1024px) {
    width: ${px2vw(800, 1024)};
    min-height: ${px2vw(100)};
    height: 100%;
  }
`;
export const QTitle = styled.div`
  display:inline;
  width:fit-content;
  height:fit-content;
  background-color: #fff;
  font-size: 1.3rem;
  font-weight: 700;
  @media (min-width: 1024px) {
    font-size: 1rem;
  }
`;
export const QBoxText = styled.p`
  margin:auto;
  color: #333;
  display: block;
  width: 90%;
  word-wrap: break-word;
  background-color: #fff;
  font-size: 1.5rem;
  font-weight: 400;
  @media (min-width: 1024px) {
    font-size: 1.3rem;
  }
`;
