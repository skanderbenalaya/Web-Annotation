import { LOAD_TOPIC, SELECT_TOPIC, API_ERROR, ACTION_ERROR } from "../types";
import apis from "../../api";

export const LoadTopic = () => async (dispatch) => {
  try {
    const res = await apis.getTopics();
    dispatch({
      type: LOAD_TOPIC,
      payload: res.data.data,
    });
  } catch (e) {
    dispatch({
      type: API_ERROR,
      payload: console.log("Topics Load", e),
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
      payload: console.log("Answers Load", e),
    });
  }
};
