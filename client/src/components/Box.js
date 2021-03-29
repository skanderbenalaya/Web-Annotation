import React from "react";
import { Container, Box, BoxTitle, BoxText } from "../styles/BoxStyles";
export default function ABox({ boxData }) {
  return (
    <Container>
      {boxData.map(box => (
        <Box key={box.id} bgColor={box.bgColor}>
          <BoxTitle bgColor={box.bgColor}>{box.title}</BoxTitle>
          <BoxText bgColor={box.bgColor}>{box.text}</BoxText>
        </Box>
      ))}
    </Container>
  );
}