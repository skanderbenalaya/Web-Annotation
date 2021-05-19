import {
  LOAD_ANSWER,
  ADD_ANSWER,
  DELETE_ANSWER,
  FLUSH_ANSWER,
  SEARCH_ANSWER,
  API_ERROR,
  SELECT_ANSWER,
  ACTION_ERROR,
} from "../types";
import apis from "../../api";

export const LoadAnswer = (topic) => async (dispatch) => {
  try {
    const res = await apis.getTopicAnswers(topic);
    console.log("new answer fetch", res.data.data);
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
    const result = await apis.getTopicAnswers(topic);
    console.log("ADD DONE ", res.data.data);
    console.log("new answer fetch", result.data.data);
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

export const DeleteAnswer = (topic, id) => async (dispatch) => {
  try {
    const res = await apis.deleteAnswerById(id);
    const result = await apis.getTopicAnswers(topic);
    dispatch({
      type: DELETE_ANSWER,
      payload1: res,
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

export const SearchAnswer = (value) => async (dispatch) => {
  try {
    dispatch({
      type: SEARCH_ANSWER,
      value: value,
    });
  } catch (e) {
    dispatch({
      type: ACTION_ERROR,
      payload: console.log("Answers Search ", e),
    });
  }
};
