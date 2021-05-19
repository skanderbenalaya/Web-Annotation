import {
  LOAD_QUESTION,
  MODIFY_QUESTION,
  ADD_QUESTION,
  SKIP_QUESTION,
  COUNT_QUESTION,
  DELETE_QUESTION,
  IGNORE_QUESTION,
  INSERT_QUESTION,
  VALIDATE_QUESTION,
  API_ERROR,
  ACTION_ERROR,
} from "../types";
import apis from "../../api";
import { LoadTopic } from "./topicActions";
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
    dispatch(LoadTopic());
  } catch (e) {
    dispatch({
      type: API_ERROR,
      payload: console.log("Ignore error", e),
    });
  }
};

export const SkipQuestion = () => async (dispatch) => {
  try {
    dispatch({
      type: SKIP_QUESTION,
      payload: null,
    });
    dispatch(LoadQuestion());
    dispatch(LoadCount());
    dispatch(LoadTopic());
  } catch (e) {
    dispatch({
      type: ACTION_ERROR,
      payload: console.log("Skip error", e),
    });
  }
};

export const DeleteQuestion = (id) => async (dispatch) => {
  try {
    const res = await apis.deleteQuestionById(id);
    dispatch({
      type: DELETE_QUESTION,
      payload: res,
    });
    dispatch(SkipQuestion());
  } catch (e) {
    dispatch({
      type: ACTION_ERROR,
      payload: console.log("Skip error", e),
    });
  }
};

export const EditQuestion = (id, data) => async (dispatch) => {
  try {
    const res = await apis.modifyQuestion(id, { question: data });
    dispatch({
      type: MODIFY_QUESTION,
      payload: res.data.result,
    });
    dispatch(LoadCount());
    dispatch(LoadTopic());
  } catch (e) {
    dispatch({
      type: API_ERROR,
      payload: console.log("Modify error", e),
    });
  }
};

export const AddQuestion = (data) => async (dispatch) => {
  try {
    const res = await apis.postQuestion({ question: data });
    dispatch({
      type: ADD_QUESTION,
      payload: res.data.data,
    });
    dispatch(LoadCount());
    dispatch(LoadTopic());
  } catch (e) {
    dispatch({
      type: API_ERROR,
      payload: console.log("Add error", e),
    });
  }
};

export const ValidateQuestion = (id, A_id, data) => async (dispatch) => {
  try {
    const res = await apis.validateQuestion(id);
    dispatch({
      type: VALIDATE_QUESTION,
      payload: res,
    });
    const result = await apis.insertQuestion(A_id, data);
    dispatch({
      type: INSERT_QUESTION,
      payload: result,
    });
    dispatch(LoadQuestion());
    dispatch(LoadCount());
    dispatch(LoadTopic());
  } catch (e) {
    dispatch({
      type: API_ERROR,
      payload: console.log("Validation error", e),
    });
  }
};
