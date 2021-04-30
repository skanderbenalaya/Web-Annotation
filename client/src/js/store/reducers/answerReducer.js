import { LOAD_ANSWER, SELECT_ANSWER } from "../types";
import { classcolors, classimages } from "../../utils/colors";

const initialState = {
  answer_data: [],
  cardActive: { A_id: 0, answer: "" },
  loading: true,
};

export default function ansRed(state = initialState, action) {
  var retval = null;
  switch (action.type) {
    case LOAD_ANSWER:
      var answerarray = [];
      action.payload.forEach((doc, i) =>
        answerarray.push({
          id: doc._id,
          title: doc.A_id,
          text: doc.answer,
          bgColor: classcolors[Math.floor(i % classcolors.length)],
          bgImage: classimages[Math.floor(i % classcolors.length)],
        })
      );
      // console.log(answerarray);
      if (answerarray.length) {
        retval = {
          ...state,
          answer_data: answerarray,
          loading: false,
        };
      }
      break;
    case SELECT_ANSWER:
      retval = {
        ...state,
        cardActive: action.selectedCard,
        loading: false,
      };
      break;

    default:
      retval = state;
  }
  return retval;
}
