import styled from "styled-components";
import px2vw from "../utils/px2vw";
import { ReloadCircle } from "@styled-icons/ionicons-solid";

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
  flex-direction: row;
  flex-wrap: wrap;
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
  flex: 1 0 68%;
  display: inline;
  margin-left:10px;
  width: fit-content;
  height: fit-content;
  font-size: 0.8rem;
  font-weight: 700;
  @media (min-width: 1024px) {
    font-size: 1rem;
  }
`;

export const SButton = styled.a`
  flex: 1 0 10%;
  position: relative;
  background-color: #fff;
  display: flex;
  justify-content: space-evenly;
  height: 14px;
  width: 14px;
  line-height: 14px;

  @media (min-width: 768px) {
    height: 16px;
    width: 16px;
    line-height: 16px;
  }
  @media (min-width: 1024px) {
    height: 18px;
    width: 18px;
    line-height: 18px;
  }
`;
export const QBoxText = styled.p`
  flex: 0 1 90%;
  margin: auto;
  padding-bottom: inherit;
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

export const Reload = styled(ReloadCircle)`
  background-color: #fafafa;
`;
export const Button = styled.a`
  position: relative;
  margin-top: auto;
  margin-bottom: auto;
  height: 20px;
  width: 20px;
  line-height: 20px;
  border-radius: 50%;
  text-align: center;
  font-weight: bold;
  vertical-align: middle;
  overflow: hidden;
  font-size: 1rem;
  transition: 0.1s;
  cursor: pointer;
  @media (min-width: 768px) {
    height: 20px;
    width: 20px;
    line-height: 20px;
  }
  @media (min-width: 1024px) {
    height: 40px;
    width: 40px;
    line-height: 40px;
  }
  &:hover {
    cursor: pointer;
  }
  &:active {
    -ms-transform: translateY(2px);
    -webkit-transform: translateY(2px);
    transform: translateY(2px);
  }
  &:disabled,
  &[disabled] {
    opacity: 40%;
    color: #666666;
    cursor: not-allowed;
    pointer-events: none;
  }
`;
