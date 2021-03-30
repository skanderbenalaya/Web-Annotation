import React, { Component } from "react";
import { Container, Box, BoxTitle, BoxText } from "../styles/ABoxStyles";

export default class ABox extends Component {
  constructor(props) {
    super(props);
    this.selectCard = this.selectCard.bind(this);
    this.state = {
      cardActive: null,
    };
  }
  selectCard(id) {
    this.setState({ cardActive: id });
  }

  render() {
    const { boxData } = this.props;
    return (
      <Container>
        {boxData.map((box) => (
          <Box
            key={box.id}
            onClick={() => {
              console.log("selected card id : ", box.id);
              this.selectCard(box.id);
            }}
            bgColor={box.bgColor}
            bgImage={box.bgImage}
            className={box.id === this.state.cardActive ? "cardActive" : "card"}
          >
            <BoxTitle>{box.title}</BoxTitle>
            <BoxText>{box.text}</BoxText>
          </Box>
        ))}
      </Container>
    );
  }
}
