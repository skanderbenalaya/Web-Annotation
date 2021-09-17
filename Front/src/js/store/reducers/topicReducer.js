import {
  LOAD_TOPIC,
  EDIT_TOPIC,
  SELECT_TOPIC,
  ADD_TOPIC,
  MODIFY_TOPIC,
  REMOVE_TOPIC,
  IGNORE_QUESTION,
  VALIDATE_QUESTION,
  SKIP_QUESTION,
  UNLOCK_QUESTION,
} from "../types";

const initialState = {
  topic_data: [],
  add_data: ["Général"],
  selectedTopic: "",
  loading: true,
};

export default function topRed(state = initialState, action) {
  var retval = null;
  switch (action.type) {
    case LOAD_TOPIC:
      var top_arr = action.payload;
      for (var i = 0; i < top_arr.length; i++) {
        if (top_arr[i] === "Général") {
          top_arr.splice(i, 1);
        }
      }
      if (action.payload.length) {
        retval = {
          ...state,
          topic_data: top_arr,
          loading: false,
        };
      }
      break;
    case ADD_TOPIC:
      retval = {
        ...state,
        add_data: [...state.add_data, action.payload],
        selectedTopic: action.payload,
        loading: false,
      };
      break;
    case EDIT_TOPIC:
      retval = {
        ...state,
        add_data: state.add_data
          .slice(0, action.index)
          .concat(action.payload)
          .concat(state.add_data.slice(action.index + 1)),
        selectedTopic: action.payload,
        loading: false,
      };
      break;
    case SELECT_TOPIC:
      retval = {
        ...state,
        selectedTopic: action.selectedOption,
        loading: false,
      };
      break;
    case MODIFY_TOPIC:
      retval = {
        ...state,
        selectedTopic: action.payload,
        loading: false,
      };
      break;
    case REMOVE_TOPIC:
      retval = {
        ...state,
        add_data: state.add_data
          .slice(0, action.payload)
          .concat(state.add_data.slice(action.payload + 1)),
        selectedTopic: "",
        loading: false,
      };
      break;
    case IGNORE_QUESTION:
      retval = {
        ...state,
        selectedTopic: "",
        loading: false,
      };
      break;
    case VALIDATE_QUESTION:
      retval = {
        ...state,
        selectedTopic: "",
        loading: false,
      };
      break;
    case SKIP_QUESTION:
      retval = {
        ...state,
        selectedTopic: "",
        loading: false,
      };
      break;
    case UNLOCK_QUESTION:
      retval = {
        ...state,
        selectedTopic: "",
        loading: false,
      };
      break;
    default:
      retval = state;
  }
  return retval;
}
