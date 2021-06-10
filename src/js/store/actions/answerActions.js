import {
  LOAD_ANSWER,
  ADD_ANSWER,
  DELETE_ANSWER,
  FLUSH_ANSWER,
  API_ERROR,
  SELECT_ANSWER,
  MODIFY_ANSWER,
  ACTION_ERROR,
} from "../types";
import apis from "../../api";

export const LoadAnswer = (topic) => async (dispatch) => {
  try {
    const res = await apis.getTopicAnswers(topic);
    console.log("new answer fetch ", res.data.data);
    dispatch({
      type: LOAD_ANSWER,
      payload: res.data.data,
    });
  } catch (e) {
    dispatch({
      type: API_ERROR,
      payload: console.log("Answers Load", e),
    });
  }
};

export const AddAnswer = (topic, data) => async (dispatch) => {
  try {
    const res = await apis.postAnswer(data);
    console.log("ADD DONE ", res.data.data);
    const result = await apis.getTopicAnswers(topic);
    console.log("new answer add ", result.data.data);
    dispatch({
      type: ADD_ANSWER,
      payload1: res.data.data,
      payload2: result.data.data,
    });
  } catch (e) {
    dispatch({
      type: API_ERROR,
      payload: console.log("Add answer error ", e),
    });
  }
};

export const EditAnswer = (topic, id, data) => async (dispatch) => {
  try {
    const res = await apis.modifyAnswer(id, { answer: data });
    console.log("modifyAnswer ", res);
    // const result = await apis.getTopicAnswers(topic);
    // console.log("new answer edit ", result.data.data);
    dispatch({
      type: MODIFY_ANSWER,
      payload: data,
      // payload2: result.data.data,
    });
    dispatch(LoadAnswer(topic));
  } catch (e) {
    dispatch({
      type: API_ERROR,
      payload: console.log("Answer Edit ", e),
    });
  }
};

export const DeleteAnswer = (topic, id) => async (dispatch) => {
  try {
    console.log("Delete answer", id);
    const res = await apis.deleteAnswerById(id);
    const result = await apis.getTopicAnswers(topic);
    console.log("deleteAnswer ", res);
    dispatch({
      type: DELETE_ANSWER,
      payload: res,
      payload2: result.data.data,
    });
  } catch (e) {
    dispatch({
      type: ACTION_ERROR,
      payload: console.log("Delete answer error ", e),
    });
  }
};

export const FlushAnswer = () => async (dispatch) => {
  try {
    dispatch({
      type: FLUSH_ANSWER,
      payload: null,
    });
  } catch (e) {
    dispatch({
      type: API_ERROR,
      payload: console.log("Answers Load", e),
    });
  }
};

export const SelectAnswer = (selectedCard) => async (dispatch) => {
  try {
    dispatch({
      type: SELECT_ANSWER,
      selectedCard: selectedCard,
    });
  } catch (e) {
    dispatch({
      type: ACTION_ERROR,
      payload: console.log("Answers Load", e),
    });
  }
};

// export const SearchAnswer = (value) => async (dispatch) => {
//   try {
//     dispatch({
//       type: SEARCH_ANSWER,
//       value: value,
//     });
//   } catch (e) {
//     dispatch({
//       type: ACTION_ERROR,
//       payload: console.log("Answers Search ", e),
//     });
//   }
// };
