import { createGlobalStyle } from "styled-components";
import px2vw from "../utils/px2vw";
export const Global = createGlobalStyle`
  * {
    font-family:Helvetica, Arial, Sans-Serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background-color: #fafafa;
    overflow-y: overlay;
      font-size: ${px2vw(24)};
      @media (min-width: 768px) {
        font-size: ${px2vw(18)};
      }
      @media (min-width: 1024px) {
        font-size: ${px2vw(16)};
      }
    }
`;
export default Global;
