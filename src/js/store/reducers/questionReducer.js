import {
  LOAD_QUESTION,
  MODIFY_QUESTION,
  ADD_QUESTION,
  SKIP_QUESTION,
  COUNT_QUESTION,
  DELETE_QUESTION,
  IGNORE_QUESTION,
  VALIDATE_QUESTION,
  UNLOCK_QUESTION,
} from "../types";

const initialState = {
  question_data: {
    _id: 0,
    question: "No Questions left",
    ignore: false,
    is_valid: false,
  },
  count: 0,
  loading: true,
};

export default function quesRed(state = initialState, action) {
  var retval = null;
  switch (action.type) {
    case LOAD_QUESTION:
      // console.log("Question Payload", action.payload);
      if (Object.keys(action.payload).length) {
        retval = {
          ...state,
          question_data: action.payload,
          loading: false,
        };
      } else
        retval = {
          ...state,
          question_data: initialState.question_data,
          loading: false,
        };
      break;
    case ADD_QUESTION:
      retval = {
        ...state,
        question_data: action.payload,
        loading: false,
      };
      break;
    case MODIFY_QUESTION:
      retval = {
        ...state,
        question_data: action.payload,
        loading: false,
      };
      break;
    case COUNT_QUESTION:
      retval = {
        ...state,
        count: action.payload,
        loading: false,
      };
      break;
    case DELETE_QUESTION:
      retval = {
        ...state,
        loading: false,
      };
      break;
    case SKIP_QUESTION:
      retval = {
        ...state,
        loading: false,
      };
      break;
      case UNLOCK_QUESTION:
        retval = {
          ...state,
          loading: false,
        };
        break;
    case IGNORE_QUESTION:
      retval = {
        ...state,
        loading: false,
      };
      break;
    case VALIDATE_QUESTION:
      retval = {
        ...state,
        loading: false,
      };
      break;
    default:
      retval = state;
  }
  return retval;
}
