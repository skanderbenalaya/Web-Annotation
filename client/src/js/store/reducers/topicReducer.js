import { LOAD_TOPIC, SELECT_TOPIC } from "../types";

const initialState = {
  topic_data: [],
  selectedTopic: null,
  loading: true,
};

export default function topRed(state = initialState, action) {
  var retval = null;
  switch (action.type) {
    case LOAD_TOPIC:
      var topicoptions = [];
      action.payload.forEach((doc) =>
        topicoptions.push({ value: doc, label: doc })
      );
      if (topicoptions.length) {
        retval = {
          ...state,
          topic_data: topicoptions,
          loading: false,
        };
      }
      break;
    case SELECT_TOPIC:
      retval = {
        ...state,
        selectedTopic: action.selectedOption,
        loading: false,
      };
      break;
    default:
      retval = state;
  }
  return retval;
}
