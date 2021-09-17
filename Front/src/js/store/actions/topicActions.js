import {
  LOAD_TOPIC,
  SELECT_TOPIC,
  API_ERROR,
  ACTION_ERROR,
  ADD_TOPIC,
  EDIT_TOPIC,
  MODIFY_TOPIC,
  REMOVE_TOPIC,
} from "../types";
import apis from "../../api";
import { LoadAnswer } from "./answerActions";

export const LoadTopic = () => async (dispatch) => {
  try {
    const res = await apis.getTopics();
    // console.log(res.data.data);
    dispatch({
      type: LOAD_TOPIC,
      payload: res.data.data,
    });
  } catch (e) {
    dispatch({
      type: API_ERROR,
      payload: console.log("Topics Load ", e),
    });
  }
};

export const AddTopic = (text) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_TOPIC,
      payload: text,
    });
  } catch (e) {
    dispatch({
      type: ACTION_ERROR,
      payload: console.log("Topic Add ", e),
    });
  }
};

export const EditTopic = (index, data) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_TOPIC,
      index: index,
      payload: data,
    });
    LoadAnswer(data);
  } catch (e) {
    dispatch({
      type: ACTION_ERROR,
      payload: console.log("Topic Add ", e),
    });
  }
};

export const ModifyTopic = (topic, data) => async (dispatch) => {
  try {
    const res = await apis.modifyTopic(topic, { topic: data });
    console.log(res);
    dispatch({
      type: MODIFY_TOPIC,
      payload: res.data.update,
    });
    dispatch(LoadTopic());
  } catch (e) {
    dispatch({
      type: API_ERROR,
      payload: console.log("Topics Edit", e),
    });
  }
};

export const RemoveTopic = (index) => async (dispatch) => {
  try {
    dispatch({
      type: REMOVE_TOPIC,
      payload: index,
    });
    dispatch(LoadTopic());
  } catch (e) {
    dispatch({
      type: ACTION_ERROR,
      payload: console.log("Topic Remove  ", e),
    });
  }
};

export const SelectTopic = (selectedOption) => async (dispatch) => {
  try {
    dispatch({
      type: SELECT_TOPIC,
      selectedOption: selectedOption,
    });
  } catch (e) {
    dispatch({
      type: ACTION_ERROR,
      payload: console.log("Answers Load from topic selection ", e),
    });
  }
};
