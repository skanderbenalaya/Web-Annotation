import styled from "styled-components";
import px2vw from "../utils/px2vw";

export const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
  border-radius: 14px;
  background-color: #00000000;
  bottom: 13px;
  right: 3px;
  height: 110px;
  width: 40px;
  @media (min-width: 768px) {
    height: 110px;
    width: 40px;
    right: 10px;
  }
  @media (min-width: 1024px) {
    height: 160px;
    width: 60px;
    right: ${px2vw(38)};
  }
  @media (min-width: 1280px) {
    height: 160px;
    width: 60px;
    right: ${px2vw(24)};
  }
`;

export const Button = styled.a`
  position: relative;
  height: 40px;
  width: 40px;
  line-height: 40px;
  border-radius: 50%;
  text-align: center;
  font-weight: bold;
  vertical-align: middle;
  overflow: hidden;
  font-size: 1rem;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  transition: 0.1s;
  cursor: pointer;
  @media (min-width: 768px) {
    height: 40px;
    width: 40px;
    line-height: 40px;
  }
  @media (min-width: 1024px) {
    height: 60px;
    width: 60px;
    line-height: 60px;
  }
  &.ignoreBtn {
    background-color: #fff;
    &:before,
    &:after {
      position: absolute;
      top: 17px;
      left: 9px;
      width: 23px;
      height: 5px;
      content: "";
      background-color: #ff5248;
      display: block;
      @media (min-width: 768px) {
        top: 17px;
        left: 9px;
        width: 23px;
        height: 5px;
      }
      @media (min-width: 1024px) {
        top: 26px;
        left: 12px;
        width: 36px;
        height: 8px;
      }
    }
    &:before {
      -ms-transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
    }
    &:after {
      -ms-transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }

  &.validateBtn {
    background-color: #fff;
    &:after {
      position: absolute;
      top: 6px;
      left: 13px;
      width: 8px;
      height: 18px;
      content: "";
      display: block;
      border: solid #0bda51;
      border-width: 0 5px 5px 0;
      @media (min-width: 768px) {
        top: 6px;
        left: 13px;
        width: 8px;
        height: 18px;
        border-width: 0 5px 5px 0;
      }
      @media (min-width: 1024px) {
        top: 8px;
        left: 18px;
        width: 13px;
        height: 28px;
        border-width: 0 8px 8px 0;
      }
    }
    &:after {
      -ms-transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }

  &:hover {
    cursor: pointer;
  }
  &:active {
    -ms-transform: translateY(2px);
    -webkit-transform: translateY(2px);
    transform: translateY(2px);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.15);
  }
  &:disabled,
  &[disabled] {
    border: 1px solid #b0b0b0;
    opacity: 40%;
    color: #666666;
    cursor: not-allowed;
    pointer-events: none;
  }
`;
