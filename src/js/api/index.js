import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});
export const postQuestion = (payload) => api.post(`/question`, payload);

export const getQuestionById = (id) => api.get(`/question/${id}`);

export const getQuestion = (id) => api.get(`/question/exclude/${id}`);

export const modifyQuestion = (id, payload) =>
  api.put(`/question/${id}`, payload);

export const getCount = () => api.get(`/question/count`);

export const deleteQuestionById = (id) => api.delete(`/question/${id}`);

export const getTopics = () => api.get(`/topic`);

export const modifyTopic = (topic, payload) =>
  api.put(`/topic/${topic}`, payload);

export const getTopicAnswers = (topic) => api.get(`/answer/topic/${topic}`);

export const postAnswer = (payload) => api.post(`/answer`, payload);

export const modifyAnswer = (id, payload) => api.put(`/answer/${id}`, payload);

export const deleteAnswerById = (id) => api.delete(`/answer/${id}`);

export const ignoreQuestion = (id, payload) =>
  api.put(`/question/ignore/${id}`, payload);

export const validateQuestion = (id, payload) =>
  api.put(`/question/validate/${id}`, payload);

export const releaseQuestion = (id) =>
  api.put(`/question/release/${id}`).then((response) => {
    console.log("axios res unlock ", response);
  });

export const insertQuestion = (id, payload) =>
  api.put(`/answer/question/${id}`, payload);

const apis = {
  postQuestion,
  getQuestion,
  modifyQuestion,
  getCount,
  deleteQuestionById,
  getTopics,
  modifyTopic,
  getTopicAnswers,
  postAnswer,
  modifyAnswer,
  deleteAnswerById,
  ignoreQuestion,
  validateQuestion,
  releaseQuestion,
  insertQuestion,
};

export default apis;
