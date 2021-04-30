import { LOAD_ANSWER, API_ERROR, SELECT_ANSWER, ACTION_ERROR } from "../types";
import apis from "../../api";

export const LoadAnswer = (topic) => async (dispatch) => {
  try {
    const res = await apis.getTopicAnswers(topic);
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
