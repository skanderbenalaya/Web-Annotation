import { combineReducers } from "redux";
import answerReducer from "./answerReducer";
import questionReducer from "./questionReducer";
import topicReducer from "./topicReducer";

export default combineReducers({
  question_state: questionReducer,
  topic_state: topicReducer,
  answer_state: answerReducer,
});
