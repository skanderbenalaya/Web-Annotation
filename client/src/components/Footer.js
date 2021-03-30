import React, { Component } from "react";
import { Container, Button } from "../styles/FooterStyle";
import ReactTooltip from "react-tooltip";

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Ready: false,
    };
  }
  render() {
    const styleTooltip = {
      backgroundColor: "#00000000",
      color: "black",
      textAlign: "center",
    };
    return (
      <Container>
        <Button className={"ignoreBtn"} data-tip data-for="ignore"></Button>
        <ReactTooltip id="ignore" place="left" type="error" effect="solid">
          <span style={styleTooltip}>Ignore</span>
        </ReactTooltip>
        <Button className={"validateBtn"} data-tip data-for="validate"></Button>
        <ReactTooltip id="validate" place="left" type="success" effect="solid">
          <span style={styleTooltip}>Validate</span>
        </ReactTooltip>
      </Container>
    );
  }
}
