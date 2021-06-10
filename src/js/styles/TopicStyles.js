import styled from "styled-components";
import px2vw from "../utils/px2vw";

export const TContainer = styled.div`
  display: flex;
  flex: 0 1 30%;
  position: relative;
  flex-wrap: wrap;
  margin: auto;
  margin-top: 35px;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    margin-top: 42px;
  }
  @media (min-width: 1024px) {
    margin-top: 45px;
  }
`;

export const TTitle = styled.div`
  font-family: Helvetica, Arial, Sans-Serif;
  position: absolute;
  display: flex;
  top: -24px;
  left: 45px;
  width: fit-content;
  height: fit-content;
  font-size: 0.8rem;
  font-weight: 700;
  @media (min-width: 768px) {
    top: -24px;
    left: ${px2vw(155, 768)};
  }
  @media (min-width: 1024px) {
    top: -26px;
    left: ${px2vw(380, 1440)};
    font-size: 1rem;
  }
`;
export const SButton = styled.a`
  color: #000;
  position: absolute;
  flex-direction: row;
  display: flex;
  bottom: -30px;
  justify-content: space-evenly;
  height: 14px;
  width: 90px;
  line-height: 24px;

  @media (min-width: 768px) {
    height: 16px;
    width: 64px;
    bottom: auto;
    left: ${px2vw(586, 768)};
    line-height: 16px;
  }
  @media (min-width: 1024px) {
    height: 18px;
    width: 95px;
    bottom: auto;
    left: ${px2vw(1010, 1440)};
    line-height: 18px;
  }
  &:hover {
    cursor: default;
    color: #000;
  }
  &:disabled,
  &[disabled] {
    opacity: 20%;
    color: #666666;
    cursor: default;
    pointer-events: none;
  }
`;
