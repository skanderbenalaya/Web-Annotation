import styled from "styled-components";
import px2vw from "../utils/px2vw";

export const TContainer = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  margin: auto;
  justify-content: center;
  align-items: center;
`;

export const SButton = styled.a`
  position: absolute;
  flex-direction: row;
  display: flex;
  bottom: -30px;
  justify-content: space-evenly;
  height: 14px;
  width: 180px;
  line-height: 24px;

  @media (min-width: 768px) {
    height: 16px;
    width: 128px;
    bottom: auto;
    left: ${px2vw(586, 768)};
    line-height: 16px;
  }
  @media (min-width: 1024px) {
    height: 18px;
    width: 190px;
    bottom: auto;
    left: ${px2vw(1010, 1440)};
    line-height: 18px;
  }
`;
