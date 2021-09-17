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
  UNLOCK_QUESTION,
  API_ERROR,
  ACTION_ERROR,
} from "../types";
import apis from "../../api";
import { LoadTopic } from "./topicActions";
export const LoadQuestion = (id) => async (dispatch) => {
  try {
    console.log("trigger exception : ", id);
    const res = await apis.getQuestion(id);
    // console.log(" result : ", res);
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

export const IgnoreQuestion = (id, user) => async (dispatch) => {
  try {
    await apis.releaseQuestion(id);
    const res = await apis.ignoreQuestion(id, { username: user });
    dispatch({
      type: IGNORE_QUESTION,
      payload: res,
    });
    Promise.all([dispatch(LoadQuestion(id))])
      .then(() => {
        dispatch(LoadCount());
      })
      .catch((err) => {
        console.log("error dispatch chaining");
      });
    dispatch(LoadTopic());
  } catch (e) {
    dispatch({
      type: API_ERROR,
      payload: console.log("Ignore error", e),
    });
  }
};

export const UnlockQuestion = (id) => async (dispatch) => {
  if (id !== 0) {
    try {
      console.log("Releasing front: ", id);
      await apis.releaseQuestion(id);
      dispatch({
        type: UNLOCK_QUESTION,
        payload: null,
      });
    } catch (e) {
      dispatch({
        type: ACTION_ERROR,
        payload: console.log("Unlock error", e),
      });
    }
  }
};

export const SkipQuestion = (id) => async (dispatch) => {
  try {
    dispatch(UnlockQuestion(id));
    dispatch({
      type: SKIP_QUESTION,
      payload: null,
    });
    Promise.all([dispatch(LoadQuestion(id))])
      .then(() => {
        dispatch(LoadCount());
      })
      .catch((err) => {
        console.log("error dispatch chaining");
      });
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

export const ValidateQuestion = (id, _id, data, user) => async (dispatch) => {
  try {
    console.log("id ", id, "_id ", _id, "data ", data, user);
    await apis.releaseQuestion(id);
    const res = await apis.validateQuestion(id, { username: user });
    console.log("res ", res);
    dispatch({
      type: VALIDATE_QUESTION,
      payload: res,
    });
    const result = await apis.insertQuestion(_id, data);
    dispatch({
      type: INSERT_QUESTION,
      payload: result,
    });
    Promise.all([dispatch(LoadQuestion(id))])
      .then(() => {
        dispatch(LoadCount());
      })
      .catch((err) => {
        console.log("error dispatch chaining");
      });
    dispatch(LoadTopic());
  } catch (e) {
    dispatch({
      type: API_ERROR,
      payload: console.log("Validation error", e),
    });
  }
};
