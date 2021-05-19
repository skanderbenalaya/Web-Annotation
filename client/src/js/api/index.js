import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});
export const postQuestion = (payload) => api.post(`/question`, payload);

export const getQuestionById = (id) => api.get(`/question/${id}`);

export const getQuestion = () => api.get(`/question`);

export const modifyQuestion = (id, payload) =>
  api.put(`/question/${id}`, payload);

export const getCount = () => api.get(`/question/count`);

export const deleteQuestionById = (id) => api.delete(`/question/${id}`);

export const getTopics = () => api.get(`/topic`);

export const modifyTopic = (topic, payload) =>
  api.put(`/topic/${topic}`, payload);

export const getTopicAnswers = (topic) => api.get(`/answer/topic/${topic}`);

export const postAnswer = (payload) => api.post(`/answer`, payload);

export const deleteAnswerById = (id) => api.delete(`/answer/${id}`);

export const ignoreQuestion = (id) => api.put(`/question/ignore/${id}`);

export const validateQuestion = (id) => api.put(`/question/validate/${id}`);

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
  deleteAnswerById,
  ignoreQuestion,
  validateQuestion,
  insertQuestion,
};

export default apis;
