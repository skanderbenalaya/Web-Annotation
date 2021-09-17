import {
  LOAD_ANSWER,
  ADD_ANSWER,
  DELETE_ANSWER,
  FLUSH_ANSWER,
  SELECT_ANSWER,
  SEARCH_ANSWER,
  MODIFY_ANSWER,
  ADD_TOPIC,
  MODIFY_QUESTION,
  IGNORE_QUESTION,
  VALIDATE_QUESTION,
  SKIP_QUESTION,
  UNLOCK_QUESTION,
} from "../types";
import { classcolors, classimages } from "../../utils/colors";

const initialState = {
  answer_data: [],
  cardActive: { _id: 0, A_id: 0, answer: "" },
  searchValue: "",
  loading: true,
};

export default function ansRed(state = initialState, action) {
  var retval = null;
  switch (action.type) {
    case LOAD_ANSWER:
      var answerarray = [];
      if (action.payload.length) {
        action.payload.forEach((doc, i) =>
          answerarray.push({
            id: doc._id,
            title: doc.A_id,
            text: doc.answer,
            bgColor: classcolors[Math.floor(i % classcolors.length)],
            bgImage: classimages[Math.floor(i % classcolors.length)],
          })
        );
      }
      retval = {
        ...state,
        answer_data: answerarray,
        loading: false,
      };
      break;
    case UNLOCK_QUESTION:
      retval = {
        ...state,
        answer_data: [],
        loading: false,
      };
      break;
    case FLUSH_ANSWER:
      retval = {
        ...state,
        answer_data: [],
        loading: false,
      };
      break;
    case ADD_ANSWER:
      var newarray = [];
      if (action.payload2.length) {
        action.payload2.forEach((doc, i) =>
          newarray.push({
            id: doc._id,
            title: doc.A_id,
            text: doc.answer,
            bgColor: classcolors[Math.floor(i % classcolors.length)],
            bgImage: classimages[Math.floor(i % classcolors.length)],
          })
        );
      }
      retval = {
        ...state,
        answer_data: newarray,
        cardActive: {
          _id: action.payload1._id,
          A_id: action.payload1.A_id,
          answer: action.payload1.answer,
        },
        loading: false,
      };
      break;
    case MODIFY_ANSWER:
      // var editarray = [];
      // if (action.payload.length) {
      //   action.payload.forEach((doc, i) =>
      //     editarray.push({
      //       id: doc._id,
      //       title: doc.A_id,
      //       text: doc.answer,
      //       bgColor: classcolors[Math.floor(i % classcolors.length)],
      //       bgImage: classimages[Math.floor(i % classcolors.length)],
      //     })
      //   );
      // }
      retval = {
        ...state,
        // answer_data: editarray,
        cardActive: { ...state.cardActive, answer: action.payload },
        loading: false,
      };
      break;
    case DELETE_ANSWER:
      var newdelarray = [];
      if (action.payload2.length) {
        action.payload2.forEach((doc, i) =>
          newdelarray.push({
            id: doc._id,
            title: doc.A_id,
            text: doc.answer,
            bgColor: classcolors[Math.floor(i % classcolors.length)],
            bgImage: classimages[Math.floor(i % classcolors.length)],
          })
        );
      }
      retval = {
        ...state,
        answer_data: newdelarray,
        cardActive: { _id: 0, A_id: 0, answer: "" },
        loading: false,
      };
      break;
    case ADD_TOPIC:
      retval = {
        ...state,
        answer_data: [],
        loading: false,
      };
      break;
    case SELECT_ANSWER:
      retval = {
        ...state,
        cardActive: action.selectedCard,
        loading: false,
      };
      break;
    case SEARCH_ANSWER:
      retval = {
        ...state,
        searchValue: action.value,
        loading: false,
      };
      break;
    case MODIFY_QUESTION:
      retval = {
        ...state,
        topic_data: [],
        selectedTopic: "",
        loading: false,
      };
      break;
    case IGNORE_QUESTION:
      retval = {
        ...state,
        answer_data: [],
        cardActive: { _id: 0, A_id: 0, answer: "" },
        loading: false,
      };
      break;
    case VALIDATE_QUESTION:
      retval = {
        ...state,
        answer_data: [],
        cardActive: { _id: 0, A_id: 0, answer: "" },
        loading: false,
      };
      break;
    case SKIP_QUESTION:
      retval = {
        ...state,
        answer_data: [],
        cardActive: { _id: 0, A_id: 0, answer: "" },
        loading: false,
      };
      break;
    default:
      retval = state;
  }
  return retval;
}
