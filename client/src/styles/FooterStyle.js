import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
  border-radius: 14px;
  background-color:#00000000;
  bottom: 13px;
  right: 8px;
  height: 80px;
  width: 25px;
  @media (min-width: 768px) {
    height: 110px;
    width: 40px;
  }
  @media (min-width: 1024px) {
    height: 160px;
    width: 60px;
  }
`;

export const Button = styled.a`
  position: relative;
  height: 25px;
  width: 25px;
  line-height: 25px;
  border-radius: 50%;
  text-align: center;
  font-weight: bold;
  vertical-align: middle;
  overflow: hidden;
  font-size: 1rem;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5);
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
    background-color: #ff5248;
    &:before,
    &:after {
      position: absolute;
      top: 11px;
      left: 6px;
      width: 13px;
      height: 3px;
      content: "";
      background-color: #fff;
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
    background-color: #0bda51;
    &:after {
      position: absolute;
      top: 4px;
      left: 8px;
      width: 5px;
      height: 11px;
      content: "";
      background-color: #0bda51;
      display: block;
      border: solid #fff;
      border-width: 0 3px 3px 0;
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
`;