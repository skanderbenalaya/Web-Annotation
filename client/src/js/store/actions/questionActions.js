import {
  LOAD_QUESTION,
  COUNT_QUESTION,
  IGNORE_QUESTION,
  INSERT_QUESTION,
  VALIDATE_QUESTION,
  API_ERROR,
} from "../types";
import apis from "../../api";

export const LoadQuestion = () => async (dispatch) => {
  try {
    const res = await apis.getQuestion();
    dispatch({
      type: LOAD_QUESTION,
      payload: res.data.data,
    });
  } catch (e) {
    dispatch({
      type: API_ERROR,
      payload: console.log("Question Load", e),
    });
  }
};

export const LoadCount = () => async (dispatch) => {
  try {
    const res = await apis.getCount();
    dispatch({
      type: COUNT_QUESTION,
      payload: res.data.data,
    });
  } catch (e) {
    dispatch({
      type: API_ERROR,
      payload: console.log("Count error", e),
    });
  }
};

export const IgnoreQuestion = (id) => async (dispatch) => {
  try {
    const res = await apis.ignoreQuestion(id);
    dispatch({
      type: IGNORE_QUESTION,
      payload: res,
    });
    dispatch(LoadQuestion());
    dispatch(LoadCount());
  } catch (e) {
    dispatch({
      type: API_ERROR,
      payload: console.log("Ignore error", e),
    });
  }
};

export const ValidateQuestion = (id,A_id,data) => async (dispatch) => {
  try {
    const res = await apis.validateQuestion(id);
    dispatch({
      type: VALIDATE_QUESTION,
      payload: res,
    });
    const result = await apis.insertQuestion(A_id,data);
    dispatch({
      type: INSERT_QUESTION,
      payload: result,
    });
    dispatch(LoadQuestion());
    dispatch(LoadCount());
  } catch (e) {
    dispatch({
      type: API_ERROR,
      payload: console.log("Validation error", e),
    });
  }
};
