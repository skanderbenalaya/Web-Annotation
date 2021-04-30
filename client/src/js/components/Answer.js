import React, { Component } from "react";
import { Container, Box, BoxTitle, BoxText } from "../styles/AnswerStyles";
import { connect } from "react-redux";
import { SelectAnswer } from "../store/actions/answerActions";

class answer extends Component {
  constructor(props) {
    super(props);
    this.selectCard = this.selectCard.bind(this);
  }
  selectCard(data) {
    this.props.SelectAnswer(data);
  }

  render() {
    const boxData = this.props.answer_state.answer_data;
    const cardActive = this.props.answer_state.cardActive;
    console.log("cardActive", cardActive);
    return (
      <Container>
        {boxData.map((box) => (
          <Box
            key={box.id}
            onClick={() => {
              this.selectCard({A_id:box.title,answer:box.text});
            }}
            bgColor={box.bgColor}
            bgImage={box.bgImage}
            className={box.title === cardActive.A_id ? "cardActive" : "card"}
          >
            <BoxTitle>{box.title}</BoxTitle>
            <BoxText>{box.text}</BoxText>
          </Box>
        ))}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({ answer_state: state.answer_state });

export default connect(mapStateToProps, { SelectAnswer })(answer);

// import React, { Component } from "react";
// import { Container, Button } from "../styles/FooterStyle";
// import ReactTooltip from "react-tooltip";

// class footer extends Component {
//   componentDidMount = async () => {
//     this.props.LoadCount();
//   };
//   render() {
//     const count = this.props.count;
//     console.log("count ",count);
//     const styleTooltip = {
//       backgroundColor: "#00000000",
//       color: "black",
//       textAlign: "center",
//     };
//     return (
//       <Container>
//         <Button className={"ignoreBtn"} data-tip data-for="ignore" disabled={count<2}></Button>
//         <ReactTooltip id="ignore" place="left" type="error" effect="solid">
//           <span style={styleTooltip}>Ignore</span>
//         </ReactTooltip>
//         <Button className={"validateBtn"} data-tip data-for="validate"></Button>
//         <ReactTooltip id="validate" place="left" type="success" effect="solid">
//           <span style={styleTooltip}>Validate</span>
//         </ReactTooltip>
//       </Container>
//     );
//   }
// }

// const mapStateToProps = (state) => ({ count: state.question_state.count });

// export default connect(mapStateToProps, { LoadCount })(footer);
